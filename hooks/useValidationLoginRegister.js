import { useState } from "react";

export default function useValidationLoginRegister(params) {
  const [errors, setErrors] = useState(null);

  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  let regexPassword = /[a-zA-Z0-9]{6,}$/;
  let regexString = /[a-zA-Z]{3,40}$/;

  let msgErrors = {
    string: "Debe tener entre 3 y 40 carácteres.",
    password: "Debe tener más de 6 carácteres.",
    email: "El correo electrónico no es válido.",
  };

  const validarLogin = () => {
    let error = {};

    for (const key in params) {
      let name =
        key.charAt(0).toUpperCase() + key.slice(1).split("_").join(" ");

      if (params[key] === "") {
        error[key] = `El campo '${name}' está vacio.`;
      } else {
        if (regexEmail.test(params.email) === false) error.email = msgErrors.email;

        if (regexPassword.test(params.password) === false) error.password = msgErrors.password;
      }
    }

    if (regexEmail.test(params.email) && regexPassword.test(params.password)) {
      setErrors(null);
      return true;
    } else {
      setErrors(error);
      return false;
    }
  };

  const validarRegistro = () => {
    setErrors(null);
    let error = {};

    for (const key in params) {
      let name =
        key.charAt(0).toUpperCase() + key.slice(1).split("_").join(" ");

      if (params[key] === "") {
        error[key] = `El campo '${name}' está vacio.`;
      } else {
        if (regexString.test(params.nombre) === false) error.nombre = msgErrors.string;
        if (regexString.test(params.apellidos) === false) error.apellidos = msgErrors.string;
        if (regexEmail.test(params.email) === false) error.email = msgErrors.email;
        if (regexPassword.test(params.password) === false) error.password = msgErrors.password;
      }
    }

    if (
      regexString.test(params.nombre) &&
      regexString.test(params.apellidos) &&
      regexEmail.test(params.email) &&
      regexPassword.test(params.password)
    ) {
      setErrors(null);
      return true;
    } else {
      setErrors(error);
      return false;
    }
  };

  const emailExists = async (email) => {
    const response = await fetch(`/api/usuarios/emailExist/${email}`);
    const data = await response.json();
    return data ? true : false;
  };

  return { errors, setErrors, validarLogin, validarRegistro, emailExists };
}
