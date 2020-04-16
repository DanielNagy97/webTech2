import cookie from 'js-cookie'

function Logout() {
    cookie.remove('usr_id');
    cookie.remove('token');
    window.location.replace('/');
}

export default Logout;
