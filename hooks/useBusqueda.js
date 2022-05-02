import React, { useState } from 'react'
import useFetch from './useFetch'

export default function useBusqueda(tipo, url) {
  const { data, setData, error, setError, isLoading, setIsLoading } = useFetch(url)
  const [search, setSearch] = useState('')
  const [dataResults, setDataResults] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    setIsLoading(true)
    getData()
  }

  const handleChange = e => {
    setSearch(e.target.value)
    setIsLoading(true)
    getData()
  }

  const getData = () => {
    if (search === "") {
      setError(null)
      setDataResults(null)
    } else {
      if (data[tipo]) {
        const filterResults = data[tipo].filter(item => {
          if (item.nombre) {
            if (item.nombre.toLowerCase().includes(search.toLowerCase())) {
              return item
            }
          } else if (item.titulo) {
            if (item.titulo.toLowerCase().includes(search.toLowerCase())) {
              return item
            }
          }
        })
        if (filterResults.length > 0) {
          setDataResults({ [tipo]: filterResults })
        } else {
          setError("No hay resultados")
          setDataResults(null)
        }
      }
    }
    setIsLoading(false)
  }

  function ordenAlfabetico(array) {
    array.sort((a, b) => {
      if (a.nombre == b.nombre) {
        return 0;
      } else if (a.nombre < b.nombre) {
        return -1;
      }
      if (a.titulo == b.titulo) {
        return 0;
      } else if (a.titulo < b.titulo) {
        return -1;
      }
      return 1;
    });
  }

  if (data) {
    ordenAlfabetico(data[tipo]);
  }

  return {
    data: dataResults !== null ? dataResults : data, setData,
    error, isLoading, setIsLoading,
    search, handleSubmit, handleChange
  }
}
