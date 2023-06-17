import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";



const  ULR_BASE = process.env.REACT_APP_BASE_URL;

const URI = ULR_BASE + "change-password/";
const URIEstatusToken = ULR_BASE + "verify-change-password/";

const CompChangePasswords = () => {
  const [msgEstado, setMegEstado] = useState("");
  const [msgError, setMegError] = useState("");

  const [NewPass, setNewPass] = useState("");
  const [ConfNewPass, setConfNewPass] = useState("");

  const limpiarMsg = () => {
    setMegEstado("");
    setMegError("");
  };

  const [estatsToken, setEstatsToken] = useState(true);
  useEffect(() => {
    getEstatusToken();
  }, []);

  //procedimiento para mostrar todos los AsgCasos
  const getEstatusToken = async () => {
    const res = await axios
      .get(URIEstatusToken + token)
      .then((response) => {
        console.log(response.data);
        setEstatsToken(true);
        limpiarMsg();
        setMegEstado(response.data.message);
      })
      .catch((error) => {
        console.error(error.response.data);
        setEstatsToken(false);
        limpiarMsg();
        setMegError(error.response.data.message);
      });
  };

  const navigate = useNavigate();
  const { token } = useParams();

  const CambiarPassword = async (e) => {
    e.preventDefault();

    let params = {
      token: token,
      NewPass: NewPass,
      ConfNewPass: ConfNewPass,
    };
    console.log(params);

    axios
      .post(URI, params)
      .then((response) => {
        console.log(response);

        setTimeout(function() {
          navigate("/login");
        }, 2000);

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
      <h3>Cambiar contraseña</h3>

      <div className="alert alert-success" role="alert">
        {msgEstado}
      </div>
      <div className="alert alert-danger" role="alert">
        {msgError}
      </div>
      <form onSubmit={CambiarPassword}>
        <div className="row align-items-end">
          <div className="form-group col-md-6">
            <label className="form-label required">Nueva contraseña</label>
            <input
              value={NewPass}
              onChange={(e) => setNewPass(e.target.value)}
              type="password"
              className="form-control"
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label className="form-label required">
              {" "}
              Confirmar nueva contraseña
            </label>
            <input
              value={ConfNewPass}
              onChange={(e) => setConfNewPass(e.target.value)}
              type="password"
              className="form-control"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary m-3">
          <i className="fa-solid fa-star"></i>
          Confirmar
        </button>
      </form>
    </div>
  );
};

export default CompChangePasswords;
