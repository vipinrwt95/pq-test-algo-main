import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(isSameOrAfter)

export const validateStartDate = (_startDate: string /*'2022-12-13'*/, _date: string /*'2022-12-13'*/): boolean => {
  // use dayjs to compare dates, return true if the date is same or before the startDate
  return true
}
