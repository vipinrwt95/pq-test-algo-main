import { Clock } from 'react-feather'
import { InputGroup, InputGroupText } from 'reactstrap'

import DatePicker from 'react-datepicker'
import { RefCallBack } from 'react-hook-form'
import classNames from 'classnames'
import { useCallback } from 'react'

const WRAPPER_CLASS_NAME = 'pq-time-picker-container'

interface TimePickerProps {
  datePickerRef?: RefCallBack
  id?: string
  inputClass?: string
  selected: Date | null
  onChange: (date: Date) => void
  placeholderText?: string
}

export const TimePicker = (props: TimePickerProps) => {
  const { datePickerRef, id, inputClass, selected, onChange, placeholderText = 'Choose time' } = props

  const handleClickInputGroupsText = useCallback((event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const span = event.target as HTMLSpanElement
    span.closest(`.${WRAPPER_CLASS_NAME}`)?.querySelector('input')?.focus()
  }, [])

  return (
    <div className={WRAPPER_CLASS_NAME}>
      <InputGroup>
        <DatePicker
          ref={datePickerRef}
          id={id}
          placeholderText={placeholderText}
          className={classNames('form-control', inputClass)}
          selected={selected}
          onChange={onChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="HH:mm"
          autoComplete="off"
        />

        <InputGroupText onClick={handleClickInputGroupsText}>
          <Clock size={18} />
        </InputGroupText>
      </InputGroup>
    </div>
  )
}
