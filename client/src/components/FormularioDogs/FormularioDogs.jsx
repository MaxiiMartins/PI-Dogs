import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTemperaments } from "../../redux/actions";
import DogCards from "../DogCards/DogCards";
function FormularioDog() {
  const dispatch = useDispatch();
  const temperamentos = useSelector((state) => state.temperaments);
  console.log(temperamentos);

  return (
    <select id="temperamento" defaultValue="TODOS">
      <option value="TODOS">--</option>
      {temperamentos?.map((e) => {
        return <option value={e.name}>{e.name}</option>;
      })}
    </select>
  );
}

export default FormularioDog;
