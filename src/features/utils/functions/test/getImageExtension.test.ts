import { getImageExtension } from '../getImageExtension'

describe('getImageExtension', () => {
  it('should return the file extension of image path', () => {
    expect(getImageExtension('media/companies/1674473479953-image-name-to-be-4.png')).toBe('png')
    expect(getImageExtension('media/companies/1674473479953-image-name-to-be-4.jpg')).toBe('jpg')
  })

  it('should return null if the path is not an image path', () => {
    expect(getImageExtension('media/companies/1674473479953-image-name-to-be-4.exe')).toBe(null)
    expect(getImageExtension('media/companies/1674473479953-image-name-to-be-4.txt')).toBe(null)
  })

  it('should return null if path is undefined', () => {
    // @ts-ignore
    expect(getImageExtension(undefined)).toBe(null)
  })
})
