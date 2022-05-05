/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Router from "next/router";
import style from "../../styles/Cart.module.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Pago = ({ total, productos, user }) => {

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
        window.location.href = `/pedido/${data._id}`;
      });
  };

  return (
    <div>
      <h2 className="borde__gris">Métodos de Pago</h2>

      <div className={`${style.app__cart__methods__pay} contenedor`}>
        <PayPalScriptProvider
          options={{
            "client-id":
              "AYRCAiSAksdHZ6fUyejhwjJe41DyXdB4sHEMNd4U9qv968GYtXlfZMGnK6UziF2-mJfQnct2B3DekGXG",
          }}
        >
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
  );
};

export default Pago;
