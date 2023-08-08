import React from 'react'
import Login from '../pages/auth/login/Login'
import ChangePassword from '../pages/auth/password-recovery/ChangePassword'
import ForgotPassword from '../pages/auth/password-recovery/ForgotPassword'

export const authRoutes = [
  { path: `${process.env.PUBLIC_URL}/login`, Component: <Login /> },
  { path: `${process.env.PUBLIC_URL}/forgot-password`, Component: <ForgotPassword /> },
  { path: `${process.env.PUBLIC_URL}/change-password`, Component: <ChangePassword /> },
  // { path: `${process.env.PUBLIC_URL}/pages/authentication/register-simple`, Component: <RegisterSimple /> },
  // { path: `${process.env.PUBLIC_URL}/pages/authentication/register-bg-img`, Component: <RegisterBgImg /> },
  // { path: `${process.env.PUBLIC_URL}/pages/authentication/register-video`, Component: <RegisterVideo /> },
  // { path: `${process.env.PUBLIC_URL}/pages/authentication/unlock-user`, Component: <UnlockUser /> },
  // { path: `${process.env.PUBLIC_URL}/pages/authentication/forget-pwd`, Component: <ForgetPwd /> },
  // { path: `${process.env.PUBLIC_URL}/pages/authentication/create-pwd`, Component: <CreatePwd /> },
  // { path: `${process.env.PUBLIC_URL}/pages/authentication/maintenance`, Component: <Maintenance /> },

  //Error
  // { path: `${process.env.PUBLIC_URL}/pages/error/error-page1`, Component: <ErrorPage1 /> },
  // { path: `${process.env.PUBLIC_URL}/pages/error/error-page2`, Component: <ErrorPage2 /> },
  // { path: `${process.env.PUBLIC_URL}/pages/error/error-page3`, Component: <ErrorPage3 /> },
  // { path: `${process.env.PUBLIC_URL}/pages/error/error-page4`, Component: <ErrorPage4 /> },
]
