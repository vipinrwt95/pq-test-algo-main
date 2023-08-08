import { StandardErrorResponse } from 'src/features/types'

export const getErrorDescription = (errorData: unknown, fallback: string) => {
  const error = errorData as StandardErrorResponse
  const descriptionData = (error as StandardErrorResponse)?.error?.data?.error?.description

  const reasonData = (error as StandardErrorResponse)?.error?.data?.error?.fields
  const reasons = reasonData.map((el) => (typeof el === 'string' ? el : JSON.stringify(el))).join(', ')

  const description = Array.isArray(descriptionData)
    ? descriptionData[0]
    : typeof descriptionData === 'string'
    ? descriptionData
    : fallback

  return reasons ? `${description}. Failed because of ${reasons}` : description
}
