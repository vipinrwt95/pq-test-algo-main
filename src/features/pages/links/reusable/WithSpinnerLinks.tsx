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
}

const WithSpinnerLinks = (props: WithSpinnerProps) => {
  const { children, isLoading, top, unmountWhenLoading, withDelay, nonTransparent } = props
  const [displaySpinner, setDisplaySpinner] = useState(isLoading)

  // sync isLoading with setDisplaySpinner if withDelay is not set
  useEffect(() => {
    if (withDelay) return
    setDisplaySpinner(isLoading)
  }, [isLoading, withDelay])

  // handle with delay
  useEffect(() => {
    if (!withDelay) return

    let timeout: NodeJS.Timeout

    if (isLoading) {
      setDisplaySpinner(true)
    } else {
      timeout = setTimeout(() => {
        setDisplaySpinner(false)
      }, withDelay)
    }
    return () => clearTimeout(timeout)
  }, [isLoading, withDelay])

  return (
    <div className="position-relative" style={{ minHeight: displaySpinner ? '150px' : 0 }}>
      {displaySpinner && (
        <div
          style={{ top: _isNil(top) ? undefined : top, zIndex: 1 }}
          className={classNames(
            'position-absolute',
            'start-50',
            'translate-middle-x',
            'd-flex',
            'align-items-center',
            'justify-content-center',
            { 'top-50': _isNil(top) }
          )}
        >
          <Spinner className="txt-primary" />
        </div>
      )}

      {unmountWhenLoading && isLoading ? null : (
        <div
          style={{ opacity: displaySpinner ? (nonTransparent ? 0 : 0.5) : 1 }}
          className={classNames({
            'pe-none': displaySpinner,
            [styles.userSelectNone]: displaySpinner,
          })}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default WithSpinnerLinks
