import React, { Fragment, useEffect, useState } from 'react'
import SidebarMenuItems from './SidebarMenuItems'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { ThemeConfigurations } from '../../../config/ThemeConfig'

const SidebarMenu = ({
  setMainMenu,
  props,
  sidebartoogle,
  setNavActive,
}: {
  setMainMenu: any
  props: any
  sidebartoogle: any
  setNavActive: any
  width: number
}) => {
  const [rightArrow, setRightArrow] = useState(false)
  const [leftArrow, setLeftArrow] = useState(false)
  const sidebar_types = localStorage.getItem('sidebar_types')
  const wrapper = sidebar_types || ThemeConfigurations.data.settings.sidebar.type
  const [margin, setMargin] = useState(0)
  useEffect(() => {
    setLeftArrow(true)
  }, [])
  const scrollToRight = () => {
    if (margin <= -2598 || margin <= -2034) {
      if (props.width === 492) {
        setMargin(-3570)
      } else {
        setMargin(-3464)
      }
      setRightArrow(true)
      setLeftArrow(false)
    } else {
      setLeftArrow(false)
      setMargin((margin) => (margin += -props.width))
    }
  }

  const scrollToLeft = () => {
    if (margin >= -props.width) {
      setMargin(0)
      setLeftArrow(true)
      setRightArrow(false)
    } else {
      setMargin((margin) => (margin += props.width))
      setRightArrow(false)
    }
  }

  return (
    <Fragment>
      <nav>
        <div className="main-navbar">
          <div className={`left-arrow ${leftArrow ? 'd-none' : ''}`} id="left-arrow" onClick={scrollToLeft}>
            <ArrowLeft />
          </div>
          <div
            id="sidebar-menu"
            style={
              wrapper.split(' ').includes('horizontal-wrapper') ? { marginLeft: margin + 'px' } : { margin: '0px' }
            }
          >
            <SidebarMenuItems
              setMainMenu={setMainMenu}
              props={props}
              sidebartoogle={sidebartoogle}
              setNavActive={setNavActive}
            />
          </div>
          <div className={`right-arrow ${rightArrow ? 'd-none' : ''}`} onClick={scrollToRight}>
            <ArrowRight />
          </div>
        </div>
      </nav>
    </Fragment>
  )
}

export default SidebarMenu
