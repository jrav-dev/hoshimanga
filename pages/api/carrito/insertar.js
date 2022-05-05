import dbConnect from "../../../config/db";
import Cart from "../../../models/Cart";
import Manga from "../../../models/Manga";

dbConnect();

export default async function handler(req, res) {
  const { params } = req.body;

  let num_pedido = Math.random().toString(36).substr(2);
  const carts = await Cart.findOne({ num_pedido }).lean();

  if (carts) {
    num_pedido = Math.random().toString(36).substr(2);
  }

  try {
    for (let i = 0; i < params.productos.length; i++) {
      const producto = await Manga.findOne({
        _id: params.productos[i]._id,
      }).lean();

      if (producto.stock > 0) {
        await Manga.findByIdAndUpdate(
          {
            _id: producto._id,
          },
          {
            stock:
              parseInt(producto.stock) - parseInt(params.productos[i].cantidad),
          }
        );
      }
    }

    const newParams = new Cart({
      usuario: params.usuario,
      productos: params.productos,
      precio: params.precio,
      num_pedido,
    });
    newParams.save();

    res.status(201).json(newParams);
  } catch (error) {
    console.log("Error: " + error);
  }
}
