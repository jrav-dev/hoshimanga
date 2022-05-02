import React from 'react'
import Icono from '../Icono'
import style from './Modal.module.css'

const Modal = ({ children, closeModal }) => {
  return (
    <div className={`flexible ${style.app__modal}`}>
      <div className='contenedor'>
        {closeModal ? <span
          className={style.app__modal__icono__cerrar}
          onClick={closeModal}>
          <Icono icono="bi bi-x" />
        </span> : null}
        
        {children}
      </div>
    </div>
  )
}

export default Modal