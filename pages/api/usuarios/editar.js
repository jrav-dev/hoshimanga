import dbConnect from "../../../config/db";
import Usuario from "../../../models/Usuario";
import bcryptjs from "bcryptjs";

dbConnect();

export default async function handler(req, res) {
  const { params } = req.body;

  try {
    await Usuario.findByIdAndUpdate(
      { _id: params._id },
      {
        nombre: params.nombre,
        apellidos: params.apellidos,
        email: params.email,
        password: await bcryptjs.hash(params.password, 10),
        direccion: params.direccion,
        poblacion: params.poblacion,
        pais: params.pais,
        codigo_postal: params.codigo_postal,
        telefono: params.telefono,
        dni: params.dni,
        is_admin: params.is_admin,
      }
    );

    res.status(201).json({ status: 201, ok: true, message: "success" });
  } catch (error) {
    console.log("Error: " + error);
  }
}
