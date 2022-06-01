import React from 'react'
import Head from 'next/head'
import ListOfCards from '../components/ListOfCards'

const Home = ({ data }) => {
  return (
    <>
      <Head>
        <title>Hoshi Manga</title>
      </Head>

      <h2>Últimas Novedades</h2>

      <ListOfCards array={data} />
    </>
  )
}

Home.getInitialProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mangas/novedades`);
  const data = await response.json();

  return { data };
};

export default Home
