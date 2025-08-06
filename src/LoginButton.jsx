import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const {
    isAuthenticated,
    loginWithRedirect: login,
  } = useAuth0();

  return !isAuthenticated && (
    <button onClick={login}>Log in</button>
  );
}

export default LoginButton;