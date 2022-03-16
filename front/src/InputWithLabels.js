import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'


function InputWithLabels(props) {
  let type = "text";
  if (props.type) {
    type = props.type;
  }

  return (
    <div>
      <Form.Control className="form-input"
        placeholder={props.placeholder}
        value={props.value}
        type={type}
        name="{props.name}"
        onChange={props.onChange}
      />
      <div className="errorMessage">{props.errorMessage}</div>
    </div>
  )
}

export default InputWithLabels;
