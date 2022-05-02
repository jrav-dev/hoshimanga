import mongoose from 'mongoose'

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: false,
  },
  poblacion: {
    type: String,
    required: false,
  },
  pais: {
    type: String,
    required: false,
  },
  codigo_postal: {
    type: Number,
    required: false,
  },
  telefono: {
    type: String,
    required: false,
  },
  dni: {
    type: String,
    required: false,
  },
  is_admin: {
    type: Boolean,
    required: false,
    default: false
  }
}, {
  timestamps: true,
  versionKey: false
})

export default mongoose.models.Usuario || mongoose.model("Usuario", UsuarioSchema)