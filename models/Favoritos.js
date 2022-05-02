import mongoose from 'mongoose'

let Schema = mongoose.Schema

const FavoritoSchema = new Schema({
  producto: {
    type: String,
    required: true,
  },
  usuario: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
  versionKey: false
})

mongoose.model = {}

let Favorito = mongoose.model("Favorito", FavoritoSchema)

export default Favorito;