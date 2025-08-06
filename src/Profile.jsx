import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Profile() {
  const { user } = useAuth0();

  return (
    <>
      <div>Logged in as {user.name}</div>
      <img src={user.picture} alt={user.name} />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}

export default Profile;