import React from 'react'

const Footer = (props: { [key: string]: any }) => {
  return <footer {...props.attrFooter}> {props.children}</footer>
}

export default Footer
