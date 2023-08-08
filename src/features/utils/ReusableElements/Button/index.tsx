import React from 'react'
import { Button } from 'reactstrap'

const Btn = (props: { [key: string]: any }) => {
  return <Button {...props.attrBtn}>{props.children}</Button>
}

export default Btn
