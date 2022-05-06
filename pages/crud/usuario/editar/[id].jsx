/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Head from "next/head";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import Ruta from "../../../../components/Ruta";
import useForm from "../../../../hooks/useForm";
import { FieldsetInput } from "../../../../components/Fieldset";
import Boton from "../../../../components/Boton";
import Icono from "../../../../components/Icono";

const CrudUsuarioEditar = ({ data }) => {
  const [user, setValue] = useLocalStorage("user");
  const { params, setParams, errors, readParam, handleSubmit } = useForm(
    {
      _id: data._id,
      nombre: data.nombre,
      apellidos: data.apellidos,
      email: data.email,
      password: "",
      direccion: data.direccion,
      poblacion: data.poblacion,
      pais: data.pais,
      codigo_postal: data.codigo_postal,
      telefono: data.telefono,
      dni: data.dni,
      is_admin: data.is_admin,
    },
    "/api/usuarios/editar",
    "/crud/usuario"
  );

  const items = [
    { href: "/crud", text: "Crud" },
    { href: "/crud/usuario", text: "Usuarios" },
    { text: `Editar Usuario - ${data.nombre}` },
  ];

  const handleSubmitUsuario = (e) => {
    e.preventDefault();

    if (user.nombre === params.nombre) {
      setValue({
        _id: user._id,
        nombre: params.nombre,
        apellidos: params.apellidos,
        email: params.email,
        is_admin: params.is_admin,
      });
    }

    handleSubmit(e)
  };

  return (
    <>
      <Head>
        <title>{data.nombre} | CRUD | Hoshi Manga</title>
      </Head>

      <Ruta items={items} />

      <form onSubmit={handleSubmitUsuario} className="formulario__container">
        <div className="app__title">
          <h2>
            {data.nombre} {data.apellidos}
          </h2>
          <Boton texto="Actualizar" click={handleSubmitUsuario} />
        </div>

        <div className="formulario__grid contenedor">
          <FieldsetInput
            className="formulario__fieldset"
            tipo="text"
            name="nombre"
            text="Nombre"
            value={params.nombre}
            onChange={readParam}
          />

          <FieldsetInput
            className="formulario__fieldset"
            tipo="text"
            name="apellidos"
            text="Apellidos"
            value={params.apellidos}
            onChange={readParam}
          />

          <FieldsetInput
            className="formulario__fieldset"
            tipo="email"
            name="email"
            text="Correo Electrónico"
            value={params.email}
            onChange={readParam}
          />

          <FieldsetInput
            className="formulario__fieldset"
            tipo="password"
            name="password"
            text="Contraseña"
            value={params.password}
            onChange={readParam}
          />
        </div>

        <div className="formulario__grid contenedor">
          <FieldsetInput
            className="formulario__fieldset"
            tipo="text"
            name="direccion"
            text="Dirección"
            value={params.direccion}
            onChange={readParam}
          />

          <FieldsetInput
            className="formulario__fieldset"
            tipo="text"
            name="poblacion"
            text="Población"
            value={params.poblacion}
            onChange={readParam}
          />

          <FieldsetInput
            className="formulario__fieldset"
            tipo="text"
            name="pais"
            text="Pais"
            value={params.pais}
            onChange={readParam}
          />

          <FieldsetInput
            className="formulario__fieldset"
            tipo="number"
            name="codigo_postal"
            text="Código Postal"
            value={params.codigo_postal}
            onChange={readParam}
          />

          <FieldsetInput
            className="formulario__fieldset"
            tipo="text"
            name="telefono"
            text="Teléfono"
            value={params.telefono}
            onChange={readParam}
          />

          <FieldsetInput
            className="formulario__fieldset"
            tipo="text"
            name="dni"
            text="DNI"
            value={params.dni}
            onChange={readParam}
          />

          <div
            className={`formulario__checkbox ${
              params.is_admin ? "formulario__checkbox__active" : ""
            }`}
          >
            <label htmlFor="is_admin">Administrador</label>
            <span
              onClick={() => {
                setParams({
                  ...params,
                  is_admin: !params.is_admin,
                });
              }}
            >
              <Icono icono="bi bi-check" />
            </span>
          </div>
        </div>
      </form>
    </>
  );
};

CrudUsuarioEditar.getInitialProps = async ({ query }) => {
  const { id } = query;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/${id}`);
  const data = await response.json();

  return { data };
};

export default CrudUsuarioEditar;
