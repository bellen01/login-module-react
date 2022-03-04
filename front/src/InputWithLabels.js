import React from "react";

function InputWithLabels(props) {
  let type = "text";
  if (props.type) {
    type = props.type;
  }

  return (
    <div>
      <label htmlFor="{props.name}">{props.label}</label>
      <input
        value={props.value}
        type={type}
        name="{props.name}"
        onChange={props.onChange}
      />
      <div>{props.errorMessage}</div>
    </div>
  )
}

export default InputWithLabels;
