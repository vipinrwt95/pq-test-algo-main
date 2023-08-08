import React from 'react'
import { Suspense } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Loader from '../layouts/mainLayout/loader'
import Callback from '../pages/auth/Callback'
import Login from '../pages/auth/login/Login'
import { authRoutes } from './AuthRoutes'
import LayoutRoutes from './LayoutRoutes'
import PrivateRoutes from './PrivateRoutes'

const Routers = () => {
  const authenticated = localStorage.getItem('authenticated')

  return (
    <BrowserRouter basename="/">
      <>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<PrivateRoutes />}>
              {authenticated ? (
                <Route
                  path={`${process.env.PUBLIC_URL}`}
                  element={<Navigate to={`${process.env.PUBLIC_URL}/dashboard`} />}
                />
              ) : (
                ''
              )}
              <Route path={`/*`} element={<LayoutRoutes />} />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/callback`} element={<Callback />} />
            <Route path={`${process.env.PUBLIC_URL}/login`} element={<Login />} />
            {authRoutes.map(({ path, Component }, i) => (
              <Route path={path} element={Component} key={i} />
            ))}
          </Routes>
        </Suspense>
      </>
    </BrowserRouter>
  )
}

export default Routers
