import React, { useState, useEffect } from "react";
import InputWithLabels from "./InputWithLabels";
import { Link, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Container, Row, Col, Button, Card } from 'react-bootstrap'
import './Register.css';

let errorMessageEmptyFirstName = "Du måste fylla i förnamn"
let errorMessageEmptySurName = "Du måste fylla i efternamn";
let errorMessageEmptyEmail = "Du måste fylla i email och den måste innehålla @ och .";
let errorMessageEmptyPassword = "Lösenordet måste fyllas i och måste innehålla minst en stor bokstav, en siffra samt vara minst 8 tecken långt";
let errorMessageRepeatPassword = "Lösenorden stämmer inte överens";

const validPassword = new RegExp('^(?=.*?[a-zA-Z])(?=.*?[0-9]).{8,}$');
const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

function Register() {
  const [firstNameReg, setFirstnameReg] = useState("lnfr");
  const [surNameReg, setSurnameReg] = useState("lnkrg");
  const [emailReg, setEmailReg] = useState("lnr@kjr.com");
  const [passwordReg, setPasswordReg] = useState("Katt2020");
  const [repeatPasswordReg, setRepeatPasswordReg] = useState("Katt2020");

  const [emptyFirstnameError, setEmptyFirstnameError] = useState("");
  const [emptySurnameError, setEmptySurnameError] = useState("");
  const [emptyEmailError, setEmptyEmailError] = useState("");
  const [emptyPasswordError, setEmptyPasswordError] = useState("");
  const [emptyRepeatPasswordError, setEmptyRepeatPasswordError] = useState("");
  const [successOrFailureMessage, setSuccessOrFailureMessage] = useState("");

  const redirectToLogin = useHistory();
  //const [token, setToken] = useState(null);

  function validate(firstName, surName, email) {
    let valid = true;
    setEmptyFirstnameError("");
    setEmptySurnameError("");
    setEmptyEmailError("");
    setEmptyPasswordError("");
    setEmptyRepeatPasswordError("");
    if (firstName == "") {
      setEmptyFirstnameError(errorMessageEmptyFirstName);
      valid = false;
    }
    if (surName == "") {
      setEmptySurnameError(errorMessageEmptySurName);
      valid = false;
    }
    if (!validEmail.test(email)) {
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
      redirectToLogin.push(
        {
          pathname: '/login',
          state: { success: true }
        });

      // setSuccessOrFailureMessage("Du är nu registrerad, yay!")

    } catch (error) {
      console.log(error);
      setSuccessOrFailureMessage(error.message);
    }
  }

  function clickHandler(event) {
    const firstName = firstNameReg.trim();
    const surName = surNameReg.trim();
    const email = emailReg.trim();
    event.preventDefault();
    let validInput = validate(firstName, surName, email);
    if (validInput === true) {
      const inputData = {
        firstName,
        surName: surName,
        email: email,
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
    inputField(event.target.value); //TODO Lägg till på de övriga fälten eller ta bort den helt
  }

  return (
    <Container className="container">
      <Card className="form">
        <Form onSubmit={clickHandler}>
          <Form.Group className="mb-3">
            <h1>Registrera dig här:</h1>
            <Row>
              <Col>
                <InputWithLabels
                  placeholder="E-mail"
                  label="E-mail: "
                  name="email"
                  value={emailReg}
                  type="email"
                  onChange={(e) => setEmailReg(e.target.value)}
                />
                <div className="errorMessageEmail">{emptyEmailError}</div>
              </Col>
            </Row>
            <Row>
              <Col>
                <InputWithLabels
                  placeholder="Förnamn"
                  label="Förnamn: "
                  name="firstName"
                  value={firstNameReg}
                  onChange={e => inputValueHandler(e, setFirstnameReg)}
                />
                <div>{emptyFirstnameError}</div>
              </Col>
              <Col>
                <InputWithLabels
                  placeholder="Efternamn"
                  label="Efternamn: "
                  name="surName"
                  value={surNameReg}
                  onChange={(e) => setSurnameReg(e.target.value)}
                />
                <div className="errorMessageSurName">{emptySurnameError}</div>
              </Col>
            </Row>
            <Row>
              <Col>
                <InputWithLabels
                  placeholder="Lösenord"
                  label="Lösenord: "
                  name="password"
                  value={passwordReg}
                  onChange={(e) => setPasswordReg(e.target.value)}
                />
                <div className="errorMessagePassword">{emptyPasswordError}</div>
              </Col>
              <Col>
                <InputWithLabels
                  placeholder="Upprepa lösenord"
                  label="Repetera lösenord: "
                  name="repeatPassword"
                  value={repeatPasswordReg}
                  onChange={(e) => setRepeatPasswordReg(e.target.value)}
                />
                <div className="errorMessagePassword">{emptyRepeatPasswordError}</div>
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
      </Card>
    </Container>
  );
}

export default Register;

{/* lägg till variabler, skapa funktion för validering, skapa fält för felmeddelande, skapa post (som api-uppgiften)*/ }
