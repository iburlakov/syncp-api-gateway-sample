import React from 'react';

export default function LoginButton () {
  const url = `https://api.syncplicity.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_APP_ID}`;

  return <a href={url}>Login with syncplicity account</a>; // TODO: add syncp image
}
