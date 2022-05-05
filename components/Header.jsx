/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState } from "react";
import Link from "next/link";
import { useVisible } from "../hooks/useVisible";
import useUser from "../hooks/useUser";
import Icono from "./Icono";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Header = () => {
  const { ref, isVisible, setIsVisible } = useVisible(false);
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

              <span onClick={removeUser}>Cerrar Sessión</span>
            </div>
          ) : (
            <Link href="/login">Iniciar Sesión</Link>
          )}
        </div>
      </div>

      <div className="app__header__row">
        <div>
          <div className="app__header__row__flex">
            <Link href="/">
              <a>
                <h1 className="app__header__title">Hoshi Manga</h1>
              </a>
            </Link>

            <nav className="app__header__nav">
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
            <form className="app__form__search" onSubmit={handleSubmit}>
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

      {/* <div>
        <nav
          ref={ref}
          className={`${isVisible ? 'mostrar' : 'ocultar'}`}
          onClick={() => setIsVisible(false)}
        >
          <ul onClick={(e) => e.stopPropagation()}>
            <i className="bi bi-x" onClick={() => setIsVisible(false)}></i>
            <Link href={"/"}>Inicio</Link>
            <Link href={"/novedades"}>Novedades</Link>
            <Link href={"/mangas"}>Mangas</Link>
            <Link href={"/editoriales"}>Editoriales</Link>
            <Link href={"/merchandising"}>Merchandising</Link>

            <hr />

            {user && user.is_admin && (
              <>
                <Link href="/crud">CRUD</Link>

                <span className="active" onClick={removeUser}>
                  Cerrar Sessión
                </span>
              </>
            )}
          </ul>

          <div>
            <i className="bi bi-cart2"></i>
            <span>0</span>
          </div>
        </nav>
        
      </div> */}
    </header>
  );
};

export default Header;
