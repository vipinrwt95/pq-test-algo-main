import React from 'react'

const H6 = (props: { [key: string]: any }) => {
  return <h6 {...props.attrH6}>{props.children}</h6>
}

export default H6
