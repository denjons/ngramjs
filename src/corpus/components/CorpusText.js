import React, { useEffect, useState } from "react";
import "./CorpusText.css";
import generateClickEventSubject from "../model/GenerateClickEventSubject";
import generateCorpusSubject from "../model/GenerateCorpusSubject";

function CorpusText() {
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    generateClickEventSubject.attach(onGenerateButtonClicked);
    return () => {
      generateClickEventSubject.detach(onGenerateButtonClicked);
    };
  });

  const onChanged = (text) => {
    setCurrentText(text);
  };

  const onGenerateButtonClicked = (event) => {
    if (currentText.length > 0) {
      generateCorpusSubject.notify(currentText);
    }
  };

  return (
    <textarea
      placeholder="Enter corpus text here ..."
      className="corpus-text col-12"
      onChange={(e) => onChanged(e.target.value)}
      rows="10"
      cols="50"
    />
  );
}

export default CorpusText;
