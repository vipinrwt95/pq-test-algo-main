export const sortArrayBasedOnReferenceArray = (arrayToSort: string[], referenceArray: string[]): string[] => {
  return arrayToSort.slice().sort((element1, element2) => {
    const element1Index = referenceArray.indexOf(element1)
    const element2Index = referenceArray.indexOf(element2)

    if (element1Index === -1 && element2Index === -1) {
      // Neither element exists in the reference array, so keep their order as is
      return 0
    } else if (element1Index === -1) {
      // Only element2 exists in the reference array, so element2 comes first
      return 1
    } else if (element2Index === -1) {
      // Only element1 exists in the reference array, so element1 comes first
      return -1
    } else {
      // Both elements exist in the reference array, so compare their indices
      return element1Index - element2Index
    }
  })
}

// Example usage:
// const items = ["potato", "papaya", "banana"];
// const referenceOrder = ["banana", "potato"];
// console.log(sortArrayBasedOnReferenceArray(items, referenceOrder)); // Output: ["banana", "potato", "papaya"]
