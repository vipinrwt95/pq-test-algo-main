import React, { Fragment } from 'react'
import { CardHeader } from 'reactstrap'
import { H5 } from '..'

interface HeaderCardProps {
  title?: string
  span1?: string
  span2?: string
}

const HeaderCardComponent = (props: HeaderCardProps) => {
  return (
    <Fragment>
      <CardHeader className="pb-0">
        <H5>{props.title}</H5>
        {props.span1 ? <span>{props.span1}</span> : ''}
        {props.span2 ? <span>{props.span2}</span> : ''}
      </CardHeader>
    </Fragment>
  )
}

export default HeaderCardComponent
