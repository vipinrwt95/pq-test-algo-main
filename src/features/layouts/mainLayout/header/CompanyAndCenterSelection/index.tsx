import { useEffect, useMemo, useState } from 'react'
import Select from 'react-select'
import { useLocation } from 'react-router-dom'
import { selectCenter, selectCompany, setCenter, setCompany } from './companyAndCenterSelectionSlice'
import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import {
  selectCustomStyles,
  SelectLoading,
  selectThemeConfig,
} from 'src/features/utils/ReusableElements/ReactSelect/ReactSelect'
import { SelectOption } from 'src/features/types'
import { useUser } from 'src/features/services/api/authApi/useUser'

function CompanyAndCenterSelection() {
  const dispatch = useAppDispatch()

  const selectedCompany = useAppSelector(selectCompany)
  const selectedCompanyId = selectedCompany?.id
  const selectedCompanyName = selectedCompany?.name
  const selectedCenter = useAppSelector(selectCenter)
  const selectedCenterId = selectedCenter?.id
  const selectedCenterName = selectedCenter?.name

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const companies: any[] = []
  const isFetchingCompanies = false

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const centers: any[] = []
  const isFetchingCenters = false

  const [isMobile, setIsMobile] = useState(false)

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1199)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const location = useLocation()

  const { isCenterLevelUser, isSuperAdmin, usersCentersFirstCenterId, usersCentersFirstCenterName } = useUser()

  useEffect(() => {
    if (!isCenterLevelUser) return
    // set the center in the redux store if the user is a center level user
    // so that it can be used in the api calls throughout the app
    if (usersCentersFirstCenterId && usersCentersFirstCenterName) {
      dispatch(setCenter({ id: usersCentersFirstCenterId, name: usersCentersFirstCenterName }))
    }
  }, [isCenterLevelUser, usersCentersFirstCenterId, dispatch, usersCentersFirstCenterName])

  const shouldShowCompaniesDropdown = useMemo(() => {
    if (isCenterLevelUser) return false

    const shouldShow = [
      '/dashboard',
      '/news',
      '/retailers',
      '/deals',
      '/events',
      '/careers',
      '/links',
      '/users/managers',
      '/users/authors',
      '/centers',
      '/center-hours',
      '/advertisement-media',
      '/app-idle-slider',
    ]
    return shouldShow.includes(location.pathname)
  }, [isCenterLevelUser, location.pathname])

  const shouldShowCentersDropdown = useMemo(() => {
    if (isCenterLevelUser) return false

    const shouldShow = [
      '/dashboard',
      '/news',
      '/retailers',
      '/deals',
      '/events',
      '/careers',
      '/links',
      '/users/managers',
      '/users/authors',
      '/center-hours',
      '/advertisement-media',
      '/app-idle-slider',
    ]
    return shouldShow.includes(location.pathname)
  }, [isCenterLevelUser, location.pathname])

  const dropdownStyle = { width: isMobile ? '150px' : '236px' }

  const selectedCompanyOption: SelectOption | null = useMemo(
    () =>
      selectedCompanyId && selectedCompanyName
        ? {
            value: selectedCompanyId,
            label: selectedCompanyName,
          }
        : null,
    [selectedCompanyId, selectedCompanyName]
  )

  const selectedCenterOption: SelectOption | null = useMemo(
    () =>
      selectedCenterId && selectedCenterName
        ? {
            value: selectedCenterId,
            label: selectedCenterName,
          }
        : null,
    [selectedCenterId, selectedCenterName]
  )

  // for super admin auto select the first company if there is no selected company
  useEffect(() => {
    if (!isSuperAdmin) return

    if (!companies) return

    if (!selectedCompanyOption && companies.length > 0) {
      dispatch(setCompany({ id: companies[0].value, name: companies[0].label }))
    }
  }, [companies, dispatch, selectedCompanyOption, isSuperAdmin])

  const selectedCentersCompanyId = useMemo(
    () => centers?.find(({ value }) => selectedCenterOption?.value === value)?.companyId,
    [centers, selectedCenterOption?.value]
  )

  // for super admin auto select the first center if there is no selected center but make sure that the center belongs to the selected company
  // make sure to wait until a company is selected
  useEffect(() => {
    if (!isSuperAdmin) return

    if (selectedCentersCompanyId === selectedCompanyId)
      // immediate return if the selected center's company id is same as the selected company id
      return

    if (!centers?.length) {
      dispatch(setCenter(null))
      return
    }

    dispatch(setCenter({ id: centers[0]?.value, name: centers[0]?.label }))
  }, [
    centers,
    dispatch,
    selectedCenterOption,
    selectedCentersCompanyId,
    selectedCompanyId,
    selectedCompanyOption,
    isSuperAdmin,
  ])

  return (
    <>
      <div className="d-flex flex-wrap">
        {shouldShowCompaniesDropdown && (
          <div className="me-3 mb-2 mb-sm-0" style={dropdownStyle}>
            <Select
              styles={selectCustomStyles as any}
              theme={selectThemeConfig}
              loadingMessage={SelectLoading}
              isLoading={isFetchingCompanies}
              className="form-control p-0"
              escapeClearsValue
              isSearchable
              options={companies}
              value={selectedCompanyOption}
              placeholder="Select Company"
              onChange={(option: SelectOption | null) => {
                dispatch(setCompany(option === null ? null : { id: option.value as number, name: option.label }))
              }}
            />
          </div>
        )}

        {shouldShowCentersDropdown && (
          <div style={dropdownStyle}>
            <Select
              styles={selectCustomStyles}
              theme={selectThemeConfig}
              loadingMessage={SelectLoading}
              isLoading={isFetchingCenters}
              className="form-control p-0"
              escapeClearsValue
              isSearchable
              options={centers}
              value={selectedCenterOption}
              placeholder="Select Center"
              // Update your onChange handler for the Center Select component:
              onChange={(option: SelectOption | null) => {
                // dispatch with null if option is null
                dispatch(setCenter(option === null ? null : { id: option.value as number, name: option.label }))
              }}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default CompanyAndCenterSelection
