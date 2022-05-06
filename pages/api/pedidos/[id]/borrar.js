import dbConnect from '../../../../config/db'
import Cart from '../../../../models/Cart'

dbConnect()

export default async function handler(req, res) {
  try {
    await Cart.findByIdAndRemove({ _id: req.query.id })

    res.status(201).json({ status: 201, ok: true, message: "success" })
  } catch (error) {
    console.log("Error: " + error)
  }
}