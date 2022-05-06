/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Router from "next/router";
import Script from "next/script";
import Head from "next/head";
import style from "../../styles/Cart.module.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Confirmacion from "./confirmacion";

const Pago = ({ total, productos, user }) => {
  const [pedido, setPedido] = useState(null);

  const addPayCart = () => {
    fetch(`/api/carrito/insertar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        params: {
          usuario: user._id,
          productos: productos.map((item) => {
            return { _id: item._id, cantidad: item.cantidad };
          }),
          precio: total.toFixed(2),
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.localStorage.removeItem("cart");
        setPedido({
          num_pedido: data.num_pedido,
          id: data._id,
        });
      });
  };

  return (
    <>
      <div>
        {/* <Script
          src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`}
        ></Script> */}

        <h2 className="borde__gris">Métodos de Pago</h2>

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

      {pedido && <Confirmacion num_pedido={pedido.num_pedido} id={pedido.id} />}
    </>
  );
};

export default Pago;
