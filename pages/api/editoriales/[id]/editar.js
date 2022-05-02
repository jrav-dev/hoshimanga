import dbConnect from '../../../../config/db'
import Editorial from '../../../../models/Editorial'

dbConnect()

export default async function handler(req, res) {
  const { params, imagen } = req.body

  try {
    await Editorial.findByIdAndUpdate({ _id: req.query.id }, {
      nombre: params.nombre,
      imagen
    })

    res.status(201).json({ status: 201, ok: true, message: "success" })
  } catch (error) {
    console.log("Error: " + error)
  }
}