import { useState, useEffect } from "react"

export default function useFetch(url) {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    
    const fetchData = async () => {
      setIsLoading(true)
      
      try {
        const response = await fetch(url)
        const json = await response.json()

        setData(json)
        setIsLoading(false)
      } catch (error) {
        console.log("Error: " + error)
      }
    }

    fetchData()
  }, [url])

  return { data, setData, error, setError, isLoading, setIsLoading }
}
