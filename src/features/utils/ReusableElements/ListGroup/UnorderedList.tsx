import React from 'react'
import { ListGroup } from 'reactstrap'
import ListItems from './ListItem'

const UL = (props: { [key: string]: any }) => {
  return (
    <ListGroup {...props.attrUL}>
      {props.listItem
        ? props.listItem.map((item: { [key: string]: any }, i: number) => (
            <ListItems val={item} attrLI={props.attrLI} key={i} />
          ))
        : props.children}
    </ListGroup>
  )
}

export default UL
