const hayError = (error,setError)=>{
    if (
        !error.nombre &&
        !error.peso &&
        !error.altura &&
        !error.añosDeVida &&
        !error.temperamento
      ){
        setError({...error,alerta:false})
        return;
      }
      setError({...error,alerta:true})
      return;
}

const validacion = (estado, error,setError) => {
  // validaciones nombre
  if (estado.nombre) {
    if (estado.nombre.length > 18)
    error.nombre = "El nombre supera los 18 caracteres";
    // let regular = !/^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/.test(estado.nombre)
    if (!/^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/.test(estado.nombre))
      error.nombre = "El nombre no puede contener números ni caracteres especiales";
    else {
      error.nombre = "";
    }
  } else {
    error.nombre = "Se requiere el nombre";
  }
  //validaciones peso
  if (parseInt(estado.pesoMax) && parseInt(estado.pesoMin)) {
    let pesoMin = parseInt(estado.pesoMin);
    let pesoMax = parseInt(estado.pesoMax);
    if (pesoMin > pesoMax) {
      error.peso = "El peso minimo no puede ser mayor que el peso maximo";
    } else {
      error.peso = "";
    }
  } else {
    if (!estado.pesoMin) error.peso = "El peso minimo no puede estar vacio";
    if (!estado.pesoMax) error.peso = "El peso maximo no puede estar vacio";
    if (parseInt(estado.pesoMin) === 0)
      error.peso = "El peso minimo no puede ser cero";
    if (parseInt(estado.pesoMax) === 0)
      error.peso = "El peso maximo no puede ser cero";
  }
  // validaciones de altura
  if (parseInt(estado.alturaMax) && parseInt(estado.alturaMin)) {
    let alturaMin = parseInt(estado.alturaMin);
    let alturaMax = parseInt(estado.alturaMax);
    if (alturaMin > alturaMax) {
      error.altura = "La altura minima no puede ser mayor que la altura maxima";
    } else {
      error.altura = "";
    }
  } else {
    if (!estado.alturaMin)
      error.altura = "La altura minima no puede estar vacio";
    if (!estado.alturaMax)
      error.altura = "La altura maxima no puede estar vacio";
    if (parseInt(estado.alturaMin) === 0)
      error.altura = "La altura minima no puede ser cero";
    if (parseInt(estado.alturaMax) === 0)
      error.altura = "La altura maxima no puede ser cero";
  }
  //validaciones de años
  if (estado.añosDeVida) {
    let años = parseInt(estado.añosDeVida);
    if (años <= 0 || años > 20) {
      error.añosDeVida = "Los años de vida tiene que ser entre 1 y 20";
    } else {
      error.añosDeVida = "";
    }
  } else error.añosDeVida = "Los años de vida no puede estar vacio";
  //validaciones de temperamento
  if (estado.temperamento.length) {
    console.log(estado.temperamento);
    error.temperamento = "";
  } else {
    error.temperamento = "Se requiere al menos un temperamento";
  }
    hayError(error,setError)
};

export default validacion;
