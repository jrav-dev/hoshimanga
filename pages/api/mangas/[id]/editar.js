import dbConnect from "../../../../config/db";
import Manga from "../../../../models/Manga";
import Editorial from '../../../../models/Editorial'

dbConnect();

export default async function handler(req, res) {
  const params = req.body;

  try {
    if (params.editorial !== "") {
      let editorial = await Editorial.findOne({ nombre: params.editorial }).lean()

      params.editorial = editorial._id
    }

    await Manga.findByIdAndUpdate(
      { _id: req.query.id },
      {
        nombre: params.nombre,
        descripcion: params.descripcion,
        editorial: params.editorial,
        autor: params.autor,
        tomo: params.tomo,
        precio: params.precio,
        imagen: params.imagen,
        fecha_publicacion: params.fecha_publicacion,
        stock: params.stock,
        isbn: params.isbn,
        num_paginas: params.num_paginas,
        formato: params.formato,
        tamaño: params.tamaño
      })

    res.status(201).json({ ok: true, message: "success" });
  } catch (error) {
    console.log("Error: " + error);
    res.status(201).json({ ok: false, msg: "Ha ocurrido un error." })
  }
}
