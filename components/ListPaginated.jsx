/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Head from "next/head";
import ListOfCards from "../components/ListOfCards";
import Ruta from "../components/Ruta";
import Loading from "../components/Loading";
import Paginacion from "../components/Paginacion";

const ListPaginated = ({ data, url, total, clase }) => {
  const [dataPaginated, setDataPaginated] = useState(data);
  const [isLoading, setLoading] = useState(false);
  const [pagina, setPagina] = useState(1)
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);

  const pages = Math.ceil(total / limit);

  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(
      `${url}?limit=${limit}&skip=${skip}`
    );
    const data = await response.json();
    setDataPaginated(data.mangas);
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
      setPagina(parseInt(pagina) - 1)
    }
  };

  const nextPage = () => {
    if (dataPaginated.length === limit) {
      setSkip(skip + limit);
      setPagina(parseInt(pagina) + 1)
    }
  };

  return (
    <>
      {isLoading
        ? <Loading />
        : <>
          {dataPaginated.length > 0
            ? <>
              <Paginacion
                limit={limit}
                skip={skip}
                pages={pages}
                page={pagina}
                nextPage={nextPage}
                prevPage={prevPage}
                setLimit={setLimit}
                setSkip={setSkip}
                setPagina={setPagina}
                dataPaginated={dataPaginated}
                total={dataPaginated.length}
              />

              <div className={clase ? clase : null}>
                <ListOfCards array={dataPaginated} />
              </div>

              <Paginacion
                limit={limit}
                skip={skip}
                pages={pages}
                page={pagina}
                nextPage={nextPage}
                prevPage={prevPage}
                setLimit={setLimit}
                setSkip={setSkip}
                setPagina={setPagina}
                dataPaginated={dataPaginated}
                total={dataPaginated.length}
              />
            </>
            : <h2 className="flexible">No hay productos con los filtros seleccionados</h2>
          }
        </>}
    </>
  );
};

export default ListPaginated;
