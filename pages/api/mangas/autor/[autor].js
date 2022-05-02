import dbConnect from '../../../../config/db'
import Manga from '../../../../models/Manga'
dbConnect()

export default async function handler(req, res) {
  const mangas = await Manga.find().lean()
  const manga = mangas.filter(item => item.autor.includes(req.query.autor.replace(/-/g, " ")))

  if (manga.length === 0) {
    res.status(200).json({ msg: "Ese autor no se encuentra disponible" })
  } else {
    res.status(200).json(manga)
  }
}