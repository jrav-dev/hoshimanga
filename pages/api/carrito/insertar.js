import dbConnect from "../../../config/db";
import Carrito from "../../../models/Carrito";

dbConnect();

export default async function handler(req, res) {
  const params = req.body;

  try {
    const newParams = new Carrito(params);
    newParams.save();

    res.status(201).json(newParams);
  } catch (error) {
    console.log("Error: " + error);
  }
}
