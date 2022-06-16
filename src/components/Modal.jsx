import { useState, useEffect } from "react";
import Mensaje from "./Mensaje";
import CerrarBtn from "../img/cerrar.svg";

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar,
}) => {
  const [mensaje, setMensaje] = useState("");
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState("");
  const [id, setId] = useState("");
  const [isBtnDisable, setIsBtnDisable] = useState(false);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setId(gastoEditar.id);
      setFecha(gastoEditar.fecha);
    }
  }, []);

  const ocultarModal = () => {
    setAnimarModal(false);
    setGastoEditar({});
    //Definimos tiempo para cerrar el modal
    setTimeout(() => {
      setModal(false);
    }, 1000);
  };

  //Generamos validaciones para los valores del form
  const handleSubmit = (e) => {
    setIsBtnDisable(true);
    e.preventDefault();

    //Preguntamos si los valores estan vacíos y generamos la acción
    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son requeridos");

      //Definimos tiempo para cerrar el mensaje de error
      setTimeout(() => {
        setMensaje("");
      }, 1000);

      return;
    }

    //Generamos objeto para enviarlo al App.jsx
    guardarGasto({ nombre, cantidad, categoria, id, fecha });
  };

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
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>

        {/* Recibimos el tipo de mensaje (error) y pasamos el mensaje seteado de setMensaje */}
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade el nombre del gasto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Añade la cantidad del gasto ej: 500"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
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
          disabled={isBtnDisable}
          value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"}
        />
      </form>
    </div>
  );
};

export default Modal;
