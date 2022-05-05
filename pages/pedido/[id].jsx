import Head from "next/head";
import React from "react";
import style from "./Pedido.module.css";
import Link from "next/link";
import BotonLink from "../../components/BotonLink";
import useFetch from "../../hooks/useFetch";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Ruta from "../../components/Ruta";

const Cuenta = ({ data }) => {
  const [user] = useLocalStorage("user");

  const items = [
    { href: user ? `/cuenta/${user._id}` : "", text: "Cuenta" },
    { text: `Nº Pedido - ${data.num_pedido}` },
  ];

  return (
    <>
      <Head>
        <title>Nº Pedido {data.num_pedido} | Hoshi Manga</title>
      </Head>

      <Ruta items={items} />

      <div className={style.app__cart__products}>
        <div
          className={`${style.app__cart__product} app__table__product app__table__header`}
        >
          <b>Imagen</b>
          <b>Nombre del Producto</b>
          <b>Precio</b>
          <b>Total</b>
          <b>Cantidad</b>
        </div>

        {data.productos.map((item, i) => (
          <div
            key={i}
            className={`${style.app__cart__product} app__table__product`}
          >
            <div>
              <img src={`/img/${item.imagen}`} alt={item.nombre} />
            </div>

            <p>
              {item.nombre} - {item.tomo}
            </p>

            <p>{item.precio} €</p>

            <p>{parseFloat(item.total).toFixed(2)} €</p>

            <p>{item.cantidad} uds.</p>
          </div>
        ))}

        <div
          className={`${style.app__cart__product} app__table__product app__table__footer`}
        >
          <p></p>
          <p></p>
          <p></p>
          <b>{parseFloat(data.precio).toFixed(2)} €</b>
          <p>{data.cantidad} productos</p>
        </div>
      </div>
    </>
  );
};

Cuenta.getInitialProps = async ({ query }) => {
  const { id } = query;

  const response = await fetch(`http://localhost:3000/api/pedidos/${id}`);
  const data = await response.json();

  return { data };
};

export default Cuenta;
