import dbConnect from "../../../config/db";
import Pedido from "../../../models/Pedido";

dbConnect();

export default async function handler(req, res) {

  const pedido = await Pedido.findOne({ num_pedido: req.query.num_pedido })
    .populate('productos.producto')
    .lean()

  res.status(200).json(pedido)
}
