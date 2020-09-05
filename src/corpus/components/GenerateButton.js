import React from "react";
import "./GenerateButton.css";
import generateClickEventSubject from "../model/GenerateClickEventSubject";

function GenerateButton() {
  const onGenerateButtonClicked = (event) => {
    generateClickEventSubject.notify(event);
  };

  return (
    <button
      onClick={(e) => onGenerateButtonClicked(e)}
      className="button-generate button-generate col-12"
    >
      Generate
    </button>
  );
}

export default GenerateButton;
