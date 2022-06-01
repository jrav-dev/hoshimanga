import connectDB from "../../config/db";
import Manga from "../../models/Manga";
import Editorial from "../../models/Editorial";

export default async function handler(req, res) {
  await connectDB();

  // let anime = await Manga.findOne({ _id })
  //   .populate('personajes.personaje')
  //   .populate('personajes.seiyuu')
  //   .lean();
  let mangas = await Manga.find().lean();

  for (let x = 0; x < mangas.length; x++) {
    if (mangas[x].editorial) {
        console.log(mangas[x].editorial)
        // let editorial = await Editorial.findOne({ nombre: mangas[x].editorial }).lean();
        
        // await Manga.findByIdAndUpdate({
        //   _id: mangas[x]._id
        // }, {
        //   editorial: editorial._id
        // })
    }
  }

  // console.log(array)
  // console.log(mangas)
  // await Manga.findByIdAndUpdate({
  //   _id: _id
  // }, {
  //   personajes: copy_array
  // })

  res.json({ xd: "xd" })
  // res.json(anime)
}