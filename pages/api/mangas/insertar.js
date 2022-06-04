import dbConnect from '../../../config/db'
import Manga from '../../../models/Manga'
import Editorial from '../../../models/Editorial'

dbConnect()

export default async function handler(req, res) {
  const { params, imagen } = req.body

  params.imagen = imagen

  try {
    const editorial = await Editorial.findOne({ nombre: params.editorial }).lean()

    if (!editorial) params.editorial = editorial._id

    const newParams = new Manga(params)
    newParams.save()

    res.status(201).json({ status: 201, ok: true, message: "success" })
  } catch (error) {
    console.log("Error: " + error)
  }
}