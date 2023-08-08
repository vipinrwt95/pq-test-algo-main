import React from 'react'

const H4 = (props: { [key: string]: any }) => {
  return <h4 {...props.attrH4}>{props.children}</h4>
}

export default H4
