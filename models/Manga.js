import { Schema, model, models } from 'mongoose'

const MangaSchema = new Schema({
  nombre: String,
  descripcion: String,
  editorial: { 
    type: Schema.Types.ObjectId, 
    ref: 'Editorial'
  },
  autor: String,
  tomo: Number,
  precio: Number,
  imagen: String,
  fecha_publicacion: String,
  stock: Number,
  isbn: String,
  num_paginas: Number,
  formato: String,
  tamaño: String
}, {
  timestamps: true,
  versionKey: false
})

export default models.Manga || model("Manga", MangaSchema)