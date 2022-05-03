import React from "react";
import Card from "../Card";
import style from "./ListOfCards.module.css";

const ListOfCards = ({ array }) => {
  return (
    <div className={style.cards}>
      {array && array.map((item, i) => <Card key={i} producto={item} />)}
    </div>
  );
};

export default ListOfCards;
