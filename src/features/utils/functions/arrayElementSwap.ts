export const arrayElementSwap = (array: any[], index1: number, index2: number) => {
  const temp = array[index1]
  array.splice(index1, 1)
  array.splice(index2, 0, temp)
}
