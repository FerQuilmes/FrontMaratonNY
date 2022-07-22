import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { logo, imgFondo } from "../assets/index";
import { paraguayCities, urlAPI, porqueMichellob, cuandoConsumisCerveza } from "../utilities/constants"
// import './Form.css'

const Form = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log("data",data)
    setLoading(true);
    try {
      let response = await fetch(`${urlAPI}/form/maratonNY`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': '*/*'},
        body: JSON.stringify(data)
      })
      let res = await response.json()
      if (res.success === true) {
        console.log("res", res)
        setLoading(false);
        window.location = '/thankyou';
      }
      else{
        alert(`Hubo un error al cargar los datos`)
        setLoading(false);
      }
    }
    catch {
      setLoading(false);
      console.log("No Funcion la API")
    }
  }

  return (
    <div className="Form">
      <div class="container-fluid p-0">
        <div class="row">
          <div class="col-sm-6 form">
            <img src={logo} className="logo"/>
            <form onSubmit={handleSubmit(onSubmit)} className="row mt-2 mt-sm-0" id="idForm">
              <h2>Participá por ir a la Maratón de Nueva York.</h2>
              <div className="col-md-12">
                <div className="form-group">
                  <input
                    {...register("name", {required: true, maxLength: 80})}
                    type="text"
                    className="form-control"
                    placeholder="Nombre y Apellido"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <input
                    {...register("date", {required: true})}
                    type="text"
                    className="form-control"
                    placeholder="Fecha nacimiento (AAAA/MM/DD)"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <input
                    {...register("email", {required: true})}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <select
                    {...register("state", { required: true })}
                    type="text"
                    className="custom-select"
                    style={{ width: '-webkit-fill-available' }}
                  >
                    <option value="">Provincia</option>
                    {paraguayCities.map((x) => <option key={x.value} value={x.value}>{x.placeholder}</option>)}
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <select
                    {...register("city", { required: true })}
                    type="text"
                    className="custom-select"
                    style={{ width: '-webkit-fill-available' }}
                  >
                    <option value="">Localidad</option>
                    {paraguayCities.map((x) => <option key={x.value} value={x.value}>{x.placeholder}</option>)}
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <select
                    {...register("porqueMichellob", { required: true })}
                    type="text"
                    className="custom-select"
                    style={{ width: '-webkit-fill-available' }}
                  >
                    <option value="">¿Por qué elegís Michelob Ultra?</option>
                    {porqueMichellob.map((x) => <option key={x.value} value={x.value}>{x.placeholder}</option>)}
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <select
                    {...register("cuandoConsumisCerveza", { required: true })}
                    type="text"
                    className="custom-select"
                    style={{ width: '-webkit-fill-available' }}
                  >
                    <option value="">¿En qué ocasiones consumís Michelob Ultra?</option>
                    {cuandoConsumisCerveza.map((x) => <option key={x.value} value={x.value}>{x.placeholder}</option>)}
                  </select>
                </div>
              </div>
              <div className="col-md-12">
              <div className="custom-control custom-checkbox">
                  <input
                    {...register("accept", {required: true})}
                    type="checkbox"
                    className="custom-control-input"
                  />
                  <label className="custom-control-label" for="accept_tc">
                    He leído y aceptado {" "}
                    <a href="https://www.ab-inbev.com/" target="_blank">
                    Términos y Condiciones
                    </a>{" "}
                    ,{" "}
                    <a href="https://www.ab-inbev.com/" target="_blank">
                    Políticas de Privacidad 
                    </a>
                    y activaciones de marketing.
                  </label>
                </div>
              </div>
              <div className="col-md-12">
              <button type="submit" className="btn btn-primary mt-4" form="idForm" data-toggle="modal" data-target="#modal-registro">
                {loading === true ?
                  <>
                    <span>ENVIANDO</span>
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </>
                : <>PARTICIPAR</>}
              </button>
            </div>
            </form>
          </div>
          <div class="col-sm-6 p-0">
            <img src={imgFondo} className="imgFondo" />
          </div>
          
        </div>
      </div>
      
    </div>
  );
};

export default Form;