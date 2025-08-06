import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

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
  const [showCart, setshowCart] = useState(true);

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
  }, [getAccessTokenSilently, user?.sub, showCart]);

  const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });


  if (isLoading) return "Loading...";

  return isAuthenticated ? (
    <>
      <p>Logged in as {user.name}</p>

      <h1>User Profile</h1>
      <img src={user.picture} alt={user.name} />

      <pre>{JSON.stringify(user, null, 2)}</pre>

      <div>
        <h3>Books</h3>
        {books ? (
          <pre>{JSON.stringify(books, null, 2)}</pre>
        ) : (
          <p>No user metadata defined</p>
        )}
      </div>

      <button onClick={login}>show books</button>
      <button onClick={logout}>Logout</button>
    </>
  ) : (
    <>
      {error && <p>Error: {error.message}</p>}

      <button onClick={signup}>Signup</button>

      <button onClick={login}>Login</button>
    </>
  );
}

export default App;
