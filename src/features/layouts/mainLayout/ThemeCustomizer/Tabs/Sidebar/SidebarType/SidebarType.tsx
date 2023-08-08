import React, { Fragment, useEffect } from 'react'
import { useAppDispatch } from '../../../../../../../app/hooks'
import { ThemeConfigurations } from '../../../../../../config/ThemeConfig'
import { H6, UL, LI } from '../../../../../../utils/ReusableElements'
import { setSideBarTypes } from '../../../ThemeCustomizerSlice'
import CommenUL from '../CommenUL'

const SidebarType = () => {
  const dispatch = useAppDispatch()
  const sidebarType = localStorage.getItem('sidebar_types') || ThemeConfigurations.data.settings.sidebar.type

  useEffect(() => {
    ThemeConfigurations.data.settings.sidebar.type = sidebarType
  }, [sidebarType])

  const handleSidebarType = (e: React.MouseEvent, type: string) => {
    e.preventDefault()
    dispatch(setSideBarTypes(type))
  }

  return (
    <Fragment>
      <H6>Sidebar Type</H6>
      <UL attrUL={{ className: 'sidebar-type layout-grid' }}>
        <LI
          attrLI={{
            className: 'normal-sidebar',
            onClick: (e: React.MouseEvent) => handleSidebarType(e, 'horizontal-wrapper'),
          }}
        >
          <div className="header bg-light">
            <CommenUL />
          </div>
          <div className="body">
            <UL attrUL={{ className: 'flex-row' }}>
              <LI attrLI={{ className: 'bg-dark sidebar' }}></LI>
              <LI attrLI={{ className: 'bg-light body' }}></LI>
            </UL>
          </div>
        </LI>
        <LI
          attrLI={{
            dataattr: 'compact-sidebar',
            onClick: (e: React.MouseEvent) => handleSidebarType(e, 'compact-wrapper'),
          }}
        >
          <div className="header bg-light">
            <CommenUL />
          </div>
          <div className="body">
            <UL attrUL={{ className: 'flex-row' }}>
              <LI attrLI={{ className: 'bg-dark sidebar compact' }}></LI>
              <LI attrLI={{ className: 'bg-light body' }}></LI>
            </UL>
          </div>
        </LI>
      </UL>
    </Fragment>
  )
}

export default SidebarType
