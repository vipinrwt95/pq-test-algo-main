import { Calendar } from 'react-feather'
import { InputGroup, InputGroupText } from 'reactstrap'

import ReactDatePicker from 'react-datepicker'
import { RefCallBack } from 'react-hook-form'
import classNames from 'classnames'
import { useCallback } from 'react'
import { HiddenInputRef } from '../HiddenInputRef/HiddenInputRef'

const WRAPPER_CLASS_NAME = 'pq-date-picker-container'

interface DatePickerProps {
  datePickerRef?: RefCallBack
  id?: string
  inputClass?: string
  selected: Date | null
  onChange: (date: Date) => void
  placeholderText?: string
  dateFormat?: string
  isClearable?: boolean
  noSuffixIcon?: boolean
  isSmallSize?: boolean
}

export const DatePicker = (props: DatePickerProps) => {
  const {
    datePickerRef,
    id,
    inputClass,
    selected,
    onChange,
    placeholderText = 'Choose a date',
    dateFormat = 'MMM dd, yyyy',
    isClearable,
    noSuffixIcon,
    isSmallSize,
  } = props

  const handleClickInputGroupsText = useCallback((event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const span = event.target as HTMLSpanElement
    span.closest(`.${WRAPPER_CLASS_NAME}`)?.querySelector('input')?.focus()
  }, [])

  // commented out the internalDatePickerRef focus because it covers the error message with the dropdown calendar and user can not see the error message
  // const internalDatePickerRef = useRef<ReactDatePicker>(null)

  return (
    <div className={classNames(WRAPPER_CLASS_NAME)}>
      <HiddenInputRef
        inputRef={datePickerRef}
        // onFocus={() => internalDatePickerRef.current?.setFocus()}
      />
      <InputGroup>
        <ReactDatePicker
          // ref={internalDatePickerRef}
          id={id}
          placeholderText={placeholderText}
          className={classNames('form-control', inputClass, { 'form-control-sm': isSmallSize })}
          selected={selected}
          onChange={onChange}
          dateFormat={dateFormat}
          autoComplete="off"
          isClearable={isClearable}
        />

        {!noSuffixIcon && (
          <InputGroupText onClick={handleClickInputGroupsText}>
            <Calendar size={18} />
          </InputGroupText>
        )}
      </InputGroup>
    </div>
  )
}
