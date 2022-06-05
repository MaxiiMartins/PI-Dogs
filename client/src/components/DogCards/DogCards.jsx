import React from "react";
import { Link } from "react-router-dom";
import style from "./DogCards.module.css";

function DogCards({ id, nombre, img, temperamento, pesoMax }) {

  return (
    <div className={style.card} key={id}>
      <img
        src={
          img
            ? img
            : "https://programacion.net/files/article/20161110041116_image-not-found.png"
        }
        alt={nombre}
      />
      <h3>{nombre}</h3>
      <span className={style.title}>Temperamento:</span>
      <p>{temperamento}</p>
      <p>
        <span className={style.title}>Peso:</span> {pesoMax}Kg
      </p>
      <Link to={`/home/${id}`}>
        <span className={style.enlace} title={`Mas detalle sobre ${nombre}`}>
          + Detalles
        </span>
      </Link>
    </div>
  );
}
//"https://programacion.net/files/article/20161110041116_image-not-found.png"
//"https://raw.githubusercontent.com/MaxiiMartins/contador/master/IMG_20200127_200536.webp" zeus
export default DogCards;
