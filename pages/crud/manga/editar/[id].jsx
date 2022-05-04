/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
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
import Icono from "../../../../components/Icono";

const CrudMangaEditar = ({ data }) => {
  const {
    params,
    errors,
    hiddenFileInput,
    createObjectURL,
    readParam,
    handleSubmit,
    handleClickImagen,
  } = useForm(
    {
      nombre: data.nombre,
      descripcion: data.descripcion,
      editorial: data.editorial,
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
    "/crud/manga",
    "mangas"
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
            className={`formulario__fieldset ${
              errors && errors.nombre ? style.error : ""
            }`}
            value={params.nombre}
            onChange={readParam}
            error={errors && errors.nombre}
          />

          <FieldsetSelectArray
            name="editorial"
            text="Editorial *"
            className={`formulario__fieldset ${
              errors && errors.editorial ? style.error : ""
            }`}
            array={editoriales.data}
            value={params.editorial}
            onChange={readParam}
            error={errors && errors.editorial}
          />

          <FieldsetInput
            tipo="text"
            name="autor"
            text="Autor * (Si hay más de uno, separado por comas)"
            className={`formulario__fieldset ${
              errors && errors.autor ? style.error : ""
            }`}
            value={params.autor}
            onChange={readParam}
            error={errors && errors.autor}
          />

          <FieldsetInput
            tipo="date"
            name="fecha_publicacion"
            text="Fecha Publicación *"
            className={`formulario__fieldset ${
              errors && errors.fecha_publicacion ? style.error : ""
            }`}
            value={params.fecha_publicacion}
            onChange={readParam}
            error={errors && errors.fecha_publicacion}
          />

          <FieldsetInput
            tipo="number"
            name="tomo"
            text="Tomo *"
            className={`formulario__fieldset ${
              errors && errors.tomo ? style.error : ""
            }`}
            value={params.tomo}
            onChange={readParam}
            error={errors && errors.tomo}
          />

          <FieldsetInput
            tipo="number"
            name="precio"
            text="Precio *"
            step="0.01"
            className={`formulario__fieldset ${
              errors && errors.precio ? style.error : ""
            }`}
            value={params.precio}
            onChange={readParam}
            error={errors && errors.precio}
          />
        </div>

        <div className="formulario__grid columna contenedor">
          <FieldsetTextarea
            name="descripcion"
            text="Descripcion *"
            className={`formulario__fieldset ${
              errors && errors.descripcion ? style.error : ""
            }`}
            value={params.descripcion}
            onChange={readParam}
            error={errors && errors.descripcion}
          />
        </div>

        <div className="contenedor">
          <div className="formulario__fieldset">
            <input
              ref={hiddenFileInput}
              onChange={readParam}
              accept="image/*"
              type="file"
              name="imagen"
            />
            <div className={style.container_image}>
              <div
                className={`${style.btn_image} flexible`}
                onClick={handleClickImagen}
              >
                <Icono icono="bi bi-cloud-upload" />
                <p>Portada del Manga</p>

                <span className="boton flexible">
                  <Icono icono="bi bi-upload" />
                  Subir Imagen
                </span>
              </div>

              {params.imagen !== data.imagen ? (
                <div className={style.imagen}>
                  <img src={createObjectURL} alt="Imagen" />
                </div>
              ) : (
                <div className={style.imagen}>
                  <img src={`/img/${params.imagen}`} alt="Imagen" />
                </div>
              )}
            </div>
            <p>{errors && errors.imagen}</p>
          </div>
        </div>

        <div className="formulario__grid contenedor">
          <FieldsetInput
            tipo="number"
            name="stock"
            text="Unidades *"
            className={`formulario__fieldset ${
              errors && errors.stock ? style.error : ""
            }`}
            value={params.stock}
            onChange={readParam}
            error={errors && errors.stock}
          />

          <FieldsetInput
            tipo="text"
            name="isbn"
            text="ISBN *"
            className={`formulario__fieldset ${
              errors && errors.isbn ? style.error : ""
            }`}
            value={params.isbn}
            onChange={readParam}
            error={errors && errors.isbn}
          />

          <FieldsetInput
            tipo="number"
            name="num_paginas"
            text="Número de Páginas *"
            className={`formulario__fieldset ${
              errors && errors.num_paginas ? style.error : ""
            }`}
            value={params.num_paginas}
            onChange={readParam}
            error={errors && errors.num_paginas}
          />

          <FieldsetInput
            tipo="text"
            name="formato"
            text="Formato *"
            className={`formulario__fieldset ${
              errors && errors.formato ? style.error : ""
            }`}
            value={params.formato}
            onChange={readParam}
            error={errors && errors.formato}
          />

          <FieldsetInput
            tipo="text"
            name="tamaño"
            text="Tamaño *"
            className={`formulario__fieldset ${
              errors && errors.tamaño ? style.error : ""
            }`}
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

  const response = await fetch(`http://localhost:3000/api/mangas/${id}`);
  const data = await response.json();

  return { data };
};

export default CrudMangaEditar;
