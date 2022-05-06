import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import Boton from "../components/Boton";
import BotonLink from "../components/BotonLink";
import { FieldsetInput } from "../components/Fieldset";
import useValidationLoginRegister from "../hooks/useValidationLoginRegister";
import { toast } from "react-toastify";
import style from "../styles/Login-Register.module.css";

function Login() {
  const [params, setParams] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
  });
  const { validarRegistro, errors, setErrors, emailExists } =
    useValidationLoginRegister(params);

  const leerDato = (e) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validacionOK = validarRegistro();

    if (validacionOK) {
      const emailIfExists = await emailExists(params.email);

      if (emailIfExists === false) {
        fetch(`/api/usuarios`, {
          method: "POST",
          body: JSON.stringify(params),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((results) => {
            if (results) {
              toast.success("Registro realizado correctamente");

              window.localStorage.setItem(
                "user",
                JSON.stringify({
                  _id: results._id,
                  nombre: results.nombre,
                  apellidos: results.apellidos,
                  email: results.email,
                  is_admin: results.is_admin,
                })
              );

              window.location.href = "/";
            }
          });
      } else {
        toast.error("Ese correo electrónico ya esta registrado")
      }
    }
  };

  return (
    <>
      <Head>
        <title>Registro de Usuario | Hoshi Manga</title>
      </Head>
      <div className={`contenedor ${style.form_container}`}>
        <h2>Registro de Usuario</h2>

        <form onSubmit={handleSubmit}>
          <FieldsetInput
            tipo="text"
            text="Nombre"
            name="nombre"
            value={params.nombre}
            onChange={leerDato}
            error={errors && errors.string}
          />

          <FieldsetInput
            tipo="text"
            text="Apellidos"
            name="apellidos"
            value={params.apellidos}
            onChange={leerDato}
            error={errors && errors.string}
          />

          <FieldsetInput
            tipo="text"
            text="Correo Electrónico"
            name="email"
            value={params.email}
            onChange={leerDato}
            error={errors && errors.email}
          />

          <FieldsetInput
            tipo="text"
            text="Contraseña"
            name="password"
            value={params.password}
            onChange={leerDato}
            error={errors && errors.password}
          />

          <div>
            <Boton texto="Registrarse" />
            <BotonLink texto="Iniciar Sesión" url="/login" />
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
