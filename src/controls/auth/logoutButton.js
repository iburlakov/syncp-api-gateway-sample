import React from 'react';

import {useAuth} from '../../components/authContext';

export default function LogoutButton () {
  const {setToken} = useAuth ();

  function logoutClicked () {
    setToken();

    return false;
  }

  return ( 
    <a className='btn btn-outline-primary' onClick={logoutClicked} href='#'>logout</a>
  );
}
