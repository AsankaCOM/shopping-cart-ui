import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import ProductCatolog from "./ProductCatolog"
import Header from './ui/components/Header';

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

  const [books, setBooks] = useState(null);

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

        const userDetailsByIdUrl = `http://localhost:3000/cart/books`;

        const booksResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const booklist = await booksResponse.json();

        setBooks(booklist);
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
    <>
      <Header
        isAuthenticated={isAuthenticated}
        user={user}
        login={loginHandler}
        logout={logoutHandler}
        signup={signupHandler}
      />

      {books && <ProductCatolog books={books} />}
    </>
  ) : (
    <>
      {error && <p>Error: {error.message}</p>}
    </>
  );

}

export default App;
