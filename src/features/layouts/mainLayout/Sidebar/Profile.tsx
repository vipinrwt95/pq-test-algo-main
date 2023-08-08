import { Link } from 'react-router-dom'
import { Image } from '../../../utils/ReusableElements'
import man from '../../../../assets/images/dashboard/1.png'
import { useUser } from 'src/features/services/api/authApi/useUser'
import styles from './Profile.module.css'
import classNames from 'classnames'
import { useState } from 'react'
import { useAppSelector } from 'src/app/hooks'
import { RootState } from 'src/app/store'

const Profile = () => {
  const { userGravatarURL, userFullName, userEmail } = useUser()
  const [userProfileImageError, setUserProfileImageError] = useState(false)

  const toggleIcon = useAppSelector((state: RootState) => state.themeCustomizer.toggleIcon)

  return (
    <div
      className={classNames('sidebar-user', styles.profileWrapper, styles.collapseTransition, {
        [styles.profileWrapperCollapsed]: toggleIcon,
        [styles.profileWrapperExpanded]: !toggleIcon,
      })}
    >
      <Link to={`${process.env.PUBLIC_URL}/app/users/userProfile`}>
        <Image
          attrImage={{
            className: classNames('rounded-circle', styles.avatarImage, styles.collapseTransition, {
              [styles.avatarImageCollapsed]: toggleIcon,
              [styles.avatarImageExpanded]: !toggleIcon,
            }),
            src: !userGravatarURL || userProfileImageError ? man : `${userGravatarURL}?d=404`,
            alt: '',
            onError: () => {
              setUserProfileImageError(true)
            },
          }}
        />
      </Link>
      <div>
        <h6 className="f-14 mb-0 mt-1">Name: {userFullName}</h6>
        <p className="txt-info font-montserrat">Email: {userEmail || ''}</p>
      </div>
    </div>
  )
}

export default Profile
