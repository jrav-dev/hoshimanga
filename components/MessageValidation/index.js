import React from 'react'
import style from './MessageValidation.module.css'

export default function MessageValidation({ errors, ok }) {
  return (
    errors &&
    <div className={`${style.message} ${style[ok]}`}>
      {errors.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
    </div>
  )
}
