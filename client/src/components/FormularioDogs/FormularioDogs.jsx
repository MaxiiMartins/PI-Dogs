import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createDog } from "../../redux/actions";
import style from "./FormularioDogs.module.css";
import validacion from "./validaciones"

function FormularioDog() {
  const dispatch = useDispatch();
  const temperamentos = useSelector((state) => state.temperaments);
  const [info, setInfo] = useState({
    nombre: "",
    pesoMax: "",
    pesoMin: "",
    alturaMax: "",
    alturaMin: "",
    añosDeVida: "",
    img: "",
    temperamento: []
  });
  const [error, setError] = useState({
    nombre: "Se requiere un nombre",
    altura: "Se requiere un altura",
    peso: "Se requiere un peso",
    añosDeVida: "Años de vida requiere un numero entre 1 y 20",
    temperamento: "Seleccione al menos un temperamento",
    alerta:true
  });

  const handleChange = (e)=> {
    
    setInfo((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));

    validacion({...info,[e.target.id]: e.target.value},error,setError)
  }

  const handleSelectChange = (e) => {
    if (e.target.value !== "" && !info.temperamento.includes(e.target.value)) {
      setInfo((prev) => ({
        ...prev,
        temperamento: [...prev.temperamento,e.target.value],
      }));
      validacion(info,error,setError)
    }
  };
  const deleteSelectTemperament = (e) => {
    e.preventDefault();
    const array = info.temperamento;
    setInfo((prev) => ({
      ...prev,
      temperamento: array.filter((element) => element !== e.target.name),
    }));
  };
 
  return (
    <div className={style.container}>
      <div className={style.nav}>
        <Link to="/home">
          <button className={style.btn}>Volver</button>
        </Link>
      </div>
      <form
        className={style.formContainer}
        onSubmit={(e) => {
          console.log("e", e);
          e.preventDefault();
          dispatch(createDog(info))
        }}
        autoComplete="off"
      >
        <h2>Añade una nueva raza </h2>
        <div className={style.formInputs}>
          <label htmlFor="nombre">* Nombre: </label>
          <input
            id="nombre"
            type="text"
            onChange={(e) => handleChange(e)}
            value={info.nombre}
          />
        </div>
        <div className={style.formInputs}>
          <label htmlFor="img">Imagen: </label>
          <input
            id="img"
            type="text"
            onChange={(e) => handleChange(e)}
            value={info.img}
          />
        </div>
        <div className={style.formInputs}>
          <label htmlFor="pesoMax">* Peso Maximo: </label>
          <input
            id="pesoMax"
            type="number"
            min="1"
            max="99"
            onChange={(e) => handleChange(e)}
            value={info.pesoMax}
          />
        </div>
        <div className={style.formInputs}>
          <label htmlFor="pesoMin">* Peso Minimo: </label>
          <input
            id="pesoMin"
            type="number"
            min="1"
            max="99"
            onChange={(e) => handleChange(e)}
            value={info.pesoMin}
          />
        </div>
        <div className={style.formInputs}>
          <label htmlFor="alturaMax">* Altura Maxima: </label>
          <input
            id="alturaMax"
            type="number"
            min="1"
            max="99"
            onChange={(e) => handleChange(e)}
            value={info.alturaMax}
          />
        </div>
        <div className={style.formInputs}>
          <label htmlFor="alturaMin">* Altura Minima</label>
          <input
            id="alturaMin"
            type="number"
            min="1"
            max="99"
            onChange={(e) => handleChange(e)}
            value={info.alturaMin}
          />
        </div>
        <div className={style.formInputs}>
          <label htmlFor="añosDeVida">* Años de vida: </label>
          <input
            id="añosDeVida"
            type="number"
            min="1"
            max="99"
            onChange={(e) => handleChange(e)}
            value={info.añosDeVida}
          />
        </div>
        <div className={style.selectTemperamentos}>
          <label htmlFor="temperamento">* Temperamentos: </label>
          <select
            id="temperamento"
            defaultValue=""
            onChange={(e) => handleSelectChange(e)}
            disabled={info.temperamento.length === 4}
          >
            <option value="">--</option>
            {temperamentos?.map((e) => {
              return <option value={e.name}>{e.name}</option>;
            })}
          </select>
        </div>
        <div className={style.arrayTemp}>
          {info.temperamento?.map((e,index) => (
            <div key={index}>
              <label>{e}
              <button name={e} onClick={(e) => deleteSelectTemperament(e)}>
                X
              </button>
              </label>
            </div>
          ))}
        </div>
        <input
            type="submit"
            className={style.btnEnviar}
            disabled={info.cambio}
          /> 
      </form>
      <div className={error.alerta?style.containerError : style.desactivado}>
        {error.nombre !== "" ?<p>* {error.nombre}</p>:null}
        {error.peso !== "" ?<p>* {error.peso}</p>:null}
        {error.altura !== "" ?<p>* {error.altura}</p>:null}
        {error.añosDeVida !== "" ?<p>* {error.añosDeVida}</p>:null}
        {error.temperamento !== "" ?<p>* {error.temperamento}</p>:null}
      </div>
    </div>
  );
}

export default FormularioDog;
