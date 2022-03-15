import React, { useState, useEffect } from "react";
import InputWithLabels from "./InputWithLabels";
import { Link, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Container, Row, Col, Card } from 'react-bootstrap'
import './Register.css';

let errorMessageFirstName = "Du måste fylla i förnamn"
let errorMessageLastName = "Du måste fylla i efternamn";
let errorMessageEmail = "Email måste innehålla @ och punkt";
let errorMessagePassword = "Lösenordet måste innehålla minst en stor bokstav, en siffra samt vara minst 8 tecken långt";
let errorMessageRepeatPassword = "Lösenorden stämmer inte överens";

const validPassword = new RegExp('^(?=.*?[a-zA-Z])(?=.*?[0-9]).{8,}$');
const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

function Register() {
  const [firstNameReg, setFirstNameReg] = useState("lnfr");
  const [lastNameReg, setLastNameReg] = useState("lnkrg");
  const [emailReg, setEmailReg] = useState("lnr@kjr.com");
  const [passwordReg, setPasswordReg] = useState("Katt2020");
  const [repeatPasswordReg, setRepeatPasswordReg] = useState("Katt2020");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");

  const [successOrFailureMessage, setSuccessOrFailureMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const redirectToLogin = useHistory();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  function validate(firstName, lastName, email) {
    let valid = true;
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setRepeatPasswordError("");
    if (firstName == "") {
      setFirstNameError(errorMessageFirstName);
      valid = false;
    }
    if (lastName == "") {
      setLastNameError(errorMessageLastName);
      valid = false;
    }
    if (!validEmail.test(email)) {
      setEmailError(errorMessageEmail);
      valid = false;
    }
    if (!validPassword.test(passwordReg)) {
      setPasswordError(errorMessagePassword);
      valid = false;
    }
    if (passwordReg != repeatPasswordReg) {
      setRepeatPasswordError(errorMessageRepeatPassword);
      valid = false;
    }
    console.log(valid);
    return valid;
  }



  async function sendInputToBackend(inputData) {
    try {
      const response = await fetch('http://localhost:3001/reg', {
        method: 'POST',
        body: JSON.stringify(inputData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(response);

      if (!response.ok) {
        if (response.status === 406) {
          throw new Error("Den email du skrivit in är redan registrerad, välj en annan");
        } else {
          throw new Error("Något gick fel, försök igen senare")
        }
      }
      redirectToLogin.push(
        {
          pathname: '/login',
          state: { success: true }
        });


    } catch (error) {
      console.log(error);
      setSuccessOrFailureMessage(error.message);
    }
  }

  function submitHandler(event) {
    const firstName = firstNameReg.trim();
    const lastName = lastNameReg.trim();
    const email = emailReg.trim();
    event.preventDefault();
    let validInput = validate(firstName, lastName, email);
    if (validInput === true) {
      const inputData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: passwordReg
      }
      sendInputToBackend(inputData);
      console.log(inputData);
      // setFirstNameReg("");
      // setLastNameReg("");
      // setEmailReg("");
      // setPasswordReg("");
    }
  }

  //TODO funktion med tre parametrar, en för firstnameReg en för funktionen för setPasswordRegError och en för errorMessageEmptyFirstName

  // function inputValueHandler(event, inputField) {
  //   inputField(event.target.value); //TODO Lägg till på de övriga fälten eller ta bort den helt
  // }

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3">
        <h1>Registrera dig här:</h1>
        <Row>
          <Col>
            <InputWithLabels
              placeholder="E-mail"
              name="email"
              value={emailReg}
              type="email"
              onChange={(e) => setEmailReg(e.target.value)}
            />
            <div className="errorMessage">{emailError}</div>
          </Col>
        </Row>
        <Row>
          <Col md>
            <InputWithLabels
              placeholder="Förnamn"
              name="firstName"
              value={firstNameReg}
              onChange={e => setFirstNameReg(e.target.value)}
            />
            <div className="errorMessage">{firstNameError}</div>
          </Col>
          <Col md>
            <InputWithLabels
              placeholder="Efternamn"
              name="lastName"
              value={lastNameReg}
              onChange={(e) => setLastNameReg(e.target.value)}
            />
            <div className="errorMessage">{lastNameError}</div>
          </Col>
        </Row>
        <Row>
          <Col md>
            <InputWithLabels
              placeholder="Lösenord"
              name="password"
              value={passwordReg}
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPasswordReg(e.target.value)}
            />
            <div className="errorMessage">{passwordError}</div>
          </Col>
          <Col md>
            <InputWithLabels
              placeholder="Upprepa lösenord"
              name="repeatPassword"
              value={repeatPasswordReg}
              type={showPassword ? "text" : "password"}
              onChange={(e) => setRepeatPasswordReg(e.target.value)}
            />
            <div className="errorMessage">{repeatPasswordError}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check className="checkbox"
              type="checkbox"
              id="show-password"
              label="Visa lösenord"
              onChange={toggleShowPassword}
            />
          </Col>
        </Row>
        <button
          type="submit"
          className="btn"
        >Registrera</button>
        <p className="already-registered">Redan registrerat dig? <Link to='/login'>Logga in här!</Link> </p>
        <div>{successOrFailureMessage}</div>
      </Form.Group>
    </Form>
  );
}

export default Register;

{/* lägg till variabler, skapa funktion för validering, skapa fält för felmeddelande, skapa post (som api-uppgiften)*/ }
