import { toast } from 'react-toastify'
import {
  TOAST_ADD_ERROR,
  TOAST_ADD_SUCCESS,
  TOAST_CHANGE_ERROR,
  TOAST_CHANGE_SUCCESS,
  TOAST_DELETE_ERROR,
  TOAST_DELETE_SUCCESS,
} from 'src/features/constants/text'
import { conditionalProp } from 'src/features/utils/functions/conditionalProp'

type Action = 'add' | 'update' | 'delete'

const getActionBasedToastMessage = (action: Action, status: 'error' | 'success'): string => {
  if (status === 'success') {
    switch (action) {
      case 'add':
        return TOAST_ADD_SUCCESS

      case 'update':
        return TOAST_CHANGE_SUCCESS

      case 'delete':
        return TOAST_DELETE_SUCCESS

      default:
        throw new Error('Invalid success action')
    }
  }

  if (status === 'error') {
    switch (action) {
      case 'add':
        return TOAST_ADD_ERROR

      case 'update':
        return TOAST_CHANGE_ERROR

      case 'delete':
        return TOAST_DELETE_ERROR

      default:
        throw new Error('Invalid error action')
    }
  }

  throw new Error('Invalid action')
}

/**
 * Define a function called `handleOnQueryStartedWithToast` that handles success and error messages for a Promise returned by a query
 * @param queryFulfilled
 * @param param1
 */
export const handleOnQueryStartedWithToast = async (
  // A Promise that is expected to be fulfilled
  queryFulfilled: Promise<unknown>,
  {
    // Action to perform
    action,
    // Success message to display
    successMessage,
    // Optional success toast ID to display
    successToastId,
    // Optional error toast ID to display
    errorToastId,
  }: {
    action: Action
    successMessage?: string
    errorMessage?: string
    successToastId?: string
    errorToastId?: string
  }
) => {
  try {
    // Wait for the Promise to be fulfilled
    await queryFulfilled

    // Display a success toast message using `react-toastify` library
    toast.success(successMessage || getActionBasedToastMessage(action, 'success'), {
      // Add optional toast ID if provided
      ...conditionalProp(!!successToastId, 'toastId', successToastId),
    })
  } catch (error: unknown) {
    // Display an error toast message using `react-toastify` library
    toast.error('Something went wrong!', {
      ...conditionalProp(!!errorToastId, 'toastId', errorToastId), // Add optional toast ID if provided
    })
  }
}
