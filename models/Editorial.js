import { Schema, model, models } from 'mongoose'

const EditorialSchema = new Schema({
  nombre: String,
  imagen: String
}, {
  timestamps: true,
  versionKey: false
})

export default models.Editorial || model("Editorial", EditorialSchema)