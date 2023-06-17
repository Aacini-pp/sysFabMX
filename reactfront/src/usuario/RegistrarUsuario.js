import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
//import {useNative} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const  ULR_BASE = process.env.REACT_APP_BASE_URL;
    const URI = ULR_BASE+"registrarse/";

const CompRegistrarUsuario = () => {
  const [msgEstado, setMegEstado] = useState("");
  const [msgError, setMegError] = useState("");
  const limpiarMsg = () => {
    setMegEstado("");
    setMegError("");
  };

  const [estados, setEstados] = useState([]);

  useEffect(() => {
    getEstados();
  }, []);

  //procedimiento para mostrar todos los tickets
  const getEstados = async () => {

    const  ULR_BASE = process.env.REACT_APP_BASE_URL;
    const URIEstados =  ULR_BASE + "Cat/Estados/";
    const res = await axios
      .get(URIEstados)
      .then((response) => {
        console.log(response.data);
        setEstados(response.data);
      })
      .catch((error) => {
        console.error(error.response.data);
        limpiarMsg();
        setMegError(error.response.data.message);
      });
  };

  const [ContarHistoria, setContarHistoria] = useState(false);

  const [Nombre, setNombre] = useState("");
  const [NickName, setNickName] = useState("");
  const [Pass, setPass] = useState("");

  const [ApellidoPaterno, setApellidoPaterno] = useState(undefined);
  const [ApellidoMaterno, setApellidoMaterno] = useState(undefined);
  const [FechaNacimiento, setFechaNacimiento] = useState("");
  const [Estado, setEstado] = useState(34);
  const [Ciudad, setCiudad] = useState("");

  const [PerfilFB, setPerfilFB] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Telefono, setTelefono] = useState(null);

  const [Descripcion, setDescripcion] = useState(undefined);

  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();
    const params = {
      Nombre: Nombre,
      NickName: NickName,
      Pass: Pass,

      ApellidoPaterno: ApellidoPaterno == "" ? null : ApellidoPaterno,
      ApellidoMaterno: ApellidoMaterno == "" ? null : ApellidoMaterno,
      FechaNacimiento: FechaNacimiento == "" ? null : FechaNacimiento,
      EntidadFederativa: Estado,
      Ciudad: Ciudad == "" ? null : Ciudad,

      PerfilFB: PerfilFB == "" ? null : PerfilFB,
      Email: Email == "" ? null : Email,
      Telefono: Telefono == "" ? null : Telefono,
    };

    if (ContarHistoria) {
      params["susTickets"] = [{ Descripcion: Descripcion }];
    }

    console.log(params);

    axios
      .post(URI, params)
      .then((response) => {
        console.log("mensaje ", response.data);
        limpiarMsg();
        setMegEstado(response.data.message);

        setTimeout(function () {
          navigate("/login/");
        }, 2000);
      })
      .catch((error) => {
        console.error(error.response.data);
        limpiarMsg();
        setMegError(error.response.data.message);
      });
  };

  return (
    <div className="container">
      <h3>Registrarse</h3>

      <div className="alert alert-success" role="alert">
        {msgEstado}
      </div>
      <div className="alert alert-danger" role="alert">
        {msgError}
      </div>

      <form className="row  justify-content-center" onSubmit={store}>
        <div className="col-12 col-md-10">
          <div className="row align-items-center">
            <div className="col-12 col-md-6">
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

              <div className="mb-3">
                <label className="form-label ">Nombre(s) real(es)</label>
                <input
                  value={Nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="row align-items-end">
                <div className="form-group col-md-6">
                  <label className="form-label">Apellido Paterno</label>
                  <input
                    value={ApellidoPaterno}
                    onChange={(e) => setApellidoPaterno(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="form-label">Apellido Materno</label>
                  <input
                    value={ApellidoMaterno}
                    onChange={(e) => setApellidoMaterno(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row align-items-end">
                <div className="form-group col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Ej. ejemplo@correo.com"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="form-label">Celular</label>
                  <input
                    value={Telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    type="number"
                    placeholder="Ej: 55 1234 56789"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Perfil de Fb</label>
                <input
                  value={PerfilFB}
                  onChange={(e) => setPerfilFB(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Ej: fb.com/alguien"
                />
              </div>

              <div className="row align-items-end">
                <div className="form-group col-md-6">
                  <label className="form-label">Estado</label>
                  <select
                    name="Estado"
                    className="form-select"
                    onChange={(e) => {
                      setEstado(e.target.value);
                    }}
                  >
                    <option value="34"> Seleccione un estado.. </option>
                    {estados.map((edo) => (
                      <option key={edo.id} value={edo.id}>
                        {" "}
                        {edo.Estado}{" "}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group col-md-6">
                  <label className="form-label">Ciudad</label>
                  <input
                    value={Ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Fecha de Nacimiento</label>
                <input
                  value={FechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  type="date"
                  className="form-control"
                />
              </div>
            </div>

            {/* fin primer columna */}

            <div className="col-12 col-md-6">
              <div className="mb-3">
                <label className="form-label" value={ContarHistoria}>
                  <input
                    type="checkbox"
                    onClick={() => setContarHistoria(!ContarHistoria)}
                  ></input>
                  Quiero contar mi historia
                </label>
              </div>

              <div className="mb-3">
                <textarea
                  value={Descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  type="textarea"
                  className="form-control"
                  rows="15"
                  placeholder="Describa la situacion por la que requiere ayuda"
                  disabled={!ContarHistoria}
                  minLength={15}
                  maxLength={500}
                  onClick={() => {
                    setContarHistoria(true);
                    console.log("cambiandoestado");
                  }} /* no funcionapor que en disable se desactiva */
                  required
                />
              </div>

              <Link to="/politicas" className="h6 text-muted">Tus datos están seguros gracias a nuestra política de privacidad</Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <button type="submit" className="btn btn-primary">
            {" "}
            <i className="fa-solid fa-floppy-disk"></i>Guardar{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompRegistrarUsuario;
