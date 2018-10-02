import chai from 'chai';
import request from 'supertest';
import app from '../../../../server';

const { expect } = chai;

const faketoken = 'qwertyuioplkjjdhdhhdhdhhd';
let userToken;
let adminToken;

describe('Test suite for orders controller', () => {
  describe(' POST /api/v2/orders', () => {
    before((done) => {
      request(app)
        .post('/api/v2/auth/signup')
        .send({
          username: 'johnpet',
          email: 'johnpet@gmail.com',
          password: 'johnpet',
          phone: '07012345678',
          address: 'qwert asdf',
        })
        .end((err, res) => {
          userToken = res.body.data.token;
          done();
        });
    });
    before((done) => {
      request(app)
        .post('/api/v2/auth/login')
        .send({
          username: 'johnpet',
          password: 'johnpet',
        })
        .end((err, res) => {
          userToken = res.body.data.token;
          done();
        });
    });
    it('should return error for undefined header and token', (done) => {
      request(app)
        .post('/api/v2/orders')
        .send({
          qty: '12',
          menuId: '1',
        })
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.equal('Headers key: "Authorization" and "token XXXXXXXXX" should be valid');
          done();
        });
    });
    it('should return reject fake token', (done) => {
      request(app)
        .post('/api/v2/orders')
        .set({ Authorization: `token ${faketoken}` })
        .send({
          qty: '12',
          menuId: '1',
        })
        .end((err, res) => {
          expect(res.status).to.eql(401);
          expect(res.body.auth).to.equal('unauthorized');
          expect(res.body.message).to.equal('Failed to authenticate token');
          done();
        });
    });
    it('should return error for empty token', (done) => {
      request(app)
        .post('/api/v2/orders')
        .set({ Authorization: '' })
        .send({
          qty: '10',
          menuId: '1',
        })
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.status).to.equal('operation not successful');
          expect(res.body.message).to.equal('Headers key: "Authorization" and "token XXXXXXXXX" should not be empty');
          done();
        });
    });
    it('should return error for undefined input for new user', (done) => {
      request(app)
        .post('/api/v2/orders')
        .set({ Authorization: `token ${userToken}` })
        .send({
          qty: undefined,
          menuId: '1',
        })
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.equal('"qty" must not be undefined!');
          done();
        });
    });
    it('should return error for undefined input for new order', (done) => {
      request(app)
        .post('/api/v2/orders')
        .set({ Authorization: `token ${userToken}` })
        .send({
          qty: '12',
          menuId: undefined,
        })
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.equal('"menuId" must not be undefined!');
          done();
        });
    });
    it('should return error for undefined input for new order', (done) => {
      request(app)
        .post('/api/v2/orders')
        .set({ Authorization: `token ${userToken}` })
        .send({
          qty: '',
          menuId: '1',
        })
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.equal('"qty" must be a string of minimum of 6 digits');
          done();
        });
    });
    it('should return error for undefined input for new order', (done) => {
      request(app)
        .post('/api/v2/orders')
        .set({ Authorization: `token ${userToken}` })
        .send({
          qty: '123',
          menuId: '',
        })
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.equal('"menuId" must be a string of numbers, no negative numbers');
          done();
        });
    });
    it('should return succcess status code when a orders is created', (done) => {
      request(app)
        .post('/api/v2/orders/')
        .set({ Authorization: `token ${userToken}` })
        .send({
          qty: '23',
          menuId: '1',
        })
        .end((err, res) => {
          expect(res.status).to.eql(201);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal('Order have been taken!');
          expect(res.err).to.be.not.eql(null);
          done();
        });
    });
  });


  describe('GET /orders, for all orders in the endpoint', () => {
    beforeEach((done) => {
      request(app)
        .post('/api/v2/auth/login')
        .send({
          username: 'testadmin',
          password: 'testadmin',
        })
        .end((err, res) => {
          adminToken = res.body.data.token;
          done();
        });
    });
    it('should return reject fake token', (done) => {
      request(app)
        .get('/api/v2/orders')
        .set({ Authorization: `token ${faketoken}` })
        .end((err, res) => {
          expect(res.status).to.eql(401);
          expect(res.body.auth).to.equal('unauthorized');
          expect(res.body.message).to.equal('Failed to authenticate token');
          done();
        });
    });
    it('should return error for empty token', (done) => {
      request(app)
        .get('/api/v2/orders')
        .set({ Authorization: '' })
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.status).to.equal('operation not successful');
          expect(res.body.message).to.equal('Headers key: "Authorization" and "token XXXXXXXXX" should not be empty');
          done();
        });
    });
    it('should return all orders with success message', (done) => {
      request(app)
        .get('/api/v2/orders')
        .set({ Authorization: `token ${adminToken}` })
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body.status).to.equal('operation successful');
          expect(res.body.message).to.equal('these are the current orders');
          done();
        });
    });
    it('should return all orders', (done) => {
      request(app)
        .get('/api/v2/orders')
        .set({ Authorization: `token ${adminToken}` })
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body).to.have.a.property('status');
          expect(res.body).to.have.a.property('message');
          expect(res.body).to.have.a.property('order');
          done();
        });
    });
    it('should return succcess without null', (done) => {
      request(app)
        .get('/api/v2/orders')
        .set({ Authorization: `token ${adminToken}` })
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.not.eql(null);
          expect(res.body.message).to.not.equal(null);
          done();
        });
    });
  });

  describe('GET /order/<orderId> get a specific order', () => {
    beforeEach((done) => {
      request(app)
        .post('/api/v2/auth/login')
        .send({
          username: 'testadmin',
          password: 'testadmin',
        })
        .end((err, res) => {
          adminToken = res.body.data.token;
          done();
        });
    });
    it('should return reject fake token', (done) => {
      request(app)
        .get('/api/v2/orders/1')
        .set({ Authorization: `token ${faketoken}` })
        .end((err, res) => {
          expect(res.status).to.eql(401);
          expect(res.body.auth).to.equal('unauthorized');
          expect(res.body.message).to.equal('Failed to authenticate token');
          done();
        });
    });
    it('should return error for empty token', (done) => {
      request(app)
        .get('/api/v2/orders/1')
        .set({ Authorization: '' })
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.status).to.equal('operation not successful');
          expect(res.body.message).to.equal('Headers key: "Authorization" and "token XXXXXXXXX" should not be empty');
          done();
        });
    });
    it('should return all orders with success message', (done) => {
      request(app)
        .get('/api/v2/orders/1')
        .set({ Authorization: `token ${adminToken}` })
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body.status).to.equal('successful');
          expect(res.body.message).to.equal('order details');
          done();
        });
    });
    it('should return one specific orders', (done) => {
      request(app)
        .get('/api/v2/orders/1')
        .set({ Authorization: `token ${adminToken}` })
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body).to.have.a.property('status');
          expect(res.body).to.have.a.property('message');
          expect(res.body).to.have.a.property('order');
          expect(res.body).to.have.a.property('userDetails');
          expect(res.body).to.have.a.property('menuIdDetails');
          done();
        });
    });
    it('should return order succcess without null', (done) => {
      request(app)
        .get('/api/v2/orders/1')
        .set({ Authorization: `token ${adminToken}` })
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.not.eql(null);
          expect(res.body.message).to.not.equal(null);
          done();
        });
    });
  });

  describe('GET /users/<userId>/orders get history of a particular user', () => {
    beforeEach((done) => {
      request(app)
        .post('/api/v2/auth/signup')
        .send({
          username: 'johnpeters',
          email: 'johnpeters@gmail.com',
          password: 'johnjanes',
          phone: '07012345678',
          address: 'qwert asdf',
        })
        .end((err, res) => {
          userToken = res.body.data.token;
          done();
        });
    });
    it('should return reject fake token', (done) => {
      request(app)
        .get('/api/v2/users/2/orders')
        .set({ Authorization: `token ${faketoken}` })
        .end((err, res) => {
          expect(res.status).to.deep.equals(401);
          expect(res.body.auth).to.equal('unauthorized');
          expect(res.body.message).to.equal('Failed to authenticate token');
          done();
        });
    });
  });
});
