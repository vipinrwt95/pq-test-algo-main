import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ACCOUNT_BASIC_PROFILE_URL } from './constants'

/**
 *
 * @returns null
 * The sub-route of /account is not rendered directly, but is redirected to /account/basic-profile
 * On the sidebar menu, the /account route is rendered as a parent route, and the sub-routes are rendered as children
 * On the children configuration, the type="" is set so that the children doesn't show up in the sidebar
 * Rather we navigate to the sub-route directly from the onclick of the tab items on the children pages
 */
const Account = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(ACCOUNT_BASIC_PROFILE_URL)
  }, [navigate])

  return null
}

export default Account
