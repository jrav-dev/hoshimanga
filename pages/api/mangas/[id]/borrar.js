import dbConnect from '../../../../config/db'
import Manga from '../../../../models/Manga'

dbConnect()

export default async function handler(req, res) {
  try {
    await Manga.findByIdAndRemove({ _id: req.query.id })

    res.status(201).json({ status: 201, ok: true, message: "success" })
  } catch (error) {
    console.log("Error: " + error)
  }
}