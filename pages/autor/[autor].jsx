import React from 'react'
import Head from 'next/head'
import ListOfCards from '../../components/ListOfCards'
import Ruta from '../../components/Ruta'

export default function Autor({ data, autor }) {
  const items = [
    { text: 'Mangas', href: '/mangas' },
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
  const autor = query.autor.replace(/_/g, " ")

  const response = await fetch(`${process.env.API_URL}/mangas/autor/${autor}`)
  const data = await response.json()

  return { data, autor }
}