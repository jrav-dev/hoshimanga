import dbConnect from '../../../config/db'
import Manga from '../../../models/Manga'
import { convertirFecha } from '../../../services/funciones.js'

dbConnect()

export default async function handler(req, res) {
  let mangas = await Manga.find().lean();

  mangas.sort((a, b) => convertirFecha(b.fecha_publicacion) - convertirFecha(a.fecha_publicacion))

  mangas = mangas.slice(0, 12)

  res.status(200).json(mangas)
}