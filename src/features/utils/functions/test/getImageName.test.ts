import { getImageName } from '../getImageName'

describe('getImageName', () => {
  it('should return null when path is undefined', () => {
    expect(getImageName()).toBe(null)
  })

  it('should return null when path is null', () => {
    // @ts-ignore
    expect(getImageName(null)).toBe(null)
  })

  it('should return null when path is empty string', () => {
    // @ts-ignore
    expect(getImageName('')).toBe(null)
  })

  it('should return null when path is not a string', () => {
    // @ts-ignore
    expect(getImageName(['path'])).toBe(null)
    // @ts-ignore
    expect(getImageName(123)).toBe(null)
    // @ts-ignore
    expect(getImageName({ path: 'path' })).toBe(null)
  })

  it('should return null when path is not a image file path', () => {
    expect(getImageName('path/file.txt')).toBe(null)
    expect(getImageName('path/file.pdf')).toBe(null)
  })

  it('should return file name without extension when path is a image file path', () => {
    expect(getImageName('path/image.jpg')).toBe('image')
    expect(getImageName('path/image.jpeg')).toBe('image')
    expect(getImageName('path/image.png')).toBe('image')
    expect(getImageName('path/image.gif')).toBe('image')
    expect(getImageName('path/image.bmp')).toBe('image')
  })
})
