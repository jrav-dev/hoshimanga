import dbConnect from '../../../config/db'
import Editorial from '../../../models/Editorial'
dbConnect()

export default async function handler(req, res) {
  const editoriales = await Editorial.find().lean()

  res.status(200).json(editoriales)
}