import React from 'react';

import {useAuth} from '../components/authContext';

export default function LogoutButton () {
  const {setAuthTokens} = useAuth ();

  function logoutClicked () {
    setAuthTokens ();

    return false;
  }

  return (
    <a onClick={logoutClicked} href="">logout</a>
  );
}
