import { IMAGE_EXTENSIONS } from 'src/features/constants/media'
import { assert } from './assert'

export const getImageName = (path: string | undefined = ''): string | null => {
  if (!path) return null
  assert(typeof path === 'string', 'Path must be a string')
  assert(path.length > 0, 'Path is required')
  if (typeof path !== 'string') return null

  const extension = path.split('.').pop()
  if (IMAGE_EXTENSIONS.includes(`.${extension}`)) {
    const name = path.split(/[\\/]/).pop()
    if (!name) return null
    return name.substring(0, name.lastIndexOf('.'))
  } else {
    return null
  }
}
