import React from "react";
import Link from 'next/link';
import Icono from "./Icono";

const Footer = () => {
  return (
    <footer className="app__footer">
      <div className="flexible">
        <h2>Hoshi Manga</h2>

        <div className="app__footer__redes flexible">
          <Link href='https://www.facebook.com/'><a><Icono icono="bi bi-facebook" /></a></Link>
          <Link href='https://twitter.com/'><a><Icono icono="bi bi-instagram" /></a></Link>
          <Link href='https://www.instagram.com/'><a><Icono icono="bi bi-twitter" /></a></Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
