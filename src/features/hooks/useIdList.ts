import { useCallback, useState, useEffect, useRef } from 'react'
import { isDeepEqual } from '../utils/functions/deepArrayCompare'
import { useChangeEffect } from './useChangeEffect'

type ReturnUseIdList<T> = {
  ids: T[]
  toggleId: (imageId: T) => void
  toggleIds: (imageIds: T[]) => void
  addId: (imageId: T) => void
  addIds: (imageId: T[]) => void
  removeId: (imageId: T) => void
  removeIds: (imageId: T[]) => void
  emptyIdList: () => void
}

/**
 * This hooks allows you to keep track of selected items in an array based on IDs.
 * It has several useful methods like toggleId, addId, removeId and setIds.
 * toggleId method toggles the selection of an item,
 * addId method selects an item,
 * removeId method removes an item from the selected items array,
 * The generic type T is used to specify the type of items that will be selected.
 * Additionally, the ids state is initialized as an empty array and can be updated by the methods provided in the hook.
 * @returns
 */

export const useIdList = <T>(options?: { onChange?: (ids: T[]) => void; initialIds?: T[] }): ReturnUseIdList<T> => {
  const { onChange, initialIds } = options || {}

  const [ids, setIds] = useState<T[]>(initialIds || [])

  useChangeEffect(initialIds, (initialIds) => {
    setIds(initialIds || [])
  })

  // don't call onChange whenever that updates, call it only when ids array updates
  const onChangeRef = useRef(onChange)

  // make an ids ref to track and
  const prevIdsRef = useRef<T[]>([])

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    if (!onChangeRef.current) return

    if (!isDeepEqual(prevIdsRef.current, ids)) {
      onChangeRef.current(ids)
      prevIdsRef.current = ids
    }
  }, [ids])

  const toggleId = useCallback((imageId: T) => {
    setIds((prev) => {
      const updated = [...prev]
      // Check if the ID is already in the array
      const index = updated.indexOf(imageId)
      // If the ID is in the array, remove it
      if (index !== -1) updated.splice(index, 1)
      // If the ID is not in the array, add it
      else updated.push(imageId)
      return updated
    })
  }, [])

  // update in bulk
  const toggleIds = useCallback((imageIds: T[]) => {
    setIds((prevIds) => {
      const updatedIds = [...prevIds]
      imageIds.forEach((imageId) => {
        const index = updatedIds.indexOf(imageId)
        if (index !== -1) updatedIds.splice(index, 1)
        else updatedIds.push(imageId)
      })
      return updatedIds
    })
  }, [])

  const addId = useCallback((imageId: T) => {
    setIds((prev) => {
      const updated = [...prev]
      // Check if the ID is already in the array
      const index = updated.indexOf(imageId)
      // If the ID is in the array, don't do anything
      if (index !== -1) {
        // do nothing
      }
      // If the ID is not in the array, add it
      else updated.push(imageId)
      return updated
    })
  }, [])

  const addIds = useCallback((imageIds: T[]) => {
    setIds((prevIds) => {
      const updatedIds = [...prevIds]
      imageIds.forEach((imageId) => {
        const index = updatedIds.indexOf(imageId)
        if (index === -1) updatedIds.push(imageId)
      })
      return updatedIds
    })
  }, [])

  const removeId = useCallback((imageId: T) => {
    setIds((prev) => {
      const updated = [...prev]
      // Check if the ID is already in the array
      const index = updated.indexOf(imageId)
      // If the ID is in the array, remove it
      if (index !== -1) updated.splice(index, 1)
      return updated
    })
  }, [])

  const removeIds = useCallback((imageIds: T[]) => {
    setIds((prevIds) => {
      const updatedIds = [...prevIds]
      imageIds.forEach((imageId) => {
        const index = updatedIds.indexOf(imageId)
        if (index !== -1) updatedIds.splice(index, 1)
      })
      return updatedIds
    })
  }, [])

  const emptyIdList = useCallback(() => {
    setIds([])
  }, [])

  const toReturn: ReturnUseIdList<T> = {
    ids,
    toggleId,
    toggleIds,
    addId,
    addIds,
    removeId,
    removeIds,
    emptyIdList,
  }

  return toReturn
}
