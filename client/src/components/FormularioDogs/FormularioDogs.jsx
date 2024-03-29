import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearDogs, createDog, getAllTemperaments } from "../../redux/actions";
import style from "./FormularioDogs.module.css";
import validacion from "./validaciones"
import cargando from "../../img/spinner.gif";

function FormularioDog() {
  const dispatch = useDispatch();
  const temperamentos = useSelector((state) => state.temperaments);
  // estado de la info del nuevo perro
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
  // estado de los errores en el formulario
  const [error, setError] = useState({
    nombre: "Se requiere un nombre",
    altura: "Se requiere un altura",
    peso: "Se requiere un peso",
    añosDeVida: "Años de vida requiere un numero entre 1 y 20",
    temperamento: "Seleccione al menos un temperamento",
    alerta:true
  });

  useEffect(()=>{
    dispatch(getAllTemperaments())
  },[dispatch])
  
  const handleSubmit = (e)=>{
    e.preventDefault();
          dispatch(createDog({
            ...info,
            pesoMax: parseInt(info.pesoMax),
            pesoMin: parseInt(info.pesoMin),
            alturaMax: parseInt(info.alturaMax),
            alturaMin: parseInt(info.alturaMin),
            añosDeVida: info.añosDeVida +" years" ,
            temperamento: info.temperamento.join(", ")
          }))
          setInfo({
            nombre: "",
            pesoMax: "",
            pesoMin: "",
            alturaMax: "",
            alturaMin: "",
            añosDeVida: "",
            img: "",
            temperamento: []
          })
  }

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
        <Link to="/home" onClick={() => dispatch(clearDogs())}>
          <button className={style.btn}>Volver</button>
        </Link>
      </div>
      {temperamentos.length?(
        <>
        <form
        className={style.formContainer}
        onSubmit={(e)=>handleSubmit(e)}
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
            maxLength={19}
          />
        </div>
        <div className={style.formInputs}>
          <label htmlFor="img">Imagen: </label>
          <input
            id="img"
            type="text"
            placeholder=" url de la imagen"
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
            {temperamentos?.map((e,index) => {
              return <option key={index} value={e.name}>{e.name}</option>;
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
            disabled={error.alerta}
          /> 
      </form>
      <div className={error.alerta?style.containerError : style.desactivado}>
        {error.nombre !== "" ?<p>* {error.nombre}</p>:null}
        {error.peso !== "" ?<p>* {error.peso}</p>:null}
        {error.altura !== "" ?<p>* {error.altura}</p>:null}
        {error.añosDeVida !== "" ?<p>* {error.añosDeVida}</p>:null}
        {error.temperamento !== "" ?<p>* {error.temperamento}</p>:null}
      </div>
        </>
      ):<img className={style.cargando} src={cargando} alt="" />}
    </div>
  );
}

export default FormularioDog;
