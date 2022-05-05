import dbConnect from '../../../../config/db'
import Manga from '../../../../models/Manga'
dbConnect()

export default async function handler(req, res) {
  let { id, tomo } = req.query

  const manga = await Manga.findOne({ nombre: id.replace(/_/g, " "), tomo: tomo }).lean()

  if (manga === null) {
    res.status(200).json({ msg: "El tomo que busca no existe o no se encuentra disponible" })
  } else {
    res.status(200).json(manga)
  }
}