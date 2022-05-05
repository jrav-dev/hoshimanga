/* eslint-disable @next/next/no-sync-scripts */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Router from "next/router";
import Layout from "./Layout";
import Boton from "./Boton";
import useUserValidation from "../hooks/useUserValidation";

const LayoutApp = ({ children }) => {
  const { userOK, isLoading } = useUserValidation();
  const [URL, setURL] = useState("");

  useEffect(() => {
    setURL(Router.pathname);
  }, [URL]);

  if (userOK === false && URL.includes("/crud")) {
    return (
      <>
        <Head>
          <title>Acceso Denegado | Hoshi Manga</title>
          <link rel="shortcut icon" href="/favicon.webp" type="image/x-icon" />
        </Head>

        <main className="app__message flexible">
          <h1>No tienes permisos para acceder a esta página</h1>

          <Boton
            texto="Inicio"
            icono="bi bi-house"
            click={() => (window.location.href = "/")}
          />
        </main>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Hoshi Manga</title>
          <link rel="shortcut icon" href="/favicon.webp" type="image/x-icon" />
        </Head>

        <div className="app">
          {URL.includes("confirmacion")
            ? children
            : <Layout>{children}</Layout>
          }
        </div>
      </>
    );
  }
};

export default LayoutApp;
