import { IMAGE_EXTENSIONS } from 'src/features/constants/media'
import { assert } from './assert'

export const getImageExtension = (path: string | undefined) => {
  if (!path) return null
  assert(typeof path === 'string', 'Path must be a string')
  assert(path.length > 0, 'Path is required')

  const extension = path.split('.').pop()

  if (IMAGE_EXTENSIONS.includes(`.${extension}`)) {
    return extension
  } else {
    return null
  }
}
