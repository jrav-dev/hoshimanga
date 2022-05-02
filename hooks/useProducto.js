
export default function useProducto(producto) {
  const precio = producto.precio - (Math.floor((producto.precio * 5)) / 100)
  const autores = producto.autor.split(',')
  const descripcion = producto.descripcion.split('\n')
  const disponibilidad = { estado: '', ok: false }

  if (producto.stock === 0) {
    disponibilidad.estado = 'Agotado'
  } else if (producto.stock > 0) {
    disponibilidad.estado = 'En Stock'
    disponibilidad.ok = true
  }

  return { precio, autores, descripcion, disponibilidad }
}
