import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {Link} from "react-router-dom"
import { searchDogName,orderAlphabetical,orderWeight} from '../../redux/actions';
import style from "./Navbar.module.css"
function Navbar({setearPagina}) {
  const dispatch = useDispatch();
  const [valorInput,setValorInput] = useState("")
  const [ordenado,setOrdenado] = useState("")

  function handleChange(e){
    setValorInput(e.target.value)
  }

  async function handleSubmit(e){
      e.preventDefault()
      await dispatch(searchDogName(valorInput))
      setOrdenado("")
      setValorInput("")
      setearPagina(1)
  }

  function handleOrder(e){
    setOrdenado(e.target.value)
    if(ordenado === "AZ" || ordenado === "ZA"){
      dispatch(orderAlphabetical(e.target.value))
      setearPagina(1)
    }
    if(e.target.value === "MAX" || e.target.value === "MIN"){
      dispatch(orderWeight(e.target.value))
      setearPagina(1)
    }
  }
  
  return (
    <div className={style.contenedorPadre}>
      <div className={style.nav}>
        <Link to="/">
          <button className={style.button}>Ir al inicio</button>
        </Link>
        <h2>DOGS <span>🦴</span></h2>
        <Link to="/dog">
          <button className={style.button}>Añadir raza</button>
        </Link>
      </div>
      <div className={style.contenedorDfiltros}>
        <div className={style.ordenamiento}>
          <label htmlFor="ordenar">Ordenar por </label>
          <select id="ordenar" value={ordenado} onChange={(e)=>handleOrder(e)}>
            <option value="AZ">A-Z</option>
            <option value="ZA">Z-A</option>
            <option value="MAX">Peso Maximo</option>
            <option value="MIN">Peso Minimo</option>
          </select>
        </div>
        <div className={style.busqueda}>
          <form onSubmit={e=>handleSubmit(e)}>
            <input className={style.input} type="text" onChange={(e)=>handleChange(e)} value={valorInput} placeholder='Buscar una raza....'/>
          </form>
        </div>
        <div className={style.filtro}>
          <label htmlFor="">Filtrar por </label><button className={style.button}>boton: no funciona</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar