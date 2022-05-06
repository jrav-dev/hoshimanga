/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Ruta from '../../components/Ruta'
import style from './Manga.module.css'
import Icono from '../../components/Icono'
import Boton from '../../components/Boton'
import useProducto from '../../hooks/useProducto'
import Precio from '../../components/Precio'
import { useCart } from '../../hooks/useCart'

export default function Manga({ manga }) {
  const { addToCart } = useCart();
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
        <div className={`flexible ${style.producto__imagen}`}>
          <img src={`/img/${manga.imagen}`} alt={manga.nombre} />
        </div>

        <article>
          <h2>{nombre} - {manga.tomo < 10 ? '0' + manga.tomo : manga.tomo}</h2>

          <div>
            <p>
              <b>Editortial: </b>
              <Link href={`/editorial/${manga.editorial.replace(/ /g, "_")}`}>{manga.editorial}</Link>
            </p>

            <p>
              <b>Autores: </b>
              {autores.map((item, i) => (
                <><Link href={`/autor/${item.trim().replace(/ /g, "_")}`} key={i}>{item.trim()}</Link>
                  {i + 1 < autores.length ? ', ' : null}</>
              ))}
            </p>

            <p>
              <b>Série: </b>
              <Link href={`/serie/${nombre.replace(/ /g, "_")}`}>{nombre}</Link>
            </p>
          </div>

          <p>
            <b>Disponibilidad: </b>
            <span className={disponibilidad.ok ? style.en_stock : style.agotado}>
              {disponibilidad.estado}
            </span>
          </p>

          <Precio precio={manga.precio} precioDescuento={precio} />

          <Boton texto='Añadir a la cesta' icono='bi bi-cart2' click={() => addToCart(manga)} />
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

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mangas/${manga[0]}/${manga[1]}`)
  const data = await response.json()

  return { manga: data }
}
