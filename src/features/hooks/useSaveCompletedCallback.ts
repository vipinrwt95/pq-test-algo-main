import { useEffect } from 'react'
import { usePrevious } from './usePrevious'
import { usePropCallback } from './usePropCallback'

// This hook detects when a save operation is completed by observing the transition of the isSaving state
// from true to false. It then invokes the provided callback function once the save is complete.
// This is helpful in cases where a callback from the promise after the save is not available.
export const useSaveCompletedCallback = (isSaving: boolean, callbackArg: () => void) => {
  // Get the previous value of isSaving using a custom hook.
  const prevIsSaving = usePrevious(isSaving)

  // Wrap the callbackArg in a usePropCallback hook to ensure that the callback reference remains stable.
  const callback = usePropCallback(callbackArg)

  // Set up an effect that checks if the save operation has completed by detecting the change
  // in the isSaving state from true to false, and then calls the provided callback function.
  useEffect(() => {
    if (!isSaving && prevIsSaving) {
      callback.current()
    }
  }, [callback, isSaving, prevIsSaving])
}
