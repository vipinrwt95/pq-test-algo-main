// TODO-: remove @ts-nocheck and make sure not typescript error shows up
// @ts-nocheck

/**
 * This function determines if two arrays are deeply equal to one another.
 * @param arr1 The first array to compare.
 * @param arr2 The second array to compare.
 * @param sort Whether to sort the arrays before comparison.
 * @returns True if the arrays are deeply equal, false otherwise.
 */
export const isDeepEqual = <T>(arr1: T[], arr2: T[], sort = true): boolean => {
  // If the arrays are strictly equal, they are deeply equal
  if (arr1 === arr2) {
    return true
  }

  // If either array is null or undefined, or if they have different lengths,
  // they are not deeply equal
  if (arr1 == null || arr2 == null || arr1.length !== arr2.length) {
    return false
  }

  // If sorting is enabled, sort the arrays before comparison
  const sortedArr1 = sort ? sortDeep(arr1) : arr1
  const sortedArr2 = sort ? sortDeep(arr2) : arr2

  // Iterate over each element in the array and compare them recursively
  for (let i = 0; i < sortedArr1.length; i++) {
    if (Array.isArray(sortedArr1[i]) && Array.isArray(sortedArr2[i])) {
      // If both elements are arrays, recursively compare them
      if (!isDeepEqual(sortedArr1[i], sortedArr2[i], sort)) {
        return false
      }
    } else if (typeof sortedArr1[i] === 'object' && typeof sortedArr2[i] === 'object') {
      // If both elements are objects, compare their keys and values recursively
      const keys1 = Object.keys(sortedArr1[i])
      const keys2 = Object.keys(sortedArr2[i])

      if (keys1.length !== keys2.length) {
        return false
      }

      for (const key of keys1) {
        if (!sortedArr2[i].hasOwnProperty(key) || !isDeepEqual(sortedArr1[i][key], sortedArr2[i][key], sort)) {
          return false
        }
      }
    } else if (sortedArr1[i] !== sortedArr2[i]) {
      // If the elements are not arrays or objects, compare them strictly
      return false
    }
  }

  // If all elements are deeply equal, the arrays are deeply equal
  return true
}

/**
 * This function recursively sorts an array of nested arrays and objects.
 * @param arr The array to sort.
 * @returns The sorted array.
 */
function sortDeep<T>(arr: T[]): T[] {
  // If the input array is an array, make a copy of it
  if (Array.isArray(arr)) {
    const sorted = [...arr]

    // Sort the array
    sorted.sort((a, b) => {
      // If the elements are arrays, recursively sort them and compare the results
      if (Array.isArray(a)) {
        return isDeepEqual(sortDeep(a), sortDeep(b)) ? 0 : JSON.stringify(a) > JSON.stringify(b) ? 1 : -1
      }
      // If the elements are objects, sort them by their keys and recursively sort the values
      else if (typeof a === 'object' && a !== null) {
        // Sort the keys
        const keysA = Object.keys(a).sort()
        const keysB = Object.keys(b).sort()

        // If the keys are not equal, compare them
        if (!isDeepEqual(keysA, keysB)) {
          return JSON.stringify(a) > JSON.stringify(b) ? 1 : -1
        }

        // Create a new object and sort its keys and values
        const newObj: { [key: string]: any } = {}

        for (const key of keysA) {
          newObj[key] = sortDeep(a[key])
        }

        // Compare the sorted objects
        return isDeepEqual(newObj, b) ? 0 : JSON.stringify(a) > JSON.stringify(b) ? 1 : -1
      }
      // If the elements are neither arrays nor objects, compare them as strings
      else {
        return JSON.stringify(a) > JSON.stringify(b) ? 1 : -1
      }
    })

    return sorted
  }
  // If the input is an object, sort its keys and recursively sort its values
  else if (typeof arr === 'object' && arr !== null) {
    const keys = Object.keys(arr).sort()
    const newObj: { [key: string]: any } = {}

    for (const key of keys) {
      newObj[key] = sortDeep(arr[key])
    }

    return newObj as T[]
  }
  // If the input is neither an array nor an object, return it as is
  else {
    return arr
  }
}
