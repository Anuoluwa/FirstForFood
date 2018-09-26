import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import app from '../../../../server';

chai.use(chaiHttp);
chai.should();
const { expect } = chai;

let access;
let userToken;

const userCredentials = {
  username: 'egghead',
  email: 'egghead@gmail.com',
  password: 'garyTheSnail',
  phone: '09087654432',
  address: 'qwerty asdf ',
  admin: 'true',
};
const user = {
  username: 'johndoeer',
  email: 'johndoee4@gmail.com',
  password: 'johndoee',
};

describe('signup user', () => {
  it(' signup user', (done) => {
    request(app)
      .post('/api/v2/auth/signup')
      .send(userCredentials)
      .end((err, res) => {
        console.log('bodycheck', res.body);
        access = res.body.data.token;
        console.log('ACCESS', access);
        done();
      });
  });
  it('login user', (done) => {
    request(app)
      .post('/api/v2/auth/login')
      .send(user)
      .end((err, res) => {
        console.log('bodycheck', res.body);
        userToken = res.body.data.token;
        userToken = res.body.data.token;
        console.log('ACCESS LOGin', userToken);
        done();
      });
  });
});
