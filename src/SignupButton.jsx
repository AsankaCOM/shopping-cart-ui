import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function SignupButton() {
  const {
    isAuthenticated,
    loginWithRedirect: login,
  } = useAuth0();

    const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });

  return !isAuthenticated && (
    <button onClick={signup}>Signup</button>
  );
}

export default SignupButton;