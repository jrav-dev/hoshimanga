import dbConnect from '../../../config/db'
import Usuario from '../../../models/Usuario'

dbConnect()

export default async function handler(req, res) {
  const { params, imagen } = req.body

  try {
    await Usuario.findByIdAndUpdate({ _id: params._id }, {
      nombre: params.nombre,
      apellidos: params.apellidos,
      email: params.email,
      password: '',
      direccion: params.direccion,
      poblacion: params.poblacion,
      pais: params.pais,
      codigo_postal: params.codigo_postal,
      telefono: params.telefono,
      dni: params.dni,
      is_admin: params.is_admin
    })

    res.status(201).json({ status: 201, ok: true, message: "success" })
  } catch (error) {
    console.log("Error: " + error)
  }
}