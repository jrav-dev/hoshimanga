import mongoose from 'mongoose'

const EditorialSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    required: false,
  }
}, {
  timestamps: true,
  versionKey: false
})

export default mongoose.models.Editorial || mongoose.model("Editorial", EditorialSchema)