/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Head from "next/head";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import Ruta from "../../../../components/Ruta";
import useForm from "../../../../hooks/useForm";
import { FieldsetInput } from "../../../../components/Fieldset";
import Boton from "../../../../components/Boton";
import Icono from "../../../../components/Icono";
import { toast } from 'react-toastify'
import { validarCodigoPostal, validarDNI, validarEmail, validarString, validarTelefono } from "../../../../services/UtilesValidacion";
import { fetchPost } from "../../../../services/funciones";

const CrudUsuarioEditar = ({ data }) => {
  const [user, setValue] = useLocalStorage("user");
  const [errors, setErrors] = useState(null);
  const { params, setParams, readParam } = useForm(
    {
      _id: data._id,
      nombre: data.nombre,
      apellidos: data.apellidos,
      email: data.email,
      password: "",
      direccion: data.direccion,
      poblacion: data.poblacion,
      pais: data.pais,
      codigo_postal: data.codigo_postal,
      telefono: data.telefono,
      dni: data.dni,
      is_admin: data.is_admin,
    },
  );

  const items = [
    { href: "/crud", text: "Crud" },
    { href: "/crud/usuario", text: "Usuarios" },
    { text: `Editar Usuario - ${data.nombre}` },
  ];

  const handleSubmitUsuario = async (e) => {
    e.preventDefault();

    const validateParams = () => {
      let errors = {};

      for (const key in params) {
        let name =
          key.charAt(0).toUpperCase() + key.slice(1).split("_").join(" ");

        if (params[key] === "" || params[key] === undefined) {
          errors[key] = `El campo '${name}' está vacio.`;
        } else {
          switch (key) {
            case "email":
              errors['email'] = validarEmail(params['email']);
              break;
            case "telefono":
              errors['telefono'] = validarTelefono(params['telefono']);
              break;
            case "dni":
              errors['dni'] = validarDNI(params['dni']);
              break;
            case "codigo_postal":
              errors['codigo_postal'] = validarCodigoPostal(params['codigo_postal']);
              break;
            case "direccion":
              break;

            default:
              errors[key] = validarString(params[key]);
              break;
          }
        }
      }
      return errors;
    };

    let errors = validateParams();

    if (
      errors.nombre === true &&
      errors.apellidos === true &&
      errors.email === true &&
      errors.codigo_postal === true &&
      errors.dni === true &&
      errors.pais === true &&
      errors.poblacion === true &&
      errors.telefono === true
    ) {
      const response = await fetchPost('/api/usuarios/editar', {
        _id: user._id,
        params
      })
      setErrors(null);

      if (response.ok) {
        if (user.nombre === params.nombre) {
          setValue({
            _id: response.usuario._id,
            nombre: response.usuario.nombre,
            apellidos: response.usuario.apellidos,
            email: response.usuario.email,
            is_admin: response.usuario.is_admin,
          })
        }

        window.location.href = "/crud/usuario";
      } else {
        toast.error(response.msg)
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <Head>
        <title>{data.nombre} | CRUD | Hoshi Manga</title>
      </Head>

      <Ruta items={items} />

      <form onSubmit={handleSubmitUsuario} className="formulario__container">
        <div className="app__title">
          <h2>
            {data.nombre} {data.apellidos}
          </h2>
          <Boton texto="Actualizar" click={handleSubmitUsuario} />
        </div>

        <div className="formulario__grid contenedor">
          <FieldsetInput
            tipo="text" name='nombre' text='Nombre'
            value={params.nombre}
            onChange={readParam}
            error={errors && errors.nombre}
          />

          <FieldsetInput
            tipo="text" name='apellidos' text='Apellidos'
            value={params.apellidos}
            onChange={readParam}
            error={errors && errors.apellidos}
          />

          <FieldsetInput
            tipo="email" name='email' text='Correo Electrónico'
            value={params.email}
            onChange={readParam}
            error={errors && errors.email}
          />

          <FieldsetInput
            tipo="password" name="password" text="Contraseña"
            value={params.password}
            onChange={readParam}
            error={errors && errors.password}
          />
        </div>

        <div className="formulario__grid contenedor">
          <FieldsetInput
            tipo="text" name='telefono' text='Teléfono'
            value={params.telefono}
            onChange={readParam}
            error={errors && errors.telefono}
          />

          <FieldsetInput
            tipo="text" name='dni' text='DNI'
            value={params.dni}
            onChange={readParam}
            error={errors && errors.dni}
          />

          <FieldsetInput
            tipo="text" name='direccion' text='Dirección'
            value={params.direccion}
            onChange={readParam}
            error={errors && errors.direccion}
          />

          <FieldsetInput
            tipo="text" name='poblacion' text='Población'
            value={params.poblacion}
            onChange={readParam}
            error={errors && errors.poblacion}
          />

          <FieldsetInput
            tipo="text" name='pais' text='Pais'
            value={params.pais}
            onChange={readParam}
            error={errors && errors.pais}
          />

          <FieldsetInput
            tipo="text" name='codigo_postal' text='Código Postal'
            value={params.codigo_postal}
            onChange={readParam}
            error={errors && errors.codigo_postal}
          />

          <div
            className={`formulario__checkbox ${params.is_admin ? "formulario__checkbox__active" : ""
              }`}
          >
            <label htmlFor="is_admin">Administrador</label>
            <span
              onClick={() => {
                setParams({
                  ...params,
                  is_admin: !params.is_admin,
                });
              }}
            >
              <Icono icono="bi bi-check" />
            </span>
          </div>
        </div>
      </form>
    </>
  );
};

CrudUsuarioEditar.getInitialProps = async ({ query }) => {
  const { id } = query;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/${id}`);
  const data = await response.json();

  return { data };
};

export default CrudUsuarioEditar;
