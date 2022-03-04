import React from "react";

let errorMessageEmptyFirstName = "Du måste fylla i förnamn"
let errorMessageEmptySurName = "Du måste fylla i efternamn";
let errorMessageEmptyEmail = "Du måste fylla i email";
let errorMessageEmptyPassword = "Du måste fylla i lösenord";

let error = "";

function Register() {
  const [firstnameReg, setFirstnameReg] = useState("");
  const [surnameReg, setSurnameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  function validate() {
    if (firstnameReg == "") {
      error = errorMessageEmptyFirstName;
    }
    if (surnameReg == "") {
      error = errorMessageEmptySurName;
    }
    if (emailReg == "") {
      error = errorMessageEmptyEmail;
    }
    if (passwordReg == "") {
      error = errorMessageEmptyPassword;
    }
  }
}
// function InputWithLabels(props) {
//   let type = "text";
//   if (props.type) {
//     type = props.type;
//   }
//   let errorMessage = "";
//   if (props.errorMessage) {
//     errorMessage = props.errorMessage;
//   }
//   return (
//     <div>
//       <label htmlFor="{props.name}">{props.label}</label>
//       <input
//         value={props.value}
//         type={type}
//         name="{props.name}"
//         onChange={props.onChange}
//         errorMessage={errorMessage}
//       />
//       <div>{props.errorMessage}</div>
//     </div>
//   )
// }

export default functions;
