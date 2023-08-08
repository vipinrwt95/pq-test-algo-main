import _clamp from 'lodash/clamp'

/**
 * This util is used to get page numbers which are shown at the bottom of the paginated tables like,
 * [1, '...', 12, 13, 14, '...', 34] Here last page index is 34 and current page is 13
 * @param props
 * @returns
 */
export const getSiblingPaginatedNumbers = (props: {
  // breadth is the number of siblings we want to see. Breadth should be greater than 1
  breadth: number
  currentPageNumber: number
  lastPageNumber: number
}) => {
  const { breadth, currentPageNumber, lastPageNumber } = props

  if (lastPageNumber <= 0) return []

  const rangeMin = _clamp(currentPageNumber - breadth, 1, lastPageNumber)
  const rangeMax = _clamp(
    currentPageNumber + breadth,
    // user Math.min to restrict the low limit to lastPageNumber
    // left siblings + 1 + right siblings
    Math.min(breadth + 1 + breadth, lastPageNumber),
    lastPageNumber
  )

  const range = Array.from(Array(rangeMax).keys())
    .map((i) => i + 1)
    .filter((num) => {
      return num >= rangeMin
    })

  // if not required to update with "..." return immediately
  if (lastPageNumber <= breadth + 1 + breadth) {
    return range
  }

  // add elements to the beginning of the array when current page reaches towards end
  for (let index = 0; index < breadth; index++) {
    if (currentPageNumber > lastPageNumber - (breadth - index)) {
      range.unshift(rangeMin - (index + 1))
    }
  }

  // apply dots if range is too far away
  const updated = range.map((number, index, currentArray) => {
    switch (index) {
      case 0: {
        return currentPageNumber > breadth + 1 ? 1 : number
      }

      case 1: {
        return currentPageNumber > breadth + 1 ? '...' : number
      }

      case currentArray.length - 2: {
        return currentPageNumber < lastPageNumber - breadth ? '...' : number
      }

      case currentArray.length - 1: {
        return currentPageNumber < lastPageNumber - breadth ? lastPageNumber : number
      }

      default:
        return number
    }
  })

  return updated
}
