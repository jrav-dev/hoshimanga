import { useState } from "react";
import { validarEmail, validarPassword, validarString } from "../services/UtilesValidacion";

export default function useValidationLoginRegister(params) {
  const [errors, setErrors] = useState(null);

  const validarUsuario = () => {
    setErrors(null);
    let error = {};

    for (const key in params) {
      let name =
        key.charAt(0).toUpperCase() + key.slice(1).split("_").join(" ");

      if (params[key] === "") {
        error[key] = `El campo '${name}' está vacio.`;
      } else {
        error.nombre = validarString(params.nombre);
        error.apellidos = validarString(params.apellidos);
        error.email = validarEmail(params.email);
        error.password = validarPassword(params.password);
      }
    }

    if (
      validarEmail(params.email) === true &&
      validarPassword(params.password) === true &&
      validarString(params.nombre) === true &&
      validarString(params.apellidos) === true
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

  return { errors, setErrors, validarUsuario, emailExists };
}
