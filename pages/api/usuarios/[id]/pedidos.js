import connectDB from "../../../../config/db";
import Cart from "../../../../models/Cart";

connectDB();

export default async function handler(req, res) {
  const { skip, limit, id } = req.query;

  let pedidos = await Cart.find({ usuario: id }).lean().limit(limit).skip(skip);

  const total = await Cart.find().lean().count();

  res.status(200).json({ pedidos, total });
}
