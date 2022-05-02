import dbConnect from '../../../config/db'
import Manga from '../../../models/Manga'

dbConnect()

export default async function handler(req, res) {
  const { params, imagen } = req.body

  params.imagen = imagen

  try {
    const newParams = new Manga(params)
    newParams.save()

    res.status(201).json({ status: 201, ok: true, message: "success" })
  } catch (error) {
    console.log("Error: " + error)
  }
}