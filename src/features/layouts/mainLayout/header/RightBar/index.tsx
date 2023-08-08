import { Fragment } from 'react'

import { useAppSelector } from '../../../../../app/hooks'
import { RootState } from '../../../../../app/store'
import { UL } from '../../../../utils/ReusableElements'
import LogoutClass from './Logout'
import MoonLight from './MoonLight'
import Notifications from './Notifiations'

const Rightbar = () => {
  const sidebarResponsive = useAppSelector((state: RootState) => state.themeCustomizer.sidebarResponsive)

  return (
    <Fragment>
      <div className="nav-right col pull-right right-menu p-0">
        <UL
          attrUL={{
            className: `simple-list d-flex flex-row nav-menus ${sidebarResponsive ? 'open' : ''}`,
            style: { paddingRight: '26px' },
          }}
        >
          <MoonLight />

          <Notifications />

          <LogoutClass />
        </UL>
      </div>
    </Fragment>
  )
}

export default Rightbar
