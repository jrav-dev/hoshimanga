import React, { useState } from 'react'
import { FieldsetInput } from '../../components/Fieldset'
import useForm from '../../hooks/useForm'

const DatosFacturacion = ({ params, setParams, errors }) => {

  const readParam = (e) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
  };

  return (
    <>
      <div className='formulario__container'>
        {params && <>
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
        </>}
      </div>
    </>
  )
}

export default DatosFacturacion