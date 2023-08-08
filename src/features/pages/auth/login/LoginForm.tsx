import React, { Fragment, useState } from 'react'
import { Form, FormGroup, Input, Label } from 'reactstrap'
import { Facebook, Instagram, Linkedin, Twitter } from 'react-feather'
import { SignIn } from '../../../utils/constants'
import { H4, H6, Btn, H5, UL, LI } from '../../../utils/ReusableElements'
import { useLoginMutation } from '../../../services/api/authApi/authApi'
import { LoginRequest } from '../types'
import { useAppDispatch } from '../../../../app/hooks'
import { setAuthentication } from '../authSlice'
import { Link, useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [togglePassword, setTogglePassword] = useState(false)

  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const loginWithJwt = async (e: React.MouseEvent) => {
    e.preventDefault()
    const credentials: LoginRequest = { username: email, password: password }
    try {
      login(credentials)
        .unwrap()
        .then(() => {
          dispatch(setAuthentication(true))
          navigate(`${process.env.PUBLIC_URL}/dashboard`)
        })
    } catch (error: any) {
      // console.log(error)
    }
  }

  return (
    <Fragment>
      <div className="login-card">
        <Form className="theme-form login-form">
          <H4>Login</H4>
          <H6>Welcome back! Log in to your account.</H6>
          <FormGroup>
            <Label>Email Address</Label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="icon-email"></i>
              </span>
              <Input
                className="form-control"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={email}
              />
            </div>
          </FormGroup>
          <FormGroup className="position-relative">
            <Label>Password</Label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="icon-lock"></i>
              </span>
              <Input
                className="form-control"
                type={togglePassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                defaultValue={password}
                required
              />
              <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}>
                <span className={togglePassword ? '' : 'show'}></span>
              </div>
            </div>
          </FormGroup>
          <FormGroup>
            <div className="checkbox">
              <Input id="checkbox1" type="checkbox" />
              <Label className="text-muted" for="checkbox1">
                Remember password
              </Label>
            </div>
            <Link className="link" to={`${process.env.PUBLIC_URL}/forgot-password`}>
              Forgot password?
            </Link>
          </FormGroup>
          <FormGroup>
            <Btn
              attrBtn={{
                className: 'btn-block',
                color: 'primary',
                type: 'submit',
                disabled: isLoading,
                onClick: (e: React.MouseEvent) => loginWithJwt(e),
              }}
            >
              {isLoading ? 'LOADING...' : SignIn}
            </Btn>
          </FormGroup>
          <div className="login-social-title">
            <H5>Sign in with</H5>
          </div>
          <FormGroup>
            <UL attrUL={{ as: 'ul', className: 'login-social flex-row' }}>
              <LI>
                <a href="https://www.linkedin.com/login">
                  <Linkedin />
                </a>
              </LI>
              <LI>
                <a href="https://www.linkedin.com/login">
                  <Twitter />
                </a>
              </LI>
              <LI>
                <a href="https://www.linkedin.com/login">
                  <Facebook />
                </a>
              </LI>
              <LI>
                <a href="https://www.instagram.com/login">
                  <Instagram />
                </a>
              </LI>
            </UL>
          </FormGroup>
          {/* <P>Don't have account?<a className="ms-2" href="sign-up.html">Create Account</a></P> */}
        </Form>
      </div>
    </Fragment>
  )
}

export default LoginForm
