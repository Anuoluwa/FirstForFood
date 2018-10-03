const signup = document.querySelector('#signupform');
const username = document.querySelector('.username');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const phone = document.querySelector('.phone');
const address = document.querySelector('.address');

const userSignUp = (e) => {
  e.preventDefault();
  const apiUrl = 'http://localhost:4000/api/v2/auth/signup';
  const payload = {
    username: username.value,
    email: email.value,
    password: password.value,
    phone: phone.value,
    address: address.value,
  };
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(res => res.json())
    .then((data) => {
      localStorage.setItem('Authorization', data.data.token);

      function jwtDecode(t) {
        const token = {};
        token.raw = t;
        token.header = JSON.parse(window.atob(t.split('.')[0]));
        token.payload = JSON.parse(window.atob(t.split('.')[1]));
        return (token);
      }
      const userToken = data.data.token;
      const decoded = jwtDecode(userToken);
      if (decoded.payload.admin === 'undefined' || decoded.payload.admin === 'false') {
        window.location.assign('userpage.html');
      } else {
        window.location.assign('adminpage.html');
      }
    });
};
signup.addEventListener('submit', userSignUp);
