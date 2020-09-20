import React, { useEffect, useState } from "react";
import "./CorpusText.css";
import generateClickEventSubject from "../model/GenerateClickEventSubject";
import generateCorpusSubject from "../model/GenerateCorpusSubject";

function CorpusText({ value, placeholder, rows, cols }) {
  const [currentText, setCurrentText] = useState(value);

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
      placeholder={placeholder}
      className="corpus-text col-12"
      onChange={(e) => onChanged(e.target.value)}
      rows={rows}
      cols={cols}
      value={currentText}
    />
  );
}

export default CorpusText;
