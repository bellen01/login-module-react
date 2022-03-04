import React from "react";

function Login() {
  return (
    <div className="App">
      <div className="login">
        <h1>Logga in här:</h1>
        <input
          type="email"
          placeholder="Email"
        />
        <input
          type="password"
          placeholder="Lösenord"
        />
        <button type="button" className="btn">Logga in</button>
      </div>
    </div>
  );
}

export default Login;
