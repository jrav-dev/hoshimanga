import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Boton from '../../../components/Boton'
import BotonLink from '../../../components/BotonLink'
import ModalConfirmacion from '../../../components/Modal/ModalConfirmacion'
import Loading from '../../../components/Loading'
import Ruta from '../../../components/Ruta'
import useFetch from '../../../hooks/useFetch'
import useModal from '../../../hooks/useModal'
import { toast } from 'react-toastify'
import style from '../Listado.module.css'

export default function MangaCrud() {
  const { data, setData } = useFetch(`/api/mangas/mangas`)
  const { isOpen, openModal, closeModal } = useModal()
  const [manga, setMangas] = useState({})

  const items = [
    { href: '/crud', text: 'Crud' },
    { text: 'Mangas' }
  ]

  const borrarMangas = async () => {
    await fetch(`/api/mangas/${manga._id}/borrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    setData(data.filter(e => e._id !== manga._id))
    closeModal()
    toast.success('Manga borrado correctamente')
  }

  return (
    <>
      <Head>
        <title>Listado Mangas | CRUD | Hoshi Manga</title>
      </Head>

      <Ruta items={items} />

      <div className='app__title'>
        <h2>Listado de Mangas</h2>
        <BotonLink url='/crud/manga/insertar' texto='Añadir' />
      </div>

      {data ? <table className={style.listado__table}>
        <thead>
          <tr className={style.listado__table__row}>
            <th>ID</th>
            <th>Nombre</th>
            <th>Imagen</th>
            <th>Editorial</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i} className={style.listado__table__row}>

              <td>{item._id}</td>

              <td>{item.nombre} - {item.tomo < 10 ? '0' + item.tomo : item.tomo}</td>

              <td>
                {item.imagen
                  ? <Image
                    src={`/img/${item.imagen}`}
                    alt={item.nombre}
                    width={60} height={80} />
                  : null}
              </td>

              <td>{item.editorial}</td>

              <td>{parseFloat(item.precio).toFixed(2)} €</td>

              <td>{item.stock} uds.</td>

              <td className={style.listado__table__row__actions}>
                <BotonLink url={`/crud/manga/editar/${item._id}`} icono="bi bi-pencil" />

                <BotonLink url={`/manga/${item.nombre.replace(/ /g, "-")}/${item.tomo}`} icono="bi bi-eye" />

                <Boton icono='bi bi-trash' click={() => {
                  openModal()
                  setMangas({ nombre: item.nombre, _id: item._id, tomo: item.tomo })
                }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table> : <Loading />}

      {isOpen && <ModalConfirmacion
        closeModal={closeModal} onClick={borrarMangas}
        text={`¿Estás seguro de que quieres borrar el manga '${manga.nombre} - ${manga.tomo}'?`}
      />}
    </>
  )
}
