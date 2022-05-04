import dbConnect from "../../../../config/db";
import Manga from "../../../../models/Manga";

dbConnect();

export default async function handler(req, res) {
  const { params, imagen } = req.body;

  try {
    await Manga.findByIdAndUpdate({ _id: req.query.id }, {
      nombre: params.nombre,
      descripcion: params.descripcion,
      editorial: params.editorial,
      autor: params.autor,
      tomo: params.tomo,
      precio: params.precio,
      imagen,
      fecha_publicacion: params.fecha_publicacion,
      stock: params.stock,
      isbn: params.isbn,
      num_paginas: params.num_paginas,
      formato: params.formato,
      tamaño: params.tamaño
    })

    res.status(201).json({ status: 201, ok: true, message: "success" });
  } catch (error) {
    console.log("Error: " + error);
  }
}
