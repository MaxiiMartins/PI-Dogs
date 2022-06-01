import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { dogDetail, clearDetail } from '../../redux/actions';
import cargando from "../img/spinner.gif";
import style from "./DetalleDogs.module.css"

function DetalleDogs() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const dog = useSelector(state => state.dogDetail)

  useEffect(() => {
    dispatch(dogDetail(id))
  }, [dispatch,id])
  
  return (
    <div>
      <Link to="/home" onClick={() => dispatch(clearDetail())}>volver</Link>
      {
        Object.keys(dog).length
        ? <div key={id}>
            <img src={dog.img} alt={dog.nombre} />
            <h2>{dog.nombre}</h2>
            <p>temperamentos : {dog.temperamento}</p>
            <p>Años de vida : {dog.añosDeVida}</p>
            <p>pesoMax : {dog.pesoMax}</p>
            <p>pesoMin : {dog.pesoMin}</p>
            <p>alturaMax : {dog.alturaMax}</p>
            <p>alturaMin : {dog.alturaMin}</p>
          </div>
        : <img className={style.cargando} src={cargando} alt="" />
      }
    </div>
  )
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
export default DetalleDogs