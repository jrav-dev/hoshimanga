import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Ruta from '../../components/Ruta'
import style from '../../styles/Producto.module.css'
import Icono from '../../components/Icono'
import Boton from '../../components/Boton'
import useProducto from '../../hooks/useProducto'
import Precio from '../../components/Precio'

export default function Manga({ manga }) {
  const { precio, disponibilidad, autores, descripcion } = useProducto(manga)
  const nombre = manga.nombre
  const items = [
    { text: 'Mangas', href: '/mangas' },
    { text: nombre, href: `/serie/${nombre}` },
    { text: `${nombre} - ${manga.tomo}` }
  ]

  if (manga.msg) {
    return (
      <>
        <Head>
          <title>404 - No se encuentra | Hoshi Manga</title>
        </Head>
        <h2 className='flexible'>{manga.msg}</h2>
      </>
    )
  }

  return (
    <>
      <Head><title>{nombre} - {manga.tomo} | Hoshi Manga</title></Head>

      <Ruta items={items} />

      <section className={style.producto}>
        <div className='flexible'>
          <Image src={`/img/${manga.imagen}`} alt={nombre} width={300} height={400} />
        </div>

        <article>
          <h2>{nombre} - {manga.tomo < 10 ? '0' + manga.tomo : manga.tomo}</h2>

          <div>
            <p>
              <b>Editortial: </b>
              <Link href={`/editorial/${manga.editorial.replace(/ /g, "-")}`}>{manga.editorial}</Link>
            </p>

            <p>
              <b>Autores: </b>
              {autores.map((item, i) => (
                <><Link href={`/autor/${item.trim().replace(/ /g, "-")}`} key={i}>{item.trim()}</Link>
                  {i + 1 < autores.length ? ', ' : null}</>
              ))}
            </p>

            <p>
              <b>Série: </b>
              <Link href={`/serie/${nombre.replace(/ /g, "-")}`}>{nombre}</Link>
            </p>
          </div>

          <p>
            <b>Disponibilidad: </b>
            <span className={disponibilidad.ok ? style.en_stock : style.agotado}>
              {disponibilidad.estado}
            </span>
          </p>

          <Precio precio={manga.precio} precioDescuento={precio} />

          <Boton texto='Añadir a la cesta' icono='bi bi-cart2' />
        </article>
      </section>

      <section className={style.caracteristicas}>
        <div className={style.descripcion}>
          {descripcion.map((item, i) => (
            item === "" ? <br /> : <p key={i}>{item}</p>
          ))}
        </div>

        <article>
          <div>
            <b>ISBN: </b>
            <span>{manga.isbn}</span>
          </div>
          <div>
            <b>Formato: </b>
            <span>{manga.formato}</span>
          </div>
          <div>
            <b>Fecha de Publicación: </b>
            <span>{manga.fecha_publicacion}</span>
          </div>
          <div>
            <b>Nº de Páginas: </b>
            <span>{manga.num_paginas}</span>
          </div>
          <div>
            <b>Nº de la Colección: </b>
            <span>{manga.tomo}</span>
          </div>
          <div>
            <b>Tamaño: </b>
            <span>{manga.tamaño}</span>
          </div>
        </article>
      </section>
    </>
  )
}

Manga.getInitialProps = async ({ query }) => {
  const { manga } = query

  const response = await fetch(`http://localhost:3001/api/mangas/${manga[0]}/${manga[1]}`)
  const data = await response.json()

  return { manga: data }
}
