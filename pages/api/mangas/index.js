import dbConnect from "../../../config/db";
import Manga from "../../../models/Manga";
import Editorial from "../../../models/Editorial";

dbConnect();

export default async function handler(req, res) {
  const params = req.query;

  const filtros = {
    nombre: params.nombre,
    editorial: params.editorial,
    disponibilidad: params.disponibilidad
  };

  const filtrosKeys = {};

  for (const key in filtros) {
    if (filtros[key] !== "") {
      if (key === "disponibilidad") {
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

  console.log(filtrosKeys)
  let mangas = await Manga.find(filtrosKeys).lean().limit(params.limit).skip(params.skip);
  console.log(params)

  if (params.q)
    mangas = mangas.filter((manga) =>
      manga.nombre.toLowerCase().includes(params.q.toLowerCase())
    );

  const Editoriales = await Editorial.find().lean();
  const series = [];
  const editoriales = Editoriales.map((item) => {
    return { nombre: item.nombre, total: 0, checked: false };
  });
  const disponibilidad = [
    { nombre: "En Stock", total: 0, checked: false },
    { nombre: "Agotado", total: 0, checked: false },
  ];

  let hash = {};
  mangas.filter((current) => {
    let exists = !hash[current.nombre];
    hash[current.nombre] = true;
    if (exists)
      series.push({ nombre: current.nombre, total: 0, checked: false });
    return exists;
  });

  series.map((item) =>
    mangas.filter((manga) =>
      manga.nombre === item.nombre ? (item.total += 1) : null
    )
  );

  editoriales.map((item) =>
    mangas.filter((manga) => {
      if (manga.editorial === item.nombre) item.total += 1;
    })
  );

  disponibilidad.map((item) =>
    mangas.filter((manga) => {
      if (item.nombre === "En Stock" && manga.stock > 0) item.total += 1;
      if (item.nombre === "Agotado" && manga.stock === 0) item.total += 1;
    })
  );

  const filtrosMenu = [
    { titulo: "Editoriales", array: editoriales },
    { titulo: "Colecciones", array: series },
    { titulo: "Disponibilidad", array: disponibilidad },
  ];

  res.status(200).json({ mangas, filtrosMenu, total });
}
