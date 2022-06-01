import React from "react";

const Icono = ({ icono, click }) => {
  return <i onClick={click} className={`${icono} flexible`}></i>;
};

export default Icono;
