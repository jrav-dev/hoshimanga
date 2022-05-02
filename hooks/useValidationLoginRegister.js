import { useState } from "react"
import useFetch from "./useFetch"

export default function useValidationLoginRegister({ email, password, nombre, apellidos }) {
  const [errors, setErrors] = useState(null)

  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
  let regexPassword = /[a-zA-Z0-9]{6,}$/
  let regexNombre = /[a-zA-Z]{3,20}$/
  let regexApellidos = /[a-zA-Z]{3,50}$/

  const validarLogin = () => {
    let errors = []

    if (email === "") {
      errors.push("El campo 'correo electrónico' está vacio.")
    } else if (!regexEmail.test(email)) {
      errors.push("El 'correo electrónico' no es válido.")
    }

    if (password === "") {
      errors.push("El campo 'contraseña' está vacio.")
    } else if (!regexPassword.test(password)) {
      errors.push("La 'contraseña' no es válida. Debe tener más de 6 carácteres.")
    }

    if (regexEmail.test(email) && regexPassword.test(password)) {
      setErrors(null)

      return true
    }

    setErrors(errors)
  }

  const validarRegistro = () => {
    let errors = []

    if (nombre === "") {
      errors.push("El campo 'nombre' está vacio.")
    } else if (!regexNombre.test(nombre)) {
      errors.push("El 'nombre' debe tener entre 3 y 20 carácteres.")
    }

    if (apellidos === "") {
      errors.push("El campo 'apellidos' está vacio.")
    } else if (!regexApellidos.test(apellidos)) {
      errors.push("El 'apellidos' debe tener entre 3 y 50 carácteres.")
    }

    if (email === "") {
      errors.push("El campo 'correo electrónico' está vacio.")
    } else if (!regexEmail.test(email)) {
      errors.push("El 'correo electrónico' no es válido.")
    }

    if (password === "") {
      errors.push("El campo 'contraseña' está vacio.")
    } else if (!regexPassword.test(password)) {
      errors.push("La 'contraseña' no es válida. Debe tener más de 6 carácteres.")
    }

    if (regexNombre.test(nombre) &&
      regexApellidos.test(apellidos) &&
      regexEmail.test(email) &&
      regexPassword.test(password)) {
      setErrors(null)

      return true
    }

    setErrors(errors)
  }

  const emailExists = async (email) => {
    const response = await fetch(`/api/usuarios/emailExist/${email}`);
    const data = await response.json();
    return data ? true : false;
  }

  return { errors, setErrors, validarLogin, validarRegistro, emailExists }
}
