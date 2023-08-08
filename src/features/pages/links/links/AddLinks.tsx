import React, { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormGroup, Label, Form, Button, Card, CardBody } from 'reactstrap'
import { CreateLinkRequest, UpdateLinkSettingsRequest } from 'src/features/services/api/linksApi/interface'
import { useAddLinkMutation, useUpdateLinkSettingsMutation } from 'src/features/services/api/linksApi/linksApi'

import { FormLinkProps } from '../types'
import WithSpinnerLinks from '../reusable/WithSpinnerLinks'
import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { setNoLinks } from '../linksSlice'
import { DEFAULT_LINK_BG, DEFAULT_LINK_TEXT_COLOR } from './constants'

function AddLinks(props: FormLinkProps) {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm()

  const dispatch = useAppDispatch()

  useEffect(() => {
    const resetFormOnCenterIdChange = () => {
      reset({
        title: '',
        link: '',
      })
    }

    resetFormOnCenterIdChange()
  }, [props.centerId, reset])

  const noLinks = useAppSelector((state) => state.link.noLinks)
  const [updateLinkSettings, { isLoading: isLoadingUpdateLinkSettings }] = useUpdateLinkSettingsMutation()

  const addDefaultLinkSettings = async () => {
    const defaultLinkSettingsBody: UpdateLinkSettingsRequest = {
      center_id: props.centerId,
      bg_color: DEFAULT_LINK_BG,
      text_color: DEFAULT_LINK_TEXT_COLOR,
    }

    await updateLinkSettings(defaultLinkSettingsBody).unwrap()
    dispatch(setNoLinks(false))
  }

  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')

  const [createLink, { isLoading: isLoadingCreateLink }] = useAddLinkMutation()

  const linkData: CreateLinkRequest = {
    center_id: props.centerId,
    title: title,
    link: link,
  }

  const addLinkFormSubmit = async () => {
    await createLink(linkData)
      .unwrap()
      .then(() => {
        reset({
          title: '',
          link: '',
        })
      })

    if (noLinks === true) {
      await addDefaultLinkSettings()
    }
  }

  const isLoading = isLoadingCreateLink || isLoadingUpdateLinkSettings

  return (
    <Fragment>
      <WithSpinnerLinks isLoading={isLoading}>
        <Card>
          <CardBody>
            <Form onSubmit={handleSubmit(addLinkFormSubmit)} noValidate className="mb-0 pb-0">
              <FormGroup>
                <Label>Title</Label>
                <input
                  className="form-control"
                  disabled={isLoading}
                  type="text"
                  placeholder=""
                  {...register('title', {
                    required: { value: true, message: 'Title is required' },
                    onChange: (e) => {
                      trigger('title')
                      setTitle(e.target.value)
                    },
                    onBlur: () => {
                      trigger('title')
                    },
                  })}
                />
                <span className="small text-danger">{errors?.title?.message}</span>
              </FormGroup>

              <FormGroup>
                <Label>Link</Label>
                <input
                  className="form-control"
                  disabled={isLoading}
                  type="text"
                  placeholder=""
                  {...register('link', {
                    required: { value: true, message: 'Link is required' },
                    pattern: {
                      value:
                        /((?:(?:http?|ftp)[s]*:\/\/)+[a-z0-9-%\\/\\&=?\\.]+\.[a-z]{2,4}\/?([^\s<>\\#%"\\,\\{\\}\\|\\\\^\\[\]`]+)?)/gi,
                      message: 'Invalid link. Link should start with http:// or https://',
                    },
                    onChange: (e) => {
                      trigger('link')
                      setLink(e.target.value)
                    },
                    onBlur: () => {
                      trigger('link')
                    },
                  })}
                />
                <span className="small text-danger">{errors?.link?.message}</span>
              </FormGroup>

              <Button type="submit" disabled={isLoading} color="primary" className="mt-3">
                Add Link
              </Button>
            </Form>
          </CardBody>
        </Card>
      </WithSpinnerLinks>
    </Fragment>
  )
}

export default AddLinks
