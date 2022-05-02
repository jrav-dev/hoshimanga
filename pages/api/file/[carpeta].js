import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  post(req, res)
}

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    await saveFile(files.file, req.query.carpeta);
    return res.status(201).send("");
  });
};

const saveFile = async (file, carpeta) => {
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`./public/img/${carpeta}/${file.originalFilename}`, data);
  await fs.unlinkSync(file.filepath);
  return;
};