import { useState } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({ setModal, animarModal, setAnimarModal }) => {

    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')

    const ocultarModal = () => {
        setAnimarModal(false)

        //Definimos tiempo para cerrar el modal
        setTimeout(() => {
            setModal(false)
        }, 300)
    }

    //Generamos validaciones para los valores del form
    const handleSubmit = e => {
        e.preventDefault();

        //Preguntamos si los valores estan vacíos y generamos la acción
        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son requeridos')

            //Definimos tiempo para cerrar el mensaje de error
            setTimeout(() => {
                setMensaje('')
            }, 200)

            return;
        }
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={CerrarBtn}
                    alt="cerrar modal"
                    onClick={ocultarModal} //Pasamos el setModal en false al app.jsx
                />
            </div>
            <form
                //Llamamos a la validación
                onSubmit={handleSubmit}
                //Si animarModal es true entonces se llama a la proiedad "animar" del css sino propiedad "cerrar"
                className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
            >
                <legend>Nuevo Gasto</legend>

                {/* Recibimos el tipo de mensaje (error) y pasamos el mensaje seteado de setMensaje */}
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        id='nombre'
                        type="text"
                        placeholder='Añade el nombre del gasto'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        id='cantidad'
                        type="number"
                        placeholder='Añade la cantidad del gasto ej: 500'
                        value={cantidad}
                        onChange={e => setCantidad(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="categoria">Categoría</label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="gastos">Gastos Varios</option>
                        <option value="suscripciones">Suscripciones</option>
                        <option value="comida">Comida</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="salud">Salud</option>
                        <option value="casa">Casa</option>
                        <option value="ocio">Ocio</option>
                    </select>
                </div>
                <input
                    type="submit"
                    value='Añadir Gasto'
                />
            </form>
        </div>
    )
}

export default Modal