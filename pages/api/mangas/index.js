import dbConnect from '../../../config/db'
import Manga from '../../../models/Manga'
import Editorial from '../../../models/Editorial'

dbConnect()

export default async function handler(req, res) {
  let mangas = await Manga.find().lean()

  if (req.query.q) mangas = mangas.filter(manga => manga.nombre.toLowerCase().includes(req.query.q.toLowerCase()))

  const Editoriales = await Editorial.find().lean()
  const series = []
  const editoriales = Editoriales.map(item => {
    return { nombre: item.nombre, total: 0, checked: false }
  })
  const disponibilidad = [
    { nombre: 'En Stock', total: 0, checked: false },
    { nombre: 'Agotado', total: 0, checked: false }
  ]

  let hash = {};
  mangas.filter((current) => {
    let exists = !hash[current.nombre];
    hash[current.nombre] = true
    if (exists) series.push({ nombre: current.nombre, total: 0, checked: false })
    return exists;
  })

  series.map(item => mangas.filter(manga => manga.nombre === item.nombre ? item.total += 1 : null))

  editoriales.map(item => mangas.filter(manga => {
    if (manga.editorial === item.nombre) item.total += 1
  }))

  disponibilidad.map(item => mangas.filter(manga => {
    if (item.nombre === "En Stock" && manga.stock > 0) item.total += 1
    if (item.nombre === "Agotado" && manga.stock === 0) item.total += 1
  }))

  const filtros = [
    { titulo: 'Editoriales', array: editoriales },
    { titulo: 'Colecciones', array: series },
    { titulo: 'Disponibilidad', array: disponibilidad },
  ]

  res.status(200).json({ mangas, filtros })
}