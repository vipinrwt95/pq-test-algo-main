import { validatePassword } from '../validatePassword'

describe('validatePassword', () => {
  it('should return an error if password is not provided', () => {
    const result = validatePassword()
    expect(result).toEqual({
      isValid: false,
      message: 'Password is required',
    })
  })

  it('should return an error if password length is less than 6 characters', () => {
    const result = validatePassword('abcde')
    expect(result).toEqual({
      isValid: false,
      message: 'Password must be at least 6 characters long',
    })
  })

  it('should return an error if password length is more than 64 characters', () => {
    const result = validatePassword('a'.repeat(65))
    expect(result).toEqual({
      isValid: false,
      message: 'Password cannot be more than 64 characters long',
    })
  })

  // it('should return an error if password does not contain at least one lowercase letter, one uppercase letter, and one digit', () => {
  //   const result = validatePassword('password')
  //   expect(result).toEqual({
  //     isValid: false,
  //     message: 'Must contain 1 lowercase, 1 uppercase, and 1 digit',
  //   })
  // })

  it('should return success if password is strong enough', () => {
    const result = validatePassword('P@ssword1')
    expect(result).toEqual({
      isValid: true,
      message: '',
    })
  })
})
