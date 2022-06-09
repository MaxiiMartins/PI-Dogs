import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { dogDetail, clearDetail } from "../../redux/actions";
import cargando from "../../img/spinner.gif";
import style from "./DetalleDogs.module.css";

function DetalleDogs() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.dogDetail);
  useEffect(() => {
    dispatch(dogDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <Link to="/home">
      <button className={style.btn}  onClick={() => dispatch(clearDetail())}>Volver</button>
      </Link>
      {Object.keys(dog).length ? (
        <div key={id} className={style.container}>
          <div className={style.portada}>
            <img src={dog.img} alt={dog.nombre} />
            <h2>{dog.nombre}</h2>
          </div>
          <div className={style.informacion}>
            <p>
              <span className={style.title}>Temperamentos:</span>{" "}
              {dog.temperamento}
            </p>
            <p>
              <span className={style.title}>Años de vida:</span>{" "}
              {dog.añosDeVida}
            </p>
            <p>
              <span className={style.title}>Peso maximo:</span> {dog.pesoMax}Kg
            </p>
            <p>
              <span className={style.title}>Peso minimo:</span> {dog.pesoMin}Kg
            </p>
            <p>
              <span className={style.title}>Altura maxima:</span>{" "}
              {dog.alturaMax}cm
            </p>
            <p>
              <span className={style.title}>Altura minima:</span>{" "}
              {dog.alturaMin}cm
            </p>
          </div>
        </div>
      ) : (
        <img className={style.cargando} src={cargando} alt="" />
      )}
    </div>
  );
}

// alturaMax: 29
// alturaMin: 23
// añosDeVida: "10 - 12 years"
// id: 1
// img: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
// nombre: "Affenpinscher"
// pesoMax: 6
// pesoMin: 3
// temperamento: "Stubbo
export default DetalleDogs;


// <div className={style.divBotones}>{id.length < 4 && (<>
//             <button id="Editar" className={style.editar} onClick={(e)=> alert(`${e.target.id} la raza ${dog.nombre}`)}> Editar </button ><button id="Eliminar" className={style.eliminar} onClick={(e)=> alert(`${e.target.id} la raza ${dog.nombre}`)}> Eliminar </button>
//           </>)}</div>