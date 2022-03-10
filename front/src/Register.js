import React, { useState, useEffect } from "react";
import InputWithLabels from "./InputWithLabels";
import { Link } from 'react-router-dom';
import './Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Container, Row, Col, Button, Card } from 'react-bootstrap'

let errorMessageEmptyFirstName = "Du måste fylla i förnamn"
let errorMessageEmptySurName = "Du måste fylla i efternamn";
let errorMessageEmptyEmail = "Du måste fylla i email och den måste innehålla @ och .";
let errorMessageEmptyPassword = "Lösenordet måste fyllas i och måste innehålla minst en stor bokstav, en siffra samt vara minst 8 tecken långt";
let errorMessageRepeatPassword = "Lösenorden stämmer inte överens";

const validPassword = new RegExp('^(?=.*?[a-zA-Z])(?=.*?[0-9]).{8,}$');
const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

function Register() {
  const [firstnameReg, setFirstnameReg] = useState("lnfr");
  const [surnameReg, setSurnameReg] = useState("lnkrg");
  const [emailReg, setEmailReg] = useState("lnr@kjr.com");
  const [passwordReg, setPasswordReg] = useState("Katt2020");
  const [repeatPasswordReg, setRepeatPasswordReg] = useState("Katt2020");

  const [emptyFirstnameError, setEmptyFirstnameError] = useState("");
  const [emptySurnameError, setEmptySurnameError] = useState("");
  const [emptyEmailError, setEmptyEmailError] = useState("");
  const [emptyPasswordError, setEmptyPasswordError] = useState("");
  const [emptyRepeatPasswordError, setEmptyRepeatPasswordError] = useState("");
  const [successOrFailureMessage, setSuccessOrFailureMessage] = useState("");

  //const [token, setToken] = useState(null);

  function validate() {
    let valid = true;
    setEmptyFirstnameError("");
    setEmptySurnameError("");
    setEmptyEmailError("");
    setEmptyPasswordError("");
    setEmptyRepeatPasswordError("");
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
    if (passwordReg != repeatPasswordReg) {
      setEmptyRepeatPasswordError(errorMessageRepeatPassword);
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
      // const data = await response.json();
      console.log(response);

      if (!response.ok) {
        if (response.status === 406) {
          throw new Error("Den email du skrivit in är redan registrerad, välj en annan");
        } else {
          throw new Error("Något gick fel, försök igen senare")
        }
      }
      setSuccessOrFailureMessage("Du är nu registrerad, yay!")

    } catch (error) {
      console.log(error);
      setSuccessOrFailureMessage(error.message);
    }
  }

  function clickHandler(event) {
    event.preventDefault();
    let validInput = validate();
    if (validInput === true) {
      const inputData = {
        firstName: firstnameReg,
        surName: surnameReg,
        email: emailReg,
        password: passwordReg
      }
      sendInputToBackend(inputData);
      console.log(inputData);
      // setFirstnameReg("");
      // setSurnameReg("");
      // setEmailReg("");
      // setPasswordReg("");
    }
  }

  //TODO funktion med tre parametrar, en för firstnameReg en för funktionen för setPasswordRegError och en för errorMessageEmptyFirstName

  function inputValueHandler(event, inputField) {
    inputField(event.target.value.trim()); //TODO kan inte skriva mellanslag alls. Bra/dåligt? Lägg till på de övriga fälten
  }

  return (
    <Container>
      <Form onSubmit={clickHandler}>
        <Form.Group className="mb-3">
          <h1>Registrera dig här:</h1>
          <InputWithLabels
            label="E-mail: "
            name="email"
            value={emailReg}
            type="email"
            onChange={(e) => setEmailReg(e.target.value)}
          />
          <div className="errorMessageEmail">{emptyEmailError}</div>
          <Row>
            <Col>
              <InputWithLabels
                label="Förnamn: "
                name="firstName"
                value={firstnameReg}
                onChange={e => inputValueHandler(e, setFirstnameReg)}
              />
              <div>{emptyFirstnameError}</div>
            </Col>
            <Col>
              <InputWithLabels
                label="Efternamn: "
                name="surName"
                value={surnameReg}
                onChange={(e) => setSurnameReg(e.target.value)}
              />
              <div className="errorMessageSurName">{emptySurnameError}</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputWithLabels
                label="Lösenord: "
                name="password"
                value={passwordReg}
                onChange={(e) => setPasswordReg(e.target.value)}
              />
              <div className="errorMessagePassword">{emptyPasswordError}</div>
            </Col>
            <Col>
              <InputWithLabels
                label="Repetera lösenord: "
                name="repeatPassword"
                value={repeatPasswordReg}
                onChange={(e) => setRepeatPasswordReg(e.target.value)}
              />
              <div className="errorMessagePassword">{emptyRepeatPasswordError}</div>
            </Col>
          </Row>
          <br />
          <Button
            type="submit"
            className="btn"
          >Registrera</Button>
          <br />
          <p>Redan registrerat dig? <Link to='/login'>Logga in här!</Link> </p>
          <div>{successOrFailureMessage}</div>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default Register;

{/* lägg till variabler, skapa funktion för validering, skapa fält för felmeddelande, skapa post (som api-uppgiften)*/ }
