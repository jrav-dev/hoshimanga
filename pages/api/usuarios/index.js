import connectDB from "../../../config/db";
import Usuario from "../../../models/Usuario";
import bcryptjs from "bcryptjs";

connectDB();

export default async function handler(req, res) {
  const { method, body: params } = req;

  switch (method) {
    case "GET":
      const { skip, limit, id, nombre, apellidos, email, is_admin } = req.query;

      const filtros = {
        _id: id,
        nombre,
        apellidos,
        email,
        is_admin,
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

      const data = await Usuario.find(filtrosKeys)
        .lean()
        .limit(limit)
        .skip(skip);

      res.status(200).json({ data, total });
      break;

    case "POST":
      const usuario = new Usuario(params);
      usuario.password = await bcryptjs.hash(usuario.password, 10);
      usuario.save();
      res.json(usuario);
      break;

    default:
      break;
  }

  res.status(201);
}
