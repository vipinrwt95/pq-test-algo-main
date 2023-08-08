import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../../app/hooks'
import { RootState } from '../../../../app/store'
import styles from './LeftBar.module.css'
import classNames from 'classnames'

type Props = {
  sidebartoogle: boolean
  setSidebartoogle: React.Dispatch<React.SetStateAction<boolean>>
}

const LeftBar = (_props: Props) => {
  const toggleIcon = useAppSelector((state: RootState) => state.themeCustomizer.toggleIcon)

  return (
    <Fragment>
      <div
        className={classNames('main-header-left flex-shrink-0', styles.wrapper, {
          [styles.wrapperCollapsedSidebar]: toggleIcon,
          [styles.wrapperExpandedSidebar]: !toggleIcon,
        })}
      >
        <Link
          className={classNames(styles.logoWrapper, {
            [styles.logoWrapperCollapsedSidebar]: toggleIcon,
            [styles.logoWrapperExpandedSidebar]: !toggleIcon,
          })}
          to={`${process.env.PUBLIC_URL}/dashboard`}
        >
          <img src="/images/pqLogo.svg" alt="" className={classNames('img-fluid d-inline', styles.logo)} />
        </Link>
      </div>
    </Fragment>
  )
}

export default LeftBar
