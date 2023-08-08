import React from 'react'

const H5 = (props: { [key: string]: any }) => {
  return <h5 {...props.attrH5}>{props.children}</h5>
}

export default H5
