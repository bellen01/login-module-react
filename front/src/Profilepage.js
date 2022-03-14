import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';

function ProfilePage(props) {

  const [welcomeMessage, setWelcomeMessage] = useState('');
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.loggedIn) {
      setWelcomeMessage(`Välkommen ${location.state.loggedInUserName}!`)
    }
  }, [location]);

  return (
    <Container className="container">
      <Card className="form">
        <h1>{welcomeMessage}</h1>
      </Card>
    </Container>
  );
}

export default ProfilePage;
