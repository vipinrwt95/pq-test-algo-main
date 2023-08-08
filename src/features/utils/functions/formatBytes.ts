export const formatBytes = (bytes?: number, decimals = 2) => {
  if (bytes === undefined) return null

  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

//   const bytes = 950697;
//   console.log(formatBytes(bytes)); // Outputs: "928.22 KB"
