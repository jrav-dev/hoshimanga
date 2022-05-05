import Head from "next/head";
import React, { useState, useEffect } from "react";
import style from "./Cuenta.module.css";
import Link from "next/link";
import BotonLink from "../../components/BotonLink";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import Paginacion from "../../components/Paginacion";

const Cuenta = ({ data }) => {
  const [dataPaginated, setDataPaginated] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      `/api/usuarios/${data._id}/pedidos?limit=${limit}&skip=${skip}`
    );
    const pedidos = await response.json();
    setLoading(false);
    setDataPaginated(pedidos);
  };

  useEffect(async () => {
    await fetchData();
  }, []);

  // Se ejecuta cuando cambia el skip

  useEffect(async () => {
    await fetchData();
  }, [skip]);

  // Se ejecuta cuando cambia el limite

  useEffect(async () => {
    await fetchData();
  }, [limit]);

  // METODOS PAGINACION

  const prevPage = () => {
    if (skip > 0) {
      setSkip(skip - limit);
    }
  };

  const nextPage = () => {
    if (dataPaginated.length === limit) {
      setSkip(skip + limit);
    }
  };

  return (
    <>
      <Head>
        <title>{data.nombre} - Cuenta | Hoshi Manga</title>
      </Head>

      <div className={style.app__cuenta__grid}>
        <div className={`contenedor ${style.app__cuenta__user}`}>
          <p className={`flexible ${style.app__cuenta__user__avatar}`}>
            {data.nombre.charAt(0).toUpperCase()}
            {data.apellidos.charAt(0).toUpperCase()}
          </p>

          <h3 className={style.app__cuenta__user__name}>
            <span>{data.nombre}</span>
            <span>{data.apellidos}</span>
          </h3>

          <p>{data.email}</p>

          <p>{data.telefono}</p>

          <p>{data.dni}</p>

          <p>{data.direccion}</p>

          <p>{data.codigo_postal}</p>

          <p>{data.poblacion}</p>

          <p>{data.pais}</p>

          <BotonLink
            url={`/cuenta/${data._id}/editar-datos`}
            texto="Editar Datos"
            icono="bi bi-gear"
          />
        </div>

        <div className={style.app__cuenta__pedidos}>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <h2 className="borde__gris">Historial de Pedidos</h2>

              <div
                className={`${style.app__cart__product} app__table__product app__table__header`}
              >
                <b>Nº Pedido</b>
                <b>Creado</b>
                <b>Total Productos</b>
                <b>Precio</b>
                <b></b>
              </div>

              {dataPaginated?.map((item, i) => (
                <div
                  key={i}
                  className={`${style.app__cart__product} app__table__product`}
                >
                  <p># {item.num_pedido}</p>

                  <p></p>

                  <p>{item.productos.length} productos</p>

                  <p>{parseFloat(item.precio).toFixed(2)} €</p>

                  <div>
                    <BotonLink url={`/pedido/${item._id}`} texto="Ver Pedido" />
                  </div>
                </div>
              ))}

              <Paginacion
                limit={limit}
                skip={skip}
                nextPage={nextPage}
                prevPage={prevPage}
                setLimit={setLimit}
                dataPaginated={dataPaginated}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

Cuenta.getInitialProps = async ({ query }) => {
  const { id } = query;

  const response = await fetch(`http://localhost:3000/api/usuarios/${id}`);
  const data = await response.json();

  return { data };
};

export default Cuenta;
