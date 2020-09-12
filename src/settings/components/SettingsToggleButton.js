import React, { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import configurationEventSubject from "../../corpus/model/ConfigurationEventSubject";

function SettingsToggleButton({
  name,
  propertyName,
  label,
  values,
  defaultValue,
}) {
  const [currentValue, setCurrentValue] = useState(defaultValue);

  const onChange = (elmValue) => {
    setCurrentValue(elmValue);
    configurationEventSubject.notify({
      property: propertyName,
      value: elmValue,
    });
  };

  return (
    <div className="settings-toggle-button-container col-12">
      <label htmlFor={name}>{label}</label>
      <ButtonGroup toggle className="settings-toggle-button">
        {values.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={name}
            type="radio"
            variant="secondary"
            name="radio"
            value={radio.value}
            checked={currentValue === radio.value}
            onChange={(e) => onChange(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </div>
  );
}

export default SettingsToggleButton;
