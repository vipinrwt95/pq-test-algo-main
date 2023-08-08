import Account from '../pages/account/Account'
import Links from '../pages/links'
import Settings from '../pages/settings'
import AccountBasicProfile from '../pages/account/AccountBasicProfile'
import AccountChangePassword from '../pages/account/AccountChangePassword'
import { ACCOUNT_BASIC_PROFILE_URL, ACCOUNT_CHANGE_PASSWORD_URL } from '../pages/account/constants'

export const routes = [
  { path: `${process.env.PUBLIC_URL}/links`, Component: <Links /> },
  { path: `${process.env.PUBLIC_URL}/account`, Component: <Account /> },
  { path: `${process.env.PUBLIC_URL}${ACCOUNT_BASIC_PROFILE_URL}`, Component: <AccountBasicProfile /> },
  { path: `${process.env.PUBLIC_URL}${ACCOUNT_CHANGE_PASSWORD_URL}`, Component: <AccountChangePassword /> },
  { path: `${process.env.PUBLIC_URL}/settings`, Component: <Settings /> },
]
