import React, { MutableRefObject, useCallback, useState } from 'react'
import ReactMultiDatePicker, { DateObject } from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import type { Value } from 'react-multi-date-picker'
import styles from './MultipleDatePicker.module.css'
import { useChangeEffect } from 'src/features/hooks/useChangeEffect'
import useOnClickOutside from 'src/features/hooks/useOnClickOutside'
import { useMergedRef } from 'src/features/hooks/useMergedRef'

const stringArrayToDateArray = (dateStrings: string[]): DateObject[] => {
  if (!dateStrings) return []
  return dateStrings.map((dateString) => new DateObject(dateString))
}

const dateArrayToStringArray = (dates: DateObject[]): string[] => {
  if (!dates) return []
  return dates.map((date) => date.format('YYYY-MM-DD'))
}

interface MultipleDatePickerProps {
  datePickerRef?: MutableRefObject<any>
  id?: string
  inputClass?: string
  selectedDates: string[]
  onChange: (selectedDates: string[]) => void
}

const MultipleDatePicker = (props: MultipleDatePickerProps) => {
  const { datePickerRef, id, inputClass, selectedDates, onChange } = props

  const [values, setValues] = useState<Value>(stringArrayToDateArray(selectedDates))

  // update the selected values if prop value changes
  useChangeEffect(selectedDates, (selectedDates) => stringArrayToDateArray(selectedDates))

  const handleChange = (newDates: Value) => {
    setValues(newDates)

    // Convert newDates (array of DateObject instances) to an array of strings
    const newDatesStrings = dateArrayToStringArray(newDates as DateObject[])

    // Update the state with the new dates
    onChange(newDatesStrings)
  }

  const dateTimeRef = React.useRef<HTMLElement>(null)

  const handleDatePickerClose = useCallback(() => (dateTimeRef?.current as any)?.closeCalendar(), [dateTimeRef])

  // Still an open issue as of today (April 19, 2023) - https://github.com/shahabyazdi/react-multi-date-picker/issues/117
  // if commented this line component TimePicker don't be closed on click anywhere
  useOnClickOutside(dateTimeRef, handleDatePickerClose)

  const mergedRef = useMergedRef(dateTimeRef, datePickerRef || null)

  return (
    <div className={styles.wrapper}>
      <ReactMultiDatePicker
        // ref={mergeRefs([dateTimeRef, datePickerRef])}
        ref={mergedRef}
        id={id}
        multiple
        inputClass={inputClass}
        value={values}
        onChange={handleChange}
        plugins={[<DatePanel />]}
        format="MMM-DD-YYYY"
      />
    </div>
  )
}

export default MultipleDatePicker
