import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({ gastos, presupuesto }) => {
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

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: "#3B82F6",
            trailColor: "#F5F5F5",
            pathTransitionDuration: 1,
          })}
          value={porcentaje}
        />
      </div>
      <div className="contenido-presupuesto">
        <p>
          <span>Presupuesto: </span>
          {formatearCantidad(presupuesto)}
          {/* Recibimos valor ingresado de nuevo presupuesto */}
        </p>
        <p>
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
