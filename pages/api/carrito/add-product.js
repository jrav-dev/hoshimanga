import dbConnect from "../../../config/db";
import Carrito from "../../../models/Carrito";

dbConnect();

export default async function handler(req, res) {
  const params = req.body;

  try {
    const carrito = await Carrito.findByIdAndUpdate({
      _id: params._id,
    }, {
      productos: params.productos,
      importe: params.importe,
    })

    res.status(201).json(carrito);
  } catch (error) {
    console.log("Error: " + error);
  }
}
