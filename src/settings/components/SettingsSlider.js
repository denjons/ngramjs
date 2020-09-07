import React, { useState } from "react";
import "./Settings.css";
import configurationEventSubject from "../../corpus/model/ConfigurationEventSubject";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function SettingsSlider({
  name,
  propertyName,
  label,
  minValue,
  maxValue,
  defaultValue,
}) {
  const [currentValue, setCurrentValue] = useState(defaultValue);

  const changeWordLength = (elm) => {
    var newValue = elm.target.value;
    if (newValue <= maxValue && newValue >= minValue) {
      setCurrentValue(newValue);
      configurationEventSubject.notify({
        property: propertyName,
        value: newValue,
      });
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="settings-slider-tooltip" {...props}>
      {label}: {currentValue}
    </Tooltip>
  );

  return (
    <div className="settings-slider-container col-12">
      <div className="settings-slider-container settings-label col-12">
        <label htmlFor={name}>{label}</label>
      </div>
      <div className="settings-slider-container col-12">
        <OverlayTrigger placement="top" overlay={renderTooltip}>
          <input
            className="settings-slider"
            name={"Settings" + name}
            id={name}
            type="range"
            value={currentValue}
            max={maxValue}
            min={minValue}
            onChange={changeWordLength}
          />
        </OverlayTrigger>
      </div>
    </div>
  );
}

export default SettingsSlider;
