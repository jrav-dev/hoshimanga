import dbConnect from "../../../config/db";
import Carrito from '../../../models/Carrito'

dbConnect();

export default async function handler(req, res) {
  const params = req.body;

  const carrito = await Carrito.findOne({ usuario: params.usuario }).populate('productos.producto').lean()

  if (carrito) {
    res.status(201).json(carrito)
  } else {
    res.status(201).json({ msg: 'El usuario no tiene ningun carrito ahora' })
  }
}
