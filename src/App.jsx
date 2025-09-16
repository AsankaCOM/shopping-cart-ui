import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Books from "./components/Books"
import Header from './components/Header';
import { CartContextProvider } from "./store/CartContext.jsx";
import Cart from "./components/Cart.jsx";
import UserProgressContext, { UserProgressContextProvider } from "./store/UserProgessContext.jsx";
import Checkout from "./components/Checkout.jsx";
import OrderConfirmation from "./components/OrderConfirmation.jsx";
import Error from "./components/Error.jsx";

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
        console.error(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  if (isLoading) {
    return <p className="center">Fetching user authentication data...</p>;
  }

   if (error) {
    return <Error title="User authentication error" message={error?.message} />;
  }

  const logoutHandler = () => {
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }

  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header
          isAuthenticated={isAuthenticated}
          user={user}
          login={() => { login() }}
          logout={logoutHandler}
          signup={() => login({ authorizationParams: { screen_hint: "signup" } })}
        />

        {accessToken &&
          <>
            <Books accessToken={accessToken} />
            <Cart />
            <Checkout accessToken={accessToken} />
            <OrderConfirmation />
          </>}

      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
