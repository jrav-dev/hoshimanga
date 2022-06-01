import { connect, connection } from 'mongoose';

export default async function connectDB() {
  await connect(process.env.NEXT_PUBLIC_MongoDB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
}

connection.once("open", () => {
  console.log('=======================')
  console.log('Base de Datos Conectada')
  console.log('=======================')
})

