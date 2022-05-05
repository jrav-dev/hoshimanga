import React from 'react'
import Head from 'next/head'
import ListOfCards from '../../components/ListOfCards'
import Ruta from '../../components/Ruta'

export default function Editorial({ data, editorial }) {
  const items = [
    { text: 'Editoriales', href: '/editoriales' },
    { text: editorial }
  ]

  return (
    <>
      <Head>
        <title>{editorial} - Hoshi Manga</title>
      </Head>

      <Ruta items={items} />

      <h2>{editorial}</h2>

      {data && <ListOfCards array={data} />}
    </>
  )
}

Editorial.getInitialProps = async ({ query }) => {
  const editorial = query.editorial.replace(/_/g, " ")

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mangas/editorial/${editorial}`)
  const data = await response.json()

  return { data, editorial }
}