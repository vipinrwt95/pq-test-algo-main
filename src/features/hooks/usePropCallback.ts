import { useEffect, useRef } from 'react'

// Define a custom hook that takes a function callback as an argument
export const usePropCallback = <T>(callback: T) => {
  // Use the useRef hook to keep the callback in a ref
  // This prevents the callback from being rerendered whenever the parent component is rerendered
  // or if it's not wrapped in useCallback
  const callbackRef = useRef(callback)

  // Use the useEffect hook to update the callbackRef when the callback changes
  useEffect(() => {
    // This updates the value of the callbackRef to the new callback
    callbackRef.current = callback
  }, [callback])

  // Return the callbackRef
  // Other components can access the current value of the ref to call the callback function
  return callbackRef
}
