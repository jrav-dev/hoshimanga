import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Ruta from '../../components/Ruta'

import style from './Mangas.module.css'
import ListOfCards from '../../components/ListOfCards'
import ListOfFilters from '../../components/ListOfFilters'

export default function Mangas({ data, keyword }) {
  const [mangas, setMangas] = useState(data.mangas)
  const [filtros, setFiltros] = useState(data.filtros)
  const [filterKeys, setFilterKeys] = useState([
    { titulo: 'Editoriales', key: '' },
    { titulo: 'Colecciones', key: '' },
    { titulo: 'Disponibilidad', key: '' },
  ])

  const items = [{ text: 'Mangas' }]

  const handleClickCheck = (index, i) => {
    let copy, copyKeys, copyMangas = [], mangasFiltered = [...data.mangas]

    if (data.filtros[index].array[i].checked === false) {
      for (let j = 0; j < data.filtros[index].array.length; j++) {
        copy = [...filtros]
        copy[index].array[j].checked = false
        setFiltros(copy)
      }

      copy = [...filtros]
      copyKeys = [...filterKeys]
      copy[index].array[i].checked = true
      copyKeys[index].key = data.filtros[index].array[i].nombre

      filterKeys.map(item => {
        if (item.key !== '') {
          data.mangas.filter(manga => {
            if (manga.editorial === item.key) copyMangas.push(manga)
            if (manga.nombre === item.key) copyMangas.push(manga)
            if (item.key === "En Stock" && manga.stock > 0) copyMangas.push(manga)
            if (item.key === "Agotado" && manga.stock === 0) copyMangas.push(manga)
          })
        }
      })

    } else {
      copy = [...filtros]
      copyKeys = [...filterKeys]
      copy[index].array[i].checked = false
      copyKeys[index].key = ""
    }

    setFiltros(copy)
    setMangas([...mangasFiltered])
    setFilterKeys(copyKeys)
  }

  return (
    <>
      <Head><title>Mangas | Hoshi Manga</title></Head>

      <Ruta items={items} />

      <div className={style.grid}>
        <div>
          {data && data.filtros.map((item, i) => (
            <ListOfFilters
              key={item.titulo}
              array={item.array}
              titulo={item.titulo}
              clickCheck={handleClickCheck}
              index={i}
            />
          ))}
        </div>

        {data && <ListOfCards array={mangas} />}
      </div>
    </>
  )
}

Mangas.getInitialProps = async ({ query }) => {
  const { q } = query

  const response = await fetch(`http://localhost:3000/api/mangas?q=${q ? q : ''}`)
  const data = await response.json()

  return { data, keyword: q ? q : '' }
}