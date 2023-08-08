import { RefCallBack } from 'react-hook-form'
import { ModalBodyProps, ModalFooterProps, ModalHeaderProps, ModalProps } from 'reactstrap'

export interface UploadableFileType {
  name: string

  [key: string]: any

  // some custom properties
  // readyToBeUploaded is false by default, and we make it true for only three files at a time so that too many files are not being uploaded at once
  readyToBeUploaded: boolean

  // flag that indicates the upload process was completed regardless of success or failure
  uploadProcessed: boolean

  // flag that indicates the upload process was completed successfully
  uploadSuccess: boolean

  // flag that indicates the upload process was completed with error
  uploadError: boolean
}

export interface MediaPickerImage {
  imageId: number
  imageUrl: string
}

export interface StandardErrorResponse {
  error: {
    status: number
    data: {
      error: {
        type: string
        description: string
        fields: string[]
        error_message: string
      }
    }
  }
  isUnhandledError: boolean
  meta: {
    request: {}
    response: {}
  }
}

export type SelectOption = {
  value: number | string
  label: string

  // depth is useful in case of indenting subcategories in a dropdown
  depth?: number
}

export interface ControlledComponentProps<T> {
  value?: T | undefined
  placeholder?: string
  onChange?: (value: T) => void
  inputRef?: RefCallBack
  isDisabled?: boolean
  id?: string

  // you need to pass id to make it work
  label?: string

  error?: boolean
}

export type FormModalProps = {
  baseProps?: ModalProps
  headerProps?: ModalHeaderProps
  bodyProps?: ModalBodyProps
  footerProps?: ModalFooterProps
}
