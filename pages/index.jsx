import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Icono from '../components/Icono'
import ListOfCards from '../components/ListOfCards'
import Loading from '../components/Loading'
import useFetch from '../hooks/useFetch'
import style from '../styles/Index.module.css'

const Home = ({ data }) => {

  return (
    <>
      <Head>
        <title>Hoshi Manga</title>
      </Head>

      <div className={style.titulo}>
        <h2>Últimas Novedades</h2>

        <Link href="/novedades">
          <a>Ver más <Icono icono='bi bi-link' /></a>
        </Link>
      </div>

      <ListOfCards array={data} />
    </>
  )
}

Home.getInitialProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mangas/novedades?limit=12&skip=0`);
  const data = await response.json();

  return { data };
};

export default Home
