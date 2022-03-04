import React, { useState } from "react";
import './App.css';
// import InputWithLabels from "./InputWithLabels";
import Register from "./Register";
import Login from "./Login";

let login = false;

function App() {
  if (login === true) {
    return (
      <Login />
    );
  } else {
    return (
      <Register />
    );
  }
}

// function App() {
//   const [firstnameReg, setFirstnameReg] = useState("");
//   const [surnameReg, setSurnameReg] = useState("");
//   const [emailReg, setEmailReg] = useState("");
//   const [passwordReg, setPasswordReg] = useState("");

//   return (
//     <div className="App">
//       <div className="registration">
//         <h1>Registrera dig här:</h1>
//         <InputWithLabels label="Förnamn" name="firstName" value={firstnameReg} onChange={(e) => setFirstnameReg(e.target.value)} />
//         <br />
//         <InputWithLabels label="Efternamn" name="surName" value={surnameReg} onChange={(e) => setSurnameReg(e.target.value)} />
//         <br />
//         <InputWithLabels label="Lösenord" name="password" value={passwordReg} onChange={(e) => setPasswordReg(e.target.value)} />
//         <br />
//         <InputWithLabels label="e-mail" name="email" value={emailReg} type="email" onChange={(e) => setEmailReg(e.target.value)} />
//         <button type="button" className="btn">Registrera</button>
//       </div>

//       <div className="login">
//         <h1>Logga in här:</h1>
//         <input
//           type="email"
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           placeholder="Lösenord"
//         />
//         <button type="button" className="btn">Logga in</button>
//       </div>
//     </div>
//   );
// }

export default App;
