import React from 'react'
import { Progress } from 'reactstrap'

const Progressbar = (props: { [key: string]: any }) => <Progress {...props.attrProgress}>{props.children}</Progress>

export default Progressbar
