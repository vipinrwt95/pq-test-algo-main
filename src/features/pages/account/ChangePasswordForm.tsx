import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Col, Form, FormGroup, Label, Row } from 'reactstrap'
import { useIsFormDirty } from 'src/features/hooks/useIsFormDirty'
import ButtonWithSpinner from 'src/features/utils/ReusableElements/ButtonWithSpinner/ButtonWithSpinner'
import { useReRenderThreshold } from 'src/features/hooks/useReRenderThreshold'
import { Save } from 'react-feather'
import { ButtonIconWrapper } from 'src/features/utils/ReusableElements'
import { validatePassword } from 'src/features/utils/functions/validatePassword'
import usePasswordVisibilityToggle from 'src/features/hooks/usePasswordVisibilityToggle'
import classNames from 'classnames'

export type ChangePasswordFormData = {
  oldPassword: string
  password: string
  confirmPassword: string
}

interface ChangePasswordFormProps {
  onSubmit: SubmitHandler<ChangePasswordFormData>
  isSaving: boolean
}

export const ChangePasswordForm = (props: ChangePasswordFormProps) => {
  useReRenderThreshold()

  const { onSubmit, isSaving } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm<ChangePasswordFormData>()

  const isFormDirty = useIsFormDirty<ChangePasswordFormData>({
    defaultValues: {},
    latestValues: {
      oldPassword: watch('oldPassword'),
      password: watch('password'),
      confirmPassword: watch('confirmPassword'),
    },
  })

  const handlePasswordStrengthCheck = useCallback((password: string) => {
    const { isValid, message } = validatePassword(password)

    return isValid ? true : message
  }, [])

  const validateConfirmPassword = useCallback(
    (confirmPassword: string) => {
      const newPass = getValues('password')

      return newPass === confirmPassword ? true : 'Confirm password must match the new password'
    },
    [getValues]
  )

  const [oldPasswordType, oldPasswordEyeElement, oldPasswordParentStyle, oldPasswordInputStyle] =
    usePasswordVisibilityToggle()
  const [passwordType, passwordEyeElement, passwordParentStyle, passwordInputStyle] = usePasswordVisibilityToggle()
  const [confirmPasswordType, confirmPasswordEyeElement, confirmPasswordParentStyle, confirmPasswordInputStyle] =
    usePasswordVisibilityToggle()

  return (
    <Form className="date-picker" onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md="6">
          <FormGroup>
            <Label htmlFor="changePasswordFormOldPassword" className="form-label">
              Old Password *
            </Label>
            <div className={oldPasswordParentStyle}>
              <input
                id="changePasswordFormOldPassword"
                type={oldPasswordType}
                {...register('oldPassword', { required: true })}
                className={classNames('form-control', oldPasswordInputStyle)}
              />
              {oldPasswordEyeElement}
            </div>
            {errors.oldPassword && <div className="text-danger mt-1 ms-1">This field is required</div>}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <FormGroup>
            <Label htmlFor="changePasswordFormPassword" className="form-label">
              Password *
            </Label>
            <div className={passwordParentStyle}>
              <input
                id="changePasswordFormPassword"
                type={passwordType}
                {...register('password', { required: true, validate: handlePasswordStrengthCheck })}
                className={classNames('form-control', passwordInputStyle)}
              />
              {passwordEyeElement}
            </div>
            {errors.password?.type === 'required' && (
              <div className="text-danger mt-1 ms-1">This field is required</div>
            )}
            {errors.password && <div className="text-danger mt-1 ms-1">{errors.password.message}</div>}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <FormGroup>
            <Label htmlFor="changePasswordFormConfirmPassword" className="form-label">
              Confirm Password *
            </Label>
            <div className={confirmPasswordParentStyle}>
              <input
                id="changePasswordFormConfirmPassword"
                type={confirmPasswordType}
                {...register('confirmPassword', { required: true, validate: validateConfirmPassword })}
                className={classNames('form-control', confirmPasswordInputStyle)}
              />
              {confirmPasswordEyeElement}
            </div>
            {errors.confirmPassword?.type === 'required' && (
              <div className="text-danger mt-1 ms-1">This field is required</div>
            )}
            {errors.confirmPassword && <div className="text-danger mt-1 ms-1">{errors.confirmPassword.message}</div>}
          </FormGroup>
        </Col>
      </Row>

      <ButtonWithSpinner
        color="primary"
        disabled={!isFormDirty}
        type="submit"
        isLoading={isSaving}
        className="d-flex align-items-center px-3 mt-3"
      >
        <>
          <ButtonIconWrapper classes="me-2">
            <Save size={18} />
          </ButtonIconWrapper>
          <span>Save Password</span>
        </>
      </ButtonWithSpinner>
    </Form>
  )
}
