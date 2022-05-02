import dbConnect from '../../../../config/db'
import Editorial from '../../../../models/Editorial'

dbConnect()

export default async function handler(req, res) {
  try {
    await Editorial.findByIdAndRemove({ _id: req.query.id })

    res.status(201).json({ status: 201, ok: true, message: "success" })
  } catch (error) {
    console.log("Error: " + error)
  }
}