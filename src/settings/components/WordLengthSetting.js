import React, { useState } from "react";
import "./Settings.css";
import configurationEventSubject from "../../corpus/model/ConfigurationEventSubject";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function WordLengthSetting() {
  const [wordLength, setWordLength] = useState(8);

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

  const renderTooltip = (props) => (
    <Tooltip id="settings-slider-tooltip" {...props}>
      Word length: {wordLength}
    </Tooltip>
  );

  return (
    <div className="col-12">
      <div className="settings-label col-12">
        <label htmlFor="WordLengthSetting">Word Length</label>
      </div>
      <div className="col-12">
        <OverlayTrigger placement="right" overlay={renderTooltip}>
          <input
            className="settings-slider"
            name="input-word-length"
            id="WordLengthSetting"
            type="range"
            value={wordLength}
            max="20"
            min="4"
            onChange={changeWordLength}
          />
        </OverlayTrigger>
      </div>
    </div>
  );
}

export default WordLengthSetting;
