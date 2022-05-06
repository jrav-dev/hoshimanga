/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Router from 'next/router'
import Ruta from "../../components/Ruta";
import Loading from '../../components/Loading'
import style from "./Mangas.module.css";
import ListOfCards from "../../components/ListOfCards";
import ListOfFilters from "../../components/ListOfFilters";
import Paginacion from "../../components/Paginacion";
import Icono from "../../components/Icono";
import Boton from "../../components/Boton";
import ListPaginated from "../../components/ListPaginated";

export default function Mangas({ data, keyword }) {
  const [showFiltros, setShowFiltros] = useState(false);
  const [filtrosMenu, setFiltrosMenu] = useState(data.filtrosMenu);
  const [dataPaginated, setDataPaginated] = useState(data.mangas);
  const [isLoading, setLoading] = useState(false);
  const [pagina, setPagina] = useState(1)
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);
  const [filtros, setFiltros] = useState({
    nombre: "",
    editorial: "",
    disponibilidad: "",
  });

  const pages = Math.ceil(data.total / limit);

  const items = [{ text: "Mangas" }];

  const fetchData = async (filtros) => {
    setLoading(true)
    const response = await fetch(
      `/api/mangas?limit=${limit}&skip=${skip}&q=${keyword}` +
      `&nombre=${filtros.nombre}&editorial=${filtros.editorial}` +
      `&disponibilidad=${filtros.disponibilidad}`
    );
    const data = await response.json();
    setDataPaginated(data.mangas);
    setLoading(false)
  };

  // Se ejecuta cuando cambia el skip

  useEffect(async () => {
    await fetchData(filtros);
  }, [skip]);

  // Se ejecuta cuando cambia el limite

  useEffect(async () => {
    await fetchData(filtros);
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

      switch (copy[index].titulo) {
        case "Editoriales":
          setFiltros({ ...filtros, editorial: copy[index].array[i].nombre });
          await fetchData({ ...filtros, editorial: copy[index].array[i].nombre });
          break;
        case "Colecciones":
          setFiltros({ ...filtros, nombre: copy[index].array[i].nombre });
          await fetchData({ ...filtros, nombre: copy[index].array[i].nombre });
          break;
        case "Disponibilidad":
          setFiltros({ ...filtros, disponibilidad: copy[index].array[i].nombre });
          await fetchData({ ...filtros, disponibilidad: copy[index].array[i].nombre });
          break;
      }
    } else {
      copy = [...filtrosMenu];
      copy[index].array[i].checked = false;

      switch (copy[index].titulo) {
        case "Editoriales":
          setFiltros({ ...filtros, editorial: "" });
          await fetchData({ ...filtros, editorial: "" });
          break;
        case "Colecciones":
          setFiltros({ ...filtros, nombre: "" });
          await fetchData({ ...filtros, nombre: "" });
          break;
        case "Disponibilidad":
          setFiltros({ ...filtros, disponibilidad: "" });
          await fetchData({ ...filtros, disponibilidad: "" });
          break;
      }
    }

    setFiltrosMenu(copy);
  };

  // VACIAR FILTROS

  const handleClickRemoveFilter = async (filtro) => {
    if (filtro === "keyword") {
      window.location.href = "/mangas";
    } else {
      setFiltros({ ...filtros, [filtro]: "" });
      await fetchData({ ...filtros, [filtro]: "" });
    }
  }

  return (
    <>
      <Head>
        <title>Mangas | Hoshi Manga</title>
      </Head>

      <Ruta items={items} />

      <div className={style.app__mangas__btn__filtrar}>
        <Boton icono='bi bi-filter' texto='Filtrar'
          click={() => setShowFiltros(!showFiltros)} />
      </div>

      <div className={style.app__mangas__grid}>
        <div className={`${style.app__mangas__filtros} ${showFiltros ? style.app__mangas__filtros__show : style.app__mangas__filtros__hide}`}>
          <div>
            {keyword && <>
              <h4>Búsqueda</h4>

              <p className={`tag__color ${style.tag__filtro}`}>
                {keyword}
                <span onClick={() => handleClickRemoveFilter('keyword')}>
                  <Icono icono='bi bi-x' />
                </span>
              </p>
            </>}
          </div>

          {filtrosMenu.map((item, i) => (
            <ListOfFilters
              key={item.titulo}
              array={item.array}
              titulo={item.titulo}
              clickCheck={handleClickFilter}
              clase={item.array.length > 12 ? "scroll" : ""}
              index={i}
            />
          ))}
        </div>

        <div>
          <ListPaginated
            data={data.mangas}
            total={data.total}
            clase={style.app__products}
            url='/api/mangas'
          />
        </div>
      </div>
    </>
  );
}

Mangas.getInitialProps = async ({ query }) => {
  let { q } = query;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mangas?limit=20&skip=0&q=${q}`
  );
  const data = await response.json();

  return { data, keyword: q ? q : "" };
};
