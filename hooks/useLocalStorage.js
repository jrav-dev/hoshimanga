import React, { useState } from 'react'

export default function useLocalStorage(initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== "undefined") return JSON.parse(window.localStorage.getItem(initialValue))
  })

  const setValue = (value) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(initialValue, JSON.stringify(value))
      setStoredValue(value)
    }
  }

  const removeItem = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(initialValue)
    }
  }

  return [storedValue, setValue, removeItem]
}
