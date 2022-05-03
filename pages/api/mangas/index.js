import dbConnect from "../../../config/db";
import Manga from "../../../models/Manga";
import Editorial from "../../../models/Editorial";

dbConnect();

export default async function handler(req, res) {
  const params = req.query;
  let mangas = []

  const total = await Manga.find().lean().count();

  const filtros = {
    nombre: params.nombre,
    editorial: params.editorial,
    stock: params.disponibilidad
  };

  const filtrosKeys = {};

  for (const key in filtros) {
    if (filtros[key] !== "" && filtros[key] !== undefined) {
      if (key === "stock") {
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

  mangas = await Manga.find(filtrosKeys).lean();

  if (params.q !== "undefined") mangas = mangas.filter(manga => manga.nombre.toLowerCase().includes(req.query.q.toLowerCase()))

  const series = [];
  const Editoriales = await Editorial.find().lean();
  const editoriales = Editoriales.map((item) => {
    return { nombre: item.nombre, checked: false };
  });

  const disponibilidad = [
    { nombre: "En Stock", checked: false },
    { nombre: "Agotado", checked: false },
  ];

  let hash = {};
  mangas.filter((current) => {
    let exists = !hash[current.nombre];
    hash[current.nombre] = true;
    if (exists)
      series.push({ nombre: current.nombre, checked: false });
    return exists;
  });

  const filtrosMenu = [
    { titulo: "Editoriales", array: editoriales },
    { titulo: "Colecciones", array: series },
    { titulo: "Disponibilidad", array: disponibilidad },
  ];

  if (mangas.length > params.limit) {
    mangas = mangas.slice(params.skip, params.skip + params.limit);
  }

  res.status(200).json({ mangas, filtrosMenu, total });
}
