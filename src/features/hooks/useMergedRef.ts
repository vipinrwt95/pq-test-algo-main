import React, { useRef, MutableRefObject } from 'react'

export const useMergedRef = <T>(
  ...refs: (MutableRefObject<T | null> | ((instance: T | null) => void) | null)[]
): MutableRefObject<T | null> => {
  const mergedRef = useRef<T | null>(null)

  React.useEffect(() => {
    for (const ref of refs) {
      if (!ref) continue

      if (typeof ref === 'function') {
        ref(mergedRef.current)
      } else {
        ref.current = mergedRef.current
      }
    }
  }, [refs])

  return mergedRef
}
