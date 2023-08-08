import { Fragment, useState } from 'react'
import { MoreHorizontal } from 'react-feather'
import Leftbar from './LeftBar'
import Rightbar from './RightBar'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { setSideBarResponsive } from '../ThemeCustomizer/ThemeCustomizerSlice'
import { RootState } from '../../../../app/store'
import CompanyAndCenterSelection from './CompanyAndCenterSelection'
import classNames from 'classnames'
import styles from './index.module.css'

const Header = () => {
  const dispatch = useAppDispatch()
  const toggleIcon = useAppSelector((state: RootState) => state.themeCustomizer.toggleIcon)
  const [sidebartoogle, setSidebartoogle] = useState(true)
  const [toggle, setToggle] = useState(true)

  const toggleResp = (value: boolean) => {
    setToggle(value)
    dispatch(setSideBarResponsive(toggle))
  }

  return (
    <Fragment>
      <div
        className={classNames('page-main-header', styles.container, { close_icon: toggleIcon })}
        style={{ zIndex: '1020' }}
      >
        <div className="main-header-right m-0">
          <Leftbar sidebartoogle={sidebartoogle} setSidebartoogle={setSidebartoogle} />
          <div className="d-md-block" style={{ paddingLeft: '27px' }}>
            <CompanyAndCenterSelection />
          </div>
          <Rightbar />
          <div className="d-lg-none mobile-toggle pull-right w-auto" onClick={() => toggleResp(!toggle)}>
            <MoreHorizontal />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Header
