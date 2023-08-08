import React, { Fragment, useEffect } from 'react'
import { Input } from 'reactstrap'
import { useAppDispatch } from '../../../../../../../app/hooks'
import { ThemeConfigurations } from '../../../../../../config/ThemeConfig'
import {
  RouterAnimation,
  ZoomFade,
  SlideFade,
  FadeBottom,
  None,
  Fade,
  ZoomOut,
} from '../../../../../../utils/constants'
import { H6 } from '../../../../../../utils/ReusableElements'
import { setAnimation } from './animationThemeSlice'

function AnimationFade() {
  const animationFromLocalStorage = localStorage.getItem('animation')
  const layout_animation = animationFromLocalStorage
    ? animationFromLocalStorage
    : ThemeConfigurations.data.router_animation

  const dispatch = useAppDispatch()

  useEffect(() => {
    ThemeConfigurations.data.router_animation = layout_animation
  })

  const selectAnimation = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAnimation(e.target.value))
  }

  return (
    <Fragment>
      <H6>
        {RouterAnimation} {layout_animation}
      </H6>
      <Input type="select" defaultValue={layout_animation} name="selectMulti" onChange={(e) => selectAnimation(e)}>
        <option value="zoomfade">{ZoomFade}</option>
        <option value="slidefade">{SlideFade}</option>
        <option value="fadebottom">{FadeBottom}</option>
        <option value="fade">{Fade}</option>
        <option value="zoomout">{ZoomOut}</option>
        <option value="none">{None}</option>
      </Input>
    </Fragment>
  )
}

export default AnimationFade
