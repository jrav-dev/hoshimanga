/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState } from "react";
import Link from "next/link";
import { useVisible } from "../hooks/useVisible";
import useUser from "../hooks/useUser";
import Icono from "./Icono";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Header = () => {
  const visibleNav = useVisible(false);
  const visibleSearch = useVisible(false);
  const { user, removeUser } = useUser();
  const [storedValue] = useLocalStorage("cart");
  const totalCart = storedValue ? storedValue.length : 0;
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search !== "") {
      window.location.href = `/mangas?q=${search}`;
    }
  };

  return (
    <header className="app__header">
      <div className="app__header__row">
        <div>
          {user ? (
            <div className="flexible app__header__user">
              {user.is_admin ? <Link href="/crud">CRUD</Link> : null}

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
              className={`app__header__nav ${
                visibleNav.isVisible
                  ? "app__header__nav__show"
                  : "app__header__nav__hide"
              }`}
              ref={visibleNav.ref}
            >
              <ul className="flexible">
                <li>
                  <Link href={"/"}>Inicio</Link>
                </li>
                <li>
                  <Link href={"/novedades"}>Novedades</Link>
                </li>
                <li>
                  <Link href={"/mangas"}>Mangas</Link>
                </li>
                <li>
                  <Link href={"/editoriales"}>Editoriales</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="app__header__row__flex">
            <form
              className={`app__form__search ${
                visibleSearch.isVisible
                  ? "app__form__search__show"
                  : "app__form__search__hide"
              }`}
              onSubmit={handleSubmit}
              ref={visibleSearch.ref}
            >
              <input
                type="text"
                name="q"
                placeholder="Buscar ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <i className="bi bi-x" onClick={() => setSearch("")}></i>
              )}
              <button>Buscar</button>
            </form>

            <div className="flexible">
              <span
                className="app__header__btn__nav"
                onClick={() => {
                  visibleNav.setIsVisible(!visibleNav.isVisible);
                  visibleSearch.setIsVisible(false);
                }}
              >
                <Icono icono="bi bi-list" />
              </span>

              <span
                className="app__header__btn__search"
                onClick={() => {
                  visibleNav.setIsVisible(false);
                  visibleSearch.setIsVisible(!visibleSearch.isVisible);
                }}
              >
                <Icono icono="bi bi-search" />
              </span>

              <Link href="/cart">
                <a className="app__header__cart">
                  <Icono icono="bi bi-cart2" />
                  <span className="flexible">{totalCart}</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
