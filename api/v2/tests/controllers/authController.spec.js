import chai from 'chai';
import request from 'supertest';
import app from '../../../../server';

const { expect } = chai;

describe('Test suite for authentication controller', () => {
  describe('Test suite for Server ', () => {
    it("should return 'Welcome to SwiftFood API v2!'", () => {
      request(app)
        .get('/api/v2/')
        .expect(200, 'Successful!, Welcome to SwiftFood API v2!')
        .expect('Content-Type', 'application/json');
    });
    it('should return "Entry point not found"', () => {
      request(app)
        .get('/api/v5/')
        .expect(404, '{"message":"Entry point not Found"}')
        .expect('Content-Type', 'text/html');
    });
  });
  describe(' POST /auth/signup', () => {
    const newUser = {
      username: 'johndoe',
      email: 'johndoe@gmail.com',
      password: 'johndoe',
      phone: '07030099999',
      address: 'qwert asdf',
    };
    it('should return succcess status code', (done) => {
      request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send(newUser)
        .end((err, res) => {
          expect(res.status).to.eql(201);
        });
      done();
    });
    it('should create a new user', (done) => {
      request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send(newUser)
        .end((err, res) => {
          expect('Content-Type', 'application/json');
          expect(res.body.status).to.equal('operation successful');
          expect(res.body.message).to.equal('User created successfully');
          expect(res.body.data).to.value('token');
          expect(res.body.data).to.have.a.property('username');
          expect(res.body.data).to.have.a.property('email');
          expect(res.body.data).to.have.a.property('phone');
          expect(res.body.data).to.have.a.property('address');
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
      .get('/api/v2/auth/login')
      .set('Accept', 'application/json')
      .send({
        username: 'johnfoe',
        email: 'johndoe@gmail.com',
        password: 'johnfoe',
      })
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
  it('should return succcess status code', (done) => {
    request(app)
      .post('/api/v2/auth/login')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eql(200);
      });
    done();
  });
});
