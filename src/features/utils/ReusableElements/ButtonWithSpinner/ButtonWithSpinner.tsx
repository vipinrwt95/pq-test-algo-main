import classNames from 'classnames'
import { Button, ButtonProps } from 'reactstrap'
import styles from './ButtonWithSpinner.module.css'

interface ButtonWithSpinnerProps extends ButtonProps {
  isLoading?: boolean

  // must pass JSX element, i.e. <span>
  children: JSX.Element
}

const ButtonWithSpinner = (props: ButtonWithSpinnerProps) => {
  const { isLoading, children, className: classes, ...restButtonProps } = props
  return (
    <Button
      className={classNames('position-relative', { [styles.buttonWithSpinner]: isLoading }, classes)}
      {...restButtonProps}
    >
      {isLoading && (
        <span
          className={classNames(
            'd-flex align-items-center position-absolute top-50 start-50 translate-middle',
            styles.loadingSpinnerWrapper
          )}
        >
          <div
            className={classNames('spinner-border spinner-border-sm')}
            style={{ marginTop: '1px' }}
            role="status"
          ></div>
        </span>
      )}

      {children}
    </Button>
  )
}

export default ButtonWithSpinner
