import React, { useState } from "react";
// import { connect } from "react-redux";
import { getAllDogs } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Home.module.css";
import DogCards from "../DogCards/DogCards";
import Navbar from "../Navbar/Navbar";
import cargando from "./spinner.gif";
import Paginado from "../Paginado/Paginado";

export const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(8);
  let contador = 0;
  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);
  
  return (
    
    <div className={style.fondo}>
      <Navbar setearPagina={setPagina}/>
      
      <div className={style.cardContainer}>
        {allDogs.data ? (
          contador = allDogs.data.length,
          allDogs.data.slice(
            (pagina - 1) * porPagina,
            (pagina - 1) * porPagina + porPagina
          ).map((e) =>{ 
            
            return (<DogCards
              key={e.id}
              id={e.id}
              nombre={e.nombre}
              img={e.img}
              temperamento={e.temperamento}
              pesoMax={e.pesoMax}
              pesoMin={e.pesoMin}
              añosDeVida={e.añosDeVida}
            />)
          })
        ) : 
        <img className={style.cargando} src={cargando} alt="" />
        }
      </div>
      <Paginado pagina={pagina} setPagina={setPagina} maximo={Math.ceil(contador/porPagina)}/>
    </div>
  );
};

export default Home;
