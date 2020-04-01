import React from 'react';

export default function LoginButton () {
  const url = `${process.env.REACT_APP_API_HOST}/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_APP_ID}`;

  return <a href={url}>Login with syncplicity account</a>; // TODO: add syncp image
}
