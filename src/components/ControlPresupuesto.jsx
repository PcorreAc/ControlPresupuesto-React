import React from "react"

const ControlPresupuesto = ({ presupuesto }) => {

    //Formatear valor a la moneda local
    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP'
        })
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <p>Grafica aqui</p>
            </div>
            <div className="contenido-presupuesto">
                <p>
                    <span>Presupuesto: </span>{formatearCantidad(presupuesto)}{/* Recibimos valor ingresado de nuevo presupuesto */}
                </p>
                <p>
                    <span>Disponible: </span>{formatearCantidad(0)}{/* Recibimos valor ingresado de nuevo presupuesto */}
                </p>
                <p>
                    <span>Gastado: </span>{formatearCantidad(0)}{/* Recibimos valor ingresado de nuevo presupuesto */}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto