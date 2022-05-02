import dbConnect from '../../../../config/db'
import Manga from '../../../../models/Manga'
dbConnect()

export default async function handler(req, res) {
  const manga = await Manga.find({ nombre: req.query.serie }).lean()

  if (manga.length === 0) {
    res.status(200).json({ msg: "Esa serie no se encuentra disponible" })
  } else {
    res.status(200).json(manga)
  }
}