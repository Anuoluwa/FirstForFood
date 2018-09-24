import chai from 'chai';
import request from 'supertest';
import app from '../../../../server';

const { expect } = chai;

describe('Test suite for authentication controller', () => {
  describe(' POST /auth/signup', () => {
    const newUser = {
      username: 'johndoe',
      email: 'johndoe@gmail.com',
      password: 'johndoe',
      phone: '07030099999',
      address: 'qwert asdf',
    };
    it('should return succcess without null', (done) => {
      request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send(newUser)
        .end((err, res) => {
          expect(200);
          expect('Content-Type', 'application/json');
          expect(res.status).to.not.eql(null);
          expect(res.body.message).to.not.equal(null);
          expect(res.body.username).to.not.equal(null);
          expect(res.body.email).to.not.equal(null);
          expect(res.body.phone).to.not.equal(null);
          expect(res.body.address).to.not.equal(null);
          done();
        });
    });
    it('should create a new user', (done) => {
      request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send(newUser)
        .expect(201)
        .end((err, res) => {
          expect('Content-Type', 'application/json');
          expect(res.body.message).to.equal('User created successfully');
          expect(res.body.data).to.value('token');
          expect(res.body.data).to.have.a.property('username');
          expect(res.body.data).to.have.a.property('email');
          expect(res.body.data).to.have.a.property('phone');
          expect(res.body.data).to.have.a.property('address');
        });
      done();
    });

    it('should not create account if the user already exists', (done) => {
      request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send(newUser)
        .expect(409)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('message');
          expect(res.body.message).to.equal('user already exists');
          expect(res.body).to.have.a.property('status');
          expect(res.body.status).to.equal('not successful');
        });
      done();
    });
    it('should not create account if the username field is empty', () => {
      request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send({
          username: undefined,
          email: 'johndoe@gmail.com',
          password: 'johndoe',
          phone: '07030000000',
          address: 'asdf ggggg',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('message');
        });
    });
    it('should not create account if the email field is empty', (done) => {
      request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'johndoe',
          email: '',
          password: 'johndoe',
          phone: 'qwerty asdf',
          address: '12345678900',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('message');
        });
      done();
    });
    it('should not create account if the password field is empty', (done) => {
      request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'johndoe',
          email: 'johndoe@gmail.com',
          password: '',
          phone: 'qwerty asdf',
          address: '12345678900',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('message');
        });
      done();
    });
    it('should not create account if the email format is invalid', (done) => {
      request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'johndoe',
          email: 'johndoe@gmail',
          password: 'johndoe',
          phone: 'qwerty asdf',
          address: '12345678900',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('message');
        });
      done();
    });
    it('should not create account if the password is not greater than 5', (done) => {
      request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'johndoe',
          email: 'johndoe@gmail.com',
          password: 'johnd',
          phone: 'qwerty asdf',
          address: '12345678900',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.a.property('message');
          expect(res.body).to.be.an('object');
        });
      done();
    });
  });
});
describe('Create/ login user account', () => {
  const user = {
    username: 'johndoe',
    email: 'johndoe@gmail.com',
    password: 'johndoe',
  };
  it('should not sign in an unregistered user', (done) => {
    request(app)
      .post('/api/v2/auth/login')
      .set('Accept', 'application/json')
      .send(user)
      .expect(404)
      .end((err, res) => {
        expect(res.body).to.have.a.property('message');
        expect(res.body).to.have.a.property('status');
        expect(res.body.status).to.equal('user details not found');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Invalid username or password');
      });
    done();
  });
  it('should not sign in a user with a wrong password', (done) => {
    request(app)
      .post('/api/v2/auth/login')
      .set('Accept', 'application/json')
      .send(user)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.a.property('message');
        expect(res.body).to.have.a.property('status');
        expect(res.body.status).to.equal('bad request');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('password mismatch');
      });
    done();
  });
  it('should sign in a user if the valid input', (done) => {
    request(app)
      .post('/api/v2/auth/login')
      .set('Accept', 'application/json')
      .send(user)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.a.property('message');
        expect(res.body).to.have.a.property('status');
        expect(res.body.status).to.equal('operation successful');
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('login successful');
      });
    done();
  });
});
