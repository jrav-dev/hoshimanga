/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Head from "next/head";
import Ruta from "../components/Ruta";
import ListPaginated from "../components/ListPaginated";

const Novedades = ({ data }) => {

  const items = [{ text: "Novedades Manga" }];

  return (
    <>
      <Head>
        <title>Novedades | Hoshi Manga</title>
        <meta
          name="description"
          content="Todas las últimas novedades sobre el mundo del manga."
        />
      </Head>

      <Ruta items={items} />

      <ListPaginated
        data={data.mangas}
        total={data.total}
        url='/api/mangas/novedades'
      />
    </>
  );
};

Novedades.getInitialProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mangas/novedades?limit=20&skip=0`);
  const data = await response.json();

  return { data };
};

export default Novedades;
