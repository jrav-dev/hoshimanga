import connectDB from "../../../config/db";
import Cart from "../../../models/Cart";
import Manga from "../../../models/Manga";

connectDB();

export default async function handler(req, res) {

  let pedido = await Cart.findOne({ _id: req.query.id }).lean();
  let productosPedido = [];
  let totalProductos = 0

  for (let i = 0; i < pedido.productos.length; i++) {
    let producto = await Manga.findOne({
      _id: pedido.productos[i]._id,
    }).lean();

    totalProductos += pedido.productos[i].cantidad

    productosPedido.push({
      _id: producto._id,
      nombre: producto.nombre,
      precio: producto.precio - Math.floor(producto.precio * 5) / 100,
      imagen: producto.imagen,
      tomo: producto.tomo,
      cantidad: pedido.productos[i].cantidad,
      total:
        producto.precio * pedido.productos[i].cantidad -
        Math.floor(producto.precio * 5) / 100,
    });
  }

  pedido.productos = productosPedido
  pedido.cantidad = totalProductos

  res.status(200).json(pedido);
}
