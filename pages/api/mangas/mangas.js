import dbConnect from "../../../config/db";
import Manga from "../../../models/Manga";

dbConnect();

export default async function handler(req, res) {
  const params = req.query;
  const limit = parseInt(params.limit)
  const skip = parseInt(params.skip)

  const filtros = {
    _id: params.id ? params.id : '',
    nombre: params.nombre ? params.nombre : "",
    editorial: params.editorial ? params.editorial : "",
    fecha_publicacion: params.fecha ? params.fecha : "",
    stock: params.disponibilidad ? params.disponibilidad : "",
  };

  const filtrosKeys = {};

  for (const key in filtros) {
    if (filtros[key] !== "") {
      if (key === "_id") {
        filtrosKeys[key] = filtros[key];
      } else if (key === "stock") {
        if (filtros[key] === "En Stock") {
          filtrosKeys[key] = { $gte: 1 };
        } else {
          filtrosKeys[key] = 0;
        }
      } else if (key === "nombre") {
        filtrosKeys[key] = new RegExp(filtros[key], "i");
      } else {
        filtrosKeys[key] = filtros[key];
      }
    }
  }

  const total = await Manga.find().lean().count();

  let mangas = await Manga.find(filtrosKeys).lean()

  if (mangas.length > limit) {
    mangas = mangas.slice(parseInt(skip), parseInt(skip) + parseInt(limit));
  }

  res.status(200).json({ mangas, total });
}
