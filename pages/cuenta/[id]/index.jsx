/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import React, { useState, useEffect } from "react";
import style from "./Cuenta.module.css";
import Listado from "../../crud/Listado.module.css";
import Link from "next/link";
import BotonLink from "../../../components/BotonLink";
import Loading from "../../../components/Loading";
import Paginacion from "../../../components/Paginacion";
import { formatDate } from "../../../services/funciones";
import Icono from "../../../components/Icono";

const Cuenta = ({ data }) => {
  const [dataPaginated, setDataPaginated] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [pagina, setPagina] = useState(1)
  const [paginas, setPaginas] = useState(1)
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      `/api/pedidos?limit=${limit}&skip=${skip}`
    );
    const pedidos = await response.json();
    const pages = Math.ceil(pedidos.total / limit);
    setPaginas(pages);
    setLoading(false);
    setDataPaginated(pedidos.pedidos);
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
      setPagina(parseInt(pagina) - 1)
    }
  };

  const nextPage = () => {
    if (dataPaginated.length === limit) {
      setSkip(skip + limit);
      setPagina(parseInt(pagina) + 1)
    }
  };

  return (
    <>
      <Head>
        <title>{data.nombre} - Cuenta | Hoshi Manga</title>
      </Head>

      <div className={style.app__cuenta__grid}>
        <div className={`contenedor ${style.app__cuenta__user}`}>
          {data.nombre
            && <p className={`flexible ${style.app__cuenta__user__avatar}`}>
              {data.nombre.charAt(0).toUpperCase()}
              {data.apellidos.charAt(0).toUpperCase()}
            </p>}

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
              <h2 className="borde__contenedor">Historial de Pedidos</h2>

              {dataPaginated.length > 0 ? <>
                <table className={Listado.listado__table}>
                  <thead>
                    <tr className={Listado.listado__table__row}>
                      <th>Nº Pedido</th>
                      <th>Usuario</th>
                      <th>Total Productos</th>
                      <th>Creado</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPaginated?.map((item, i) => (
                      <tr key={i} className={Listado.listado__table__row}>
                        <td># {item.num_pedido}</td>

                        <td>{item.usuario.nombre} {item.usuario.apellidos}</td>

                        <td>{item.productos.length} producto/s</td>

                        <td>{formatDate(item.createdAt)}</td>

                        <td>{item.importe.toFixed(2)} €</td>

                        <td>
                          <Link href={`/pedido?num_pedido=${item.num_pedido}`}>
                            <a className={`${Listado.listado__table__btn__icono} flexible`}>
                              <Icono icono='bi bi-eye' />
                            </a>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Paginacion
                  limit={limit}
                  skip={skip}
                  pages={paginas}
                  page={pagina}
                  nextPage={nextPage}
                  prevPage={prevPage}
                  setLimit={setLimit}
                  setSkip={setSkip}
                  dataPaginated={dataPaginated}
                  total={dataPaginated.length}
                />
              </> : <div className="flexible">
                <h2>Aún no tienes pedidos</h2>
              </div>}
            </>
          )}
        </div>
      </div>
    </>
  );
};

Cuenta.getInitialProps = async ({ query }) => {
  const { id } = query;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/${id}`);
  const data = await response.json();

  return { data };
};

export default Cuenta;
