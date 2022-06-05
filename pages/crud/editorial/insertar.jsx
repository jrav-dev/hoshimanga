/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import style from "../Insercion-Modificacion.module.css";
import Ruta from "../../../components/Ruta";
import useForm from "../../../hooks/useForm";
import { FieldsetInput } from "../../../components/Fieldset";
import Boton from "../../../components/Boton";

const CrudEditorialInsertar = () => {
  const {
    params,
    errors,
    readParam,
    handleSubmit,
  } = useForm(
    {
      nombre: "",
      imagen: "",
    },
    "/api/editoriales/insertar",
    "/crud/editorial"
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
            value={params.nombre}
            onChange={readParam}
            error={errors && errors.nombre}
          />

          <FieldsetInput
            tipo="text"
            name="imagen"
            text="URL Imagen *"
            value={params.imagen}
            onChange={readParam}
            error={errors && errors.imagen}
          />

          {params.imagen !== ""
            && <div className={style.imagen}>
              <img src={params.imagen} alt="" />
            </div>}
        </div>
      </form>
    </>
  );
};

export default CrudEditorialInsertar;
