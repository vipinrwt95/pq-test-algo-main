import { RefObject, useEffect, useRef } from 'react'

export const useLoadMoreUntilScrollAppears = (props: {
  totalImages?: number
  numberOfImagesLoaded: number
  isFetching: boolean
  infiniteScrollTrackerRef: RefObject<HTMLDivElement>
  handleLoadNext: () => void
}) => {
  const { totalImages, numberOfImagesLoaded, isFetching, infiniteScrollTrackerRef, handleLoadNext } = props
  const hasMore = useRef(false)

  hasMore.current = (totalImages || 0) > numberOfImagesLoaded

  const autoLoadStarted = useRef(false)

  useEffect(() => {
    if (isFetching) {
      autoLoadStarted.current = false
    }
  }, [isFetching])

  useEffect(() => {
    if (isFetching) return
    if (!infiniteScrollTrackerRef.current) return
    if (!hasMore.current) return
    if (autoLoadStarted.current) return

    // take an offset of 300px to make sure the infiniteScrollTrackerRef is at least 300px below the screen
    const offset = 300
    const isInfiniteScrollTrackerInViewport =
      infiniteScrollTrackerRef.current.getBoundingClientRect().bottom < window.innerHeight + offset

    if (isInfiniteScrollTrackerInViewport) {
      handleLoadNext()
      autoLoadStarted.current = true
    }
  }, [handleLoadNext, infiniteScrollTrackerRef, isFetching])
}
