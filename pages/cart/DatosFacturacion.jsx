import React, { useState } from 'react'
import { FieldsetInput } from '../../components/Fieldset'
import useForm from '../../hooks/useForm'

const DatosFacturacion = ({ data, setData }) => {
  const [errors, setErrors] = useState(null);
  const [params, setParams] = useState({
    _id: data._id,
    nombre: data.nombre,
    apellidos: data.apellidos,
    email: data.email,
    direccion: data.direccion,
    poblacion: data.poblacion,
    pais: data.pais,
    codigo_postal: data.codigo_postal,
    telefono: data.telefono,
    dni: data.dni,
  })

  const validateParams = () => {
    let errors = {};

    for (const key in params) {
      let name =
        key.charAt(0).toUpperCase() + key.slice(1).split("_").join(" ");

      if (params[key] === "") {
        errors[key] = `El campo '${name}' está vacio.`;
      } else {
        if (parseInt(params[key]) === "NaN" && !regexText.test(params[key])) {
          errors[
            key
          ] = `El campo '${name}' no es válido. Debe tener entre 3 y 255 carácteres.`;
        }
        if (key === "isbn" && parseInt(params[key].length) < 13) {
          errors[key] = `El campo '${name}' debe tener 13 carácteres.`;
        }
      }
    }
    return errors;
  };

  const readParam = (e) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
  };

  return (
    <>
      <div className='formulario__container'>

        <h2 className='borde__gris'>Datos de Facturación</h2>

        <div className='formulario__grid contenedor'>
          <FieldsetInput className='formulario__fieldset'
            tipo="text" name='nombre' text='Nombre'
            value={params.nombre} onChange={readParam}
            error={errors && errors.nombre} />

          <FieldsetInput className='formulario__fieldset'
            tipo="text" name='apellidos' text='Apellidos'
            value={params.apellidos} onChange={readParam}
            error={errors && errors.apellidos} />

          <FieldsetInput className='formulario__fieldset'
            tipo="email" name='email' text='Correo Electrónico'
            value={params.email} onChange={readParam}
            error={errors && errors.email} />

          <FieldsetInput className='formulario__fieldset'
            tipo="text" name='direccion' text='Dirección'
            value={params.direccion} onChange={readParam}
            error={errors && errors.direccion} />

          <FieldsetInput className='formulario__fieldset'
            tipo="text" name='poblacion' text='Población'
            value={params.poblacion} onChange={readParam}
            error={errors && errors.poblacion} />

          <FieldsetInput className='formulario__fieldset'
            tipo="text" name='pais' text='Pais'
            value={params.pais} onChange={readParam}
            error={errors && errors.pais} />

          <FieldsetInput className='formulario__fieldset'
            tipo="number" name='codigo_postal' text='Código Postal'
            value={params.codigo_postal} onChange={readParam}
            error={errors && errors.codigo_postal} />

          <FieldsetInput className='formulario__fieldset'
            tipo="text" name='telefono' text='Teléfono'
            value={params.telefono} onChange={readParam}
            error={errors && errors.telefono} />

          <FieldsetInput className='formulario__fieldset'
            tipo="text" name='dni' text='DNI'
            value={params.dni} onChange={readParam}
            error={errors && errors.dni} />
        </div>
      </div>
    </>
  )
}

export default DatosFacturacion