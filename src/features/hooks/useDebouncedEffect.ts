// credit: https://github.com/streamich/react-use/blob/master/src/useDebounce.ts

import { DependencyList, useEffect } from 'react'

import { useTimeoutFn } from './useTimeoutFn'

export type UseDebouncedEffectReturn = [() => boolean | null, () => void]

function useDebouncedEffect(
  // eslint-disable-next-line @typescript-eslint/ban-types
  fn: Function,
  ms = 0,
  deps: DependencyList = []
): UseDebouncedEffectReturn {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(reset, deps)

  return [isReady, cancel]
}

export { useDebouncedEffect }
