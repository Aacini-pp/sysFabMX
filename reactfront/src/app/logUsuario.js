import React from "react";
import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router';

const  ULR_BASE = process.env.REACT_APP_BASE_URL;
    const URI = ULR_BASE+"login/";

const ComplogUsuarios = (props) => {
  const [msgEstado, setMegEstado] = useState("");
  const [msgError, setMegError] = useState("");

  const [NickName, setNickName] = useState("");
  const [Pass, setPass] = useState("");

  const limpiarMsg = () => {
    setMegEstado("");
    setMegError("");
  };

  const navigate = useNavigate();
  

  const login = async (e) => {
    e.preventDefault();

    if(Pass == "help"){ //si pide ayuda manda a una pantalal de juego
      navigate("/Juego");
    }

    let params = {
      NickName: NickName,
      Pass: Pass,
    };
    console.log(params);

    axios
      .post(URI, params)
      .then((response) => {
        console.log(response);
        if ("NickName" in response.data) {
          localStorage.setItem("Usuaria", JSON.stringify(response.data));
          //props.EmergenciasPendientes(); //llamar a las conexiones socket
          setTimeout(function () { //volver a la raiz y recargar pagina para reconectarse 
            navigate("/");
            window.location.reload(false);  
           
          }, 2000);
        }
        limpiarMsg();
        setMegEstado("Bienvenida " + response.data.Nombre);
      })
      .catch((error) => {
        console.error(error);
        limpiarMsg();
        setMegError(error.response.data.message);
      });
  };

  return (
    <div>
      <h3>Iniciar sesión </h3>

      <div className="alert alert-success" role="alert">
        {msgEstado}
      </div>
      <div className="alert alert-danger" role="alert">
        {msgError}
      </div>
      <form onSubmit={login}>
        <div className="row">
          <div className="form-group col-md-6">
            <label className="form-label required">Apodo</label>
            <input
              value={NickName}
              onChange={(e) => setNickName(e.target.value)}
              type="text"
              className="form-control"
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label className="form-label required">Contraseña</label>
            <input
              value={Pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Link to="/forgot-password" className="h6">
              Olvide mi contraseña
            </Link>
          </div>
        </div>

        <button type="submit" className="btn btn-primary m-3">
          <i className="fa-solid fa-right-to-bracket"></i> Loggin
        </button>
      </form>
    </div>
  );
};

export default ComplogUsuarios;
