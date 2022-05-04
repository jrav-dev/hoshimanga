import React from 'react'

export function FieldsetInput({
  name, onChange, text,
  value, tipo, className,
  step, error, max
}) {
  return (
    <div className={className}>
      <label htmlFor={name}>{text}</label>
      <input
        type={tipo}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        step={tipo === 'number' ? step : 'false'}
        min={tipo === 'number' ? '0' : 'false'}
        max={tipo === 'number' ? max : 'false'}
      />
      <p>{error}</p>
    </div>
  )
}

export function FieldsetTextarea({
  name, onChange, text,
  value, className, error
}) {
  return (
    <div className={className}>
      {text ? <label htmlFor={name}>{text}</label> : null}
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      ></textarea>
      <p>{error}</p>
    </div>
  )
}

export function FieldsetSelectArray({
  name, onChange, text,
  value, array, className,
  error
}) {
  return (
    <div className={className}>
      <label htmlFor={name}>{text}</label>
      <select value={value} onChange={onChange} name={name}>
        <option value="">Seleccione una opción</option>
        {array && array.map(arr => (
          <option
            key={arr.nombre ? arr.nombre : arr}
            value={arr.nombre ? arr.nombre : arr}>
            {arr.nombre ? arr.nombre : arr}
          </option>
        ))}
      </select>
      <p>{error}</p>
    </div>
  )
}
