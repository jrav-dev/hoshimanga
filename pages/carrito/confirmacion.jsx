import React, { useEffect } from "react";
import BotonLink from "../../components/BotonLink";
import Icono from "../../components/Icono";
import Modal from '../../components/Modal'

const Confirmacion = ({ num_pedido }) => {
  return (
    <Modal >
      <div className="flexible app__confirmacion">
        <Icono icono="bi bi-check" />

        {num_pedido && <h2>Nº Pedido: {num_pedido}</h2>}

        <h1>¡Gracias por tu compra!</h1>

        <p>Tu compra ha sido realizada con éxito.</p>

        <div className="flexible">
          <BotonLink
            url={`/pedido?num_pedido=${num_pedido}`}
            texto="Ver Pedido"
            icono="bi bi-box-arrow-up-right"
          />
          <BotonLink url={`/`} texto="Inicio" icono="bi bi-house" />
        </div>
      </div>
    </Modal>
  );
};

export default Confirmacion;
