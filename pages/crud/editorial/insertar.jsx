/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Head from "next/head";
import style from "../Insercion-Modificacion.module.css";
import Ruta from "../../../components/Ruta";
import useForm from "../../../hooks/useForm";
import {
  FieldsetInput,
  FieldsetSelectArray,
  FieldsetTextarea,
} from "../../../components/Fieldset";
import useFetch from "../../../hooks/useFetch";
import Boton from "../../../components/Boton";
import Icono from "../../../components/Icono";

const CrudEditorialInsertar = () => {
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
      nombre: "",
      imagen: "",
    },
    "/api/editoriales/insertar",
    "/crud/editorial",
    "editoriales"
  );

  const items = [
    { href: "/crud", text: "Crud" },
    { href: "/crud/editorial", text: "Editoriales" },
    { text: "Insertar Editorial" },
  ];

  return (
    <>
      <Head>
        <title>Insertar Editorial | CRUD | Hoshi Manga</title>
      </Head>

      <Ruta items={items} />

      <form
        onSubmit={handleSubmit}
        className="formulario__container"
        encType="multipart/form-data"
      >
        <div className="app__title">
          <p></p>
          <Boton texto="Enviar" click={handleSubmit} />
        </div>

        <div className="formulario__grid columna contenedor">
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
              
              {params.imagen && (
                <div className={style.imagen}>
                  <img src={createObjectURL} alt="" />
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

export default CrudEditorialInsertar;
