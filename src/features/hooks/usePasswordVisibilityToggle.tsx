import { useState } from 'react'
import { Eye, EyeOff } from 'react-feather'
import styles from './usePasswordVisibilityToggle.module.css'

interface UsePasswordVisibilityToggleProps {
  // don't set type to password if value is empty, otherwise browser autofill the field but
  // password a required field, so autofill creates confusion to the user
  setTypeAsTextIfValueIsEmpty?: { value: string }
}

/**
 * A custom React hook that provides a password input field with a toggleable visibility icon.
 * @returns An array with the current password input type (either "password" or "text"), a visibility
 * icon JSX element that toggles the visibility of the password when clicked, and class names for the
 * parent and input elements.
 */
export const usePasswordVisibilityToggle = (
  props?: UsePasswordVisibilityToggleProps
): [string, JSX.Element, string, string] => {
  const { setTypeAsTextIfValueIsEmpty } = props || {}

  // Use the `useState` hook to manage the state of the password visibility and password input type.
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [passwordType, setPasswordType] = useState('password')

  // Define a function that toggles the visibility of the password and updates the password input type.
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
    setPasswordType(isPasswordVisible ? 'password' : 'text')
  }

  const visibilityIcon = (
    <div className={styles.iconWrapper} onClick={togglePasswordVisibility}>
      {isPasswordVisible ? <Eye size={18} color="#635A70" /> : <EyeOff size={18} color="#635A70" />}
    </div>
  )

  // Return an array with the current password input type, the visibility icon JSX element, and class names
  // for the parent and input elements, which are defined in the `usePasswordVisibilityToggle.module.css` file.
  return [
    // The input type to be used for the password input element.
    setTypeAsTextIfValueIsEmpty?.value ? passwordType : 'text',
    // The visibility toggle icon element to be displayed next to the password input element.
    visibilityIcon,
    // The CSS class to be applied to the parent element that contains the password input and the visibility toggle icon.
    styles.parent,
    // The CSS class to be applied to the password input element.
    styles.inputStyle,
  ]
}

export default usePasswordVisibilityToggle

// Example:
/* 
  <FormGroup>
    <Label htmlFor="centerFormPassword" className="form-label">
      Password*
    </Label>
    <div className={parentStyle}>
      <input
        id="centerFormPassword"
        defaultValue={defaultPassword}
        type={passwordType}
        {...register('password', {
        required: !isEditMode,
        validate: handlePasswordStrengthCheck,
        })}
        className={classNames('form-control', inputStyle)}
      />
      {eyeElement}
    </div>
   
  </FormGroup> */
