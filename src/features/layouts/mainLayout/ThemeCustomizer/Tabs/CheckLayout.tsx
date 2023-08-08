import React, { Fragment, useEffect } from 'react'
import { useAppDispatch } from '../../../../../app/hooks'
import { ThemeConfigurations } from '../../../../config/ThemeConfig'
import { UL, LI, H6, Image } from '../../../../utils/ReusableElements'
import { setSideBarSettings } from '../ThemeCustomizerSlice'

function CheckLayout() {
  const dispatch = useAppDispatch()

  const sidebarSettingLocalStorage = localStorage.getItem('sidebar_Settings')
  const sidebarSettings = sidebarSettingLocalStorage
    ? sidebarSettingLocalStorage
    : ThemeConfigurations.data.settings.sidebar_setting

  useEffect(() => {
    ThemeConfigurations.data.settings.sidebar_setting = sidebarSettings
  })

  /**
   * Function that adds the user selected layout to the sidebar settings property
   * @param selectedLayout The layout selected by the user
   */
  const handleSettings = (selectedLayout: string) => {
    dispatch(setSideBarSettings(selectedLayout))
  }

  return (
    <Fragment>
      <UL attrUL={{ className: 'sidebar-type layout-grid layout-types' }}>
        <LI attrLI={{ dataattr: 'defaul-layout' }}>
          <div className="layout-img" onClick={() => handleSettings('')}>
            <Image
              attrImage={{
                className: 'img-fluid',
                src: `${require('./../../../../../assets/images/landing/demo/1.jpg')}`,
                alt: '',
              }}
            />
            <H6>Defaul layout</H6>
          </div>
        </LI>
        <LI attrLI={{ dataattr: 'compact-layout' }}>
          <div className="layout-img" onClick={() => handleSettings('compact-sidebar')}>
            <Image
              attrImage={{
                className: 'img-fluid',
                src: `${require('./../../../../../assets/images/landing/demo/2.jpg')}`,
                alt: '',
              }}
            />
            <H6>Compact layout</H6>
          </div>
        </LI>
        <LI attrLI={{ dataattr: 'modern-layout' }}>
          <div className="layout-img" onClick={() => handleSettings('modern-sidebar')}>
            <Image
              attrImage={{
                className: 'img-fluid',
                src: `${require('./../../../../../assets/images/landing/demo/3.jpg')}`,
                alt: '',
              }}
            />
            <H6>Modern layout</H6>
          </div>
        </LI>
      </UL>
    </Fragment>
  )
}

export default CheckLayout
