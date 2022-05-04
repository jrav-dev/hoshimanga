/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import Head from 'next/head'
import Ruta from '../../../../components/Ruta'
import useForm from '../../../../hooks/useForm'
import { FieldsetInput } from '../../../../components/Fieldset'
import Boton from '../../../../components/Boton'
import Icono from '../../../../components/Icono'

const CrudUsuarioEditar = ({ data }) => {
  const {
    params, setParams, errors, readParam, handleSubmit
  } = useForm({
    _id: data._id,
    nombre: data.nombre,
    apellidos: data.apellidos,
    email: data.email,
    password: '',
    direccion: data.direccion,
    poblacion: data.poblacion,
    pais: data.pais,
    codigo_postal: data.codigo_postal,
    telefono: data.telefono,
    dni: data.dni,
    is_admin: data.is_admin
  }, '/api/usuarios/editar', '/crud/usuario')

  const items = [
    { href: '/crud', text: 'Crud' },
    { href: '/crud/usuario', text: 'Usuarios' },
    { text: `Editar Usuario - ${data.nombre}` }
  ]

  return (
    <>
      <Head>
        <title>{data.nombre} | CRUD | Hoshi Manga</title>
      </Head>

      <Ruta items={items} />

      <form onSubmit={handleSubmit} className='formulario__container'>
        <div className='app__title'>
          <h2>{data.nombre} {data.apellidos}</h2>
          <Boton texto='Enviar' click={handleSubmit} />
        </div>

        <div className='formulario__grid contenedor'>
          <FieldsetInput className='formulario__fieldset'
            tipo="text" name='nombre' text='Nombre'
            value={params.nombre} onChange={readParam} />

          <FieldsetInput className='formulario__fieldset'
            tipo="text" name='apellidos' text='Apellidos'
            value={params.apellidos} onChange={readParam} />

          <FieldsetInput className='formulario__fieldset'
            tipo="email" name='email' text='Correo Electrónico'
            value={params.email} onChange={readParam} />

          <FieldsetInput className='formulario__fieldset'
            tipo="password" name='password' text='Contraseña'
            value={params.password} onChange={readParam} />
        </div>

        <div className='formulario__grid contenedor'>
          <FieldsetInput className='formulario__fieldset'
            tipo="text" name='direccion' text='Dirección'
            value={params.direccion} onChange={readParam} />

          <FieldsetInput className='formulario__fieldset'
            tipo="text" name='poblacion' text='Población'
            value={params.poblacion} onChange={readParam} />

          <FieldsetInput className='formulario__fieldset'
            tipo="text" name='pais' text='Pais'
            value={params.pais} onChange={readParam} />

          <FieldsetInput className='formulario__fieldset'
            tipo="number" name='codigo_postal' text='Código Postal'
            value={params.codigo_postal} onChange={readParam} />

          <FieldsetInput className='formulario__fieldset'
            tipo="text" name='telefono' text='Teléfono'
            value={params.telefono} onChange={readParam} />

          <FieldsetInput className='formulario__fieldset'
            tipo="text" name='dni' text='DNI'
            value={params.dni} onChange={readParam} />

          <div className={`formulario__checkbox ${params.is_admin ? 'formulario__checkbox__active' : ''}`}>
            <label htmlFor="is_admin">Administrador</label>
            <span onClick={() => {
              setParams({
                ...params,
                is_admin: !params.is_admin
              })
            }}><Icono icono='bi bi-check' /></span>
          </div>

        </div>
      </form>
    </>
  )
}

CrudUsuarioEditar.getInitialProps = async ({ query }) => {
  const { id } = query

  const res = await fetch(`http://localhost:3000/api/usuarios/${id}`)
  const data = await res.json()

  return { data }
}

export default CrudUsuarioEditar
