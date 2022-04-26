export const generarId = () => {
    //Generamos numero random para el id
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)
    return random + fecha
   
}
