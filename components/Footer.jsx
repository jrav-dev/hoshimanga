import React from "react";
import Icono from "./Icono";

const Footer = () => {
  return (
    <footer className="app__footer">
      <div className="flexible">
        <h2>Hoshi Manga</h2>

        <div className="app__footer__redes flexible">
          <Icono icono="bi bi-facebook" />
          <Icono icono="bi bi-instagram" />
          <Icono icono="bi bi-twitter" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
