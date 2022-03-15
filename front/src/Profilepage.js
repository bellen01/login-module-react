import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Redirect, useHistory } from 'react-router-dom';

function ProfilePage(props) {

  const redirectToLogin = useHistory();

  const [welcomeMessage, setWelcomeMessage] = useState('');
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.loggedIn) {
      setWelcomeMessage(`Välkommen ${location.state.loggedInUserName}!`)
    }
  }, [location]);

  function logoutHandler() {
    redirectToLogin.push(
      {
        pathname: '/loggedout',
        state: { logout: true }
      });
  }

  if (location.state && location.state.loggedIn) {
    return (
      <Container className="container">
        <Card className="form">
          <h1>{welcomeMessage}</h1>
          <button
            type="button"
            className="btn"
            onClick={logoutHandler}
          >Logga ut</button>
        </Card>
      </Container>
    );
  } else {
    return <Redirect to="/login" />
  }
}

export default ProfilePage;
