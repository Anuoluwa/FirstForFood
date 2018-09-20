import chai from 'chai';
import request from 'supertest';
import app from '../../../../server';

const { expect } = chai;

describe('Test suite for authentication controller', () => {
  describe('Create user account --sign up /auth/signup', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'johndoe',
          email: 'johndoe@gmail.com',
          password: 'johndoe',
        })
        .expect(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('message');
      expect(res.body.message).to.equal('User created successfully');
      expect(res.body.data).to.have.a.property('username');
      expect(res.body.data).to.have.a.property('email');
      expect(res.body.data).to.have.a.property('token');
    });
    it('should not create account if the user already exists', async () => {
      const res = await request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'johndoe',
          email: 'johndoe@gmail.com',
          password: 'johndoe',
        })
        .expect(409);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.a.property('message');
      expect(res.body.message).to.equal('User already exists');
    });
    it('should not create account if the required fields are undefined', async () => {
      const res = await request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send({
          username: undefined,
          email: undefined,
          password: undefined,
        })
        .expect(400);
      expect(res.body).to.have.a.property('message');
      expect(res.body).to.have.a.property('status');
      expect(res.body.status).to.equal('400');
      expect(res.body.message).to.equal('Please  all fields are required');
    });
    it('should not create account if the username field is empty', async () => {
      const res = await request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send({
          username: '',
          email: 'johndoe@gmail.com',
          password: 'johndoe',
        })
        .expect(400);
      expect(res.body).to.have.a.property('message');
      expect(res.body).to.have.a.property('status');
      expect(res.body.status).to.equal('bad request');
      expect(res.body.message).to.equal('username is required');
    });
    it('should not create account if the email field is empty', async () => {
      const res = await request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'johndoe',
          email: '',
          password: 'johndoe',
        })
        .expect(400);
      expect(res.body).to.have.a.property('message');
      expect(res.body).to.have.a.property('status');
      expect(res.body.status).to.equal('bad request');
      expect(res.body.message).to.equal('email is required');
    });
    it('should not create account if the password field is empty', async () => {
      const res = await request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'johndoe',
          email: 'johndoe@gmail.com',
          password: '',
        })
        .expect(400);
      expect(res.body).to.have.a.property('message');
      expect(res.body).to.have.a.property('status');
      expect(res.body.status).to.equal('fail');
      expect(res.body.message).to.equal('password is required');
    });
    it('should not create account if the email format is invalid', async () => {
      const res = await request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'johndoe',
          email: 'johndoe@gmail',
          password: 'johndoe',
        })
        .expect(400);
      expect(res.body).to.have.a.property('message');
      expect(res.body).to.have.a.property('status');
      expect(res.body.status).to.equal('bad request');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('email format is invalid');
    });
    it('should not create account if the the provided password is not greater than 5', async () => {
      const res = await request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send({
          username: 'johndoe',
          email: 'johndoe@gmail.com',
          password: 'john',
        })
        .expect(400);
      expect(res.body).to.have.a.property('message');
      expect(res.body).to.have.a.property('status');
      expect(res.body.status).to.equal('bad request');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('password must be greater than 5');
    });
  });
  describe('Create/ login user account', () => {
    it('should not sign in an unregistered user', async () => {
      const res = await request(app)
        .post('/api/v2/auth/login')
        .set('Accept', 'application/json')
        .send({
          email: 'johndo@gmail.com',
          password: 'johndo',
        })
        .expect(400);
      expect(res.body).to.have.a.property('message');
      expect(res.body).to.have.a.property('status');
      expect(res.body.status).to.equal('bad request');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('Invalid username or password');
    });
    it('should not sign in a user with a wrong password', async () => {
      const res = await request(app)
        .post('/api/v2/auth/login')
        .set('Accept', 'application/json')
        .send({
          email: 'johndoe@gmail.com',
          password: 'johndod',
        })
        .expect(400);
      expect(res.body).to.have.a.property('message');
      expect(res.body).to.have.a.property('status');
      expect(res.body.status).to.equal('bad request');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('password mismatch');
    });
    it('should sign in a user if the right fields are provided', async () => {
      const res = await request(app)
        .post('/api/v2/auth/login')
        .set('Accept', 'application/json')
        .send({
          email: 'johndoe@gmail.com',
          password: 'johndoe',
        })
        .expect(200);
      expect(res.body).to.have.a.property('message');
      expect(res.body).to.have.a.property('status');
      expect(res.body.status).to.equal('success');
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('login successful');
    });
  });
});
