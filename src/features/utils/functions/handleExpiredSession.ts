import { setPageOnLoadMessage } from 'src/features/hooks/usePageOnLoadMessage'

export const handleExpiredSession = () => {
  setPageOnLoadMessage('Your session expired, please login again.')
  const loginUrl = `${process.env.PUBLIC_URL}/login`

  // dispatch a custom event to trigger redirect to login page. The event is listened at the closes child of the root element at
  window.dispatchEvent(new CustomEvent('sessionExpired', { detail: loginUrl }))
}
