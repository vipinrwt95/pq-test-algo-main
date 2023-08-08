import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { LI, Btn } from '../../../../utils/ReusableElements'
import { useLogoutMutation } from '../../../../services/api/authApi/authApi'
import { useAppDispatch } from '../../../../../app/hooks'
import { setAuthentication } from '../../../../pages/auth/authSlice'

const LogoutClass = () => {
  const dispatch = useAppDispatch()
  const [logout] = useLogoutMutation()
  const history = useNavigate()
  const Logout = async () => {
    await logout()
      .unwrap()
      .then(() => {
        dispatch(setAuthentication(false))
        history(`${process.env.PUBLIC_URL}/login`)
      })
  }

  return (
    <Fragment>
      <LI attrLI={{ className: 'onhover-dropdown p-0', onClick: () => Logout() }}>
        <Btn attrBtn={{ className: 'btn btn-primary-light', color: 'default' }}>
          <div>Log out</div>
        </Btn>
      </LI>
    </Fragment>
  )
}

export default LogoutClass
