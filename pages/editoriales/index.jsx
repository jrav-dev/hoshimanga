import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import useFetch from '../../hooks/useFetch'
import Ruta from '../../components/Ruta'

import style from './Editoriales.module.css'

export default function Editoriales() {
  const { data } = useFetch('/api/editoriales')
  const items = [{ text: 'Editoriales' }]

  return (
    <>
      <Head><title>Editoriales | Hoshi Manga</title></Head>

      <Ruta items={items} />

      <section className={style.editoriales}>
        {data && data.map((item, i) => (
          <Link href={`/editorial/${item.nombre.split(" ").join("_")}`} key={i}>
            <a className="contenedor" title={item.nombre}>
              <Image src={`/img/editoriales/${item.imagen}`} alt={item.nombre} width={150} height={150} />
              <p>{item.nombre}</p>
            </a>
          </Link>
        ))}
      </section>
    </>
  )
}
