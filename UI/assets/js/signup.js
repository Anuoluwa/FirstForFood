const signup = document.querySelector('#signupform');
const username = document.querySelector('.username');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const confirmPassword = document.querySelector('.confirm-password');
const passwordError = document.querySelector('#confirm-pass');
const phone = document.querySelector('.phone');
const address = document.querySelector('.address');
const message = document.querySelector('#myMessage');


const userSignUp = (e) => {
  e.preventDefault();
  console.log(password);
  if (String(password.value).trim() !== String(confirmPassword.value).trim()) {
    passwordError.textContent = 'Your password does not mismatch';
    return null;
  }
  const apiUrl = 'https://swiftfoodapp.herokuapp.com//api/v2/auth/signup';
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
      if (data.status === 'not successful') {
        document.getElementById('message').style.display = 'block';
        document.getElementById('message').style.color = 'red';
        message.innerHTML = data.message;
      }
      if (data.status === 'operation not implemented') {
        document.getElementById('message').style.display = 'block';
        document.getElementById('message').style.color = 'red';
        message.innerHTML = data.message;
      }
      if (data.status === 'operation not successful') {
        document.getElementById('message').style.display = 'block';
        document.getElementById('message').style.color = 'red';
        message.innerHTML = data.message;
      }
      if (data.status === 'operation not successful' && data.status === 500) {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').style.display = 'block';
        message.innerHTML = data.message;
      }
      document.getElementById('loader').style.display = 'block';
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
      document.getElementById('loader').style.display = 'none';
      if (decoded.payload.admin === 'undefined' || decoded.payload.admin === 'false') {
        window.location.assign('userpage.html');
      } else {
        window.location.assign('adminpage.html');
      }
    });
};
signup.addEventListener('submit', userSignUp);
