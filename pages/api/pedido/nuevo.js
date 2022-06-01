import dbConnect from "../../../config/db";
import Pedido from "../../../models/Pedido";

dbConnect();

export default async function handler(req, res) {
  const params = req.body;

  const newParams = new Pedido(params);
  newParams.save();

  res.status(201).json(newParams);
}
