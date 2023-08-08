import React, { Fragment } from 'react'

const Ribbon = (props: { [key: string]: any }) => {
  return (
    <Fragment>
      <div {...props.attrRibbons}>{props.children}</div>
    </Fragment>
  )
}

export default Ribbon
