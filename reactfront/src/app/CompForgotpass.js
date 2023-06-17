import React from "react";
import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const  ULR_BASE = process.env.REACT_APP_BASE_URL;
const URI =  ULR_BASE + "forgot-password/";

const CompForgotpass = () => {
  const [msgEstado, setMegEstado] = useState("");
  const [msgError, setMegError] = useState("");

  const [CampoBusqueda, setCampoBusqueda] = useState(undefined);

  const limpiarMsg = () => {
    setMegEstado("");
    setMegError("");
  };

  const navigate = useNavigate();

  const RecuperarPass = async (e) => {
    e.preventDefault();

    let params = {
      CampoBusqueda: CampoBusqueda,
    };
    console.log(params);

    axios
      .post(URI, params)
      .then((response) => {
        console.log(response);

        limpiarMsg();
        setMegEstado(response.data.message);
      })
      .catch((error) => {
        console.error(error.response.data);
        limpiarMsg();
        setMegError(error.response.data.message);
      });
  };

  return (
    <div>
      <h3>Recuperar contraseña</h3>

      <div className="alert alert-success" role="alert">
        {msgEstado}
      </div>
      <div className="alert alert-danger" role="alert">
        {msgError}
      </div>
      <form onSubmit={RecuperarPass}>
        <div className="row justify-content-center">
          <div className="form-group ">
            <div className=" col-10  btn-group btn-group-toggle mx-3" data-toggle="buttons">
              <input
                value={CampoBusqueda}
                onChange={(e) => setCampoBusqueda(e.target.value)}
                type="text"
                className="form-control"
                required
              />
              <button type="submit" className="btn btn-primary ">
                <i className="fa-solid fa-magnifying-glass"></i> Buscar
              </button>
            </div>
            <div className="  form-text  text-muted  ">
              Ingrese su Nombre de usuario(NickName), Email o Numero telefonico
            </div>
          </div>
        </div>


      </form >
    </div >
  );
};

export default CompForgotpass;
