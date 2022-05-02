import React from 'react'
import FiltrosContenedor from '../FiltrosContenedor'
import style from './ListOfFilters.module.css'

export default function ListOfFilters({ array, titulo, clickCheck, index }) {
  return (
    <div className={style.contenedor}>
      <h3>{titulo}</h3>

      <div>
        {array && array.map((item, i) => (
          <FiltrosContenedor key={i} item={item} clickCheck={() => clickCheck(index, i)} checked={item.checked} />
        ))}
      </div>
    </div>
  )
}
