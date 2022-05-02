import mongoose from 'mongoose';

const conn = {
  isConnected: false
}

export default async function dbConnect() {
  if (conn.isConnected) return

  const db = await mongoose.connect(process.env.MongoDB_URL)
  conn.isConnected = db.connections[0].readyState
}

mongoose.connection.on("connected", () => {
  console.log('Base de Datos Conectada')
})
