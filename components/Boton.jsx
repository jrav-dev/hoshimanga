import React from "react";
import Icono from "./Icono";
import style from "../styles/Boton.module.css";

const Boton = ({ texto, icono, click, clase }) => {
  return (
    <button
      className={`${clase} ${style.boton} ${texto ? style.margin : ''} flexible`}
      onClick={click ? click : null}
    >
      {icono ? <Icono icono={icono} /> : null}
      {texto ? (
        <span>{texto}</span>
      ) : null}
    </button>
  );
};

export default Boton;
