import React from 'react'
import { Badge } from 'reactstrap'

const Badges = (props: { [key: string]: any }) => <Badge {...props.attrBadge}>{props.children}</Badge>

export default Badges
