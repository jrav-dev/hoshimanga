import dbConnect from '../../../config/db'
import Manga from '../../../models/Manga'

dbConnect()

export default async function handler(req, res) {

  const mangas = await Manga.find().lean()

  res.status(200).json(mangas)
}