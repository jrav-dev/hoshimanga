import React from "react";
import Icono from "./Icono";
import style from "../styles/Boton.module.css";

const Boton = ({ texto, icono, click, clase }) => {
  return (
    <button
      className={`${style.boton} ${clase} flexible`}
      onClick={click ? click : null}
    >
      {icono ? <Icono icono={icono} /> : null}
      {texto ? (
        <span className={icono ? style.margin : null}>{texto}</span>
      ) : null}
    </button>
  );
};

export default Boton;
