import dbConnect from "../../../config/db";
import Usuario from "../../../models/Usuario";
import bcryptjs from "bcryptjs";

dbConnect();

export default async function handler(req, res) {
  const { params, _id } = req.body;

  if (params.password && params.password !== "") {
    params.password = await bcryptjs.hash(params.password, 10)
  }
  
  try {
    await Usuario.findByIdAndUpdate({ _id }, params);

    res.status(201).json({ ok: true, message: "success", usuario: params });
  } catch (error) {
    console.log("Error: " + error);
    res.status(201).json({ ok: false, msg: "Ha ocurrido un error." })
  }
}
