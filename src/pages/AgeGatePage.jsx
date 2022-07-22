import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { logo } from "../assets";
import { urlAPI, ageLimit, today } from "../utilities/constants"

let age = 18

const AgeGatePage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [ dataError, setDataError ] = useState(false);
  const [ showMonth, setShowMonth ] = useState(false);

  const onSubmit = async (data) => {
    age = data.age !== undefined ? data.age : age
    if ( showMonth === false ){
      if ( today.getFullYear() - age === ageLimit ){
        setShowMonth(true)
        reset(data.month)
      }
      else {
        try {
          let response = await fetch(`${urlAPI}/ageGate/${age}/${ageLimit}`)
          let res = await response.json()
          if (res.passed === true) {
            if (data.remember === true) {
            localStorage.setItem("ageGatePassed", JSON.stringify(res.passed));
          }
          else {
            sessionStorage.setItem("ageGatePassed", JSON.stringify(res.passed));
          }
          setDataError(false)
          window.location = '/form';
          //navigateTo('/form')
          }
          else{
            setDataError(true)
            //window.location = 'https://www.youtube.com/'
          }
        }
        catch {
          console.log("No Funcion la API")
        }
      }
    }
    else {
      try {
        let response = await fetch(`${urlAPI}/ageGate/${age}-${data.month}/${ageLimit}`)
        let res = await response.json()
        if (res.passed === true) {
          if (data.remember === true) {
          localStorage.setItem("ageGatePassed", JSON.stringify(res.passed));
        }
        else {
          sessionStorage.setItem("ageGatePassed", JSON.stringify(res.passed));
        }
        setDataError(false)
        window.location = '/form';
        //navigateTo('/form')
        }
        else{
          setDataError(true)
          //window.location = 'https://www.youtube.com/'
        }
      }
      catch {
        console.log("No Funcion la API")
      }
    }
  }

  return (
    <div id="age-gate" className="Agegate">
      <div className="container centered">
        <img src={logo} className="logo"/>
        <div className="row">
          <div className="col-md-12">
            <h2 className="bt-inner">
            ¡Hola! Para continuar confirmanos que sos mayor de edad
            </h2>
            {showMonth === false ?
              <span>Ingresá tu año de nacimiento.</span> :
              <span>Ingresá tu mes de nacimiento.</span>
            }
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={handleSubmit(onSubmit)} className="agegate-form bt-inner" id="idFormAgeGate">
              <div
                className="row no-gutters gate-fields flex-nowrap"
                v-if="mode == 0"
              >
                { showMonth === false ?
                  <div className="form-group d-flex justify-content-center">
                    <input
                      {...register("age", { maxLength: 4 })}
                      type="tel"
                      className="form-control max-w-20"
                      placeholder="Año"
                    />
                  </div>
                  :
                  <div className="form-group d-flex justify-content-center">
                    <input
                      {...register("month", { maxLength: 2 })}
                      type="tel"
                      className="form-control max-w-20"
                      placeholder="Mes"
                    />
                  </div>
                }
              </div>
              { dataError === true ?
                <div className="text-center">
                  <span className="badge badge-danger mb-4">
                    <i className="fas fa-info-circle mr-2"></i>
                    La fecha ingresada es inválida
                  </span>
                </div>
              : null}
              <div className="row d-flex justify-content-center">
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      {...register("remember")}
                      type="checkbox"
                      className="custom-control-input"
                    />
                    <label className="custom-control-label one-line" for="remember">
                      Recordar mis datos.
                    </label>
                  </div>
                </div>
                <p>
                  *No selecciones esta opción si compartes esta computadora con
                  menores de edad.
                </p>
                <button type="submit" className="btn btn-primary max-w-20" form="idFormAgeGate">
                  INGRESÁ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgeGatePage;