/* eslint-disable @next/next/no-img-element */
import React, { useRef } from 'react'
import Icono from '../Icono'
import style from './Slider.module.css'

export default function Slider({ sliderArray }) {
  const sliderCoversRef = useRef()
  let posicion = 0
  let widthCover = 900

  const handleClickMoveToLeft = () => {
    if (posicion > 0) {
      posicion = posicion - widthCover
      sliderCoversRef.current.style.left = `-${posicion}px`
    } else {
      posicion = sliderCoversRef.current.clientWidth - widthCover
      sliderCoversRef.current.style.left = `-${posicion}px`
    }
  }

  const handleClickMoveToRight = () => {
    if (posicion <= (sliderCoversRef.current.clientWidth - (widthCover * 2))) {
      posicion += widthCover
      sliderCoversRef.current.style.left = `-${posicion}px`
    } else {
      posicion = 0
      sliderCoversRef.current.style.left = `${posicion}px`
    }
  }

  return (
    <div className={style.slider_container}>
      <button onClick={handleClickMoveToLeft}>
        <Icono icono='bi bi-chevron-left' />
      </button>

      <div className={style.slider_covers} ref={sliderCoversRef}>
        {sliderArray.map((item, i) => (
          <div key={i} title={item.titulo}>
            <img src={item.src} alt={item.titulo} />
          </div>
        ))}
      </div>

      <button onClick={handleClickMoveToRight}>
        <Icono icono='bi bi-chevron-right' />
      </button>
    </div>
  )
}
