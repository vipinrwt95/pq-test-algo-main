import { useEffect, useRef } from 'react'
import { usePropCallback } from './usePropCallback'
import _isEqual from 'lodash/isEqual'

/**
 * Custom hook that calls a callback function with the provided default value.
 *
 * @template T - Type of the default value.
 * @param {T} defaultValue - The default value to be passed to the callback function.
 * @param {(defaultValue: T) => void} callbackProp - Callback function to be called with the default value.
 *
 * The hook accepts a default value and a callback function as arguments. It calls the callback function
 * whenever the default value is changed.
 */
export const useChangeEffect = <T extends unknown>(
  defaultValue: T,
  callbackProp: (defaultValue: Exclude<T, undefined>) => void
) => {
  // Wraps the callback function using the usePropCallback hook.
  const callback = usePropCallback(callbackProp)

  // useRef is used to keep track of whether the callback has been called with the default value or not.
  const previous = useRef<T>()

  // useEffect is used to call the callback function with the default value when it is changed.
  useEffect(() => {
    if (_isEqual(defaultValue, previous.current)) return

    previous.current = defaultValue
    callback.current(defaultValue as Exclude<T, undefined>)
  }, [callback, defaultValue])
}
