import dbConnect from '../../../config/db'
import Manga from '../../../models/Manga'
import Editorial from '../../../models/Editorial'

dbConnect()

export default async function handler(req, res) {
  const params = req.body

  try {
    if (params.editorial !== "") {
      let editorial = await Editorial.findOne({ nombre: params.editorial }).lean()

      params.editorial = editorial._id
    }

    const newParams = new Manga(params)
    newParams.save()

    res.status(201).json({ ok: true })
  } catch (error) {
    console.log("Error: " + error)
    res.status(201).json({ ok: false, msg: "Ha ocurrido un error." })
  }
}