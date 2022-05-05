import dbConnect from "../../../config/db";
import Manga from "../../../models/Manga";
import Editorial from "../../../models/Editorial";

dbConnect();

export default async function handler(req, res) {
  const params = req.query;
  const limit = parseInt(params.limit)
  const skip = parseInt(params.skip)
  let mangas = []

  const filtros = {
    nombre: params.nombre ? params.nombre : '',
    editorial: params.editorial ? params.editorial : '',
    stock: params.disponibilidad ? params.disponibilidad : '',
  };

  const filtrosKeys = {};

  for (const key in filtros) {
    if (filtros[key] !== "") {
      if (key === "stock") {
        if (filtros[key] === "En Stock") {
          filtrosKeys[key] = { $gte: 1 };
        } else {
          filtrosKeys[key] = 0;
        }
      } else {
        filtrosKeys[key] = filtros[key];
      }
    }
  }

  mangas = await Manga.find(filtrosKeys).lean();

  if (params.q && params.q !== "undefined") mangas = mangas.filter(manga => manga.nombre.toLowerCase().includes(req.query.q.toLowerCase()))

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

  if (mangas.length > limit) {
    mangas = mangas.slice(skip, skip + limit);
  }

  res.status(200).json({ mangas, filtrosMenu });
}
