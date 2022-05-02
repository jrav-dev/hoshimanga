import dbConnect from '../../../../config/db'
import Editorial from '../../../../models/Editorial'
dbConnect()

export default async function handler(req, res) {
  const editorial = await Editorial.findOne({ _id: req.query.id }).lean()

  res.status(200).json(editorial)
}