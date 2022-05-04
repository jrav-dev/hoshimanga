import React from "react";
import Link from "next/link";
import Icono from "./Icono";

const BotonLink = ({ texto, icono, url }) => {
  return (
    <Link href={url}>
      <a className={`boton ${texto ? 'boton_margin' : ''} flexible`}>
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
