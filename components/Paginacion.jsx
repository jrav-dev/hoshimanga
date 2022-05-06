import React from "react";
import Boton from "./Boton";

const Paginacion = ({
  prevPage, nextPage, skip, limit,
  pages, page, dataPaginated, setLimit,
  setSkip, total, setPagina
}) => {
  return (
    <div className="app__paginacion">
      <div>
        {total && <p><b>{total}</b> - <b>{limit}</b> productos</p>}
      </div>

      <div className="app__paginacion__botones">
        <Boton
          texto="Anterior"
          click={prevPage}
          clase={skip === 0 ? "app__paginacion__disabled" : ""}
        />

        {page && pages && <p><b>{page}</b>de<b>{pages}</b></p>}

        <Boton
          texto="Siguiente"
          click={nextPage}
          clase={
            dataPaginated.length < limit ? "app__paginacion__disabled" : ""
          }
        />
      </div>

      <div>
        <select
          className="app__paginacion__select"
          name="limit"
          value={limit}
          onChange={(e) => {
            setLimit(parseInt(e.target.value))
            setSkip(0)
            setPagina(1)
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  );
};

export default Paginacion;
