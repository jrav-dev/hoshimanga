import { useState } from "react";
import { toast } from "react-toastify";
import { useLocalStorage } from "./useLocalStorage";

export const useCart = () => {
  const [storedValue, setValue] = useLocalStorage("cart");

  const addToCart = (producto) => {
    const cart = JSON.parse(window.localStorage.getItem("cart"));

    let productCart = {
      _id: producto._id,
      nombre: producto.nombre,
      precio: parseFloat(
        (producto.precio - Math.floor(producto.precio * 5) / 100).toFixed(2)
      ),
      imagen: producto.imagen,
      tomo: producto.tomo,
      cantidad: 1,
      total: parseFloat(
        (producto.precio - Math.floor(producto.precio * 5) / 100).toFixed(2)
      ),
    };

    if (cart === undefined || cart === null) {
      setValue([productCart]);
      toast.success("Articulo añadido a la cesta");
    } else {
      const productExists = cart.filter((item) => item._id === productCart._id);

      if (productExists.length === 1) {
        cart.map((item) => {
          if (item._id === productCart._id) {
            item.cantidad += 1;
            console.log(item.cantidad)
            item.total += item.precio;
          }
        });
        toast.success(`Ha añadido otra unidad a '${productCart.nombre}'`);
      } else {
        cart.push(productCart);
        toast.success("Articulo añadido a la cesta");
      }

      setValue(cart);
    }
  };

  return { addToCart };
};
