import chai from 'chai';
import request from 'supertest';
import app from '../../../../server';

const { expect } = chai;

describe('Test suite for authentication controller', () => {
  describe('Test suite for Server ', () => {
    it("should return 'welcome message'", () => {
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
  describe(' POST /auth/signup test suite', () => {
    it('should return error for undefined input for new user', (done) => {
      request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send({
          username: undefined,
          email: 'adminn@gmail.com',
          password: 'adminn',
          phone: '12345678900',
          address: 'asdf qwerty',
        })
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.equal('"username" field must not be undefined');
          done();
        });
    });
    it('should return error for empty input for new user', (done) => {
      request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send({
          username: '',
          email: 'asdf@gmail.com',
          password: 'asdfghj',
          phone: '12345678909',
          address: 'asdfg hjkl',
        })
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.equal('"username" should not contain special characters, numbers and whitespace');
          done();
        });
    });
    it('should return succcess for a new user', (done) => {
      request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'johnjane',
          email: 'johnjane@gmail.com',
          password: 'johnjane',
          phone: '07012345678',
          address: 'qwert asdf',
        })
        .end((err, res) => {
          expect(res.status).to.eql(201);
          expect(res.body.status).to.equal('operation successful');
          expect(res.body.message).to.equal('Thank you!, your account was created succcessfully');
          expect(res.body.data).to.property('token');
          expect(res.body.data).to.have.a.property('username');
          expect(res.body.data).to.have.a.property('email');
          expect(res.body.data).to.have.a.property('phone');
          expect(res.body.data).to.have.a.property('address');
          done();
        });
    });
    it('should not signup a new user', (done) => {
      request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'johnjane',
          email: 'johnjane@gmail.com',
          password: 'johnjane',
          phone: '07012345678',
          address: 'qwert asdf',
        })
        .end((err, res) => {
          expect('Content-Type', 'application/json');
          expect(res.body.status).to.equal('not successful');
          expect(res.body.message).to.equal('user already exists');
          done();
        });
    });
  });
});
describe('/POST auth/login test suite', () => {
  it('should return error for undefined input for new user', (done) => {
    request(app)
      .post('/api/v2/auth/login')
      .set('Accept', 'application/json')
      .send({
        username: undefined,
        password: 'adminn',
      })
      .end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.message).to.equal('"username" field must not be undefined');
        done();
      });
  });
  it('should return error for empty input for login', (done) => {
    request(app)
      .post('/api/v2/auth/login')
      .set('Accept', 'application/json')
      .send({
        username: '',
        password: 'asdfghj',
      })
      .end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.message).to.equal('"username" should not contain special characters, numbers and whitespace');
        done();
      });
  });
  it('should return error for undefined input for new user', (done) => {
    request(app)
      .post('/api/v2/auth/login')
      .set('Accept', 'application/json')
      .send({
        username: 'asdfgjk',
        password: undefined,
      })
      .end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.message).to.equal('"password" field must not be undefined');
        done();
      });
  });
  it('should return error for empty input for login', (done) => {
    request(app)
      .post('/api/v2/auth/login')
      .set('Accept', 'application/json')
      .send({
        username: 'asdcvbk',
        password: '',
      })
      .end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.message).to.equal('"password" must be with minimum length of 6');
        done();
      });
  });
  it('should return succcess for a new user', (done) => {
    request(app)
      .post('/api/v2/auth/signup')
      .set('Accept', 'application/json')
      .send({
        username: 'johnlucas',
        email: 'johnkucas@gmail.com',
        password: 'johnlucas',
        phone: '07012345678',
        address: 'qwert asdf',
      })
      .end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body.status).to.equal('operation successful');
        expect(res.body.message).to.equal('Thank you!, your account was created succcessfully');
        expect(res.body.data).to.property('token');
        expect(res.body.data).to.have.a.property('username');
        expect(res.body.data).to.have.a.property('email');
        expect(res.body.data).to.have.a.property('phone');
        expect(res.body.data).to.have.a.property('address');
        done();
      });
  });
  it('should not login unregistered user', (done) => {
    request(app)
      .post('/api/v2/auth/login')
      .set('Accept', 'application/json')
      .send({
        username: 'johnfoe',
        password: 'johnfoe',
      })
      .expect(404)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body).to.have.a.property('status');
        expect(res.body.status).to.equal('user details not found');
        expect(res.body.message).to.equal('Invalid username or password!');
        done();
      });
  });
  it('should login a returning user', (done) => {
    request(app)
      .post('/api/v2/auth/login')
      .set('Accept', 'application/json')
      .send({
        username: 'johnlucas',
        password: 'johnlucas',
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body).to.have.a.property('status');
        expect(res.body.status).to.equal('operation successful');
        expect(res.body.message).to.equal('you are welcome, login successful');
        done();
      });
  });
  it('should not login a registered user with wrong password ', (done) => {
    request(app)
      .post('/api/v2/auth/login')
      .set('Accept', 'application/json')
      .send({
        username: 'johnlucas',
        password: 'johnluc',
      })
      .end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.a.property('message');
        expect(res.body).to.have.a.property('status');
        expect(res.body.status).to.equal('bad request');
        expect(res.body.message).to.equal('password mismatch');
        done();
      });
  });
});
