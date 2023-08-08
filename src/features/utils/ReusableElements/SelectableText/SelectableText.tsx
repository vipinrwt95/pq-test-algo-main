import React, { useEffect, useRef } from 'react'
import styles from './SelectableText.module.css'
import classNames from 'classnames'

interface SelectableTextProps {
  text: string
}

const SelectableText = (props: SelectableTextProps) => {
  const { text } = props
  const selectableRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const selectable = selectableRef.current
    if (selectable) {
      selectable.addEventListener('click', () => {
        //TODO-: Remove all ts-ignore from this file
        // @ts-ignore
        if (document.selection) {
          // @ts-ignore
          const range = document.body.createTextRange()
          range.moveToElementText(selectable)
          range.select()
        } else if (window.getSelection) {
          const range = document.createRange()
          range.selectNode(selectable) // @ts-ignore
          window.getSelection().removeAllRanges() // @ts-ignore
          window.getSelection().addRange(range)
        }
      })
    }
  }, [])

  return (
    <div className={classNames(styles.selectableTextWrapper)} ref={selectableRef}>
      {text}
    </div>
  )
}

export default SelectableText
