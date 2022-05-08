/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import React, { useState } from "react";
import Router from "next/router";
import Boton from "../../components/Boton";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import style from "../../styles/Cart.module.css";
import Productos from "./Productos";
import DatosFacturacion from "./DatosFacturacion";
import { toast } from "react-toastify";
import Pago from "./Pago";

const Cart = () => {
  const [step, setStep] = useState(1);
  const [cart, setValue, removeValue] = useLocalStorage("cart");
  const [username] = useLocalStorage("user");
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);
  const [params, setParams] = useState({
    _id: "",
    nombre: "",
    apellidos: "",
    email: "",
    direccion: "",
    poblacion: "",
    pais: "",
    codigo_postal: "",
    telefono: "",
    dni: "",
  });
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
    if (cart.length > 1) {
      cart.splice(i, 1);
      setValue(cart);
    } else {
      removeValue();
    }

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
          setUser(dataUser);
          setParams({
            _id: dataUser._id,
            nombre: dataUser.nombre,
            apellidos: dataUser.apellidos,
            email: dataUser.email,
            password: dataUser.password,
            direccion: dataUser.direccion,
            poblacion: dataUser.poblacion,
            pais: dataUser.pais,
            codigo_postal: dataUser.codigo_postal,
            telefono: dataUser.telefono,
            dni: dataUser.dni,
          });
          setStep(2);
        } else {
          toast.error("Debes iniciar sesión para continuar");
        }
        break;

      case 2:
        const validateParams = () => {
          let errors = {};

          for (const key in params) {
            let name =
              key.charAt(0).toUpperCase() + key.slice(1).split("_").join(" ");

            if (params[key] === "" || params[key] === undefined) {
              errors[key] = `El campo '${name}' está vacio.`;
            } else {
              if (
                parseInt(params[key]) === "NaN" &&
                !regexText.test(params[key])
              ) {
                errors[
                  key
                ] = `El campo '${name}' no es válido. Debe tener entre 3 y 255 carácteres.`;
              }
              if (key === "isbn" && parseInt(params[key].length) < 13) {
                errors[key] = `El campo '${name}' debe tener 13 carácteres.`;
              }
            }
          }
          return errors;
        };

        let errors = validateParams();

        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          toast.warning("Rellene los campos vacíos")
        } else {
          fetch("/api/usuarios/editar", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ params }),
          });

          setErrors(null);
          setStep(3);
        }

        break;
    }
  };

  return (
    <>
      <Head>
        <title>Cesta de la compra | Hoshi Manga</title>
      </Head>

      <div className={style.app__cart__steps}>
        <div
          className={`flexible ${style.app__cart__steps__step} ${step === 1 ? style.app__cart__steps__step__active : ""
            }`}
        >
          <p onClick={() => cart && setStep(1)} className="flexible">1</p>
          <p>Productos</p>
        </div>

        <div
          className={`flexible ${style.app__cart__steps__step} ${step === 2 ? style.app__cart__steps__step__active : ""
            }`}
        >
          <p onClick={() => cart && setStep(2)} className="flexible">2</p>
          <p>Datos</p>
        </div>

        <div
          className={`flexible ${style.app__cart__steps__step} ${step === 3 ? style.app__cart__steps__step__active : ""
            }`}
        >
          <p className="flexible">3</p>
          <p>Pago</p>
        </div>
      </div>

      <div className={style.app__cart__grid}>
        {step === 1 && (
          <Productos
            cart={cart}
            handleClickAddTotal={handleClickAddTotal}
            handleClickRemoveTotal={handleClickRemoveTotal}
            handleClickRemoveProduct={handleClickRemoveProduct}
            handleClickRemoveProducts={handleClickRemoveProducts}
          />
        )}

        {step === 2 && (
          <DatosFacturacion
            params={params}
            setParams={setParams}
            errors={errors}
          />
        )}

        {step === 3 && <Pago total={totalCart} user={user} productos={cart} />}

        <div>
          <div className="contenedor">
            <h3 className="borde__gris">Detalles de la cesta</h3>

            <div className="flex__between">
              <h4>Total</h4>

              <b>{totalCart.toFixed(2)} €</b>
            </div>
          </div>

          {cart && <>
            {step < 3 && (
              <Boton
                texto={step === 3 ? "Realizar pedido" : "Continuar"}
                click={handleClickNextStep}
                clase={style.app__cart__boton__compra}
              />
            )}
            {step === 3 && (
              <Boton
                texto='Volver a los datos de facturación'
                click={() => {
                  setStep(2);
                  handleClickNextStep()
                }}
                clase={style.app__cart__boton__compra}
              />
            )}
          </>}
        </div>
      </div>
    </>
  );
};

export default Cart;
