import connectDB from "../../config/db";
import Usuario from "../../models/Usuario";
import bcryptjs from 'bcryptjs'

connectDB();

export default async function handler(req, res) {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email }).lean();

  if (usuario) {
    let passwordCompare = await bcryptjs.compare(password, usuario.password)

    if (passwordCompare) {
      res.status(200).json({ ok: true, usuario });
    } else {
      res.status(401).json({ ok: false, msg: 'La contraseña no coincide' });
    }
  } else {
    res.status(200).json({ ok: false, msg: '"El correo electrónico introducido no existe"' });
  }

}
