import React, { useState } from "react";

let errorMessageEmptyEmail = "Du måste fylla i email";
let errorMessageEmptyPassword = "Du måste fylla i lösenord";

function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


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
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      body: JSON.stringify(inputData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // const data = await response.json();
    console.log(response);
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
    <div className="App">
      <div className="login">
        <h1>Logga in här:</h1>
        <input
          type="email"
          placeholder="Email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <div>{emailError}</div>
        <br />
        <input
          type="password"
          placeholder="Lösenord"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <div>{passwordError}</div>
        <br />
        <button
          type="button"
          className="btn"
          onClick={loginSubmitHandler}
        >Logga in</button>
      </div>
    </div>
  );
}

export default Login;
