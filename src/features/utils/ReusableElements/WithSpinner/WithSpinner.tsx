import classNames from 'classnames'
import { ReactNode, useEffect, useState } from 'react'
import { Spinner } from 'reactstrap'
import _isNil from 'lodash/isNil'
import styles from './WithSpinner.module.css'

interface WithSpinnerProps {
  children: ReactNode
  isLoading: boolean

  // set vertically top position in pixels if you need to override center position vertically
  top?: string

  // set to true if you want to unmount children when loading
  unmountWhenLoading?: boolean

  // set a delay in ms for showing the loading spinner after the isLoading flag becomes true
  withDelay?: number

  // set to true if you want to show the spinner with a non-transparent background
  nonTransparent?: boolean

  size?: 'sm'

  hideSpinner?: boolean

  // wrapper min height when loading
  loadingMinHeight?: string
}

const WithSpinner = (props: WithSpinnerProps) => {
  const {
    children,
    isLoading,
    top,
    unmountWhenLoading,
    withDelay,
    nonTransparent,
    size,
    hideSpinner,
    loadingMinHeight = '50px',
  } = props
  const [displayLoading, setDisplayLoading] = useState(isLoading)

  // sync isLoading with setDisplayLoading if withDelay is not set
  useEffect(() => {
    if (withDelay) return
    setDisplayLoading(isLoading)
  }, [isLoading, withDelay])

  // handle with delay
  useEffect(() => {
    if (!withDelay) return

    let timeout: NodeJS.Timeout

    if (isLoading) {
      setDisplayLoading(true)
    } else {
      timeout = setTimeout(() => {
        setDisplayLoading(false)
      }, withDelay)
    }
    return () => clearTimeout(timeout)
  }, [isLoading, withDelay])

  const shouldShowCircularSpinner = displayLoading && !hideSpinner

  return (
    <div
      className="position-relative"
      style={{ height: '100%', minHeight: shouldShowCircularSpinner ? loadingMinHeight : 0 }}
    >
      {shouldShowCircularSpinner && (
        <div
          style={{ top: _isNil(top) ? undefined : top, zIndex: 1 }}
          className={classNames(
            'position-absolute',
            'start-50',
            'translate-middle',
            'd-flex',
            'align-items-center',
            'justify-content-center',
            { 'top-50': _isNil(top) }
          )}
        >
          <Spinner className="text-primary" size={size} />
        </div>
      )}

      {unmountWhenLoading && isLoading ? null : (
        <div
          style={{ opacity: displayLoading ? (nonTransparent ? 0 : 0.5) : 1 }}
          className={classNames({
            'pe-none': displayLoading,
            [styles.userSelectNone]: displayLoading,
          })}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default WithSpinner
