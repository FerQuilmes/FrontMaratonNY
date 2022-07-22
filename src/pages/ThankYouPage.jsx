import React, { useState } from "react";
import { logo } from "../assets";

const ThankYouPage = () => {

  return (
    <div id="thank-you" className="Agegate">
      <div className="container centered">
        <img src={logo} className="logo"/>
        <div className="row">
          <div className="col-md-12">
            <h2 className="bt-inner">
            ¡Gracias por participar!
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYouPage;