import { useCallback, useMemo } from 'react'
import { useChangeAccountPasswordMutation } from 'src/features/services/api/accountApi/accountApi'
import AccountTab from './AccountTabs'
import { ChangePasswordForm, ChangePasswordFormData } from './ChangePasswordForm'

const AccountChangePassword = () => {
  const [changePassword, { isLoading: isLoadingChangePassword }] = useChangeAccountPasswordMutation()

  const handleSubmitChangePasswordForm = useCallback(
    (formData: ChangePasswordFormData) => {
      const { oldPassword, password, confirmPassword } = formData
      changePassword({
        old_password: oldPassword,
        password,
        confirm_password: confirmPassword,
      })
    },
    [changePassword]
  )

  const changePasswordForm = useMemo(
    () => <ChangePasswordForm isSaving={isLoadingChangePassword} onSubmit={handleSubmitChangePasswordForm} />,
    [handleSubmitChangePasswordForm, isLoadingChangePassword]
  )

  return <AccountTab primaryColorTab="CHANGE_PASSWORD" changePasswordForm={changePasswordForm} />
}

export default AccountChangePassword
