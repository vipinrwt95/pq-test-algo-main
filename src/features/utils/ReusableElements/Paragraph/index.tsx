import React, { Fragment } from 'react'

const P = (props: { [key: string]: any }) => {
  return (
    <Fragment>
      {props.innerHtml ? <p dangerouslySetInnerHTML={{ __html: props.innerHtml }} /> : ''}
      <p {...props.attrPara}>{props.children}</p>
    </Fragment>
  )
}

export default P
