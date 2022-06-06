/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Head from 'next/head'
import style from '../styles/Pedido.module.css'

const Pedido = ({ data }) => {
  return (
    <>
      <Head>
        <title>Pedido Nº{data.num_pedido} | Hoshi Manga</title>
      </Head>

      <div className={style.pedido_container}>
        <h2>Pedido Nº{data.num_pedido}</h2>

        <div className={style.pedido_container__info}>
          <div className="app__carrito__productos">
            {data.productos?.map((item, i) => (
              <div key={item.num_pedido} className="app__carrito__producto">
                <img src={`/img/${item.producto.imagen}`} alt={item.producto.nombre} />
                <div className="app__carrito__info">
                  <p className="">{item.producto.nombre}</p>
                  <p>{item.total.toFixed(2)} € - {item.cantidad} uds.</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex__between">
            <p>Importe:</p>
            <b>{data.importe.toFixed(2)} €</b>
          </div>
        </div>
      </div>
    </>
  )
}

Pedido.getInitialProps = async ({ query }) => {
  const { num_pedido } = query

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pedidos/${num_pedido}`)
  const data = await response.json()

  return { data }
}

export default Pedido