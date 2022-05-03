import dbConnect from "../../../config/db";
import Manga from "../../../models/Manga";

dbConnect();

export default async function handler(req, res) {
  const { skip, limit, id, nombre, editorial, disponibilidad, fecha } =
    req.query;

  const filtros = {
    _id: id,
    nombre: nombre,
    editorial: editorial,
    fecha_publicacion: fecha,
    stock: disponibilidad,
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

  const data = await Manga.find(filtrosKeys).lean().limit(limit).skip(skip);

  res.status(200).json({ data, total });
}
