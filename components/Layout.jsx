import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Router from 'next/router'
import { ToastContainer } from 'react-toastify';

const Layout = ({ children }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/mangas?q=${search}`;
  };

  return (
    <>
      <Header />

      <div className="app__main">
        <form className="app__form__search" onSubmit={handleSubmit}>
          <input
            type="text"
            name="q"
            placeholder="Buscar ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && <i className="bi bi-x" onClick={() => setSearch("")}></i>}

          <button>Buscar</button>
        </form>

        <main className="app__container">{children}</main>
      </div>

      <Footer />

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </>
  );
};

export default Layout;
