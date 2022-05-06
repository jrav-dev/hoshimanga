import React from 'react'
import Head from 'next/head'
import Ruta from '../../components/Ruta'
import ListPaginated from '../../components/ListPaginated'

export default function Editorial({ data, editorial }) {
  const items = [
    { text: 'Editoriales', href: '/editoriales' },
    { text: editorial }
  ]

  return (
    <>
      <Head>
        <title>{editorial} | Hoshi Manga</title>
      </Head>

      <Ruta items={items} />

      <h2 className='borde__gris'>{editorial}</h2>

      {data && <div className='flexible'><h2>{data.msg}</h2></div> }


      <ListPaginated
        data={data.mangas}
        total={data.total}
        url={`/api/mangas/editorial/${editorial}`}
      />
    </>
  )
}

Editorial.getInitialProps = async ({ query }) => {
  const editorial = query.editorial.replace(/_/g, " ")

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mangas/editorial/${editorial}?limit=20&skip=0`)
  const data = await response.json()

  return { data, editorial }
}