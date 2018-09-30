import chai from 'chai';
import request from 'supertest';
import app from '../../../../server';

const { expect } = chai;

const faketoken = 'qwertyuioplkjjdhdhhdhdhhd';
let userToken;

before((done) => {
  request(app)
    .post('/api/v2/auth/signup')
    .send({
      username: 'johnpeter',
      email: 'johnpeter@gmail.com',
      password: 'johnjane',
      phone: '07012345678',
      address: 'qwert asdf',
    })
    .end((err, res) => {
      userToken = res.body.data.token;
      done();
    });
});
describe('Test suite for orders controller', () => {
  describe(' POST /api/v2/orders', () => {
    it('should return error for undefined header and token', (done) => {
      request(app)
        .post('/api/v2/menu')
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
        .post('/api/v2/menu')
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
        .post('/api/v2/menu')
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
});
