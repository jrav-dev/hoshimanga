/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Head from "next/head";
import ListOfCards from "../components/ListOfCards";
import Ruta from "../components/Ruta";
import Loading from "../components/Loading";
import Paginacion from "../components/Paginacion";

const Novedades = ({ data }) => {
  const [dataPaginated, setDataPaginated] = useState(data);
  const [isLoading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);

  const items = [{ text: "Novedades Manga" }];

  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(
      `/api/mangas/novedades?limit=${limit}&skip=${skip}`
    );
    const data = await response.json();
    setDataPaginated(data);
    setLoading(false)
  };

  // Se ejecuta cuando cambia el skip

  useEffect(async () => {
    await fetchData();
  }, [skip]);

  // Se ejecuta cuando cambia el limite

  useEffect(async () => {
    await fetchData();
  }, [limit]);

  // METODOS PAGINACION

  const prevPage = () => {
    if (skip > 0) {
      setSkip(skip - limit);
    }
  };

  const nextPage = () => {
    if (dataPaginated.length === limit) {
      setSkip(skip + limit);
    }
  };

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

      {isLoading
        ? <Loading />
        : <>
          {dataPaginated.length > 0
            ? <>
              <Paginacion
                limit={limit}
                skip={skip}
                nextPage={nextPage}
                prevPage={prevPage}
                setLimit={setLimit}
                setSkip={setSkip}
                dataPaginated={dataPaginated}
                total={dataPaginated.length}
              />

              <ListOfCards array={dataPaginated} />

              <Paginacion
                limit={limit}
                skip={skip}
                nextPage={nextPage}
                prevPage={prevPage}
                setLimit={setLimit}
                setSkip={setSkip}
                dataPaginated={dataPaginated}
                total={dataPaginated.length}
              />
            </>
            : <h2 className="flexible">No hay mangas con los filtros seleccionados</h2>
          }
        </>}
    </>
  );
};

Novedades.getInitialProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mangas/novedades?limit=20&skip=0`);
  const data = await response.json();

  return { data };
};

export default Novedades;
