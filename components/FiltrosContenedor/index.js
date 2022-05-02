import React from 'react'
import Icono from '../Icono'

import style from './Filtros.module.css'

export default function FiltrosContenedor({ item, clickCheck, checked }) {
  return (
    <div className={style.filtros}>
      <div>
        <span onClick={clickCheck}
          className={`${style.checkbox} ${checked ? style.active : ''}`}>
          <Icono icono='bi bi-check' />
        </span>
        <p>{item.nombre}</p>
      </div>

      <p>{item.total}</p>
    </div>
  )
}
