import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Icono from '../components/Icono'
import ListOfCards from '../components/ListOfCards'
import Loading from '../components/Loading'
import useFetch from '../hooks/useFetch'

import style from '../styles/Index.module.css'

const Home = () => {
  const { data } = useFetch('/api/mangas/novedades')

  return (
    <>
      <Head>
        <title>Hoshi Manga</title>
      </Head>

      <div className={style.titulo}>
        <h2>Novedades Manga</h2>

        <Link href="/novedades">
          <a>Ver más <Icono icono='bi bi-link' /></a>
        </Link>
      </div>

      {data ? <ListOfCards array={data.slice(0, 6)} /> : <div className="flexible"><Loading /></div>}
    </>
  )
}

export default Home
