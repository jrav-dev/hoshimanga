import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import Boton from "../components/Boton";
import BotonLink from "../components/BotonLink";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";
import useValidationLoginRegister from "../hooks/useValidationLoginRegister";
import { toast } from "react-toastify";

import style from "../styles/Login-Register.module.css";
import { FieldsetInput } from "../components/Fieldset";

const Login = () => {
  const [params, setParams] = useState({
    email: "",
    password: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const { validarLogin, errors, setErrors } =
    useValidationLoginRegister(params);
  const { isOpen, openModal, closeModal } = useModal();

  const handleClickResetPassword = () => {
    openModal();
  };

  const leerDato = (e) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validacionOK = validarLogin();

    if (validacionOK) {
      const response = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (data.ok) {
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            _id: data.usuario._id,
            nombre: data.usuario.nombre,
            apellidos: data.usuario.apellidos,
            email: data.usuario.email,
            is_admin: data.usuario.is_admin,
          })
        );
        window.location.href = "/";
      } else {
        toast.error("El correo electrónico introducido no existe");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Inicio de Sesión | Hoshi Manga</title>
      </Head>
      <div className={`contenedor ${style.form_container}`}>
        <h2>Inicio de Sesión</h2>

        <form onSubmit={handleSubmit}>
          <FieldsetInput
            tipo="text"
            text="Correo Electrónico"
            name="email"
            value={params.email}
            onChange={leerDato}
            error={errors && errors.email}
          />

          <div>
            <FieldsetInput
              tipo="text"
              text="Contraseña"
              name="password"
              value={params.password}
              onChange={leerDato}
              error={errors && errors.password}
            />

            <span onClick={handleClickResetPassword}>
              <i className="bi bi-chat-dots"></i> Olvidaste la contraseña?
            </span>
          </div>

          <div>
            <Boton texto="Acceder" />
            <BotonLink texto="Crear Cuenta" url="/registro" />
          </div>
        </form>
      </div>

      {isOpen && (
        <Modal closeModal={closeModal}>
          <h2>Recuperar Contraseña</h2>

          <div className={style.form_container}>
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
              text="Contraseña Nueva"
              name="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className={style.botones}>
            <Boton texto="Cambiar" />
          </div>
        </Modal>
      )}
    </>
  );
};

export default Login;
