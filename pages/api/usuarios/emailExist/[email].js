import connectDB from '../../../../config/db'
import Usuario from '../../../../models/Usuario'

connectDB()

export default async function handler(req, res) {
  const usuario = await Usuario.findOne({ email: req.query.email }).lean()
  let usuarioOK = false

  if (usuario) {
    usuarioOK = true
  }

  res.status(200).json(usuarioOK)
}