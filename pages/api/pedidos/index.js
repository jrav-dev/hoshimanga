import dbConnect from "../../../config/db";
import Pedido from "../../../models/Pedido";
import Usuario from "../../../models/Usuario";

dbConnect();

export default async function handler(req, res) {
  const params = req.query;
  const limit = parseInt(params.limit)
  const skip = parseInt(params.skip)

  const filtros = {
    num_pedido: params.num_pedido ? params.num_pedido : '',
    usuario: params.usuario ? params.usuario : "",
  };

  const filtrosKeys = {};

  for (const key in filtros) {
    if (filtros[key] !== "") {
      if (key === "num_pedido") {
        filtrosKeys[key] = parseInt(filtros[key])
      } else if (key === "usuario") {
        let usuario = await Usuario.findOne({ nombre: new RegExp(filtros[key], "i") }).lean();
        filtrosKeys[key] = usuario._id;
      } else {
        filtrosKeys[key] = new RegExp(filtros[key], "i")
      }
    }
  }

  const total = await Pedido.find().lean().count();

  let pedidos = await Pedido.find(filtrosKeys)
    .populate('usuario', 'nombre apellidos email')
    .lean()

  if (pedidos.length > limit) {
    pedidos = pedidos.slice(parseInt(skip), parseInt(skip) + parseInt(limit));
  }

  res.status(200).json({ pedidos, total });
}
