import { User, Link, Settings, Icon } from 'react-feather'
import { ACCOUNT_BASIC_PROFILE_URL, ACCOUNT_CHANGE_PASSWORD_URL } from 'src/features/pages/account/constants'

export interface Children {
  path: string
  title: string
  type: string
  active?: boolean
  children?: Children[]
}

export interface Items {
  title: string
  icon: Icon
  type: string
  path?: string
  badge?: string
  badgetxt?: string
  active: boolean
  badge1?: boolean
  bookmark?: boolean
  children?: Children[]
}

export interface MenuItems {
  menutitle?: string
  menucontent?: string
  Items: Items[]
}
export const MENUITEMS: MenuItems[] = [
  {
    menutitle: 'Main',
    menucontent: 'Menu items',
    Items: [
      {
        title: 'Links',
        icon: Link,
        type: 'link',
        active: false,
        path: `${process.env.PUBLIC_URL}/links`,
      },
      {
        title: 'Account',
        icon: User,
        type: 'link',
        active: false,
        path: `${process.env.PUBLIC_URL}/account`,
        children: [
          {
            // make type="" so that it doesn't show up in the sidebar
            type: '',
            title: 'Basic Profile',
            path: `${process.env.PUBLIC_URL}${ACCOUNT_BASIC_PROFILE_URL}`,
          },
          {
            // make type="" so that it doesn't show up in the sidebar
            type: '',
            title: 'Change Password',
            path: `${process.env.PUBLIC_URL}${ACCOUNT_CHANGE_PASSWORD_URL}`,
          },
        ],
      },

      {
        title: 'Settings',
        icon: Settings,
        type: 'link',
        active: false,
        path: `${process.env.PUBLIC_URL}/settings`,
      },
    ],
  },
]
