/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { useVisible } from "../hooks/useVisible";
import useUser from "../hooks/useUser";
import BotonLink from "../components/BotonLink";
import Icono from "./Icono";
import { fetchPost } from "../services/funciones";
import useLocalStorage from '../hooks/useLocalStorage';

const Header = () => {
  const [darkMode, removeDarkMode, setDarkMode] = useLocalStorage("dark-mode");
  const [darkModeIcon, setDarkModeIcon] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCarrito, setShowCarrito] = useState(false);
  const { user, removeUser } = useUser();
  const [search, setSearch] = useState("");
  const [carrito, setCarrito] = useState(null);

  useEffect(() => {
    if (darkMode === "dark") {
      document.getElementsByTagName("body")[0].setAttribute("class", darkMode);
      setDarkModeIcon(true)
    }
  }, [darkMode]);

  const handleClickDarkModeIcon = () => {
    if (darkModeIcon) {
      setDarkModeIcon(false)
      removeDarkMode("dark")
      document.getElementsByTagName("body")[0].removeAttribute("class", darkMode);
    } else {
      setDarkModeIcon(true)
      setDarkMode("dark")
      document.getElementsByTagName("body")[0].setAttribute("class", darkMode);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search !== "") {
      window.location.href = `/mangas?q=${search}`;
    }
  };

  const handleClickCart = async () => {
    setShowCarrito(!showCarrito);
    if (user) {
      const responseCarrito = await fetchPost('/api/carrito', { usuario: user._id })
      if (responseCarrito.msg) {
        setCarrito(null)
      } else {
        setCarrito(responseCarrito)
      }
    }
  }

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
    Router.push(window.location.pathname)
  }

  const handleClickAddAmount = async (id) => {
    const index = carrito.productos.findIndex(product => product.producto._id === id)
    let producto = carrito.productos[index]

    producto.cantidad += 1
    producto.total += producto.precio
    carrito.importe = parseFloat((carrito.importe + producto.precio).toFixed(2))

    await fetchPost('/api/carrito/add-product', carrito)
    setCarrito(carrito)
    Router.push(window.location.pathname)
  }

  return (
    <header className="app__header">
      <div className="app__header__row">
        <div>
          {user ? (
            <div className="flexible app__header__user">

              <Link href={`/cuenta/${user._id}`}>
                <a className="flexible">
                  <p>
                    <span>{user.nombre}</span>
                    <span>{user.apellidos}</span>
                  </p>
                  <Icono icono="bi bi-person" />
                </a>
              </Link>

              <span onClick={removeUser}>Cerrar Sesión</span>
            </div>
          ) : (
            <Link href="/login">Iniciar Sesión</Link>
          )}

          <Icono icono='bi bi-sun' click={handleClickDarkModeIcon} />
        </div>
      </div>

      <div className="app__header__row app__header__row__flex">
        <div>
          <div className="app__header__row__flex">
            <Link href="/">
              <a>
                <h1 className="app__header__title">Hoshi Manga</h1>
              </a>
            </Link>

            <nav
              className={`app__header__nav ${showNav
                ? "app__header__nav__show"
                : "app__header__nav__hide"
                }`}
            >
              <ul className="flexible">
                <li>
                  <Link href={"/"}>Inicio</Link>
                </li>
                <li>
                  <Link href={"/mangas"}>Mangas</Link>
                </li>
                <li>
                  <Link href={"/editoriales"}>Editoriales</Link>
                </li>
                {user && user.is_admin
                  ? <li>
                    <Link href="/crud">CRUD</Link>
                  </li>
                  : null}
              </ul>
            </nav>
          </div>

          <div className="app__header__row__flex">
            <form
              className={`app__form__search ${showSearch
                ? "app__form__search__show"
                : "app__form__search__hide"
                }`}
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="q"
                placeholder="Buscar ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button>Buscar</button>
            </form>

            <div className="flexible">
              <span
                className="app__header__btn__nav"
                onClick={() => {
                  setShowNav(!showNav);
                  setShowSearch(false);
                }}
              >
                <Icono icono="bi bi-list" />
              </span>

              <span
                className="app__header__btn__search"
                onClick={() => {
                  setShowSearch(!showSearch);
                  setShowNav(false);
                }}
              >
                <Icono icono="bi bi-search" />
              </span>

              <span className="app__header__cart" onClick={handleClickCart}>
                <Icono icono="bi bi-cart2" />
              </span>
            </div>
          </div>

          {showCarrito
            && <div className="app__carrito__container">
              <h3>Cesta de la Compra</h3>

              {carrito !== null && <>
                <div className="app__carrito__productos">
                  {carrito.productos.map((item, i) => (
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

                <div className="app__carrito__total">
                  <b>Total:</b>
                  <p>{carrito.importe} €</p>
                </div>

                <BotonLink
                  url={`/carrito?n=${carrito.usuario}`}
                  texto='Comprar'
                  clase='app__carrito__boton'
                  click={() => setShowCarrito(false)}
                />
              </>}
            </div>}
        </div>
      </div>
    </header>
  );
};

export default Header;
