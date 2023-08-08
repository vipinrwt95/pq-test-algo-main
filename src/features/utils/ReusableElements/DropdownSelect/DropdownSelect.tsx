import { DropdownToggle } from 'reactstrap'
import styles from './DropdownSelect.module.css'
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap'

import { ReactNode, useCallback, useState } from 'react'
import classNames from 'classnames'

interface DropdownSelectProps {
  values: string[]
  // if itemMapper is not passed, then the value is shown as the list item
  itemMapper?: Record<string, ReactNode>
  defaultValue: string
  onSelect: (value: string) => void
  isDisable?: boolean
  classes?: string
  dropdownToggleClass?: string
  dropdownIcon?: ReactNode
  dropdownMenuClass?: string

  // if needed you can provide any thing at the bottom of the dropdown
  bottomComponent?: ReactNode
}

const DropdownSelect = (props: DropdownSelectProps) => {
  const {
    values,
    defaultValue,
    onSelect,
    classes,
    itemMapper = {},
    dropdownToggleClass,
    dropdownIcon,
    dropdownMenuClass,
    bottomComponent,
  } = props

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const dropdownToggle = () => setDropdownOpen((prevState) => !prevState)

  const [selectedValue, setSelectedValue] = useState<string>(defaultValue)

  const handleChange = useCallback(
    (selected: string) => {
      setSelectedValue(selected)
      onSelect(selected)
    },
    [onSelect]
  )

  return (
    <div className={classNames('dropdown-basic', classes)}>
      <Dropdown className="mb-0" isOpen={dropdownOpen} toggle={dropdownToggle}>
        <DropdownToggle color="primary" className={classNames(styles.dropdownTrigger, 'px-3', dropdownToggleClass)}>
          <span>{itemMapper[selectedValue] || selectedValue} </span>
          <span>{dropdownIcon || <i className="icofont icofont-arrow-down"></i>}</span>
        </DropdownToggle>
        <DropdownMenu className={classNames(styles.dropdownContent, dropdownMenuClass)}>
          {values.map((value, index) => (
            <DropdownItem
              key={index}
              href="#"
              active={selectedValue === value}
              data-value={value}
              value={value}
              onClick={() => handleChange(value)}
              style={{ fontSize: '14px' }}
            >
              {itemMapper[value] || value}
            </DropdownItem>
          ))}

          {bottomComponent}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default DropdownSelect
