import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layouts'
import { routes } from './Routes'

const LayoutRoutes = () => {
  return (
    <>
      <Routes>
        {routes.map(({ path, Component }, i) => (
          <Route element={<MainLayout />} key={i}>
            <Route path={path} element={Component} />
          </Route>
        ))}
      </Routes>
    </>
  )
}

export default LayoutRoutes
