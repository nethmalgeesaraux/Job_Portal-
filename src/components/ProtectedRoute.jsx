import React from 'react'
import { RedirectToSignIn, useAuth } from '@clerk/react'

const ProtectedRoute = ({ children }) => {
  const { isLoaded, userId } = useAuth()

  if (!isLoaded) {
    return null
  }

  if (!userId) {
    return <RedirectToSignIn />
  }

  return children
}

export default ProtectedRoute
