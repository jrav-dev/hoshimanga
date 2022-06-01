import dbConnect from '../../../../config/db'
import Manga from '../../../../models/Manga'
import Editorial from '../../../../models/Editorial'

dbConnect()

export default async function handler(req, res) {
  const { skip, limit } = req.query

  const nombre = req.query.nombre

  const editorial = await Editorial.findOne({ nombre: nombre }).lean()

  const mangas = await Manga.find({ editorial: editorial._id }).lean().skip(skip).limit(limit)
  
  const total = await Manga.find({ editorial: editorial._id }).lean().count()

  if (mangas.length === 0) {
    res.status(200).json({ msg: "No hay contenido de esta editorial" })
  } else {
    res.status(200).json({ mangas, total })
  }
}