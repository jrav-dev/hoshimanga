import React from "react";
import Link from "next/link";
import Icono from "./Icono";

const BotonLink = ({ texto, icono, url, click, clase }) => {
  return (
    <Link href={url}>
      <a onClick={click} className={`${clase} boton ${texto ? 'boton_margin' : ''} flexible`}>
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
