import connectDB from '../../../config/db'
import Usuario from '../../../models/Usuario'
import bcryptjs from 'bcryptjs'

connectDB()

export default async function handler(req, res) {
  const { method, body: params } = req

  switch (method) {
    case "GET":
      const usuarios = await Usuario.find().lean()
      res.json(usuarios)
      break;

    case "POST":
      const usuario = new Usuario(params)
      usuario.password = await bcryptjs.hash(usuario.password, 10)
      usuario.save()
      res.json(usuario)
      break;

    default:
      break;
  }

  res.status(201)
}