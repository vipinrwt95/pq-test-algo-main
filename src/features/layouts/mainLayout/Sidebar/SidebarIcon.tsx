import React from 'react'
import Image from '../../../utils/ReusableElements/Media'
import logo from '../../assets/images/logo/logo.png'

const SidebarIcon = () => {
  return (
    <div className="logo-wrapper">
      <a href="#javascript">
        <Image attrImage={{ className: 'img-fluid', src: `${logo}`, alt: '' }} />
      </a>
    </div>
  )
}
export default SidebarIcon
