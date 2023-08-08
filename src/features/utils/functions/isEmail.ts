/**
 * Check if the given value is not null or undefined
 * @param value - the value to be validated
 * @returns - true if the value is not null or undefined, false otherwise
 */
const isDefined = (value: any) => value !== null && value !== undefined

/**
 * Check if the given value is empty
 * @param value - the value to be validated
 * @returns - true if the value is an empty string, has a length of 0, or is not defined, false otherwise
 */
const isEmpty = (value: any) => value?.length === 0 || value === '' || !isDefined(value)

/**
 * Check if the given string matches the given regular expression
 * @param regexp - the regular expression pattern
 * @param value - the string to be validated
 * @returns - true if the string matches the pattern or is empty, false otherwise
 */
const matchRegexp = (regexp: RegExp | string, value: string) => {
  const validationRegexp = regexp instanceof RegExp ? regexp : new RegExp(regexp)
  return isEmpty(value) || validationRegexp.test(value)
}

/**
 * Check if the given email string matches the standard email pattern
 * @param email - the email string to be validated
 * @returns - true if the email string matches the pattern, false otherwise
 */
export const isEmail = (email: string) => matchRegexp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, email)
