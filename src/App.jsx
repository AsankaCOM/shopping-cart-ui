import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Books from "./components/Books"
import Header from './components/Header';
import { CartContextProvider } from "./store/CartContext.jsx";

function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect: login,
    logout: auth0Logout,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  const [accessToken, setAccessToken] = useState()

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = import.meta.env.VITE_AUTH0_DOMAIN

      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });

        setAccessToken(accessToken)
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  if (isLoading) return "Loading...";

  const loginHandler = () => { login() }
  const logoutHandler = () => {
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }
  const signupHandler = () => login({ authorizationParams: { screen_hint: "signup" } });

  return !error ? (
    <CartContextProvider>
      <Header
        isAuthenticated={isAuthenticated}
        user={user}
        login={loginHandler}
        logout={logoutHandler}
        signup={signupHandler}
      />
      {accessToken ? <Books accessToken={accessToken} /> : <div>Login required</div>}
    </CartContextProvider>
  ) : (
    <>
      {error && <p>Error: {error.message}</p>}
    </>
  );

}

export default App;
