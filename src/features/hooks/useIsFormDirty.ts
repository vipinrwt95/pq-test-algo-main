import { FieldValues } from 'react-hook-form'
import _isNil from 'lodash/isNil'
import _isEqual from 'lodash/isEqual'

export const useIsFormDirty = <T>(props: { defaultValues?: Partial<T>; latestValues: T }) => {
  const latestValues = props.latestValues as FieldValues
  const defaultValues = (props?.defaultValues || {}) as FieldValues

  return (
    Object.keys(latestValues).findIndex((key) => {
      // if null or undefined set it to empty string, else set as is.
      const defaultValue = _isNil(defaultValues[key]) ? '' : defaultValues[key]
      const currentValue = _isNil(latestValues[key]) ? '' : latestValues[key]

      return !_isEqual(defaultValue, currentValue)
    }) > -1
  )
}
