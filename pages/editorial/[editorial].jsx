import React from 'react'
import Head from 'next/head'
import Ruta from '../../components/Ruta'
import ListPaginated from '../../components/ListPaginated'

export default function Editorial({ data, editorial }) {
  const items = [
    { text: 'Editoriales', href: '/editoriales' },
    { text: editorial }
  ]

  const style = {
    color: 'white',
    fontSize: 200
  };

  return (
    <>
      <Head>
        <title>{editorial} | Hoshi Manga</title>
      </Head>

      <Ruta items={items} />

      <h2>{editorial}</h2>

      {data.msg
        ? <div className='flexible'><h2>{data.msg}</h2></div>
        : <ListPaginated
          data={data.mangas}
          total={data.total}
          url={`/api/mangas/editorial/${editorial}`}
        />}
    </>
  )
}

Editorial.getInitialProps = async ({ query }) => {
  const editorial = query.editorial.replace(/_/g, " ")

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mangas/editorial/${editorial}?limit=20&skip=0`)
  const data = await response.json()

  return { data, editorial }
}