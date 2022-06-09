import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  searchDogName,
  orderAlphabetical,
  orderWeight,
  filterTemperaments,
  filterDataDogs,
  clearDogs
} from "../../redux/actions";
import style from "./Navbar.module.css";
function Navbar({ setearPagina, temperamentos }) {
  const dispatch = useDispatch();
  const [valorInput, setValorInput] = useState("");

  function handleChange(e) {
    setValorInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchDogName(valorInput));
    setValorInput("");
    setearPagina(1);
  }

  function handleOrder(e) {
    if (
      e.target.value === "AZ" ||
      e.target.value === "ZA" ||
      e.target.value === "TODOS"
    ) {
      dispatch(orderAlphabetical(e.target.value));
      setearPagina(1);
    }
    if (e.target.value === "MAX" || e.target.value === "MIN") {
      dispatch(orderWeight(e.target.value));
      setearPagina(1);
    }
    
  }

  function handleFilter(e) {
    dispatch(filterTemperaments(e.target.value))
    setearPagina(1)
  }

  function handleFilterData (e){
    dispatch(filterDataDogs(e.target.value))
    setearPagina(1)
  }
  return (
    <div className={style.contenedorPadre}>
      <div className={style.nav}>
        <h2 className={style.logo}>
          DOGS <span>🦴</span>
        </h2>
        <div className={style.busqueda}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              className={style.input}
              type="text"
              onChange={(e) => handleChange(e)}
              value={valorInput}
              placeholder="Buscar una raza...."
            />
          </form>
        </div>
        <div className={style.botones}>
        <Link to="/" onClick={() => dispatch(clearDogs())}>
          <button className={style.btn}>Ir al inicio</button>
        </Link>
        <Link to="/dog">
          <button className={style.btn}>Añadir raza</button>
        </Link>
        </div>
      </div>
      <div className={style.contenedorDfiltros}>
          <label htmlFor="ordenar">Ordenar por {" "}
          <select
            id="ordenar"
            defaultValue="TODOS"
            onChange={(e) => handleOrder(e)}
          >
            <option value="TODOS">Peso - Alfabetico</option>
            <option value="AZ">A-Z</option>
            <option value="ZA">Z-A</option>
            <option value="MAX">Peso Maximo</option>
            <option value="MIN">Peso Minimo</option>
          </select>
          </label>
          <label htmlFor={"temperamento"}> Filtrar por {" "}
          <select id="temperamento" defaultValue="TODOS" onChange={(e) => handleFilter(e)}>
            <option value="TODOS">Temperamentos</option>
            {temperamentos?.map((e) => {
              return (
                <option key={e.id} value={e.name}>{e.name}</option>
              );
            })}
          </select>
          </label>
          <label htmlFor="filtrarData">Filtrar datos {" "}
          <select
            id="filtrarData"
            defaultValue="TODOS"
            onChange={(e) => handleFilterData(e)}
          >
            <option value="TODOS">Todos</option>
            <option value="API">Api</option>
            <option value="DB">Db</option>
          </select>
          </label>
      </div>
    </div>
  );
}

export default Navbar;
