/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Boton from "../../../components/Boton";
import BotonLink from "../../../components/BotonLink";
import ModalConfirmacion from "../../../components/Modal/ModalConfirmacion";
import {
  FieldsetInput,
  FieldsetSelectArray,
} from "../../../components/Fieldset";
import Ruta from "../../../components/Ruta";
import useModal from "../../../hooks/useModal";
import useFetch from "../../../hooks/useFetch";
import { toast } from "react-toastify";
import style from "../Listado.module.css";
import Paginacion from "../../../components/Paginacion";
import Loading from "../../../components/Loading";

const CrudMangaListado = ({ data }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [manga, setMangas] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [dataPaginated, setDataPaginated] = useState(data.mangas);
  const [pagina, setPagina] = useState(1)
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filtros, setFiltros] = useState({
    id: "",
    nombre: "",
    editorial: "",
    fecha: "",
    disponibilidad: "",
  });

  const pages = Math.ceil(data.total / limit);

  const editoriales = useFetch("/api/editoriales");

  const items = [{ href: "/crud", text: "Crud" }, { text: "Mangas" }];

  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(
      `/api/mangas/mangas?limit=${limit}&skip=${skip}&id=${filtros.id}` +
      `&nombre=${filtros.nombre}&editorial=${filtros.editorial}` +
      `&disponibilidad=${filtros.disponibilidad}&fecha=${filtros.fecha}`
    );
    const data = await response.json();

    setLoading(false)
    setDataPaginated(data.mangas);
  };

  const borrarMangas = async () => {
    window.location.href = window.location.pathname;
    closeModal();
    toast.success("Manga borrado correctamente");

    await fetch(`/api/mangas/${manga._id}/borrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
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

  // FILTROS

  const leerDato = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleClickFilter = async () => {
    await fetchData();
    setPagina(1)
    setSkip(0)
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
        <title>Listado Mangas | CRUD | Hoshi Manga</title>
      </Head>

      <Ruta items={items} />

      <div className="app__title">
        <h2>Listado de Mangas</h2>
        <BotonLink url="/crud/manga/insertar" texto="A??adir" />
      </div>

      <div className="app__listado__filtros contenedor">
        <div className="app__listado__filtros__grid">
          <FieldsetInput
            tipo="text"
            text="Nombre"
            className="formulario__fieldset"
            name="nombre"
            value={filtros.nombre}
            onChange={leerDato}
          />

          <FieldsetSelectArray
            text="Editorial"
            className="formulario__fieldset"
            name="editorial"
            array={editoriales.data && editoriales.data}
            value={filtros.editorial}
            onChange={leerDato}
          />

          <FieldsetSelectArray
            text="Disponibilidad"
            className="formulario__fieldset"
            name="disponibilidad"
            array={["En Stock", "Agotado"]}
            value={filtros.disponibilidad}
            onChange={leerDato}
          />

          <FieldsetInput
            tipo="date"
            text="Fecha Publicacion"
            className="formulario__fieldset"
            name="fecha"
            value={filtros.fecha}
            onChange={leerDato}
          />

          <FieldsetInput
            tipo="text"
            text="ID"
            className="formulario__fieldset"
            name="id"
            value={filtros.id}
            onChange={leerDato}
          />
        </div>

        <div className="app__listado__acciones">
          <Boton
            texto="Filtrar"
            icono="bi bi-funnel"
            click={handleClickFilter}
          />
          <Boton
            texto="Vaciar Filtros"
            icono="bi bi-trash"
            click={handleClickClearFilter}
            clase="rojo"
          />
        </div>
      </div>

      {isLoading ? <Loading />
        : <>
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

          <table className={style.listado__table}>
            <thead>
              <tr className={style.listado__table__row}>
                <th>ID</th>
                <th>Nombre</th>
                <th>Imagen</th>
                <th>Editorial</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dataPaginated.map((item, i) => (
                <tr key={i} className={style.listado__table__row}>
                  <td>{item._id}</td>

                  <td>
                    {item.nombre} - {item.tomo < 10 ? "0" + item.tomo : item.tomo}
                  </td>

                  <td>
                    {item.imagen.includes('mangas/') ?
                      <Image
                        src={`/img/${item.imagen}`}
                        alt={item.nombre}
                        width={130}
                        height={80}
                      />
                      : <img
                        src={item.imagen}
                        alt={item.nombre}
                      />}
                  </td>

                  <td>{item.editorial.nombre}</td>

                  <td>{parseFloat(item.precio).toFixed(2)} ???</td>

                  <td>{item.stock} uds.</td>

                  <td className={style.listado__table__row__actions}>
                    <BotonLink
                      url={`/crud/manga/editar/${item._id}`}
                      icono="bi bi-pencil"
                    />

                    <BotonLink
                      url={`/manga/${item.nombre.replace(/ /g, "_")}/${item.tomo}`}
                      icono="bi bi-eye"
                    />

                    <Boton
                      icono="bi bi-trash"
                      click={() => {
                        openModal();
                        setMangas({
                          nombre: item.nombre,
                          _id: item._id,
                          tomo: item.tomo,
                        });
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
        </>}

      {isOpen && (
        <ModalConfirmacion
          closeModal={closeModal}
          onClick={borrarMangas}
          text={`??Est??s seguro de que quieres borrar el manga '${manga.nombre} - ${manga.tomo}'?`}
        />
      )}
    </>
  );
};

CrudMangaListado.getInitialProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mangas/mangas?limit=10&skip=0`
  );
  const data = await response.json();

  return { data };
};

export default CrudMangaListado;
