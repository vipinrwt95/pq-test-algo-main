// @ts-nocheck

import { isDeepEqual } from '../deepArrayCompare'

type Forced = any

describe('isDeepEqual', () => {
  describe('with non-array arguments', () => {
    it('should return true when comparing null and null', () => {
      expect(isDeepEqual(null as Forced, null as Forced)).toBe(true)
    })

    it('should return true when comparing undefined and undefined', () => {
      expect(isDeepEqual(undefined as Forced, undefined as Forced)).toBe(true)
    })

    it('should return false when comparing null and undefined', () => {
      expect(isDeepEqual(null as Forced, undefined as Forced)).toBe(false)
    })

    it('should return false when comparing an array and null', () => {
      expect(isDeepEqual([], null)).toBe(false)
    })

    it('should return false when comparing an object and undefined', () => {
      expect(isDeepEqual({}, undefined)).toBe(false)
    })

    it('should return true when comparing two primitive values of the same type', () => {
      expect(isDeepEqual(1, 1)).toBe(true)
    })

    it('should return false when comparing two primitive values of different types', () => {
      expect(isDeepEqual(1, '1')).toBe(false)
    })
  })

  describe('with array arguments', () => {
    describe('when comparing empty arrays', () => {
      it('should return true when comparing two empty arrays', () => {
        expect(isDeepEqual([], [])).toBe(true)
      })

      it('should return false when comparing an empty array and a non-empty array', () => {
        expect(isDeepEqual([], [1])).toBe(false)
      })
    })

    describe('when comparing arrays with primitive elements', () => {
      it('should return true when comparing two arrays with the same elements in the same order', () => {
        expect(isDeepEqual([1, 2, 3], [1, 2, 3])).toBe(true)
      })

      it('should return true when comparing two arrays with the same elements in a different order, if sorting is enabled', () => {
        expect(isDeepEqual([1, 2, 3], [3, 2, 1], true)).toBe(true)
      })

      it('should return false when comparing two arrays with the same elements in a different order, if sorting is not enabled', () => {
        expect(isDeepEqual([1, 2, 3], [3, 2, 1], false)).toBe(false)
      })

      it('should return false when comparing two arrays with different elements', () => {
        expect(isDeepEqual([1, 2, 3], [1, 2, 4])).toBe(false)
      })
    })

    describe('when comparing arrays with object elements', () => {
      it('should return true when comparing two arrays with the same object elements in the same order', () => {
        expect(isDeepEqual([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }])).toBe(true)
      })

      it('should return true when comparing two arrays with the same object elements in a different order, if sorting is enabled', () => {
        expect(isDeepEqual([{ a: 1 }, { b: 2 }], [{ b: 2 }, { a: 1 }], true)).toBe(true)
      })

      it('should return false when comparing two arrays with the same object elements in a different order, if sorting is not enabled', () => {
        expect(isDeepEqual([{ a: 1 }, { b: 2 }], [{ b: 2 }, { a: 1 }], false)).toBe(false)
      })

      it('should return false when comparing two arrays with different object elements', () => {
        expect(isDeepEqual([{ a: 1 }, { b: 2 }], [{ a: 1 }, { c: 3 }])).toBe(false)
      })

      it('should return false when comparing an array with object elements to an array with primitive elements', () => {
        expect(isDeepEqual([{ a: 1 }, { b: 2 }], [1, 2])).toBe(false)
      })
    })

    describe('when comparing arrays with nested arrays', () => {
      it('should return true when comparing two arrays with the same nested arrays in the same order', () => {
        expect(isDeepEqual([[1], [2, 3]], [[1], [2, 3]])).toBe(true)
      })

      it('should return true when comparing two arrays with the same nested arrays in a different order, if sorting is enabled', () => {
        expect(isDeepEqual([[1], [2, 3]], [[2, 3], [1]], true)).toBe(true)
      })

      it('should return false when comparing two arrays with the same nested arrays in a different order, if sorting is not enabled', () => {
        expect(isDeepEqual([[1], [2, 3]], [[2, 3], [1]], false)).toBe(false)
      })

      it('should return false when comparing two arrays with different nested arrays', () => {
        expect(isDeepEqual([[1], [2, 3]], [[1], [4]])).toBe(false)
      })
    })

    describe('when comparing arrays with deeply nested objects and arrays', () => {
      it('should return true when comparing two deeply nested arrays with the same objects and arrays in the same order', () => {
        const arr1 = [[{ a: [1, 2] }, { b: [3, 4] }], [{ c: [5, 6] }]]
        const arr2 = [[{ a: [1, 2] }, { b: [3, 4] }], [{ c: [5, 6] }]]
        expect(isDeepEqual(arr1, arr2)).toBe(true)
      })

      it('should return true when comparing two deeply nested arrays with the same objects and arrays in a different order, if sorting is enabled', () => {
        const arr1 = [[{ a: [1, 2] }, { b: [3, 4] }], [{ c: [5, 6] }]]
        const arr2 = [[{ b: [3, 4] }, { a: [1, 2] }], [{ c: [6, 5] }]]
        expect(isDeepEqual(arr1, arr2, true)).toBe(true)
      })

      it('should return false when comparing two deeply nested arrays with the same objects and arrays in a different order, if sorting is not enabled', () => {
        const arr1 = [[{ a: [1, 2] }, { b: [3, 4] }], [{ c: [5, 6] }]]
        const arr2 = [[{ b: [3, 4] }, { a: [1, 2] }], [{ c: [6, 5] }]]
        expect(isDeepEqual(arr1, arr2, false)).toBe(false)
      })

      it('should return false when comparing two deeply nested arrays with different objects and arrays', () => {
        const arr1 = [[{ a: [1, 2] }, { b: [3, 4] }], [{ c: [5, 6] }]]
        const arr2 = [[{ a: [1, 2] }, { b: [3, 5] }], [{ c: [5, 6] }]]
        expect(isDeepEqual(arr1, arr2)).toBe(false)
      })

      it('should return false when comparing a deeply nested array to a non-array', () => {
        const arr1 = [[{ a: [1, 2] }, { b: [3, 4] }], [{ c: [5, 6] }]]
        const arr2 = 'not an array'
        expect(isDeepEqual(arr1, arr2)).toBe(false)
      })
    })
  })
})
