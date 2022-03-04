import React, { useState, useEffect } from "react";
import InputWithLabels from "./InputWithLabels";

let errorMessageEmptyFirstName = "Du måste fylla i förnamn"
let errorMessageEmptySurName = "Du måste fylla i efternamn";
let errorMessageEmptyEmail = "Du måste fylla i email och den måste innehålla @ och .";
let errorMessageEmptyPassword = "Lösenordet måste fyllas i och måste innehålla minst en stor bokstav, en siffra samt vara minst 8 tecken långt";

const validPassword = new RegExp('^(?=.*?[a-zA-Z])(?=.*?[0-9]).{8,}$');
const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

function Register() {
  const [firstnameReg, setFirstnameReg] = useState("");
  const [surnameReg, setSurnameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [emptyFirstnameError, setEmptyFirstnameError] = useState("");
  const [emptySurnameError, setEmptySurnameError] = useState("");
  const [emptyEmailError, setEmptyEmailError] = useState("");
  const [emptyPasswordError, setEmptyPasswordError] = useState("");

  const [token, setToken] = useState(null);

  function validate() {
    let valid = true;
    setEmptyFirstnameError("");
    setEmptySurnameError("");
    setEmptyEmailError("");
    setEmptyPasswordError("");
    if (firstnameReg == "") {
      setEmptyFirstnameError(errorMessageEmptyFirstName);
      valid = false;
    }
    if (surnameReg == "") {
      setEmptySurnameError(errorMessageEmptySurName);
      valid = false;
    }
    if (!validEmail.test(emailReg)) {
      setEmptyEmailError(errorMessageEmptyEmail);
      valid = false;
    }
    if (!validPassword.test(passwordReg)) {
      setEmptyPasswordError(errorMessageEmptyPassword);
      valid = false;
    }
    console.log(valid);
    return valid;
  }



  function sendInputToBackend() {
    fetch('localhost:3000/reg', {
      method: 'POST',
    });
  }

  function clickHandler(event) {
    event.preventDefault();
    let validInput = validate();
    if (validInput === true) {

    }
  }

  // funktion med tre parametrar, en för firstnameReg en för funktionen för setPasswordRegError och en för errorMessageEmptyFirstName

  function inputValueHandler(event, inputField) {
    inputField(event.target.value);
  }

  return (
    <div className="App">
      <div className="registration">
        <h1>Registrera dig här:</h1>
        <InputWithLabels
          label="Förnamn: "
          name="firstName"
          value={firstnameReg}
          onChange={e => inputValueHandler(e, setFirstnameReg)}
        />
        <div>{emptyFirstnameError}</div>
        <br />
        <InputWithLabels
          label="Efternamn: "
          name="surName"
          value={surnameReg}
          onChange={(e) => setSurnameReg(e.target.value)}
        />
        <div className="errorMessageSurName">{emptySurnameError}</div>
        <br />
        <InputWithLabels
          label="e-mail: "
          name="email"
          value={emailReg}
          type="email"
          onChange={(e) => setEmailReg(e.target.value)}
        />
        <div className="errorMessageEmail">{emptyEmailError}</div>
        <br />
        <InputWithLabels
          label="Lösenord: "
          name="password"
          value={passwordReg}
          onChange={(e) => setPasswordReg(e.target.value)}
        />
        <div className="errorMessagePassword">{emptyPasswordError}</div>
        <br />
        <button
          type="button"
          className="btn"
          onClick={clickHandler}
        >Registrera</button> {/* lägg till onclick med funktion till validering */}
      </div>
    </div>
  );
}

export default Register;

{/* lägg till variabler, skapa funktion för validering, skapa fält för felmeddelande, skapa post (som api-uppgiften)*/ }
