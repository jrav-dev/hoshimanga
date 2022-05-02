import Link from "next/link";
import React from "react";

import style from "./Ruta.module.css";

const Ruta = ({ items }) => {
  return (
    <ul className={style.ruta}>
      <li>
        <Link href="/">
          <a>
            <i className="bi bi-house"></i>
          </a>
        </Link>
      </li>
      {items.map((item, i) => (
        <li key={i}>
          {item.href ? (
            <Link href={item.href}>{item.text}</Link>
          ) : (
            <span>{item.text}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Ruta;
