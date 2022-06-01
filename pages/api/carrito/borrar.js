import dbConnect from "../../../config/db";
import Carrito from "../../../models/Carrito";

dbConnect();

export default async function handler(req, res) {
  const params = req.body;

  await Carrito.findByIdAndRemove({ _id: params._id })

  res.status(201).json({ ok: true });
}
