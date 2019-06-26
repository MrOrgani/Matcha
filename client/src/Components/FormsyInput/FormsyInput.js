import { withFormsy } from "formsy-react";
import React from "react";

function FormsyInput(props) {
  function changeValue(envent) {
    props.setValue(event.currentTarget.value);
  }

  const errorMessage = props.getErrorMessage();

  return (
    <div>
      <input
        onChange={changeValue}
        type="text"
        value={props.getValue() || ""}
      />
      <span>{errorMessage}</span>
    </div>
  );
}

export default withFormsy(FormsyInput);
