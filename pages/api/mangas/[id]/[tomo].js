import dbConnect from '../../../../config/db'
import Manga from '../../../../models/Manga'
import Editorial from '../../../../models/Editorial'
dbConnect()

export default async function handler(req, res) {
  let { id, tomo } = req.query

  let manga = await Manga.findOne({ nombre: id.replace(/_/g, " "), tomo: tomo }).lean()

  const editorial = await Editorial.findOne({ _id: manga.editorial }).lean()

  manga.editorial = editorial.nombre

  if (manga === null) {
    res.status(200).json({ msg: "El tomo que busca no existe o no se encuentra disponible" })
  } else {
    res.status(200).json(manga)
  }
}