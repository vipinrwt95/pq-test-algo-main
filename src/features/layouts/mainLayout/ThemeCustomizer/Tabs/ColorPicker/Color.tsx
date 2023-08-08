import React, { Fragment, useState, useEffect } from 'react'
import { Input } from 'reactstrap'
import { useAppDispatch } from '../../../../../../app/hooks'
import { ThemeConfigurations } from '../../../../../config/ThemeConfig'
import { UnlimitedColor, Apply } from '../../../../../utils/constants'
import { H6, UL, Btn } from '../../../../../utils/ReusableElements'
import { setPrimaryColor, setSecondaryColor } from '../../ThemeCustomizerSlice'

const ColorsComponent = () => {
  const dispatch = useAppDispatch()
  const default_color = localStorage.getItem('default_color') || ThemeConfigurations.data.color.primary_color
  const secondary_color = localStorage.getItem('secondary_color') || ThemeConfigurations.data.color.secondary_color

  const [colorBackground1, setColorBackground1] = useState(default_color)
  const [colorBackground2, setColorBackground2] = useState(secondary_color)

  useEffect(() => {
    document.documentElement.style.setProperty('--theme-default', colorBackground1)
    document.documentElement.style.setProperty('--theme-secondary', colorBackground2)
    ThemeConfigurations.data.color.primary_color = default_color
    ThemeConfigurations.data.color.secondary_color = secondary_color
  }, [setColorBackground1, setColorBackground2, colorBackground1, colorBackground2, default_color, secondary_color])

  const handleUnlimatedColor1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setColorBackground1(value)
    ThemeConfigurations.data.color.primary_color = value
  }
  const handleUnlimatedColor2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setColorBackground2(value)
    ThemeConfigurations.data.color.secondary_color = value
  }
  const OnUnlimatedColorClick = () => {
    window.location.reload()
    dispatch(setPrimaryColor(colorBackground1))
    dispatch(setSecondaryColor(colorBackground2))
    document.documentElement.style.setProperty('--theme-default', colorBackground1)
    document.documentElement.style.setProperty('--theme-secondary', colorBackground2)
  }

  return (
    <Fragment>
      <H6>{UnlimitedColor}</H6>
      <UL attrUL={{ className: 'simple-list flex-row layout-grid unlimited-color-layout' }}>
        <Input
          type="color"
          name="Color-Background1"
          value={colorBackground1}
          onChange={(e) => handleUnlimatedColor1Change(e)}
        />
        <Input
          type="color"
          name="Color-Background2"
          value={colorBackground2}
          onChange={(e) => handleUnlimatedColor2Change(e)}
        />
        <Btn
          attrBtn={{
            color: 'primary',
            className: 'color-apply-btn color-apply-btn',
            onClick: OnUnlimatedColorClick,
          }}
        >
          {' '}
          {Apply}
        </Btn>
      </UL>
    </Fragment>
  )
}

export default ColorsComponent
