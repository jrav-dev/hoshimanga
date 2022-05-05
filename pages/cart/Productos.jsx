/* eslint-disable @next/next/no-img-element */
import React from "react";
import Boton from "../../components/Boton";
import style from "../../styles/Cart.module.css";

const Productos = ({
  cart,
  handleClickAddTotal,
  handleClickRemoveTotal,
  handleClickRemoveProduct,
  handleClickRemoveProducts,
}) => {
  return (
    <div>
      <h2 className="borde__gris">Productos</h2>

      {cart ? (
        <>
          <div
            className={`${style.app__cart__product} app__table__product app__table__header`}
          >
            <p>Imagen</p>
            <p>Nombre del Producto</p>
            <p>Precio</p>
            <p>Total</p>
            <p>Cantidad</p>
          </div>

          {cart.map((item, i) => (
            <div
              key={i}
              className={`${style.app__cart__product} app__table__product`}
            >
              <div>
                <img src={`/img/${item.imagen}`} alt={item.nombre} />
              </div>

              <p>
                {item.nombre} - {item.tomo}
              </p>

              <p>{item.precio} €</p>

              <p>{item.total.toFixed(2)} €</p>

              <div className={style.app__cart__product_cantidad}>
                <p>{item.cantidad} uds.</p>

                <div className={style.app__cart__product__botones}>
                  <Boton texto="+" click={() => handleClickAddTotal(item)} />
                  <Boton texto="-" click={() => handleClickRemoveTotal(item)} />
                </div>
              </div>

              <div>
                <Boton
                  icono="bi bi-trash"
                  clase="rojo"
                  click={() => handleClickRemoveProduct(i)}
                />
              </div>
            </div>
          ))}

          <div className={style.app__cart__actions}>
            <Boton
              icono="bi bi-trash"
              texto="Vaciar Cesta"
              clase="rojo"
              click={handleClickRemoveProducts}
            />
          </div>
        </>
      ) : (
        <h3>No tienes ningun producto en la cesta</h3>
      )}
    </div>
  );
};

export default Productos;
