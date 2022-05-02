import React, { useReducer } from "react";
import { TYPES } from "../../actions/shoppingActions";
import { shoppingInitialState, shoppingReducer } from "../../reducers/shoppingReducer";
import Card from "../Card";
import style from "./ListOfCards.module.css";

const ListOfCards = ({ array }) => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState)
  const { cart } = state;

  const addToCart = (item) => {
    dispatch({ type: TYPES.ADD_TO_CART, payload: item })
  }

  const deleteFromCart = () => {}

  const clearCart = () => {}

  return (
    <div className={style.cards}>
      {array && array.map((item, i) => <Card key={i} producto={item} addToCart={addToCart} />)}
    </div>
  );
};

export default ListOfCards;
