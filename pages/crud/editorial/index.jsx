/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import ModalConfirmacion from "../../../components/Modal/ModalConfirmacion";
import Ruta from "../../../components/Ruta";
import useModal from "../../../hooks/useModal";
import { toast } from "react-toastify";
import style from "../Listado.module.css";
import BotonLink from "../../../components/BotonLink";
import Boton from "../../../components/Boton";

const CrudEditorialListado = ({ data }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [editorial, setEditorial] = useState({});

  const items = [{ href: "/crud", text: "Crud" }, { text: "Editoriales" }];

  const borrarEditorial = async () => {
    window.location.href = window.location.pathname;
    closeModal();
    toast.success("Editorial borrada correctamente");

    await fetch(`/api/editoriales/${editorial._id}/borrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  };

  return (
    <>
      <Head>
        <title>Listado Editoriales | CRUD | Hoshi Manga</title>
      </Head>

      <Ruta items={items} />

      <div className="app__title">
        <h2>Listado de Editoriales</h2>

        <BotonLink url="/crud/editorial/insertar" texto="Añadir" />
      </div>

      {data && (
        <table className={style.listado__table}>
          <thead>
            <tr className={style.listado__table__row}>
              <th>ID</th>
              <th>Nombre</th>
              <th>Logo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i} className={style.listado__table__row}>
                <td>{item._id}</td>

                <td>{item.nombre}</td>

                <td>
                  {item.imagen.includes('editoriales/') ?
                    <Image
                      src={`/img/${item.imagen}`}
                      alt={item.nombre}
                      width={130}
                      height={80}
                    />
                    : <img
                      src={item.imagen}
                      alt={item.nombre}
                    />}
                </td>

                <td className={style.listado__table__row__actions}>
                  <BotonLink
                    url={`/crud/editorial/editar/${item._id}`}
                    icono="bi bi-pencil"
                  />

                  <Boton
                    icono="bi bi-trash"
                    click={() => {
                      openModal();
                      setEditorial({ nombre: item.nombre, _id: item._id });
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isOpen && (
        <ModalConfirmacion
          closeModal={closeModal}
          onClick={borrarEditorial}
          text={`¿Estás seguro de que quieres borrar la editorial '${editorial.nombre}'?`}
        />
      )}
    </>
  );
};

CrudEditorialListado.getInitialProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/editoriales`);
  const data = await response.json();

  return { data };
};

export default CrudEditorialListado;
