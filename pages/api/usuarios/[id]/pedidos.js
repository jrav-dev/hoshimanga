import connectDB from "../../../../config/db";
import Usuario from "../../../../models/Usuario";
import Cart from "../../../../models/Cart";

connectDB();

export default async function handler(req, res) {
  const { skip, limit } = req.query;

  let pedidos = await Cart.find().lean().limit(limit).skip(skip);

  res.status(200).json(pedidos);
}
