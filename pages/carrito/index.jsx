/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import Boton from "../../components/Boton";
import style from "../../styles/Cart.module.css";
import DatosFacturacion from "./DatosFacturacion";
import { toast } from "react-toastify";
import Pago from "./Pago";
import Icono from "../../components/Icono";
import useUser from "../../hooks/useUser";
import { fetchPost } from "../../services/funciones";
import { FieldsetInput } from "../../components/Fieldset";
import { validarCodigoPostal, validarDNI, validarEmail, validarString, validarTelefono } from "../../services/UtilesValidacion";

const Cart = ({ productos, usuario }) => {
  const { user } = useUser()
  const [carrito, setCarrito] = useState(productos === null ? null : productos)
  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState(null);
  const [params, setParams] = useState();

  useEffect(() => {
    if (usuario) {
      setParams({
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        email: usuario.email,
        telefono: usuario.telefono,
        dni: usuario.dni,
        direccion: usuario.direccion,
        poblacion: usuario.poblacion,
        pais: usuario.pais,
        codigo_postal: usuario.codigo_postal,
      })
    }
  }, [usuario])

  useEffect(() => {
    if (productos === null) {
      window.location.href = "/";
    }
  }, [productos])

  const handleClickRemoveAmount = async (id) => {
    const index = carrito.productos.findIndex(product => product.producto._id === id)
    let producto = carrito.productos[index]

    if (producto.cantidad === 1) {
      carrito.productos.splice(index, 1)
      carrito.importe = parseFloat((carrito.importe - producto.precio).toFixed(2))
    } else {
      producto.cantidad -= 1
      producto.total -= producto.precio
      carrito.importe = parseFloat((carrito.importe - producto.precio).toFixed(2))
    }

    await fetchPost('/api/carrito/add-product', carrito)
    setCarrito(carrito)
    Router.push(window.location.pathname + window.location.search)
  }

  const handleClickAddAmount = async (id) => {
    const index = carrito.productos.findIndex(product => product.producto._id === id)
    let producto = carrito.productos[index]

    producto.cantidad += 1
    producto.total += producto.precio
    carrito.importe = parseFloat((carrito.importe + producto.precio).toFixed(2))

    await fetchPost('/api/carrito/add-product', carrito)
    setCarrito(carrito)
    Router.push(window.location.pathname + window.location.search)
  }

  const handleClickNextStep = async () => {
    switch (step) {
      case 1:
        const validateParams = () => {
          let errors = {};

          for (const key in params) {
            let name =
              key.charAt(0).toUpperCase() + key.slice(1).split("_").join(" ");

            if (params[key] === "" || params[key] === undefined) {
              errors[key] = `El campo '${name}' está vacio.`;
            } else {
              switch (key) {
                case "email":
                  errors['email'] = validarEmail(params['email']);
                  break;
                case "telefono":
                  errors['telefono'] = validarTelefono(params['telefono']);
                  break;
                case "dni":
                  errors['dni'] = validarDNI(params['dni']);
                  break;
                case "codigo_postal":
                  errors['codigo_postal'] = validarCodigoPostal(params['codigo_postal']);
                  break;
                case "direccion":
                  break;

                default:
                  errors[key] = validarString(params[key]);
                  break;
              }
            }
          }
          return errors;
        };

        let errors = validateParams();

        if (
          errors.nombre === true &&
          errors.apellidos === true &&
          errors.email === true &&
          errors.codigo_postal === true &&
          errors.dni === true &&
          errors.pais === true &&
          errors.poblacion === true &&
          errors.telefono === true
        ) {
          await fetchPost(`/api/usuarios/editar`, {
            _id: usuario._id,
            params
          })
          setErrors(null);
          setStep(2)
        } else {
          setErrors(errors);
          toast.warning("Rellene los campos vacíos")
        }
        break;
    }
  };

  const readParam = (e) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
  };

  return (
    <>
      <Head>
        <title>Cesta de la compra | Hoshi Manga</title>
      </Head>

      {productos && <>
        {/* <div className={style.app__cart__steps}>
        <div className={`flexible ${style.app__cart__steps__step} ${step === 1
          ? style.app__cart__steps__step__active : ""
          }`}>
          <p onClick={() => cart && setStep(1)} className="flexible">1</p>
          <p>Productos</p>
        </div>

        <div className={`flexible ${style.app__cart__steps__step} ${step === 2
          ? style.app__cart__steps__step__active : ""
          }`}>
          <p onClick={() => cart && setStep(2)} className="flexible">2</p>
          <p>Datos</p>
        </div>

        <div className={`flexible ${style.app__cart__steps__step} ${step === 3
          ? style.app__cart__steps__step__active : ""
          }`}>
          <p className="flexible">3</p>
          <p>Pago</p>
        </div>
      </div> */}

        <div className={style.app__cart__grid}>
          {step === 1 && (
            <div className='formulario__container'>
              {params && <>
                <h2 className='borde__contenedor'>Datos de Facturación</h2>

                <div className='contenedor'>
                  <FieldsetInput
                    tipo="text" name='nombre' text='Nombre'
                    value={params.nombre} onChange={readParam}
                    error={errors && errors.nombre} />

                  <FieldsetInput
                    tipo="text" name='apellidos' text='Apellidos'
                    value={params.apellidos} onChange={readParam}
                    error={errors && errors.apellidos} />

                  <FieldsetInput
                    tipo="email" name='email' text='Correo Electrónico'
                    value={params.email} onChange={readParam}
                    error={errors && errors.email} />

                  <FieldsetInput
                    tipo="text" name='telefono' text='Teléfono'
                    value={params.telefono} onChange={readParam}
                    error={errors && errors.telefono} />

                  <FieldsetInput
                    tipo="text" name='dni' text='DNI'
                    value={params.dni} onChange={readParam}
                    error={errors && errors.dni} />

                  <FieldsetInput
                    tipo="text" name='direccion' text='Dirección'
                    value={params.direccion} onChange={readParam}
                    error={errors && errors.direccion} />

                  <FieldsetInput
                    tipo="text" name='poblacion' text='Población'
                    value={params.poblacion} onChange={readParam}
                    error={errors && errors.poblacion} />

                  <FieldsetInput
                    tipo="text" name='pais' text='Pais'
                    value={params.pais} onChange={readParam}
                    error={errors && errors.pais} />

                  <FieldsetInput
                    tipo="text" name='codigo_postal' text='Código Postal'
                    value={params.codigo_postal} onChange={readParam}
                    error={errors && errors.codigo_postal} />
                </div>
              </>}
            </div>
          )}

          {step === 2 && <Pago total={carrito.importe} user={user} carrito={carrito} />}

          <div>
            <h3 className="borde__contenedor">Detalles de la cesta</h3>

            <div className="contenedor">

              {carrito !== null && <>
                <div className="app__carrito__productos">
                  {carrito.productos?.map((item, i) => (
                    <div key={i} className="app__carrito__producto">
                      <img src={`/img/${item.producto.imagen}`} alt={item.producto.nombre} />
                      <div className="app__carrito__info">
                        <p className="puntos__suspensivos">{item.producto.nombre}</p>
                        <p>{item.total.toFixed(2)} €</p>

                        <div className="app__carrito__cantidad">
                          <Icono icono="bi bi-dash" click={() => handleClickRemoveAmount(item.producto._id)} />
                          <span>{item.cantidad}</span>
                          <Icono icono="bi bi-plus" click={() => handleClickAddAmount(item.producto._id)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>}

              <div className="flex__between">
                <h4>Total</h4>

                <b>{carrito ? carrito.importe : 0} €</b>
              </div>
            </div>

            {step !== 2
              && <Boton
                texto='Continuar'
                click={handleClickNextStep}
                clase={style.app__cart__boton__compra}
              />}
          </div>
        </div>
      </>}
    </>
  );
};

Cart.getInitialProps = async (ctx) => {
  const { n } = ctx.query;

  if (n) {
    const productos = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carrito`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario: n }),
    })
    const productosData = await productos.json();

    const usuario = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/${n}`)
    const usuarioData = await usuario.json();
    return { productos: productosData, usuario: usuarioData }
  } else {
    return { productos: null }
  }
}

export default Cart;
