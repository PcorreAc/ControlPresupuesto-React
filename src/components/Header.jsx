import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ({
    //Obtenemos variables enviadas desde App.jsx
    presupuesto,
    setPresupuesto,
    isValidPresupuesto,
    setIsValidPresupuesto
}) => {
    return (
        <header>
            <h1>Planificador de Gastos</h1>

            {/* Preguntamos si presupuesto es válido */}
            {isValidPresupuesto ? (
                <p>Control Presupuesto</p>
            ): (//Si no es válido cargamos formulario 
                <NuevoPresupuesto
                //Pasando variables al NuevoPresupuesto
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />
            )}
            
        </header>
    )
}

export default Header