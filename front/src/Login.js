import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Container, Row, Col, Card } from 'react-bootstrap';


let errorMessageEmptyEmail = "Du måste fylla i email";
let errorMessageEmptyPassword = "Du måste fylla i lösenord";

function Login(props) {

  const [regSuccessMessage, setRegSuccessMessage] = useState('');
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.success) {
      setRegSuccessMessage('Du är registrerad, logga in nedan')
    }
  }, [location]);


  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginSuccessOrFailureMessage, setLoginSuccessOrFailureMessage] = useState("");

  const redirectToProfilePage = useHistory();

  function validate() {
    let valid = true;
    setEmailError("");
    setPasswordError("");
    if (loginEmail == "") {
      setEmailError(errorMessageEmptyEmail);
      valid = false;
    }
    if (loginPassword == "") {
      setPasswordError(errorMessageEmptyPassword);
      valid = false;
    }
    console.log(valid);
    return valid;
  }


  async function checkIfUserExist(inputData) {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        body: JSON.stringify(inputData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Email eller lösenord är fel, vänligen försök igen");
        } else {
          throw new Error("Något gick fel, försök igen senare");
        }
      }
      setLoginSuccessOrFailureMessage("Login lyckades!")
      const data = await response.json();
      const loggedInUserName = data.firstName;
      console.log(loggedInUserName);

      redirectToProfilePage.push(
        {
          pathname: '/profilepage',
          state: {
            loggedIn: true,
            loggedInUserName
          }
        });

    } catch (error) {
      console.log(error);
      setLoginSuccessOrFailureMessage(error.message);

    }
  }

  function loginSubmitHandler(event) {
    event.preventDefault();
    let validInput = validate();
    if (validInput === true) {
      const loginData = {
        email: loginEmail,
        password: loginPassword
      }
      checkIfUserExist(loginData);
      console.log(loginData);
      // setLoginEmail("");
      // setLoginPassword("");
    }
  }

  return (
    <Container className="container">
      <Card className="form">
        <Form onSubmit={loginSubmitHandler}>
          <Form.Group className="mb-3">
            <div>{regSuccessMessage}</div>
            <h1>Logga in här:</h1>
            <Row>
              <Col>
                <Form.Control className="form-input"
                  type="email"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <div>{emailError}</div>
              </Col>
              <Col>
                <Form.Control className="form-input"
                  type="password"
                  placeholder="Lösenord"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <div>{passwordError}</div>
              </Col>
            </Row>
            <button
              type="submit"
              className="btn"
            >Logga in</button>
            <p>Inte registrerad ännu? <Link to='/reg'>Klicka här!</Link></p>
            <div>{loginSuccessOrFailureMessage}</div>
          </Form.Group>
        </Form>
      </Card>
    </Container>
  );
}

export default Login;
