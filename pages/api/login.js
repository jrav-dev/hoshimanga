import connectDB from "../../config/db";
import Usuario from "../../models/Usuario";
import bcryptjs from 'bcryptjs'

connectDB();

export default async function handler(req, res) {

  console.log(req.body)

  const usuario = await Usuario.findOne({ email: req.body.email }).lean();

  if (usuario) {
    var password = await bcryptjs.compare(req.body.password, usuario.password)
    res.status(200).json({ ok: true, usuario });
  } else {
    res.status(200).json({ ok: false });
  }

}
