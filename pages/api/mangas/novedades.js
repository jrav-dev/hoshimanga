import dbConnect from '../../../config/db'
import Manga from '../../../models/Manga'
dbConnect()

export default async function handler(req, res) {
  const { skip, limit } = req.query;

  let mangas = await Manga.find().lean();

  function convertirFecha(fechaString) {
    var fechaSp = fechaString.split("-");
    var anio = new Date().getFullYear();
    if (fechaSp.length === 3) anio = fechaSp[0];
    var mes = fechaSp[1] - 1;
    var dia = fechaSp[2];

    return new Date(anio, mes, dia);
  }

  mangas.sort((a, b) => convertirFecha(b.fecha_publicacion) - convertirFecha(a.fecha_publicacion))

  mangas = mangas.slice(parseInt(skip), parseInt(skip) + parseInt(limit))

  res.status(200).json(mangas)
}