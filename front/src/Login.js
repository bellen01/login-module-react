import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col } from 'react-bootstrap';
import InputWithLabels from "./InputWithLabels";


const errorMessageEmptyEmail = "! Du måste fylla i email";
const errorMessageEmptyPassword = "! Du måste fylla i lösenord";


function Login() {
  const location = useLocation();
  const redirectToProfilePage = useHistory();

  const [regSuccessMessage, setRegSuccessMessage] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loginSuccessOrFailureMessage, setLoginSuccessOrFailureMessage] = useState("");


  useEffect(() => {
    if (location.state && location.state.success) {
      setRegSuccessMessage('Yay, du är registrerad! Logga in nedan');
    } else if (location.state && location.state.logout) {
      setRegSuccessMessage('Du är utloggad');
    }
  }, [location]);


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

      const data = await response.json();
      const loggedInUserName = data.firstName;

      redirectToProfilePage.push({
        pathname: '/profilepage',
        state: {
          loggedIn: true,
          loggedInUserName
        }
      });

    } catch (error) {
      console.log("Login failed", error);
      setLoginSuccessOrFailureMessage(error.message);
    }
  }

  function loginSubmitHandler(event) {
    event.preventDefault();

    const email = loginEmail.trim();
    const validInput = validate();

    if (validInput === true) {
      const loginData = {
        email: email,
        password: loginPassword
      }
      checkIfUserExist(loginData);
    }
  }

  return (
    <Form onSubmit={loginSubmitHandler}>
      <Form.Group className="mb-3">
        <div className="successMessage">{regSuccessMessage}</div>
        <h1>Logga in här:</h1>
        <Row>
          <Col md>
            <InputWithLabels
              type="email"
              placeholder="Email"
              value={loginEmail}
              name="email"
              onChange={(e) => setLoginEmail(e.target.value)}
              errorMessage={emailError}
            />
          </Col>
          <Col md>
            <InputWithLabels
              type="password"
              placeholder="Lösenord"
              value={loginPassword}
              name="password"
              onChange={(e) => setLoginPassword(e.target.value)}
              errorMessage={passwordError}
            />
          </Col>
        </Row>
        <button
          type="submit"
          className="btn"
        >Logga in</button>
        <div className="errorMessage-2">{loginSuccessOrFailureMessage}</div>
        <p className="registered-Not-registered">Inte registrerad ännu? <Link to='/reg'>Klicka här!</Link></p>
      </Form.Group>
    </Form>
  );
}

export default Login;
