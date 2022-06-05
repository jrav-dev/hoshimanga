import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import BotonLink from '../../components/BotonLink'
import style from './Crud.module.css'

const CRUD = () => {
  return (
    <>
      <Head>
        <title>CRUD | Hoshi Manga</title>
      </Head>

      <section className={style.crud__enlaces}>
        <BotonLink url='/crud/manga' texto='Manga' />
        <BotonLink url='/crud/usuario' texto='Usuario' />
        <BotonLink url='/crud/editorial' texto='Editorial' />
        <BotonLink url='/crud/pedido' texto='Pedido' />
      </section>
    </>
  )
}

export default CRUD