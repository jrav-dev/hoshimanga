import dbConnect from "../../../config/db";
import Usuario from "../../../models/Usuario";
import bcryptjs from "bcryptjs";

dbConnect();

export default async function handler(req, res) {
  const { params } = req.body;

  if (params.password) {
    params.password = await bcryptjs.hash(params.password, 10)
  }

  try {
    await Usuario.findByIdAndUpdate(
      { _id: req.body._id }, params
    );

    res.status(201).json({ status: 201, ok: true, message: "success" });
  } catch (error) {
    console.log("Error: " + error);
  }
}
