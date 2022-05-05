import React from 'react'
import Head from 'next/head'
import ListOfCards from '../../components/ListOfCards'
import Ruta from '../../components/Ruta'

export default function Serie({ data, serie }) {
  const items = [
    { text: 'Mangas', href: '/mangas' },
    { text: serie }
  ]

  return (
    <>
      <Head>
        <title>{serie} - Hoshi Manga</title>
      </Head>

      <Ruta items={items} />

      <h2>{serie}</h2>

      {data && <ListOfCards array={data} />}
    </>
  )
}

Serie.getInitialProps = async ({ query }) => {
  const serie = query.serie.replace(/_/g, " ")

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mangas/serie/${serie}`)
  const data = await response.json()

  return { data, serie }
}