/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Router from "next/router";
import Script from "next/script";
import Head from "next/head";
import style from "../../styles/Cart.module.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Confirmacion from "./confirmacion";
import { fetchPost } from "../../services/funciones";

const Pago = ({ total, carrito, user }) => {
  const [pedido, setPedido] = useState(null);

  const addPayCart = async () => {
    const num_pedido = Math.floor(Math.random() * 9000000) + 1000000;

    const newPedido = {
      num_pedido,
      importe: carrito.importe,
      usuario: carrito.usuario,
      productos: carrito.productos,
    }

    await fetchPost('/api/carrito/borrar', { _id: carrito._id })
    await fetchPost('/api/pedidos/nuevo', newPedido)

    setPedido(newPedido)
  };

  return (
    <>
      <div>
        {/* <Script
          src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`}
        ></Script> */}

        <h2 className="borde__contenedor">Métodos de Pago</h2>

        <div className={`${style.app__cart__methods__pay} contenedor`}>
          <PayPalScriptProvider>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: total.toFixed(2).toString(),
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                await actions.order.capture();

                addPayCart();
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>

      {pedido && <Confirmacion num_pedido={pedido.num_pedido} />}
    </>
  );
};

export default Pago;
