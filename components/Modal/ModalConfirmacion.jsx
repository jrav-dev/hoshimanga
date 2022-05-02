import React from "react";
import Modal from ".";
import Boton from "../Boton";
import style from "./Modal.module.css";

const ModalConfirmacion = ({ onClick, closeModal, text }) => {
  return (
    <Modal>
      <p>{text}</p>

      <div className={style.botones}>
        <Boton click={onClick} texto='Si' />
        <Boton click={closeModal} texto='No' />
      </div>
    </Modal>
  );
};

export default ModalConfirmacion;
