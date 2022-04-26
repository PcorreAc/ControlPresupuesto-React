import { useState } from 'react'
import Header from './components/Header'
import Modal from './components/Modal';
import ListadoGAstos from './components/ListadoGastos';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  const [gastos, setGastos] = useState([])
  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false) //Ventana modal iniciada en false
  const [animarModal, setAnimarModal] = useState(false) //Definir tiempo de animación del modal
  
  //Si el onCLick es ejecutado mostramos el modal
  const handleNuevoGasto = () => {
    setModal(true)

    //Tiempo de apertura del modal
    setTimeout(() => {
      setAnimarModal(true)
    }, 300);
  }

  const guardarGasto = gasto => {
    //Generamos un id random para gasto
    gasto.id = generarId();
    //Generar fecha de creación
    gasto.fecha = Date.now();
    //Generamos copia de gastos
    setGastos([...gastos, gasto])

    //Cerramos modal despues de guardar los datos
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 300);
  }

  return (
    <div className={modal ? 'fijar' : ''}> {/* Cuando modal esté activo llama a la clase fijar del css */}
      <Header
        //Pasando variables al Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {/* Mostramos icono cuando isValidPresupuesto cambia a true */}
      {isValidPresupuesto && (
        <>
          <main>
            <ListadoGAstos
              gastos={gastos}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto} // llamamos al import del icono 
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal &&
        <Modal //Accedemos al componente Modal
          setModal={setModal} //recibimos el setModal en false desde CerraBtn
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
        />}

    </div>
  )
}

export default App
