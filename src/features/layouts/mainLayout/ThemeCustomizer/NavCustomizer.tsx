import React, { Fragment } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'

type Props = {
  selected?: string
  callbackNav: (tabId: string, open: boolean) => void
}

function NavCustomizer(props: Props) {
  return (
    <Fragment>
      <Nav className="flex-column nac-pills" id="c-pills-tab" role="tablist" aria-orientation="vertical">
        <NavItem>
          <NavLink
            className={props.selected === 'check-layout' ? 'active' : ''}
            onClick={() => props.callbackNav('check-layout', true)}
          >
            <div className="settings">
              <i className="icofont icofont-laptop-alt"></i>
            </div>
            <span>Check Layout</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={props.selected === 'sidebar-type' ? 'active' : ''}
            onClick={() => props.callbackNav('sidebar-type', true)}
          >
            <div className="settings">
              <i className="icofont icofont-ui-settings"></i>
            </div>
            <span>Sidebar Type</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={props.selected === 'color-picker' ? 'active' : ''}
            onClick={() => props.callbackNav('color-picker', true)}
          >
            <div className="settings color-settings">
              <i className="icofont icofont-color-bucket"></i>
            </div>
            <span>Color Picker</span>
          </NavLink>
        </NavItem>
      </Nav>
    </Fragment>
  )
}

export default NavCustomizer
