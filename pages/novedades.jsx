import React from "react";
import Head from "next/head";
import ListOfCards from "../components/ListOfCards";
import Ruta from "../components/Ruta";

const Novedades = ({ data }) => {
  const items = [{ text: "Novedades Manga" }];

  return (
    <>
      <Head>
        <title>Novedades - Hoshi Manga</title>
        <meta
          name="description"
          content="Todas las últimas novedades sobre el mundo del manga."
        />
      </Head>

      <Ruta items={items} />

      <h2>Novedades</h2>

      {data && <ListOfCards array={data} />}
    </>
  );
};

Novedades.getInitialProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mangas/novedades`);
  const data = await response.json();

  return { data };
};

export default Novedades;
