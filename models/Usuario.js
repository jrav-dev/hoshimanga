import { Schema, model, models } from 'mongoose'

const UsuarioSchema = new Schema({
  nombre: String,
  apellidos: String,
  email: String,
  password: String,
  direccion: String,
  poblacion: String,
  pais: String,
  codigo_postal: Number,
  telefono: Number,
  dni: String,
  is_admin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  versionKey: false
})

export default models.Usuario || model("Usuario", UsuarioSchema)