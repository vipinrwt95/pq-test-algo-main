import React, { Fragment, useState, useCallback } from 'react'
import { TabContent, TabPane } from 'reactstrap'
import { Configuration } from '../../../utils/constants'
import { H5, P, Btn } from '../../../utils/ReusableElements'
import ConfigurationComponent from './ConfigurationComponent'
import CheckLayout from './Tabs/CheckLayout'
import ColorPicker from './Tabs/ColorPicker'
import SidebarCustomizer from './Tabs/Sidebar'

type Props = {
  selected?: string
  callbackNav: (tabId: string, open: boolean) => void
}

const TabCustomizer = (props: Props) => {
  const [modal, setModal] = useState(false)

  /**
   * Function to open or close site configuration.
   * We use the useCallback hook to prevent unnecessary renders of the
   * Button if the modal variable has not really changed.
   */
  const toggle = useCallback(() => {
    setModal(!modal)
  }, [modal])

  return (
    <Fragment>
      <TabContent activeTab={props.selected}>
        <div className="customizer-header">
          <i className="icofont-close icon-close" onClick={() => props.callbackNav('', false)}></i>
          <H5>Live customizer</H5>
          <P attrPara={{ className: 'mb-0' }}>Customize &amp; Preview Real Time</P>
          <Btn attrBtn={{ color: 'primary', className: 'plus-popup mt-2', onClick: () => toggle() }}>
            {Configuration}
          </Btn>
          <ConfigurationComponent modal={modal} toggle={toggle} />
        </div>
        <div className="customizer-body custom-scrollbar tab-content">
          <TabPane tabId="check-layout">
            <CheckLayout />
          </TabPane>
          <TabPane tabId="sidebar-type">
            <SidebarCustomizer />
          </TabPane>
          <TabPane tabId="color-picker">
            <ColorPicker />
          </TabPane>
        </div>
      </TabContent>
    </Fragment>
  )
}

export default TabCustomizer
