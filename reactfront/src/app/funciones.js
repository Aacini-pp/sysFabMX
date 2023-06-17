import { useState, useEffect } from 'react'



export const useAuth = () => {
    let isAuth = !(localStorage.getItem("Usuaria") === null);
    console.log("Estado del Auth ", isAuth);
    return isAuth;
};

export const getUruaria = () => {
    if (useAuth) {
        let usuaria = JSON.parse(localStorage.getItem("Usuaria"));
        return usuaria
    }
    return 0;

};


export const getRolUruaria = () => {
    if (useAuth) {
        let usuaria = JSON.parse(localStorage.getItem("Usuaria"));
        return usuaria.Rol
    }
    return 0;

}

export const isVoluntaria = () => {

    return (getRolUruaria() >= 3)
}


export const isCoordinadora = () => {
    return (getRolUruaria() >= 4)


}


export const useCoordenadas = () => {

    const [coordenadas, setCoordenadas] = useState({
        latitud: null,
        longitud: null
    });
    let geoId;

    useEffect(() => {
        geoId = window.navigator.geolocation.watchPosition(position => {
            setCoordenadas({
                latitud: position.coords.latitude,
                longitud: position.coords.longitude
            })
        })
        return () => {
            navigator.geolocation.clearWatch(geoId)
        }



    }, []);
    return coordenadas
}




