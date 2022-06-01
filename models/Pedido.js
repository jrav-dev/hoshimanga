import { Schema, model, models } from 'mongoose'

const PedidoSchema = new Schema({
  num_pedido: Number,
  usuario: { 
    type: Schema.Types.ObjectId, 
    ref: 'Usuario'
  },
  importe: Number,
  productos: [{
    _id: false,
    producto: { 
      type: Schema.Types.ObjectId, 
      ref: 'Manga'
    },
    cantidad: Number,
    precio: Number,
    total: Number,
  }]
}, {
  timestamps: true,
  versionKey: false
})

export default models.Pedido || model("Pedido", PedidoSchema)