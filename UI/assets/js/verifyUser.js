// /* eslint no-undef:  0 */

// // check if bearer token exists in localStorage
// const bearer = window.localStorage.getItem('maintain-r-authorization');

// if (!bearer) {
//   window.location.replace('/');
// }

// // bearer exists. split and decode token
// const token = bearer.split(' ');
// const decoded = decodeJwt(token[1]);

// // check if token has expired
// if (decoded.exp < Date.now().valueOf() / 1000) {
//   window.localStorage.removeItem('maintain-r-authorization');
//   window.localStorage.removeItem('maintain-r-user');
//   window.location.replace('/');
// }

// // everything is good. save user object to localStorage
// window.localStorage.setItem('maintain-r-user', JSON.stringify(decoded));
