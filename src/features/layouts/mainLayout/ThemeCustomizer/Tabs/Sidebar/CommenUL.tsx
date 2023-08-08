import React, { Fragment } from 'react'
import { UL, LI } from '../../../../../utils/ReusableElements'

const CommenUL = () => {
  return (
    <Fragment>
      <UL attrUL={{ className: 'flex-row' }}>
        <LI></LI>
        <LI></LI>
        <LI></LI>
      </UL>
    </Fragment>
  )
}
export default CommenUL
