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
        <Link to="/dogs">
          <buttom className={style.botton}>Ingresar</buttom>
        </Link>
      </div>
    </div>
  )
}


export default LandingPage;

/* <div className={styles.landingPage}>
            <div className={styles.welcomeText}>
                <h1>Welcome</h1>
            </div>
            <h1 className={styles.casePhone}>I'm sorry, I'm not responsive at the moment :( Whatch me in a computer!</h1>
            <div className={styles.welcome}>
                <div className={styles.image} />
                <Link to='/home'> 
                    <button className={styles.enterButton}>...</button>
                </Link>
            </div>
        </div> */
