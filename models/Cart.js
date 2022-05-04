import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
  },
  num_pedido: {
    type: String,
    required: true,
  },
  precio: {
    type: String,
    required: true,
  },
  productos: {
    type: Array,
    required: false,
  }
}, {
  timestamps: true,
  versionKey: false
})

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema)