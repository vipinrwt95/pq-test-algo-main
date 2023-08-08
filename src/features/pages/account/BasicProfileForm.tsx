import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Col, Form, FormGroup, Label, Row, Spinner } from 'reactstrap'
import { useIsFormDirty } from 'src/features/hooks/useIsFormDirty'
import ButtonWithSpinner from 'src/features/utils/ReusableElements/ButtonWithSpinner/ButtonWithSpinner'
import { useReRenderThreshold } from 'src/features/hooks/useReRenderThreshold'
import { Save } from 'react-feather'
import { ButtonIconWrapper } from 'src/features/utils/ReusableElements'
import classNames from 'classnames'

export type BasicProfileFormData = {
  email: string
  username: string
  firstName: string
  lastName: string
  phone: string
}

interface BasicProfileFormProps {
  defaultEmail?: string
  defaultUsername?: string
  defaultFirstName?: string
  defaultLastName?: string
  defaultPhone?: string

  onSubmit: SubmitHandler<BasicProfileFormData>
  isLoading: boolean
  isSaving: boolean
}

export const BasicProfileForm = (props: BasicProfileFormProps) => {
  useReRenderThreshold()

  const {
    defaultEmail,
    defaultUsername,
    defaultFirstName,
    defaultLastName,
    defaultPhone,

    onSubmit,
    isLoading,
    isSaving,
  } = props

  const defaultValues: Partial<BasicProfileFormData> = {
    email: defaultEmail,
    username: defaultUsername,
    firstName: defaultFirstName,
    lastName: defaultLastName,
    phone: defaultPhone,
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BasicProfileFormData>({ defaultValues })

  const isFormDirty = useIsFormDirty<BasicProfileFormData>({
    defaultValues,
    latestValues: {
      email: watch('email'),
      username: watch('username'),
      firstName: watch('firstName'),
      lastName: watch('lastName'),
      phone: watch('phone'),
    },
  })

  useEffect(() => {
    if (defaultEmail === undefined) return
    setValue('email', defaultEmail)
  }, [defaultEmail, setValue])

  useEffect(() => {
    if (defaultUsername === undefined) return
    setValue('username', defaultUsername)
  }, [defaultUsername, setValue])

  useEffect(() => {
    if (defaultFirstName === undefined) return
    setValue('firstName', defaultFirstName)
  }, [defaultFirstName, setValue])

  useEffect(() => {
    if (defaultLastName === undefined) return
    setValue('lastName', defaultLastName)
  }, [defaultLastName, setValue])

  useEffect(() => {
    if (defaultPhone === undefined) return
    setValue('phone', defaultPhone)
  }, [defaultPhone, setValue])

  return (
    <div>
      {isLoading && (
        <div
          style={{ minHeight: '65vh', zIndex: 1 }}
          className="position-absolute top-50 start-50 translate-middle d-flex align-items-center"
        >
          <Spinner className="txt-info" />
        </div>
      )}

      <Form
        style={{ opacity: isSaving ? 0.5 : 1 }}
        className={classNames('date-picker', { 'pe-none': isSaving })}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Row>
          <Col md="6">
            <FormGroup>
              <Label htmlFor="basicProfileFormEmail" className="form-label">
                Email
              </Label>
              <input
                id="basicProfileFormEmail"
                defaultValue={defaultEmail}
                {...register('email')}
                className="form-control"
              />
              {errors.email && <div className="text-danger mt-1 ms-1">This field is required</div>}
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label htmlFor="basicProfileFormUsername" className="form-label">
                Username
              </Label>
              <input
                id="basicProfileFormUsername"
                defaultValue={defaultUsername}
                {...register('username')}
                className="form-control"
              />
              {errors.username && <div className="text-danger mt-1 ms-1">This field is required</div>}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <FormGroup>
              <Label htmlFor="basicProfileFormFirstName" className="form-label">
                First Name *
              </Label>
              <input
                id="basicProfileFormFirstName"
                defaultValue={defaultFirstName}
                {...register('firstName', { required: true })}
                className="form-control"
              />
              {errors.firstName && <div className="text-danger mt-1 ms-1">This field is required</div>}
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label htmlFor="basicProfileFormLastName" className="form-label">
                Last Name *
              </Label>
              <input
                id="basicProfileFormLastName"
                defaultValue={defaultLastName}
                {...register('lastName', { required: true })}
                className="form-control"
              />
              {errors.lastName && <div className="text-danger mt-1 ms-1">This field is required</div>}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <FormGroup>
              <Label htmlFor="basicProfileFormPhone" className="form-label">
                Phone
              </Label>
              <input
                id="basicProfileFormPhone"
                defaultValue={defaultPhone}
                {...register('phone')}
                className="form-control"
              />
              {errors.phone && <div className="text-danger mt-1 ms-1">This field is required</div>}
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
            <span>Save Changes</span>
          </>
        </ButtonWithSpinner>
      </Form>
    </div>
  )
}
