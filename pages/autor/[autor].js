import React from 'react'
import Head from 'next/head'
import ListOfCards from '../../components/ListOfCards'
import Ruta from '../../components/Ruta'

export default function Autor({ data, autor }) {
  const items = [
    { text: 'Manga', href: '/manga' },
    { text: autor }
  ]

  return (
    <>
      <Head>
        <title>{autor} - Hoshi Manga</title>
      </Head>

      <Ruta items={items} />

      <h2>{autor}</h2>

      {data && <ListOfCards array={data} />}
    </>
  )
}

Autor.getInitialProps = async ({ query }) => {
  const autor = query.autor.replace(/-/g, " ")

  const response = await fetch(`http://localhost:3000/api/mangas/autor/${autor}`)
  const data = await response.json()

  return { data, autor }
}