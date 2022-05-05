import React from "react";
import Link from "next/link";
import Router from "next/router";
import Boton from "./Boton";
import style from "../styles/Card.module.css";
import useProducto from "../hooks/useProducto";
import Precio from "./Precio";
import { useCart } from "../hooks/useCart";

const Card = ({ producto }) => {
  const { addToCart } = useCart();
  const { nombre, tomo, imagen, _id } = producto;

  const { precio, disponibilidad } = useProducto(producto);
  const Titulo = `${nombre} - Tomo ${tomo < 10 ? "0" + tomo : tomo}`;
  const TituloUrl = `/manga/${nombre.replace(/ /g, "_")}/${tomo}`;

  return (
    <div className={style.card}>
      <Link href={TituloUrl}>
        <a title={Titulo} className={style.card__imagen}>
          {imagen ? <img src={`/img/${imagen}`} alt={producto.name} /> : null}
        </a>
      </Link>

      <div>
        <Link href={TituloUrl}>
          <a title={Titulo}>
            <h3>{nombre} - {tomo}</h3>
          </a>
        </Link>

        <p className={disponibilidad.ok ? style.en_stock : style.agotado}>
          {disponibilidad.estado}
        </p>

        <Precio precio={producto.precio} precioDescuento={precio} />

        {disponibilidad.estado !== "Agotado" && (
          <Boton
            texto="Añadir a la cesta"
            icono="bi bi-cart2"
            click={() => addToCart(producto)}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
