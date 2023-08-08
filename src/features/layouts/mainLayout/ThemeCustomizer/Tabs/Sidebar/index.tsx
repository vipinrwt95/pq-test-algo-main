import React, { Fragment } from 'react'
import AnimationFade from './AnimationFade/AnimationFade'
import LayoutType from './LayoutType/LayoutType'
import SidebarType from './SidebarType/SidebarType'

const SidebarCustomizer = () => {
  return (
    <Fragment>
      <LayoutType />
      <SidebarType />
      <AnimationFade />
    </Fragment>
  )
}

export default SidebarCustomizer
