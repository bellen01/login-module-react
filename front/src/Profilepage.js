import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';

function ProfilePage(props) {

  const [welcomeMessage, setWelcomeMessage] = useState('');
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.) {
      setWelcomeMessage('Välkommen!')
    }
  }, [location]);

  return (
    <Container>
      <Card>
        <h1>{setWelcomeMessage}</h1>
      </Card>
    </Container>
  );
}

// export default ProfilePage;
