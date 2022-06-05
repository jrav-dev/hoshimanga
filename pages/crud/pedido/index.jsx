/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import React, { useState, useEffect } from "react";
import Boton from "../../../components/Boton";
import { FieldsetInput } from "../../../components/Fieldset";
import ModalConfirmacion from "../../../components/Modal/ModalConfirmacion";
import Paginacion from "../../../components/Paginacion";
import Ruta from "../../../components/Ruta";
import useModal from "../../../hooks/useModal";
import style from "../Listado.module.css";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import { formatDate } from "../../../services/funciones";

const CrudPedidosListado = ({ data }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [pedido, setPedidos] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [dataPaginated, setDataPaginated] = useState(data.pedidos);
  const [pagina, setPagina] = useState(1)
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filtros, setFiltros] = useState({
    num_pedido: "",
    usuario: "",
  });

  const pages = Math.ceil(data.total / limit);

  const items = [{ href: "/crud", text: "Crud" }, { text: "Pedidos" }];

  const fetchData = async (filters = filtros) => {
    setLoading(true)
    const response = await fetch(
      `/api/pedidos?limit=${limit}&skip=${skip}&id=${filters.id}` +
      `&num_pedido=${filters.num_pedido}&usuario=${filters.usuario}`
    );
    const data = await response.json();
    setLoading(false)
    setDataPaginated(data.pedidos);
  };

  // const borrarPedidos = async () => {
  //   window.location.href = window.location.pathname;
  //   closeModal();
  //   toast.success("Pedido borrado correctamente");

  //   await fetch(`/api/mangas/${manga._id}/borrar`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   });
  // };

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

  // FILTROS

  const leerDato = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleClickFilter = async () => {
    await fetchData();
    setPagina(1)
    setSkip(0)
  };

  // VACIAR FILTROS

  const handleClickClearFilter = async () => {
    setFiltros({
      num_pedido: "",
      usuario: "",
    });
    await fetchData({
      num_pedido: "",
      usuario: "",
    });
  };

  return (
    <>
      <Head>
        <title>Listado Pedidos | CRUD | Hoshi Pedido</title>
      </Head>

      <Ruta items={items} />

      <div className="app__title">
        <h2>Listado de Pedidos</h2>
      </div>

      <div className="app__listado__filtros contenedor">
        <div className="app__listado__filtros__grid">
          <FieldsetInput
            tipo="text"
            text="Nª Pedido"
            name="num_pedido"
            value={filtros.num_pedido}
            onChange={leerDato}
          />

          <FieldsetInput
            tipo="text"
            text="Usuario"
            name="usuario"
            value={filtros.usuario}
            onChange={leerDato}
          />
        </div>

        <div className="app__listado__acciones">
          <Boton
            texto="Filtrar"
            icono="bi bi-funnel"
            click={handleClickFilter}
          />
          <Boton
            texto="Vaciar Filtros"
            icono="bi bi-trash"
            click={handleClickClearFilter}
            clase="rojo"
          />
        </div>
      </div>

      {isLoading ? <Loading />
        : <>
          <Paginacion
            limit={limit}
            skip={skip}
            pages={pages}
            page={pagina}
            nextPage={nextPage}
            prevPage={prevPage}
            setLimit={setLimit}
            setSkip={setSkip}
            setPagina={setPagina}
            dataPaginated={dataPaginated}
            total={dataPaginated.length}
          />

          <table className={style.listado__table}>
            <thead>
              <tr className={style.listado__table__row}>
                <th>Nº Pedido</th>
                <th>Usuario</th>
                <th>Total Productos</th>
                <th>Creado</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {dataPaginated.map((item, i) => (
                <tr key={i} className={style.listado__table__row}>
                  <td># {item.num_pedido}</td>

                  <td>{item.usuario.nombre} {item.usuario.apellidos}</td>

                  <td>{item.productos.length} producto/s</td>

                  <td>{formatDate(item.createdAt)}</td>

                  <td>{item.importe.toFixed(2)} €</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Paginacion
            limit={limit}
            skip={skip}
            pages={pages}
            page={pagina}
            nextPage={nextPage}
            prevPage={prevPage}
            setLimit={setLimit}
            setSkip={setSkip}
            setPagina={setPagina}
            dataPaginated={dataPaginated}
            total={dataPaginated.length}
          />
        </>}


      {/* {isOpen && (
        <ModalConfirmacion
          closeModal={closeModal}
          onClick={borrarPedidos}
          text={`¿Estás seguro de que quieres borrar el pedido '${pedido.num_pedido}'?`}
        />
      )} */}
    </>
  );
};

CrudPedidosListado.getInitialProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/pedidos?limit=20&skip=0`
  );
  const data = await response.json();

  return { data };
};

export default CrudPedidosListado;
