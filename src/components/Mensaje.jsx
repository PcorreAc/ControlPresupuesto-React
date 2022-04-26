import React from "react"
//tipo => tipo de error
//children => mensaje
const Mensaje = ({children, tipo}) => {
    return (
        <div className={`alerta ${tipo}`}>{children}

        </div>
    )
}

export default Mensaje