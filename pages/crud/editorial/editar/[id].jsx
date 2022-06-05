/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import style from "../../Insercion-Modificacion.module.css";
import Ruta from "../../../../components/Ruta";
import useForm from "../../../../hooks/useForm";
import { FieldsetInput } from "../../../../components/Fieldset";
import Boton from "../../../../components/Boton";

const CrudEditorialEditar = ({ data }) => {
  const {
    params,
    errors,
    readParam,
    handleSubmit,
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
