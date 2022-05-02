import React from 'react'
import useUser from './useUser'

export default function useUserValidation() {
  const { user, isLoading } = useUser()

  const validateUserAdmin = () => {
    if (user && user.is_admin === true) {
      return true
    } else {
      return false
    }
  }

  const userOK = isLoading ? null : validateUserAdmin()

  return { userOK, isLoading }
}
