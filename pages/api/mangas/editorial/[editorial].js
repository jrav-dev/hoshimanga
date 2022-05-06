import dbConnect from '../../../../config/db'
import Manga from '../../../../models/Manga'
dbConnect()

export default async function handler(req, res) {
  const { skip, limit } = req.query

  const mangas = await Manga.find({ editorial: req.query.editorial }).lean().skip(skip).limit(limit)

  const total = await Manga.find({ editorial: req.query.editorial }).lean().count()

  if (mangas.length === 0) {
    res.status(200).json({ msg: "No hay contenido de esta editorial" })
  } else {
    res.status(200).json({ mangas, total })
  }
}