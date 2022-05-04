import Head from "next/head";
import React from "react";
import Router from "next/router";
import Boton from "../components/Boton";
import { useLocalStorage } from "../hooks/useLocalStorage";

import style from "../styles/Cart.module.css";
import Icono from "../components/Icono";

const Cart = () => {
  const [cart, setValue, removeValue] = useLocalStorage("cart");
  let totalCart = 0;

  const handleClickAddTotal = (item) => {
    cart.map((producto) => {
      if (item._id === producto._id) {
        producto.cantidad += 1;
        producto.total += producto.precio;
        totalCart += producto.precio;
      }
    });
    setValue(cart);
    Router.push("/cart");
  };

  const handleClickRemoveTotal = (item) => {
    cart.map((producto, i) => {
      if (item._id === producto._id) {
        producto.cantidad -= 1;
        producto.total -= producto.precio;
        totalCart += producto.precio;

        if (producto.cantidad === 0) {
          cart.splice(i, 1);
        }
      }
    });
    setValue(cart);
    Router.push("/cart");
  };

  const handleClickRemoveProduct = (i) => {
    cart.splice(i, 1);
    setValue(cart);
    Router.push("/cart");
  };

  const handleClickRemoveProducts = () => {
    removeValue();
    Router.push("/cart");
  };

  if (cart) {
    cart.map((item) => {
      totalCart += item.total;
    });
  }

  return (
    <>
      <Head>
        <title>Cesta de la compra | Hoshi Manga</title>
      </Head>

      <div className={style.app__cart__grid}>
        <div>
          <h2 className="borde__gris">Productos</h2>

          {cart ? (
            <div className={style.app__cart__products}>
              <div className={style.app__cart__product}>
                <p>Imagen</p>
                <p>Nombre del Producto</p>
                <p>Precio</p>
                <p>Total</p>
                <p>Cantidad</p>
              </div>

              {cart.map((item, i) => (
                <div key={i} className={style.app__cart__product}>
                  <div>
                    <img src={`/img/${item.imagen}`} alt={item.nombre} />
                  </div>

                  <p>
                    {item.nombre} - {item.tomo}
                  </p>

                  <p>{item.precio} €</p>

                  <p>{item.total.toFixed(2)} €</p>

                  <div className={style.app__cart__product_cantidad}>
                    <p>{item.cantidad} uds.</p>

                    <div className={style.app__cart__product__botones}>
                      <Boton
                        texto="+"
                        click={() => handleClickAddTotal(item)}
                      />
                      <Boton
                        texto="-"
                        click={() => handleClickRemoveTotal(item)}
                      />
                    </div>
                  </div>

                  <div>
                    <Boton
                      icono="bi bi-trash"
                      clase="rojo"
                      click={() => handleClickRemoveProduct(i)}
                    />
                  </div>
                </div>
              ))}

              <div className={style.app__cart__actions}>
                <Boton
                  icono="bi bi-trash"
                  texto="Vaciar Cesta"
                  clase="rojo"
                  click={handleClickRemoveProducts}
                />
              </div>
            </div>
          ) : (
            <h3>No tienes ningun producto en la cesta</h3>
          )}
        </div>

        <div>
          <div className="contenedor">
            <h3 className="borde__gris">Detalles de la cesta</h3>

            <div className="flex__between">
              <h4>Total</h4>

              <p>{totalCart.toFixed(2)} €</p>
            </div>
          </div>

          <Boton texto="Realizar Compra" clase={style.app__cart__boton__compra} />
        </div>
      </div>
    </>
  );
};

export default Cart;
