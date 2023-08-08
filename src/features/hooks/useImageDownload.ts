import { useCallback, useState } from 'react'
import { saveAs } from 'file-saver'

export const useImageDownload = ({
  url,
  fileName,
  errorCallback,
}: {
  url?: string
  fileName?: string
  errorCallback?: () => void
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleDownload = useCallback(async () => {
    if (!url) return

    setIsLoading(true)
    setIsError(false)

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const blob = await response.blob()
      saveAs(blob, fileName || 'image.png')
    } catch (error) {
      setIsError(true)

      if (errorCallback) errorCallback()
    } finally {
      setIsLoading(false)
    }
  }, [errorCallback, fileName, url])

  return {
    isLoading,
    isError,
    handleDownload,
  }
}
