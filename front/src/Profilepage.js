import React from "react";
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, useHistory } from 'react-router-dom';

function ProfilePage() {
  const redirectToLogin = useHistory();
  const location = useLocation();


  function logoutHandler() {
    redirectToLogin.push({
      pathname: '/login',
      state: { logout: true }
    });
  }

  if (location.state && location.state.loggedIn) {
    return (
      <div>
        <h1>Välkommen {location.state.loggedInUserName}!</h1>
        <button
          type="button"
          className="btn"
          onClick={logoutHandler}
        >Logga ut</button>
      </div>
    );
  } else {
    return <Redirect to="/login" />
  }
}

export default ProfilePage;
