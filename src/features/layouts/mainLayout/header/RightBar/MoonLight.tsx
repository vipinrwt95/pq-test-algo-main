import React, { Fragment, useState } from 'react'
import { useAppDispatch } from '../../../../../app/hooks'
import { LI } from '../../../../utils/ReusableElements'
import { setMixBackgroundLayout } from '../../ThemeCustomizer/ThemeCustomizerSlice'

const MoonLight = () => {
  const dispatch = useAppDispatch()
  const [moonlight, setMoonlight] = useState(false)

  const MoonlightToggle = (light: boolean) => {
    if (light) {
      dispatch(setMixBackgroundLayout('light-only'))
      document.body.className = 'light-only'
      setMoonlight(!light)
    } else {
      dispatch(setMixBackgroundLayout('dark-only'))
      document.body.className = 'dark-only'
      setMoonlight(!light)
    }
  }
  return (
    <Fragment>
      <LI>
        <div className="mode" onClick={() => MoonlightToggle(moonlight)}>
          {moonlight ? <i className="fa fa-lightbulb-o"></i> : <i className="fa fa-moon-o"></i>}
        </div>
      </LI>
    </Fragment>
  )
}

export default MoonLight
