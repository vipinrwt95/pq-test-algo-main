export const getVideoDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.preload = 'metadata'

    video.onloadedmetadata = function () {
      URL.revokeObjectURL(video.src)
      resolve(video.duration)
    }

    video.onerror = function () {
      reject('Error loading video file.')
    }

    video.src = URL.createObjectURL(file)
  })
}
