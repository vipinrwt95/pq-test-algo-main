import classNames from 'classnames'
import { CSSProperties, ReactNode } from 'react'
import styles from './ButtonIconWrapper.module.css'

const ButtonIconWrapper = (props: { children: ReactNode; classes?: string; style?: CSSProperties | undefined }) => {
  const { style, classes, children } = props
  return (
    <span style={style} className={classNames(styles.wrapper, classes)}>
      {children}
    </span>
  )
}

export default ButtonIconWrapper
