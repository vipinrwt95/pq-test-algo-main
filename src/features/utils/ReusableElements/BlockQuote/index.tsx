import React from 'react'

const BlockQuotes = (props: { [key: string]: any }) => {
  return <blockquote {...props.attrBlockQuote}>{props.children}</blockquote>
}

export default BlockQuotes
