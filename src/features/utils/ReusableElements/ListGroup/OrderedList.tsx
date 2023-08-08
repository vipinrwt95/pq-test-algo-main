import React from 'react'

const OL = (props: { [key: string]: any }) => {
  return <ol {...props.attrOL}>{props.children}</ol>
}

export default OL
