import { toast } from "react-toastify";
import Router from 'next/router'
import useUser from '../hooks/useUser'
import { aplicarDescuento, fetchPost } from "../services/funciones";

export const useCart = () => {
  const { user } = useUser()

  const addToCart = async (producto) => {
    if (user) {
      const carritoExists = await fetchPost('/api/carrito', {
        id_producto: producto._id,
        usuario: user._id
      })

      const precioDescuento = aplicarDescuento(producto.precio)

      if (carritoExists.msg) {
        let carrito = {
          usuario: user._id,
          importe: precioDescuento,
          productos: [{
            producto: producto._id,
            cantidad: 1,
            precio: precioDescuento,
            total: precioDescuento,
          }],
        }

        await fetchPost('/api/carrito/insertar', carrito)
      } else {
        const productExists = carritoExists.productos.find(product => product.producto._id === producto._id)

        if (productExists === undefined) {
          carritoExists.importe = parseFloat((carritoExists.importe + precioDescuento).toFixed(2))
          carritoExists.productos.push({
            producto: producto._id,
            cantidad: 1,
            precio: precioDescuento,
            total: precioDescuento,
          })

        } else {
          const index = carritoExists.productos.findIndex(product => product.producto._id === producto._id)

          productExists.cantidad = productExists.cantidad + 1
          productExists.total = productExists.precio + precioDescuento

          carritoExists.productos[index] = productExists
          carritoExists.importe = parseFloat((carritoExists.importe + precioDescuento).toFixed(2))
        }

        await fetchPost('/api/carrito/add-product', carritoExists)
      }
      toast.success("Producto agregado al carrito")
      window.location.href = window.location.pathname
    } else {
      toast.error("Debes iniciar sesión para poder agregar productos al carrito");
    }
  };

  return { addToCart };
};
