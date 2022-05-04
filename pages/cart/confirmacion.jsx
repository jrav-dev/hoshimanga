import React, { useEffect } from 'react'
import BotonLink from '../../components/BotonLink'
import Icono from '../../components/Icono'

const Confirmacion = () => {
  return (
    <div className='flexible app__confirmacion'>
      <Icono icono='bi bi-check' />

      {/* {ref && <h2>Nº Pedido: {ref}</h2>} */}

      <h1>¡Gracias por tu compra!</h1>

      <p>
        Tu compra ha sido realizada con éxito.
      </p>

      <div className='flexible'>
        <BotonLink url={`/cart`} texto='Ver Pedido' icono='bi bi-box-arrow-up-right' />
        <BotonLink url={`/`} texto='Inicio' icono='bi bi-house' />
      </div>
    </div>
  )
}

export default Confirmacion