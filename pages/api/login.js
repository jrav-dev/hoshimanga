import connectDB from "../../config/db";
import Usuario from "../../models/Usuario";
import bcryptjs from 'bcryptjs'

connectDB();

export default async function handler(req, res) {

  const usuario = await Usuario.findOne({ email: req.body.email }).lean();

  // console.log(usuario.password)
  // console.log(req.body.password)
  
  const password = await bcryptjs.compare(req.body.password, usuario.password)
  // console.log(password)

  res.status(200).json({ ok: true, usuario });
}
