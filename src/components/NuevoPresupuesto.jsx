import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({
  //Obtenemos variables enviadas desde Header.jsx
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [mensaje, setMensaje] = useState("");

  //Validando valores
  const handlePresupuesto = (e) => {
    e.preventDefault();

    if (!presupuesto || presupuesto < 0) {
      setMensaje("No es un presupuesto válido");
      return; //Detiene la ejecución cuando se cumple la condición
    }
    setMensaje("");
    setIsValidPresupuesto(true);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
          <label>Definir Presupuesto</label>
          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu Presupuesto"
            value={presupuesto} //Pasando valor inicial (0)
            onChange={(e) => setPresupuesto(Number(e.target.value))} //Capturando valor ingresado por pantalla y lo convertimos a Int
          />
        </div>
        <input type="submit" id="Añadir" />
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        {/* mensaje hace referencia a children */}
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
