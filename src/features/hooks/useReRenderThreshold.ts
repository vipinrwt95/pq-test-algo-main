import { useEffect, useRef } from 'react'
import { assert } from '../utils/functions/assert'

/**
 * This util only works in the development env and it ensures your component doesn't re-render
 * more than certain times within certain duration
 */
export const useReRenderThreshold = (
  { limit = 200, duration = 5000, componentName = 'the component' } = {} as {
    limit?: number
    duration?: number
    componentName?: string
  }
) => {
  const isDevelopment = process.env['NODE_ENV'] === 'development'
  // keep a counter to make sure we don't rerender to many times
  const counter = useRef(0)
  useEffect(() => {
    if (!isDevelopment) return
    const id = setInterval(() => {
      counter.current = 0
    }, duration)

    return () => clearInterval(id)
  }, [duration, isDevelopment])

  useEffect(() => {
    if (!isDevelopment) return
    counter.current++
    assert(counter.current < limit, `Too many (${limit}) re-renders happened within ${duration}ms on ${componentName}`)
  })
}
