import { useState, useCallback, useEffect } from 'react'

// D is DataType, and T is TransformedDataType
type UseFetchReturn<D, T> = {
  data: D | null
  transformedData: T | null
  loading: boolean
  error: string | null
  fetchData: () => void
}

interface UseJsonProps<D, T> {
  jsonUrl: string
  transform: (data: D) => T
  fetchOnMount?: boolean
}

export const useFetchJson = <D, T>(props: UseJsonProps<D, T>): UseFetchReturn<D, T> => {
  const { jsonUrl, fetchOnMount, transform } = props

  const [data, setData] = useState<D | null>(null)
  const [transformedData, setTransformedData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(jsonUrl)
      if (!response.ok) {
        throw new Error('Failed to fetch file')
      }
      const json = await response.json()

      setData(json)
      setTransformedData(transform(json))
    } catch (error) {
      setError('Fetching data failed.')
    }

    setLoading(false)
  }, [jsonUrl, transform])

  useEffect(() => {
    if (fetchOnMount) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { transformedData, data, loading, error, fetchData }
}
