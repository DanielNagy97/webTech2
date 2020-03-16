//import React from 'react';
import cookie from 'js-cookie'

function Logout() {
    cookie.remove('usr_id');
    cookie.remove('token');
    console.log("Logged out!");
    window.location.reload();
  return null;
}

export default Logout;
