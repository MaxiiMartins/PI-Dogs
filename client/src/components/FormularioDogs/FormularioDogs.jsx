import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { getAllTemperaments } from '../../redux/actions'
import DogCards from '../DogCards/DogCards'
function FormularioDog() {
  const dispatch = useDispatch()
  const temperamentos = useSelector((state)=> state.temperaments)
  console.log(temperamentos)

  useEffect(()=>{
    dispatch(getAllTemperaments())
  },[])
  return (
    <div>{temperamentos?.map(e=>{
      return(
        <DogCards
          id={e.id}
          nombre={e.name}
        />
      )
    })}</div>
  )
}

export default FormularioDog