import { debounce, DebouncedFunc } from 'lodash'
import { DependencyList, useCallback } from 'react'

export type UseDebouncedCallbackReturn = DebouncedFunc<(...args: any) => any>

function useDebouncedCallback(
  fn: (...args: any) => any,
  ms = 0,
  deps: DependencyList = []
): UseDebouncedCallbackReturn {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCallback = useCallback(debounce(fn, ms), deps)

  return debouncedCallback
}

export { useDebouncedCallback }
