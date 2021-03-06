/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Head from "next/head";
import ModalConfirmacion from "../../../components/Modal/ModalConfirmacion";
import {
  FieldsetInput,
} from "../../../components/Fieldset";
import Ruta from "../../../components/Ruta";
import Boton from "../../../components/Boton";
import BotonLink from "../../../components/BotonLink";
import useModal from "../../../hooks/useModal";
import { toast } from "react-toastify";
import style from "../Listado.module.css";
import Icono from "../../../components/Icono";
import Paginacion from "../../../components/Paginacion";
import Loading from "../../../components/Loading";

const CrudUsuarioListado = ({ usuarios }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [usuario, setUsuario] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [dataPaginated, setDataPaginated] = useState(usuarios.data);
  const [pagina, setPagina] = useState(1)
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filtros, setFiltros] = useState({
    id: "",
    nombre: "",
    apellidos: "",
    email: "",
    is_admin: "",
  });

  const pages = Math.ceil(usuarios.total / limit);

  const items = [{ href: "/crud", text: "Crud" }, { text: "Usuarios" }];

  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(
      `/api/usuarios?limit=${limit}&skip=${skip}&id=${filtros.id}` +
      `&nombre=${filtros.nombre}&apellidos=${filtros.apellidos}` +
      `&email=${filtros.email}&is_admin=${filtros.is_admin}`
    );
    const data = await response.json();

    setLoading(false)
    setDataPaginated(data.data);
  };

  const borrarUsuario = async () => {
    window.location.href = window.location.pathname;
    closeModal();
    toast.success("Usuario borrado correctamente");

    await fetch(`/api/usuarios/borrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(usuario._id),
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
      nombre: "",
      apellidos: "",
      email: "",
      is_admin: "",
    });

    await fetchData();
  };

  return (
    <>
      <Head>
        <title>Listado usuarios | CRUD | Hoshi Manga</title>
      </Head>

      <Ruta items={items} />

      <div className="app__title">
        <h2>Listado de usuarios</h2>
      </div>

      <div className="app__listado__filtros contenedor">
        <div className="app__listado__filtros__grid">
          <FieldsetInput
            tipo="text"
            text="Nombre"
            className="formulario__fieldset"
            name="nombre"
            value={filtros.nombre}
            onChange={leerDato}
          />

          <FieldsetInput
            tipo="text"
            text="Apellidos"
            className="formulario__fieldset"
            name="apellidos"
            value={filtros.apellidos}
            onChange={leerDato}
          />

          <FieldsetInput
            tipo="text"
            text="Correo Electr??nico"
            className="formulario__fieldset"
            name="email"
            value={filtros.email}
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
          <div
            className={`formulario__checkbox ${filtros.is_admin ? "formulario__checkbox__active" : ""
              }`}
          >
            <label htmlFor="is_admin">Administrador</label>
            <span
              onClick={() => {
                setFiltros({
                  ...filtros,
                  is_admin: !filtros.is_admin,
                });
              }}
            >
              <Icono icono="bi bi-check" />
            </span>
          </div>

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
                <th>Avatar</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dataPaginated.map((item, i) => (
                <tr key={i} className={style.listado__table__row}>
                  <td>{item._id}</td>

                  <td>
                    <p className={`flexible ${style.listado__table__row__avatar}`}>
                      {item.nombre.charAt(0).toUpperCase()}
                      {item.apellidos.charAt(0).toUpperCase()}
                    </p>
                  </td>

                  <td>{item.nombre}</td>

                  <td>{item.apellidos}</td>

                  <td>{item.email}</td>

                  <td className={`${style.tag} ${style.verde}`}>
                    {item.is_admin ? "Admin" : null}
                  </td>

                  <td className={style.listado__table__row__actions}>
                    <BotonLink
                      url={`/crud/usuario/editar/${item._id}`}
                      icono="bi bi-pencil"
                    />

                    <Boton
                      icono="bi bi-trash"
                      click={() => {
                        openModal();
                        setUsuario({ nombre: item.nombre, _id: item._id });
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
          onClick={borrarUsuario}
          text={`??Est??s seguro de que quieres borrar el usuario '${usuario.nombre}'?`}
        />
      )}
    </>
  );
};

CrudUsuarioListado.getInitialProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/usuarios?limit=10&skip=0`
  );
  const usuarios = await response.json();

  return { usuarios };
};

export default CrudUsuarioListado;
