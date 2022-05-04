/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import React, { useState } from "react";
import Router from "next/router";
import Boton from "../../components/Boton";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import style from "../../styles/Cart.module.css";
import Productos from "./Productos";
import DatosFacturacion from "./DatosFacturacion";
import { toast } from 'react-toastify'
import Pago from "./Pago";

const Cart = () => {
  const [step, setStep] = useState(1);
  const [cart, setValue, removeValue] = useLocalStorage("cart");
  const [username] = useLocalStorage("user");
  const [user, setUser] = useState([]);
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

  const handleClickNextStep = async () => {
    switch (step) {
      case 1:
        if (username) {
          const responseUser = await fetch(`/api/usuarios/${username._id}`);
          const dataUser = await responseUser.json();
          setUser(dataUser)
          setStep(2)
        } else {
          toast.error("Debes iniciar sesión para continuar")
        }
        break;

      case 2:
        setStep(3)
        break;

      case 3:
        // setStep(4)
        break;

      default:
        break;
    }
  }

  const handleSubmitFacturation = () => {
    let errors = validateParams();
    if (Object.keys(errors).length) return setErrors(errors);
  }

  return (
    <>
      <Head>
        <title>Cesta de la compra | Hoshi Manga</title>
      </Head>

      <div className={style.app__cart__steps}>
        <div className={`flexible ${style.app__cart__steps__step} ${step === 1 ? style.app__cart__steps__step__active : ''}`}
          onClick={() => setStep(1)}>
          <p className="flexible">1</p>
          <p>Productos</p>
        </div>

        <div className={`flexible ${style.app__cart__steps__step} ${step === 2 ? style.app__cart__steps__step__active : ''}`}
          onClick={() => setStep(2)}>
          <p className="flexible">2</p>
          <p>Datos</p>
        </div>

        <div className={`flexible ${style.app__cart__steps__step} ${step === 3 ? style.app__cart__steps__step__active : ''}`}>
          <p className="flexible">3</p>
          <p>Pago</p>
        </div>
      </div>

      <div className={style.app__cart__grid}>
        {step === 1 && <Productos
          cart={cart}
          handleClickAddTotal={handleClickAddTotal}
          handleClickRemoveTotal={handleClickRemoveTotal}
          handleClickRemoveProduct={handleClickRemoveProduct}
          handleClickRemoveProducts={handleClickRemoveProducts}
        />}

        {step === 2 && <DatosFacturacion
          data={user} setData={setUser}
          handleSubmitFacturation={handleSubmitFacturation} />}

        {step === 3 && <Pago total={totalCart} user={user} productos={cart} />}

        <div>
          <div className="contenedor">
            <h3 className="borde__gris">Detalles de la cesta</h3>

            <div className="flex__between">
              <h4>Total</h4>

              <p>{totalCart.toFixed(2)} €</p>
            </div>
          </div>

          <Boton texto={step === 3 ? "Realizar pedido" : "Continuar"}
            click={handleClickNextStep}
            clase={style.app__cart__boton__compra} />
        </div>
      </div>
    </>
  );
};

export default Cart;
