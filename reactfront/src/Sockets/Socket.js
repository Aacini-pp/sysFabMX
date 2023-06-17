import io from "socket.io-client"

export let socket = io(process.env.REACT_APP_URL_SOCKET ) //TODO: AGREGAR UNA OPCION GLOBAL PARA LA DIRECCION


const conectarSocket = () => {

    return socket = io(process.env.REACT_APP_URL_SOCKET )

}

export default conectarSocket
