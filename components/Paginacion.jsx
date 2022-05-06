import React from "react";
import Boton from "./Boton";

const Paginacion = ({ prevPage, nextPage, skip, limit, dataPaginated, setLimit, setSkip, total }) => {
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
