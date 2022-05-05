import Head from "next/head";
import React, { useState, useEffect } from "react";
import Boton from "../../../components/Boton";
import { FieldsetInput } from "../../../components/Fieldset";
import Paginacion from "../../../components/Paginacion";
import Ruta from "../../../components/Ruta";
import style from "../Listado.module.css";

const CrudPedidosListado = ({ pedidos }) => {
  const [dataPaginated, setDataPaginated] = useState(pedidos.data);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filtros, setFiltros] = useState({
    id: "",
    num_pedido: "",
  });

  const items = [{ href: "/crud", text: "Crud" }, { text: "Pedidos" }];

  const fetchData = async () => {
    const response = await fetch(
      `/api/pedidos?limit=${limit}&skip=${skip}&id=${filtros.id}` +
        `&num_pedido=${filtros.num_pedido}`
    );
    const data = await response.json();
    setDataPaginated(data.data);
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
    }
  };

  const nextPage = () => {
    if (dataPaginated.length === limit) {
      setSkip(skip + limit);
    }
  };

  // FILTROS

  const leerDato = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const handleClickFilter = async () => {
    await fetchData();
  };

  // VACIAR FILTROS

  const handleClickClearFilter = async () => {
    setFiltros({
      id: "",
      num_pedido: "",
    });

    await fetchData();
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

      <table className={style.listado__table}>
        <thead>
          <tr className={style.listado__table__row}>
            <th>ID</th>
            <th>Nº Pedido</th>
            <th>Creado</th>
            <th>Total Productos</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {dataPaginated.map((item, i) => (
            <tr key={i} className={style.listado__table__row}>
              <td>{item._id}</td>

              <td># {item.num_pedido}</td>

              <td></td>

              <td>{item.productos.length} productos</td>

              <td>{parseFloat(item.precio).toFixed(2)} €</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Paginacion
        limit={limit}
        skip={skip}
        nextPage={nextPage}
        prevPage={prevPage}
        setLimit={setLimit}
        dataPaginated={dataPaginated}
      />
    </>
  );
};

CrudPedidosListado.getInitialProps = async () => {
  const response = await fetch(
    `http://localhost:3001/api/pedidos?limit=10&skip=0`
  );
  const pedidos = await response.json();

  return { pedidos };
};

export default CrudPedidosListado;
