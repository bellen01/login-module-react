import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

function ProfilePage(props) {

  const [welcomeMessage, setWelcomeMessage] = useState('');
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.loggedIn) {
      setWelcomeMessage(`Välkommen ${location.state.loggedInUserName}!`)
    }
  }, [location]);

  if (location.state && location.state.loggedIn) {
    return (
      <Container className="container">
        <Card className="form">
          <h1>{welcomeMessage}</h1>
          <button
            type="submit"
            className="btn">Logga ut</button>
        </Card>
      </Container>
    );
  } else {
    return <Redirect to="/login" />
  }
}

export default ProfilePage;
