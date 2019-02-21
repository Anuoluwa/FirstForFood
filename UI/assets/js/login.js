const signin = document.querySelector('#signinform');
const name = document.querySelector('.username-login');
const pass = document.querySelector('.password-login');
const errorMsg = document.querySelector('#myMessage');

const userLogin = (e) => {
  e.preventDefault();
  const apiUrl = 'https://swiftfoodapp.herokuapp.com/api/v2/auth/login';
  const payload = {
    username: name.value,
    password: pass.value,
  };
  document.getElementById('loader').style.display = 'block';
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
      if (data.status === 'user details not found') {
        document.getElementById('message').style.display = 'block';
        document.getElementById('message').style.color = 'red';
        errorMsg.innerHTML = data.message;
      }
      if (data.status === 'operation not implemented') {
        document.getElementById('message').style.display = 'block';
        document.getElementById('message').style.color = 'red';
        errorMsg.innerHTML = data.message;
      }
      if (data.status === 'bad request') {
        document.getElementById('message').style.display = 'block';
        document.getElementById('message').style.color = 'red';
        errorMsg.innerHTML = data.message;
      }
      if (data.status === 'operation not successful' && data.status === 500) {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').style.display = 'block';
        errorMsg.innerHTML = data.message;
      }
      document.getElementById('loader').style.display = 'none';
      localStorage.setItem('Authorization', data.token);

      function jwtDecode(t) {
        const token = {};
        token.raw = t;
        token.header = JSON.parse(window.atob(t.split('.')[0]));
        token.payload = JSON.parse(window.atob(t.split('.')[1]));
        return (token);
      }

      const userToken = data.token;
      const decoded = jwtDecode(userToken);
      if (decoded.payload.admin === 'undefined' || decoded.payload.admin === 'false') {
        window.location.assign('userpage.html');
      } else {
        window.location.assign('assets/admin/adminpage.html');
      }
    });
};

signin.addEventListener('submit', userLogin);
