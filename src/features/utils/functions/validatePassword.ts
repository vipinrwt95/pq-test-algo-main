const MIN_LENGTH = 6
const MAX_LENGTH = 64

export const validatePassword = (password?: string) => {
  if (!password) {
    return {
      isValid: false,
      message: 'Password is required',
    }
  }

  if (password.length < MIN_LENGTH) {
    return {
      isValid: false,
      message: `Password must be at least ${MIN_LENGTH} characters long`,
    }
  }

  if (password.length > MAX_LENGTH) {
    return {
      isValid: false,
      message: `Password cannot be more than ${MAX_LENGTH} characters long`,
    }
  }

  // if (!/\d/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
  //   return {
  //     isValid: false,
  //     message: 'Must contain 1 lowercase, 1 uppercase, and 1 digit',
  //   }
  // }

  return {
    isValid: true,
    message: '',
  }
}
