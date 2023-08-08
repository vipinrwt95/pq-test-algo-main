import React, { useEffect } from 'react'
import Loader from '../../layouts/mainLayout/loader'
import { useNavigate } from 'react-router-dom'

const Callback = () => {
  const navigate = useNavigate()
  const authenticated = localStorage.getItem('authenticated')
  useEffect(() => {
    if (authenticated === 'true' && authenticated !== null) {
      return navigate(`${process.env.PUBLIC_URL}/dashboard`)
    } else {
      return navigate(`${process.env.PUBLIC_URL}/login`)
    }
  })

  return (
    <div>
      <Loader />
    </div>
  )
}

export default Callback
