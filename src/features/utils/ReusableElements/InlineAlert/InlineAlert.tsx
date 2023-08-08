import { useState } from 'react'
import { AlertCircle } from 'react-feather'
import { Alert, Button } from 'reactstrap'
import styles from './InlineAlert.module.css'
import parse from 'html-react-parser'
import classNames from 'classnames'

const InlineAlert = ({
  message,
  isDismissible,
  color = 'primary',
  className,
  noPaddingLeft,
  hideIcon,
}: {
  message: string
  isDismissible?: boolean
  color?: string
  className?: string
  noPaddingLeft?: boolean
  hideIcon?: boolean
}) => {
  const [Open, setOpen] = useState(true)
  const toggle = () => setOpen(!Open)

  return (
    <Alert
      className={classNames('alert-dismissible', className, { 'ps-0': noPaddingLeft })}
      color={color}
      isOpen={Open}
    >
      {!hideIcon && <AlertCircle className={styles.icon} />}

      <span className={classNames({ 'ms-4': !hideIcon })}>{parse(message || '')}</span>

      {isDismissible && (
        <Button className={classNames('btn-close', styles.closeButton)} color="default" id="Alert-1" onClick={toggle} />
      )}
    </Alert>
  )
}

export default InlineAlert
