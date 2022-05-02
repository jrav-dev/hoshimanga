import mongoose from 'mongoose'

let Schema = mongoose.Schema

const MerchandisingSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: false,
  },
  precio: {
    type: Double,
    required: false,
  },
  imagen: {
    type: String,
    required: false,
  },
  fecha_venta: {
    type: String,
    required: false,
  },
  stock: {
    type: Number,
    required: false,
  },
  isbn: {
    type: String,
    required: false,
  },
  categoria: {
    type: String,
    required: false,
  },
  tamaño: {
    type: String,
    required: false,
  }
}, {
  timestamps: true,
  versionKey: false
})

mongoose.model = {}

let Merchandising = mongoose.model("Merchandising", MerchandisingSchema)

export default Merchandising;