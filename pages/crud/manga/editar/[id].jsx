/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import style from "../../Insercion-Modificacion.module.css";
import Ruta from "../../../../components/Ruta";
import useForm from "../../../../hooks/useForm";
import {
  FieldsetInput,
  FieldsetSelectArray,
  FieldsetTextarea,
} from "../../../../components/Fieldset";
import useFetch from "../../../../hooks/useFetch";
import Boton from "../../../../components/Boton";

const CrudMangaEditar = ({ data }) => {
  console.log(data)
  const {
    params,
    errors,
    readParam,
    handleSubmit,
  } = useForm(
    {
      nombre: data.nombre,
      descripcion: data.descripcion,
      editorial: data.editorial?.nombre || "",
      autor: data.autor,
      tomo: data.tomo,
      precio: data.precio,
      imagen: data.imagen,
      fecha_publicacion: data.fecha_publicacion,
      stock: data.stock,
      isbn: data.isbn,
      num_paginas: data.num_paginas,
      formato: data.formato,
      tamaño: data.tamaño,
    },
    `/api/mangas/${data._id}/editar`,
    "/crud/manga"
  );

  const items = [
    { href: "/crud", text: "Crud" },
    { href: "/crud/manga", text: "Mangas" },
    { text: `Editar Manga - ${data.nombre} ${data.tomo}` },
  ];

  const editoriales = useFetch("/api/editoriales");

  return (
    <>
      <Head>
        <title>
          {data.nombre} - {data.tomo} | CRUD | Hoshi Manga
        </title>
      </Head>

      <Ruta items={items} />

      <form
        onSubmit={handleSubmit}
        className="formulario__container"
        encType="multipart/form-data"
      >
        <div className="app__title">
          <p>* Rellene los campos obligatorios</p>
          <Boton texto="Actualizar" />
        </div>

        <div className="formulario__grid contenedor">
          <FieldsetInput
            tipo="text"
            name="nombre"
            text="Nombre *"
            value={params.nombre}
            onChange={readParam}
            error={errors && errors.nombre}
          />

          <FieldsetSelectArray
            name="editorial"
            text="Editorial *"
            array={editoriales.data}
            value={params.editorial}
            onChange={readParam}
            error={errors && errors.editorial}
          />

          <FieldsetInput
            tipo="text"
            name="autor"
            text="Autor * (Si hay más de uno, separado por comas)"
            value={params.autor}
            onChange={readParam}
            error={errors && errors.autor}
          />

          <FieldsetInput
            tipo="date"
            name="fecha_publicacion"
            text="Fecha Publicación *"
            value={params.fecha_publicacion}
            onChange={readParam}
            error={errors && errors.fecha_publicacion}
          />

          <FieldsetInput
            tipo="number"
            name="tomo"
            text="Tomo *"
            value={params.tomo}
            onChange={readParam}
            error={errors && errors.tomo}
          />

          <FieldsetInput
            tipo="number"
            name="precio"
            text="Precio *"
            step="0.01"
            value={params.precio}
            onChange={readParam}
            error={errors && errors.precio}
          />
        </div>

        <div className="formulario__grid columna contenedor">
          <FieldsetTextarea
            name="descripcion"
            text="Descripcion *"
            value={params.descripcion}
            onChange={readParam}
            error={errors && errors.descripcion}
          />

          <FieldsetInput
            tipo="text"
            name="imagen"
            text="URL Imagen *"
            value={params.imagen}
            onChange={readParam}
            error={errors && errors.imagen}
          />

          <div className={style.imagen}>
            {params.imagen.includes('mangas/')
              ? <img src={`/img/${params.imagen}`} alt="" />
              : <img src={params.imagen} alt="" />}
          </div>
        </div>

        <div className="formulario__grid contenedor">
          <FieldsetInput
            tipo="number"
            name="stock"
            text="Unidades *"
            value={params.stock}
            onChange={readParam}
            error={errors && errors.stock}
          />

          <FieldsetInput
            tipo="text"
            name="isbn"
            text="ISBN *"
            value={params.isbn}
            onChange={readParam}
            error={errors && errors.isbn}
          />

          <FieldsetInput
            tipo="number"
            name="num_paginas"
            text="Número de Páginas *"
            value={params.num_paginas}
            onChange={readParam}
            error={errors && errors.num_paginas}
          />

          <FieldsetInput
            tipo="text"
            name="formato"
            text="Formato *"
            value={params.formato}
            onChange={readParam}
            error={errors && errors.formato}
          />

          <FieldsetInput
            tipo="text"
            name="tamaño"
            text="Tamaño *"
            value={params.tamaño}
            onChange={readParam}
            error={errors && errors.tamaño}
          />
        </div>
      </form>
    </>
  );
};

CrudMangaEditar.getInitialProps = async ({ query }) => {
  const { id } = query;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mangas/${id}`
  );
  const data = await response.json();

  return { data };
};

export default CrudMangaEditar;
