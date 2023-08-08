import ReactPhone, { PhoneInputProps } from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const PhoneInput = (props: PhoneInputProps) => {
  return <ReactPhone country="us" {...props} />
}

export default PhoneInput
