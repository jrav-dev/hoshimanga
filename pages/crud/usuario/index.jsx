import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import ModalConfirmacion from '../../../components/Modal/ModalConfirmacion'
import Ruta from '../../../components/Ruta'
import Boton from '../../../components/Boton'
import BotonLink from '../../../components/BotonLink'
import useFetch from '../../../hooks/useFetch'
import useModal from '../../../hooks/useModal'
import { toast } from 'react-toastify'
import style from '../Listado.module.css'

const CrudUsuarioListado = () => {
  const { data, setData } = useFetch(`/api/usuarios`)
  const { isOpen, openModal, closeModal } = useModal()
  const [usuario, setUsuario] = useState({})

  const items = [
    { href: '/crud', text: 'Crud' },
    { text: 'Usuarios' }
  ]

  const borrarUsuario = async () => {
    await fetch(`/api/usuarios/borrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(usuario._id)
    })
    setData(data.filter(e => e._id !== usuario._id))
    closeModal()
    toast.success('Usuario borrado correctamente')
  }

  return (
    <>
      <Head>
        <title>Listado usuarios | CRUD | Hoshi Manga</title>
      </Head>

      <Ruta items={items} />

      <div className='app__title'>
        <h2>Listado de usuarios</h2>
      </div>

      {data && <table className={style.listado__table}>
        <thead>
          <tr className={style.listado__table__row}>
            <th>ID</th>
            <th>Avatar</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i} className={style.listado__table__row}>

              <td>{item._id}</td>

              <td>
                <p className={`flexible ${style.listado__table__row__avatar}`}>
                  {item.nombre.charAt(0).toUpperCase()}
                  {item.apellidos.charAt(0).toUpperCase()}
                </p>
              </td>

              <td>{item.nombre}</td>

              <td>{item.apellidos}</td>

              <td>{item.email}</td>

              <td className={`${style.tag} ${style.verde}`}>
                {item.is_admin ? 'Admin' : null}
              </td>

              <td className={style.listado__table__row__actions}>
                <BotonLink url={`/crud/usuario/editar/${item._id}`} texto='Editar' />

                <Boton texto='Borrar' click={() => {
                  openModal()
                  setUsuario({ nombre: item.nombre, _id: item._id })
                }} />
              </td>

            </tr>
          ))}
        </tbody>
      </table>}

      {isOpen && <ModalConfirmacion
        closeModal={closeModal} onClick={borrarUsuario}
        text={`¿Estás seguro de que quieres borrar el usuario '${usuario.nombre}'?`}
      />}
    </>
  )
}

export default CrudUsuarioListado