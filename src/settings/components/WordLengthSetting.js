import React, { useState } from "react";
import "./Settings.css";
import configurationEventSubject from "../../corpus/model/ConfigurationEventSubject";

function WordLengthSetting() {
  const [wordLength, setWordLength] = useState("");

  const changeWordLength = (elm) => {
    var newValue = elm.target.value;
    if (newValue <= 20 && newValue >= 4) {
      setWordLength(newValue);
      configurationEventSubject.notify({
        property: "wordLength",
        value: newValue,
      });
    }
  };

  return (
    <input
      className="settings-word-length-slider"
      name="input-word-length"
      id="WordLengthSetting"
      type="range"
      value={wordLength}
      max="20"
      min="4"
      onChange={changeWordLength}
    />
  );
}

export default WordLengthSetting;
