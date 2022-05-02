import dbConnect from '../../../../config/db'
import Manga from '../../../../models/Manga'
dbConnect()

export default async function handler(req, res) {
  const manga = await Manga.find({ editorial: req.query.editorial }).lean()

  if (manga.length === 0) {
    res.status(200).json({ msg: "Esa editorial no se encuentra disponible" })
  } else {
    res.status(200).json(manga)
  }
}