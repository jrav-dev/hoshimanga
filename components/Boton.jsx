import React from "react";
import Icono from "./Icono";

const Boton = ({ texto, icono, click, clase }) => {
  return (
    <button
      className={`boton ${clase} ${texto ? 'boton_margin' : ''} flexible`}
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
