import React, { Fragment, useEffect, useState } from 'react'
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from 'reactstrap'
import { UpdateLinkSettingsRequest } from 'src/features/services/api/linksApi/interface'
import { useLazyGetLinkSettingsQuery, useUpdateLinkSettingsMutation } from 'src/features/services/api/linksApi/linksApi'
import { FormLinkProps } from '../types'
import WithSpinnerLinks from '../reusable/WithSpinnerLinks'
import { useAppSelector } from 'src/app/hooks'
import classNames from 'classnames'
import styles from './LinkSettings.module.css'
import { DEFAULT_LINK_BG, DEFAULT_LINK_TEXT_COLOR } from './constants'

function LinkSettings(props: FormLinkProps) {
  const noLinks = useAppSelector((state) => state.link.noLinks)

  const [getLinkSettings, { data: results, isLoading: isSettingsLoading, isFetching }] = useLazyGetLinkSettingsQuery()

  const bgColor = results?.bg_color || DEFAULT_LINK_BG
  const textColor = results?.text_color || DEFAULT_LINK_TEXT_COLOR

  const [linkBgColor, setLinkBgColor] = useState(bgColor)
  const [linkTextColor, setLinkTextColor] = useState(textColor)

  useEffect(() => {
    if (noLinks === false) getLinkSettings({ center_id: props.centerId }, true).unwrap()
    setLinkBgColor(bgColor)
    setLinkTextColor(textColor)
  }, [props.centerId, getLinkSettings, bgColor, textColor, noLinks])

  const [updateLinkSettingsMutation, { isLoading }] = useUpdateLinkSettingsMutation()

  const [buttonDisabled, setButtonDisabled] = useState(false)

  const linkSettingsUpdateData: UpdateLinkSettingsRequest = {
    center_id: props.centerId,
    bg_color: linkBgColor,
    text_color: linkTextColor,
  }

  const updateLinkSettingsSubmit = async () => {
    await updateLinkSettingsMutation(linkSettingsUpdateData)
      .unwrap()
      .then(() => {
        setButtonDisabled(false)
      })
  }

  if (noLinks) return null

  return (
    <Fragment>
      <WithSpinnerLinks isLoading={isSettingsLoading || isFetching}>
        <Card>
          <CardBody>
            <h5 className="mb-3">Settings</h5>
            <Form>
              <FormGroup className={classNames('flexBox', styles.formGroup)}>
                <Label className="m-0">Link Background Color</Label>
                <Input
                  style={{ height: '24px', width: '24px' }}
                  id="linkBgColor"
                  type="color"
                  className="color-picker"
                  name="linkBgColor"
                  value={bgColor !== undefined ? linkBgColor : DEFAULT_LINK_BG}
                  onChange={(e) => {
                    setButtonDisabled(true)
                    setLinkBgColor(e.target.value)
                  }}
                />
                {bgColor === undefined && (
                  <div className="text-danger small">
                    <span>No settings For Link Background. Please Edit to add.</span>
                  </div>
                )}
              </FormGroup>

              <FormGroup className={classNames('flexBox', styles.formGroup)}>
                <Label className="m-0">Link Text Color</Label>
                <Input
                  style={{ height: '24px', width: '24px' }}
                  id="linkTextColor"
                  type="color"
                  className="color-picker"
                  name="linkTextColor"
                  value={textColor !== undefined ? linkTextColor : '#FFFFFF'}
                  onChange={(e) => {
                    setButtonDisabled(true)
                    setLinkTextColor(e.target.value)
                  }}
                />

                {textColor === undefined && (
                  <div className="text-danger small">
                    <span>No settings For Link Text. Please Edit to add.</span>
                  </div>
                )}
              </FormGroup>

              <Button
                className="mt-3"
                disabled={isLoading || !buttonDisabled}
                color="primary"
                type="submit"
                onClick={() => {
                  updateLinkSettingsSubmit()
                }}
              >
                Save Changes
              </Button>
            </Form>
          </CardBody>
        </Card>
      </WithSpinnerLinks>
    </Fragment>
  )
}

export default LinkSettings
