import React from "react";
import Link from "next/link";
import Icono from "./Icono";
import style from "../styles/Boton.module.css";

const BotonLink = ({ texto, icono, url }) => {
  return (
    <Link href={url}>
      <a className={`${style.boton} flexible`}>
        {icono ? (
          <>
            <Icono icono={icono} />
            {texto}
          </>
        ) : (
          texto
        )}
      </a>
    </Link>
  );
};

export default BotonLink;
