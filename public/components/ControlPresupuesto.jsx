import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  gastos,
  setGastos,
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );

    const totalDisponible = presupuesto - totalGastado;
    //Calcular porcentaje gastado
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2); //toFixed establece cantidad de decimales

    setDisponible(totalDisponible);
    setGastado(totalGastado);

    //Tiempo para actulizar el gráfico
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1500);
  }, [gastos]); //Cada vez que gastos cambie, correrá el useEffect

  //Formatear valor a la moneda local
  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
    });
  };

  const handleResetApp = () => {
    const resultado = confirm("¿Deseas reiniciar presupuestos y gastos?");
    if (resultado) {
      setGastos([]);
      setPresupuesto(0);
      setIsValidPresupuesto(false);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
            trailColor: "#F5F5F5",
            textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
            pathTransitionDuration: 1,
          })}
          value={porcentaje}
          text={`${porcentaje}%Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear APP
        </button>
        <p>
          <span>Presupuesto: </span>
          {formatearCantidad(presupuesto)}
          {/* Recibimos valor ingresado de nuevo presupuesto */}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span>
          {formatearCantidad(disponible)}
          {/* Recibimos valor ingresado de nuevo presupuesto */}
        </p>
        <p>
          <span>Gastado: </span>
          {formatearCantidad(gastado)}
          {/* Recibimos valor ingresado de nuevo presupuesto */}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
