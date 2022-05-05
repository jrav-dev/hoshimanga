import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import React, { useState } from 'react'
import Boton from '../components/Boton'
import BotonLink from '../components/BotonLink'
import useValidationLoginRegister from '../hooks/useValidationLoginRegister'
import { toast } from 'react-toastify'
import style from '../styles/Login-Register.module.css'

function Login() {
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { validarRegistro, errors, setErrors, emailExists } = useValidationLoginRegister({ email, password, nombre, apellidos })

  const handleSubmit = async e => {
    e.preventDefault()

    let validacionOK = validarRegistro()

    if (validacionOK) {
      const emailIfExists = await emailExists(email)

      if (emailIfExists === false) {
        fetch(`/api/usuarios`, {
          method: "POST",
          body: JSON.stringify({ nombre, apellidos, email, password }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => res.json()).then(results => {
          if (results) {
            toast.success('Registro realizado correctamente')
            console.log(results)
            window.localStorage.setItem("user", JSON.stringify({
              _id: results._id,
              nombre: results.nombre,
              apellidos: results.apellidos,
              email: results.email,
              is_admin: results.is_admin,
            }))
            window.location.href = "/"
          }
        })
      } else {
        setErrors(["Ese correo electrónico ya esta registrado."])
      }
    }
  }

  return (
    <>
      <Head>
        <title>Registro de Usuario | Hoshi Manga</title>
      </Head>
      <div className={`contenedor ${style.form_container}`}>
        <h2>Registro de Usuario</h2>

        <form onSubmit={handleSubmit}>

          <div>
            <label htmlFor="nombre">Nombre</label>
            <input type="text" autoComplete='off'
              name="nombre" id="nombre"
              value={nombre} onChange={e => setNombre(e.target.value)} />
          </div>

          <div>
            <label htmlFor="apellidos">Apellidos</label>
            <input type="text" autoComplete='off'
              name="apellidos" id="apellidos"
              value={apellidos} onChange={e => setApellidos(e.target.value)} />
          </div>

          <div>
            <label htmlFor="email">Correo Electrónico</label>
            <input type="text" autoComplete='off'
              name="email" id="email"
              value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div>
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" id="password"
              value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          <div>
            <Boton texto="Registrarse" />
            <BotonLink texto="Iniciar Sesión" url="/login" />
          </div>

        </form>
      </div>

      {errors && <div className={`msg error ${style.errors}`}>
        {errors.map((error, index) => (
          <p key={index}>{error}</p>
        ))}
      </div>}
    </>
  )
}

export default Login