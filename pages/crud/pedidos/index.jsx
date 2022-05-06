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

const CrudPedidosListado = ({ data }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [pedido, setPedido] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [dataPaginated, setDataPaginated] = useState(data.pedidos);
  const [pagina, setPagina] = useState(1)
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);
  const [filtros, setFiltros] = useState({
    id: "",
    num_pedido: "",
  });

  const pages = Math.ceil(data.total / limit);

  const items = [{ href: "/crud", text: "Crud" }, { text: "Pedidos" }];

  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(
      `/api/pedidos?limit=${limit}&skip=${skip}&id=${filtros.id}` +
      `&num_pedido=${filtros.num_pedido}`
    );
    const data = await response.json();

    setLoading(false)
    setDataPaginated(data.pedidos);
  };

  const borrarPedidos = async () => {
    window.location.href = window.location.pathname;
    closeModal();
    toast.success("Pedido borrado correctamente");

    await fetch(`/api/pedidos/${pedido._id}/borrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  };

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
      id: "",
      num_pedido: "",
    });

    await fetchData();
  };

  const formatDate = (date) => {
    let fecha = new Date(date);
    return `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
  };

  return (
    <>
      <Head>
        <title>Listado Pedidos | CRUD | Hoshi Manga</title>
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
            className="formulario__fieldset"
            name="num_pedido"
            value={filtros.num_pedido}
            onChange={leerDato}
          />

          <FieldsetInput
            tipo="text"
            text="ID"
            className="formulario__fieldset"
            name="id"
            value={filtros.id}
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
                <th>ID</th>
                <th>Usuario</th>
                <th>Nº Pedido</th>
                <th>Creado</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dataPaginated.map((item, i) => (
                <tr key={i} className={style.listado__table__row}>
                  <td>{item._id}</td>

                  <td>{item.usuario}</td>

                  <td># {item.num_pedido}</td>

                  <td>{formatDate(item.createdAt)}</td>

                  <td>{parseFloat(item.precio).toFixed(2)} €</td>

                  <td>
                    <Boton
                      icono="bi bi-trash"
                      clase="rojo"
                      click={() => {
                        openModal();
                        setPedido({
                          _id: item._id,
                          num_pedido: item.num_pedido,
                        });
                      }}
                    />
                  </td>
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


      {isOpen && (
        <ModalConfirmacion
          closeModal={closeModal}
          onClick={borrarPedidos}
          text={`¿Estás seguro de que quieres borrar el pedido '${pedido.num_pedido}'?`}
        />
      )}
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
