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

const CrudEditorialEditar = ({ data }) => {
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
      imagen: data.imagen,
    },
    `/api/editoriales/${data._id}/editar`,
    "/crud/editorial",
    "editoriales"
  );

  const items = [
    { href: "/crud", text: "Crud" },
    { href: "/crud/editorial", text: "Editoriales" },
    { text: data.nombre },
  ];

  return (
    <>
      <Head>
        <title>{data.nombre} | CRUD | Hoshi Manga</title>
      </Head>

      <Ruta items={items} />

      <form
        onSubmit={handleSubmit}
        className="formulario__container"
        encType="multipart/form-data"
      >
        <div className="app__title">
          <p></p>
          <Boton texto="Actualizar" click={handleSubmit} />
        </div>

        <div className="formulario__grid columna contenedor">
          <FieldsetInput
            tipo="text"
            name="nombre"
            text="Nombre *"
            value={params.nombre}
            onChange={readParam}
            error={errors && errors.nombre}
          />

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
                <p>Logo de la Editorial</p>

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
      </form>
    </>
  );
};

CrudEditorialEditar.getInitialProps = async ({ query }) => {
  const { id } = query;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/editoriales/${id}`);
  const data = await response.json();

  return { data };
};

export default CrudEditorialEditar;
