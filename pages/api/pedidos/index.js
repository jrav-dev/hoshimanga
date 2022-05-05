import connectDB from "../../../config/db";
import Cart from "../../../models/Cart";

connectDB();

export default async function handler(req, res) {
  const { skip, limit, id, num_pedido } = req.query;

  const filtros = {
    _id: id,
    num_pedido: num_pedido,
  };

  const filtrosKeys = {};

  for (const key in filtros) {
    if (filtros[key] !== "") {
      if (key === "_id") {
        filtrosKeys[key] = filtros[key];
      } else if (key === "num_pedido") {
        filtrosKeys[key] = new RegExp(filtros[key], "i");
      } else {
        filtrosKeys[key] = filtros[key];
      }
    }
  }

  const total = await Cart.find().lean().count();

  let data = await Cart.find(filtrosKeys).lean();

  if (data.length > limit) {
    data = data.slice(skip, skip + limit);
  }

  res.status(200).json({ data, total });
}
