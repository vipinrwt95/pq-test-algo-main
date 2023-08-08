import dayjs from 'dayjs'

// timeToDate('19:00') => new Date(2021-08-31T17:00:00.000Z)
export const timeToDate = (time?: string /* 19:00 */) =>
  dayjs(new Date())
    .set('hour', Number(time?.split(':')[0]))
    .set('minute', Number(time?.split(':')[1]))
    .toDate()
