import connectDB from '../../../config/db'
import Usuario from '../../../models/Usuario'

connectDB()

export default async function handler(req, res) {
  const usuario = await Usuario.findOne({ id: req.query.id }).lean()

  res.status(200).json(usuario)
}