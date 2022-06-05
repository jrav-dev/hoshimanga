import dbConnect from '../../../config/db'
import Editorial from '../../../models/Editorial'

dbConnect()

export default async function handler(req, res) {
  const params = req.body

  try {
    const newParams = new Editorial(params)
    newParams.save()

    res.status(201).json({ ok: true, message: "success" })
  } catch (error) {
    console.log("Error: " + error)
    res.status(201).json({ ok: false, msg: "Ha ocurrido un error." })
  }
}