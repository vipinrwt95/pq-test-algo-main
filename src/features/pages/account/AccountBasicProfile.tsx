import { useCallback, useMemo } from 'react'
import { useGetAccountQuery, useUpdateAccountMutation } from 'src/features/services/api/accountApi/accountApi'
import AccountTab from './AccountTabs'
import { BasicProfileForm, BasicProfileFormData } from './BasicProfileForm'

const AccountBasicProfile = () => {
  const { data: accountData, isFetching: isFetchingAccount } = useGetAccountQuery()

  const [updateAccount, { isLoading: isLoadingUpdateAccount }] = useUpdateAccountMutation()

  const handleSubmitBasicProfileForm = useCallback(
    (formData: BasicProfileFormData) => {
      const { email, username, firstName, lastName, phone } = formData

      updateAccount({
        email: email,
        username: username,
        first_name: firstName,
        last_name: lastName,
        cell_phone: phone,
      })
    },
    [updateAccount]
  )

  const defaultEmail = accountData?.email
  const defaultUsername = accountData?.username
  const defaultFirstName = accountData?.first_name
  const defaultLastName = accountData?.last_name
  const defaultPhone = accountData?.cell_phone

  const basicProfileForm = useMemo(
    () => (
      <BasicProfileForm
        defaultEmail={defaultEmail}
        defaultUsername={defaultUsername}
        defaultFirstName={defaultFirstName}
        defaultLastName={defaultLastName}
        defaultPhone={defaultPhone}
        isLoading={isFetchingAccount}
        isSaving={isLoadingUpdateAccount}
        onSubmit={handleSubmitBasicProfileForm}
      />
    ),
    [
      defaultEmail,
      defaultFirstName,
      defaultLastName,
      defaultPhone,
      defaultUsername,
      handleSubmitBasicProfileForm,
      isFetchingAccount,
      isLoadingUpdateAccount,
    ]
  )

  return <AccountTab primaryColorTab="BASIC_PROFILE" basicProfileForm={basicProfileForm} />
}

export default AccountBasicProfile
