import React from "react";
import successIcon from "../../../images/isSuccessTrue.png";
import errorIcon from "../../../images/isSuccessFalse.png";

function InfoTooltip({ isSuccess }) {
  return (
    <div className="info-tooltip-content">
      <img
        src={isSuccess ? successIcon : errorIcon}
        alt="ícono de estado"
        className="info-tooltip__icon"
      />
      <p className="info-tooltip__message">
        {isSuccess
          ? "¡Correcto! Ya estás registrado."
          : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
      </p>
    </div>
  );
}

export default InfoTooltip;