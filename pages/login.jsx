import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import Boton from "../components/Boton";
import BotonLink from "../components/BotonLink";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";
import useValidationLoginRegister from "../hooks/useValidationLoginRegister";

import style from "../styles/Login-Register.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { validarLogin, errors, setErrors } = useValidationLoginRegister({
    email,
    password,
  });
  const { isOpen, openModal, closeModal } = useModal();

  const handleClickResetPassword = () => {
    openModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validamos el login
    let validacionOK = validarLogin();

    if (validacionOK) {
      const response = await fetch(`/api/usuarios/${email}`);
      if (response.ok) {
        const json = await response.json();

        window.localStorage.setItem("user", JSON.stringify({
          _id: json._id,
          nombre: json.nombre,
          apellidos: json.apellidos,
          email: json.email,
          is_admin: json.is_admin
        }));
        window.location.href = "/";
      } else {
        setErrors(["Ese correo electrónico no existe."]);
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
          <div>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="text"
              autoComplete="off"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <div>
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="text"
                autoComplete="off"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="newPassword">Nueva Contraseña</label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          <div className={style.botones}>
            <Boton texto="Cambiar" />
          </div>
        </Modal>
      )}

      {errors && (
        <div className={`msg error ${style.errors}`}>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default Login;
