/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import Head from 'next/head'

import style from '../../Insercion-Modificacion.module.css'
import Ruta from '../../../../components/Ruta'
import MessageValidation from '../../../../components/MessageValidation'
import useForm from '../../../../hooks/useForm'

export default function EditorialEditarCrud({ data }) {
  const {
    params, errors,
    hiddenFileInput, createObjectURL,
    readParam, handleSubmit, handleClickImagen
  } = useForm({
    nombre: data.nombre,
    imagen: data.imagen
  }, `/api/editoriales/${data._id}/editar`, '/crud/editorial')

  const items = [
    { href: '/crud', text: 'Crud' },
    { href: '/crud/editorial', text: 'Editoriales' },
    { text: data.nombre }
  ]

  console.log(params.imagen)

  return (
    <>
      <Head>
        <title>{data.nombre} | CRUD | Hoshi Manga</title>
      </Head>
      <Ruta items={items} />
      <form onSubmit={handleSubmit} className={style.form} encType="multipart/form-data">
        <div>
          <button className="boton">Actualizar</button>
        </div>

        <MessageValidation errors={errors} ok="error" />

        <div className="contenedor">
          <div className={style.fieldset}>
            <label htmlFor="nombre">Nombre</label>
            <input
              value={params.nombre}
              onChange={readParam}
              type="text" name="nombre" id="nombre"
            />
          </div>
          <div className={style.fieldset}>
            <input
              ref={hiddenFileInput}
              onChange={readParam}
              accept="image/*"
              type="file" name="imagen"
            />
            <div className={style.container_image}>
              <div className={`${style.btn_image} flexible`} onClick={handleClickImagen}>
                <i className="bi bi-cloud-upload flexible"></i>
                <p>Logo de la Editorial</p>
                <span className="boton">Subir Imagen</span>
              </div>
              {params.imagen !== data.imagen
                ? <div className={style.imagen}>
                  <img src={createObjectURL} alt="Imagen" />
                </div>
                : <div className={style.imagen}>
                  <img src={`/img/${params.imagen}`} alt="Imagen" />
                </div>
              }
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

EditorialEditarCrud.getInitialProps = async ({ query }) => {
  const { id } = query

  const response = await fetch(`http://localhost:3000/api/editoriales/${id}`)
  const data = await response.json()

  return { data }
}
