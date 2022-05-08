import { useState, useEffect } from 'react'

export default function useUser() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let userSession = JSON.parse(window.localStorage.getItem("user"))
    setUser(userSession)

    setIsLoading(false)
  }, [])

  const removeUser = () => {
    window.localStorage.removeItem("user")
    window.localStorage.removeItem("cart")
    window.location.href = "/"
  }

  return { user, removeUser, isLoading }
}
