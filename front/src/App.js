import React from "react";
import Register from "./Register";
import Login from "./Login";
import ProfilePage from "./Profilepage";
import { Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card } from 'react-bootstrap';
import './App.css';


function App() {
  return (
    <Container className="container">
      <Card className="form">
        <Route path='/' exact>
          <Redirect to='/reg' />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/reg">
          <Register />
        </Route>
        <Route path="/profilepage">
          <ProfilePage />
        </Route>
      </Card>
    </Container>
  )
}

export default App;
