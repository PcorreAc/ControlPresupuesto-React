import { useState, useEffect } from "react"

const ControlPresupuesto = ({ gastos, presupuesto }) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);

        const totalDisponible = presupuesto - totalGastado;
        setDisponible(totalDisponible)
        setGastado(totalGastado)
    }, [gastos]) //Cada vez que gastos cambie, correrá el useEffect

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
                    <span>Disponible: </span>{formatearCantidad(disponible)}{/* Recibimos valor ingresado de nuevo presupuesto */}
                </p>
                <p>
                    <span>Gastado: </span>{formatearCantidad(gastado)}{/* Recibimos valor ingresado de nuevo presupuesto */}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto