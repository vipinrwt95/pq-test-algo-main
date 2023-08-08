import { ReactNode, useState } from 'react'
import { conditionalProp } from '../../functions/conditionalProp'
import ToolTip from '../Tooltip'
import { TooltipProps } from 'reactstrap'

interface BasicTooltipProps {
  text: string
  children: ReactNode
  id: string
  offset?: [number, number]
  wrapperClass?: string
  childWrapperClass?: string
  placement?: TooltipProps['placement']
}

const BasicTooltip = (props: BasicTooltipProps) => {
  const { children, text, id, offset, wrapperClass, childWrapperClass, placement = 'top' } = props

  const [basicTooltip, setBasicTooltip] = useState(false)
  const toggle = () => setBasicTooltip(!basicTooltip)

  return (
    <span className={wrapperClass}>
      <span id={id} className={childWrapperClass} onClick={toggle}>
        {children}
      </span>
      <ToolTip
        attrToolTip={{
          placement,
          isOpen: basicTooltip,
          target: id,
          toggle: toggle,
          ...conditionalProp(!!offset, 'offset', offset),
        }}
      >
        {text}
      </ToolTip>
    </span>
  )
}

export default BasicTooltip
