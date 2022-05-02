import mongoose from 'mongoose'

const MangaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: false,
  },
  editorial: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
    required: true,
  },
  tomo: {
    type: Number,
    required: true,
  },
  precio: {
    type: String,
    required: false,
  },
  imagen: {
    type: String,
    required: false,
  },
  fecha_publicacion: {
    type: String,
    required: false,
  },
  stock: {
    type: Number,
    required: false,
  },
  isbn: {
    type: String,
    required: false,
  },
  num_paginas: {
    type: Number,
    required: false,
  },
  formato: {
    type: String,
    required: false,
  },
  tamaño: {
    type: String,
    required: false,
  }
}, {
  timestamps: true,
  versionKey: false
})

export default mongoose.models.Manga || mongoose.model("Manga", MangaSchema)