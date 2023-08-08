import React, { Fragment } from 'react'
import { H5, P } from '..'

const HeaderCardComponent2 = ({ title, subtitle }: { title: string; subtitle: string; settingIcon?: boolean }) => {
  return (
    <Fragment>
      <div className="header-top d-sm-flex align-items-center">
        <H5>{title}</H5>
        <div className="center-content">
          <P className="d-flex align-items-center">
            <i className="toprightarrow-primary fa fa-arrow-up me-2"></i>
            {subtitle}
          </P>
        </div>
      </div>
    </Fragment>
  )
}

export default HeaderCardComponent2
