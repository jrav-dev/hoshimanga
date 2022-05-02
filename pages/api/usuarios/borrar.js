import dbConnect from '../../../config/db'
import Usuario from '../../../models/Usuario'

dbConnect()

export default async function handler(req, res) {
  try {
    await Usuario.findByIdAndRemove({ _id: req.body })

    res.status(201).json({ status: 201, ok: true, message: "success" })
  } catch (error) {
    console.log("Error: " + error)
  }
}