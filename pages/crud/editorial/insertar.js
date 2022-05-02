/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import Head from 'next/head'

import style from '../Insercion-Modificacion.module.css'
import Ruta from '../../../components/Ruta'
import MessageValidation from '../../../components/MessageValidation'
import useForm from '../../../hooks/useForm'

export default function EditorialInsertarCrud() {
  const {
    params, errors,
    hiddenFileInput, createObjectURL,
    readParam, handleSubmit, handleClickImagen
  } = useForm({
    nombre: '',
    imagen: ''
  }, '/api/editoriales/insertar', '/crud/editorial')

  const items = [
    { href: '/crud', text: 'Crud' },
    { href: '/crud/editorial', text: 'Editoriales' },
    { text: 'Insertar Editorial' }
  ]

  return (
    <>
      <Head>
        <title>Insertar Editorial | CRUD | Hoshi Manga</title>
      </Head>
      <Ruta items={items} />
      <form onSubmit={handleSubmit} className={style.form} encType="multipart/form-data">
        <div>
          <button className="boton">Enviar</button>
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
                <span className="boton"><i className="bi bi-upload"></i> Subir Imagen</span>
              </div>
              {params.imagen && <div className={style.imagen}>
                <img src={createObjectURL} alt="" />
              </div>}
            </div>
          </div>
        </div>

      </form>
    </>
  )
}
