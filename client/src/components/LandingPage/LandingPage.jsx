import React from 'react'
import style from "./LandingPage.module.css"
import {Link} from "react-router-dom"


function LandingPage(){

  
  return (
    <div className={style.landing}>
      <div className={style.titulo}>
        <h2>DOGS <span className={style.icono}>🦴</span></h2>
      </div>
      <div className={style.container}>
        <Link to="/home">
          <buttom className={style.btn}>Ingresar</buttom>
        </Link>
      </div>
    </div>
  )
}


export default LandingPage;
