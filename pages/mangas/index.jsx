import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Ruta from "../../components/Ruta";

import style from "./Mangas.module.css";
import ListOfCards from "../../components/ListOfCards";
import ListOfFilters from "../../components/ListOfFilters";
import Paginacion from "../../components/Paginacion";

export default function Mangas({ data, keyword }) {
  const [filtrosMenu, setFiltrosMenu] = useState(data.filtrosMenu);
  const [dataPaginated, setDataPaginated] = useState(data.mangas);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);
  const [filtros, setFiltros] = useState({
    nombre: "",
    editorial: "",
    disponibilidad: "",
  });

  const TOTAL = data.total;

  const items = [{ text: "Mangas" }];

  const fetchData = async () => {
    const response = await fetch(
      `/api/mangas?limit=${limit}&skip=${skip}&q=${keyword}` +
        `&nombre=${filtros.nombre}&editorial=${filtros.editorial}` +
        `&disponibilidad=${filtros.disponibilidad}`
    );
    const data = await response.json();
    setDataPaginated(data.mangas);
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

  // FILTROS

  const handleClickFilter = async (index, i) => {
    let copy = [];

    if (data.filtrosMenu[index].array[i].checked === false) {
      for (let j = 0; j < data.filtrosMenu[index].array.length; j++) {
        copy = [...filtrosMenu];
        copy[index].array[j].checked = false;
      }

      copy = [...filtrosMenu];
      copy[index].array[i].checked = true;

      if (copy[index].titulo === "Editoriales")
        setFiltros({ ...filtros, editorial: copy[index].array[i].nombre });

      await fetchData();
    } else {
      copy = [...filtrosMenu];
      copy[index].array[i].checked = false;
    }

    setFiltrosMenu(copy);
  };

  // VACIAR FILTROS

  const handleClickClearFilter = async () => {
    setFiltros({
      id: "",
      nombre: "",
      editorial: "",
      fecha: "",
      disponibilidad: "",
    });

    await fetchData();
  };
  
  return (
    <>
      <Head>
        <title>Mangas | Hoshi Manga</title>
      </Head>

      <Ruta items={items} />

      <div className={style.grid}>
        <div>
          {filtrosMenu.map((item, i) => (
            <ListOfFilters
              key={item.titulo}
              array={item.array}
              titulo={item.titulo}
              clickCheck={handleClickFilter}
              index={i}
            />
          ))}
        </div>

        <div>
          <ListOfCards array={dataPaginated} />

          <Paginacion
            limit={limit}
            skip={skip}
            nextPage={nextPage}
            prevPage={prevPage}
            setLimit={setLimit}
            dataPaginated={dataPaginated}
          />
        </div>
      </div>
    </>
  );
}

Mangas.getInitialProps = async ({ query }) => {
  const { q } = query;

  const response = await fetch(
    `http://localhost:3001/api/mangas?limit=20&skip=0&q=${q ? q : ""}`
  );
  const data = await response.json();

  return { data, keyword: q ? q : "" };
};
