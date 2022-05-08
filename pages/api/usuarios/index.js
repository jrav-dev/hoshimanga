import connectDB from "../../../config/db";
import Usuario from "../../../models/Usuario";
import bcryptjs from "bcryptjs";

connectDB();

export default async function handler(req, res) {
  const { method, body } = req;

  console.log(body)
  switch (method) {
    case "GET":
      const params = req.query;
      const limit = parseInt(params.limit)
      const skip = parseInt(params.skip)

      const filtros = {
        _id: params.id ? params.id : '',
        nombre: params.nombre ? params.nombre : "",
        apellidos: params.apellidos ? params.apellidos : "",
        email: params.email ? params.email : "",
        is_admin: params.is_admin ? params.is_admin : "",
      };

      const filtrosKeys = {};

      for (const key in filtros) {
        if (filtros[key] !== "") {
          if (key === "_id") {
            filtrosKeys[key] = filtros[key];
          } else if (key === "is_admin") {
            filtrosKeys[key] = filtros[key];
          } else {
            filtrosKeys[key] = new RegExp(filtros[key], "i");
          }
        }
      }

      const total = await Usuario.find().lean().count();

      let data = await Usuario.find(filtrosKeys).lean()

      if (data.length > limit) {
        data = data.slice(parseInt(skip), parseInt(skip) + parseInt(limit));
      }

      res.status(200).json({ data, total });
      break;

    case "POST":
      const usuario = new Usuario(body);
      usuario.password = await bcryptjs.hash(usuario.password, 10);
      usuario.save();
      
      res.json(usuario);
      break;

    default:
      break;
  }

  res.status(201);
}
