import dbConnect from '../../../../config/db'
import Manga from '../../../../models/Manga'
dbConnect()

export default async function handler(req, res) {
  const manga = await Manga.findOne({ _id: req.query.id }).populate('editorial').lean()

  res.status(200).json(manga)
}