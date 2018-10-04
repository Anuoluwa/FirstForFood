const signin = document.querySelector('#signinform');
const name = document.querySelector('.username-login');
const pass = document.querySelector('.password-login');

const userLogin = (e) => {
  e.preventDefault();
  const apiUrl = 'https://swiftfood.herokuapp.com/api/v2/auth/login';
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
        window.location.assign('adminpage.html');
      }
    });
};

signin.addEventListener('submit', userLogin);
