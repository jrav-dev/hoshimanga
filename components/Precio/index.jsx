import React from 'react'
import style from './Precio.module.css'

const Precio = ({ precio, precioDescuento }) => {
  return (
    <p className={style.precio}>
      <del>{precio} €</del>
      <span>{precioDescuento.toFixed(2)} €</span>
    </p>
  )
}

export default Precio
