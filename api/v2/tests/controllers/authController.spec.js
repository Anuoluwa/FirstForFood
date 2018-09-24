import chai from 'chai';
import request from 'supertest';
import app from '../../../../server';

const { expect } = chai;

describe('Test suite for authentication controller', () => {
  describe('Test suite for Server ', () => {
    it("should return 'wlecome to LiteStack API v1!'", () => {
      request(app)
        .get('/api/v2/')
        .expect(200, 'Successful!, Welcome to SwiftFood API v2!')
        .expect('Content-Type', 'application/json');
    });
    it('should return "Entry point not found"', () => {
      request(app)
        .get('/api/v2/3')
        .expect(404, '{"message":"Entry point not Found"}')
        .expect('Content-Type', 'text/html');
    });
    it('should return "Welcome to the client side"', () => {
      request(app)
        .get('/')
        .expect(200, '{"message":"Welcome to SwiftFood API"}')
        .expect('Content-Type', 'application/json');
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
