import classNames from 'classnames'
import { useCombobox } from 'downshift'
import React, { useCallback } from 'react'
import { usePropCallback } from 'src/features/hooks/usePropCallback'
import styles from './AutoComplete.module.css'

export type SelectOption = { value: number | string; label: string }

interface Props {
  placeholder?: string
  items: SelectOption[]
  onInputChange?: (value: string) => void
  onSelect?: (value: SelectOption) => void
  onEnter?: (value: string) => void
}

export const AutoComplete = ({ placeholder, items, onSelect, onInputChange, onEnter }: Props) => {
  const [inputItems, setInputItems] = React.useState(items)

  const { isOpen, getInputProps, getItemProps, getMenuProps, highlightedIndex, openMenu } = useCombobox({
    items: inputItems,
    itemToString: (item) => (item ? item.label : ''), // represent the selected item with its label
    onInputValueChange: ({ inputValue = '' }) => {
      setInputItems(items.filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase())))
      onInputChange?.(inputValue)
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) onSelect?.(selectedItem)
    },
  })

  const onEnterRef = usePropCallback(onEnter)

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        onEnterRef.current?.(event.currentTarget.value)
      }
    },
    [onEnterRef]
  )

  return (
    <div className={styles.wrapper}>
      <input className="form-control" {...getInputProps({ onFocus: openMenu, onKeyDown, placeholder })} />

      <ul className={classNames({ [styles.suggestionsList]: isOpen && inputItems.length > 0 })} {...getMenuProps()}>
        {isOpen &&
          inputItems.map((item, index) => {
            const { id, ...otherProps } = getItemProps({ item, index })
            return (
              <li
                className={classNames(styles.listItem, { [styles.highlightedListItem]: highlightedIndex === index })}
                {...otherProps}
                key={id}
              >
                {item.label}
              </li>
            )
          })}
      </ul>
    </div>
  )
}
