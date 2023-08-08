import _map from 'lodash/map'
import _memoize from 'lodash/memoize'
import { useCallback, useMemo } from 'react'
import { useFetchJson } from 'src/features/hooks/useFetchJson'
import _findKey from 'lodash/findKey'
import { assert } from 'src/features/utils/functions/assert'

type SelectItemId = string | number

interface SelectOption {
  label: string
  value: SelectItemId
}

interface CountryStatesJson {
  country: Record<string, string>
  states: Record<string, { code: string; name: string }[]>
  timezones: { label: string; options: SelectOption[] }[]
}

interface CountryStatesTransformedData {
  getCountries: () => SelectOption[] | undefined
  getStates: (countryCode: string) => SelectOption[] | undefined
  getCountryCode: (countryLabel: string) => string | undefined
  getTimezones: () => CountryStatesJson['timezones']
}

const getTransformedData = (data: CountryStatesJson): CountryStatesTransformedData => {
  assert(
    !!data,
    'Data must be there before calling this function since it uses _memoization without considering this data change.'
  )

  // Assuming the data won't change, so wse _memoize to make it performant. Note that the values won't update
  // if CountryStatesJson data changes which we don't expect to change
  return {
    getCountries: _memoize(() => _map(data.country, (value, key) => ({ label: value, value: key }))),
    getStates: _memoize((countryCode?: string) => {
      if (!countryCode) return
      return data.states[countryCode]?.map(({ code, name }) => ({ value: code, label: name }))
    }),
    getCountryCode: _memoize((countryLabel: string) => _findKey(data.country, (v) => v === countryLabel)),
    getTimezones: _memoize(() => data.timezones),
  }
}

export const useCountryStateOptions = ({ selectedCountry }: { selectedCountry: string }) => {
  const { transformedData: countryStates, loading } = useFetchJson<CountryStatesJson, CountryStatesTransformedData>({
    // in a create-react-app project, this json file should reside in the public folder
    jsonUrl: '/country-states.json',
    fetchOnMount: true,
    transform: getTransformedData,
  })

  const countryOptions = useMemo(() => {
    if (!countryStates?.getCountries) return

    return countryStates.getCountries()
  }, [countryStates])

  const stateOptions = useMemo(() => {
    if (!selectedCountry) return
    if (!countryStates?.getStates) return
    if (!countryStates.getCountryCode) return

    const countryCode = countryStates.getCountryCode(selectedCountry)

    if (!countryCode) return

    return countryStates.getStates(countryCode)
  }, [countryStates, selectedCountry])

  const timezoneOptions = useMemo(() => {
    if (!countryStates?.getTimezones) return

    return countryStates.getTimezones()
  }, [countryStates])

  const isValidCountry = useCallback(
    (value: string) => {
      if (loading) return
      return countryOptions?.some((c) => c.label === value)
    },
    [countryOptions, loading]
  )

  const isValidState = useCallback(
    (value: string) => {
      if (loading) return
      return stateOptions?.some((s) => s.label === value)
    },
    [loading, stateOptions]
  )

  const isValidTimezone = useCallback(
    (value: string) => {
      if (loading) return
      return timezoneOptions?.some((groups) => {
        return groups.options.some((timezone) => timezone.value === value)
      })
    },
    [loading, timezoneOptions]
  )

  return {
    loadingCountryOptions: loading,
    loadingStatesOptions: loading,
    loadingTimezoneOptions: loading,
    countryOptions,
    stateOptions,
    timezoneOptions,
    isValidState,
    isValidCountry,
    isValidTimezone,
  }
}
