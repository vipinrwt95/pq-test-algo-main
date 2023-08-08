import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(isSameOrAfter)

export const validateEndDate = (startDate: string /*'2022-12-13'*/, date: string /*'2022-12-13'*/): boolean => {
  // use dayjs to compare dates, return true if the date is same or after the startDate
  return dayjs(date).isSameOrAfter(startDate, 'day')
}
