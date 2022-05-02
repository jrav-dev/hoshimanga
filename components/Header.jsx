/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState } from "react";
import Link from "next/link";
import { useVisible } from "../hooks/useVisible";
import useUser from "../hooks/useUser";
import Icono from "./Icono";

const Header = () => {
  const { ref, isVisible, setIsVisible } = useVisible(false);
  const { user, removeUser } = useUser();

  return (
    <header className="app__header">
      <div className="app__header_row">
        <div>
          {user ? (
            <div className="flexible app__header__user">
              {user.is_admin ? <Link href='/crud'>CRUD</Link> : null}

              <Link href="/cuenta">
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

      <div className="app__header_row">
        <div>
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
              <li>
                <Link href={"/merchandising"}>Merchandising</Link>
              </li>
            </ul>
          </nav>

          <div className="flexible">
            <div className="app__header__cart">
              <Icono icono="bi bi-cart2" />
              <span className="flexible">0</span>
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
