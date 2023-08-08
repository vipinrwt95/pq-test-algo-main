import { useMemo } from 'react'
import { useAppSelector } from 'src/app/hooks'
import {
  selectIsCenterLevelUser,
  selectIsCompanyLevelUser,
  selectIsSuperAdmin,
  useIsAuthenticatedQuery,
  selectUsersCentersFirstCenterId,
  selectUsersCentersFirstCenterName,
} from './authApi'
import md5 from 'md5'
import { useGetAccountQuery } from '../accountApi/accountApi'

export const useUser = () => {
  const { data: user } = useIsAuthenticatedQuery()

  const { data: dataAccount } = useGetAccountQuery()

  const userEmail = dataAccount?.email || ''
  const userFirstName = dataAccount?.first_name || ''
  const userLastName = dataAccount?.last_name || ''
  const userFullName = `${userFirstName} ${userLastName}`
  const userRole = user?.role.name || ''
  const isSuperAdmin = useAppSelector(selectIsSuperAdmin)
  const isCompanyLevelUser = useAppSelector(selectIsCompanyLevelUser)
  const isCenterLevelUser = useAppSelector(selectIsCenterLevelUser)
  const usersCentersFirstCenterId = useAppSelector(selectUsersCentersFirstCenterId)
  const usersCentersFirstCenterName = useAppSelector(selectUsersCentersFirstCenterName)

  const userGravatarURL = useMemo(() => {
    if (!userEmail) return null
    return `https://www.gravatar.com/avatar/${md5(userEmail.trim().toLowerCase())}`
  }, [userEmail])

  return {
    user,
    isSuperAdmin,
    isCompanyLevelUser,
    isCenterLevelUser,
    userGravatarURL,
    userEmail,
    userFirstName,
    userLastName,
    userFullName,
    userRole,
    usersCentersFirstCenterId,
    usersCentersFirstCenterName,
  }
}
