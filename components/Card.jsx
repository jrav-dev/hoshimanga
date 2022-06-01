/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import Boton from "./Boton";
import style from "../styles/Card.module.css";
import useProducto from "../hooks/useProducto";
import Precio from "./Precio";
import { useCart } from "../hooks/useCart";
import Icono from "./Icono";

const Card = ({ producto }) => {
  const { addToCart } = useCart();
  const { nombre, tomo, imagen } = producto;

  const { precio, disponibilidad } = useProducto(producto);
  const Titulo = `${nombre} - Tomo ${tomo < 10 ? "0" + tomo : tomo}`;
  const TituloUrl = `/manga/${nombre.replace(/ /g, "_")}/${tomo}`;

  return (
    <div className={style.card}>
      <Link href={TituloUrl}>
        <a title={Titulo}>
          {imagen
            ? <img src={`/img/${imagen}`} alt={producto.name} />
            : null}
        </a>
      </Link>

      <span className={`${style.disponibilidad} ${disponibilidad.ok
          ? style.en_stock
          : style.agotado}`}>
        {disponibilidad.estado}
      </span>

      <div className={style.producto_info}>
        <Link href={TituloUrl}>
          <a title={Titulo}>
            <h3>{nombre} - {tomo}</h3>
          </a>
        </Link>
        <Precio precio={producto.precio} precioDescuento={precio} />
      </div>

      {disponibilidad.estado !== "Agotado"
        && <span className={style.boton_comprar}>
          <Icono icono='bi bi-cart2' click={() => addToCart(producto)} />
        </span>}
    </div>
  );
};

export default Card;
