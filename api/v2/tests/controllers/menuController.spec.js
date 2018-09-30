import chai from 'chai';
import request from 'supertest';
import app from '../../../../server';

const { expect } = chai;

const faketoken = 'qwertyuioplkjjdhdhhdhdhhd';

before((done) => {
  request(app)
    .post('/api/v2/auth/login')
    .send({
      username: 'testadmin',
      password: 'testadmin',
    })
    .end((err, res) => {
      global.token = res.body.data.token;
      done();
    });
});
describe('Test suite for menu controller', () => {
  describe(' POST /api/v2/menu', () => {
    it('should return error for undefined header and token', (done) => {
      request(app)
        .post('/api/v2/menu')
        .send({
          foodName: 'Fried rice and chicken',
          foodDescr: 'Nigerian fried with African taste',
          price: '$456',
        })
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.equal('Headers key: "Authorization" and "token XXXXXXXXX" should be valid');
          done();
        });
    });
    it('should return error for empty token', (done) => {
      request(app)
        .post('/api/v2/menu')
        .set({ Authorization: '' })
        .send({
          foodName: 'Jollof rice and chicken',
          foodDescr: 'Jollof with African taste',
          price: '$456',
        })
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.message).to.equal('Headers key: "Authorization" and "token XXXXXXXXX" should not be empty');
          done();
        });
    });
    it('should return reject fake token', (done) => {
      request(app)
        .post('/api/v2/menu')
        .set({ Authorization: `token ${faketoken}` })
        .send({
          foodName: 'Fried rice and chicken',
          foodDescr: 'Nigerian fried with African taste',
          price: '$456',
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
          foodName: 'Fried rice and chicken',
          foodDescr: 'Nigerian fried with African taste',
          price: '456',
        })
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body.status).to.equal('operation not successful');
          expect(res.body.message).to.equal('Headers key: "Authorization" and "token XXXXXXXXX" should not be empty');
          done();
        });
    });
    it('should return success for new order', (done) => {
      request(app)
        .post('/api/v2/menu')
        .set({ Authorization: `token ${global.token}` })
        .send({
          foodName: 'Peppepr soup Chicken',
          foodDescr: 'Nigerian dishes',
          price: '456',
        })
        .end((err, res) => {
          expect(res.status).to.eql(201);
          expect(res.body.status).to.equal('operation successful');
          expect(res.body.message).to.equal('Menu created successfully');
          done();
        });
    });
  });
  describe(' GET /api/v2/menu', () => {
    it('should return all menu', (done) => {
      request(app)
        .get('/api/v2/menu')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.not.equal(null);
          expect(res.body.message).to.not.equal(null);
          done();
        });
    });
    it('should return all menu', (done) => {
      request(app)
        .get('/api/v2/menu')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal('operation successful');
          expect(res.body.message).to.equal('these are the available menu in our restaurant');
          done();
        });
    });
    it('should return all menu', (done) => {
      request(app)
        .get('/api/v2/menu')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('menu');
          expect(res.body.menu).to.be.an('array');
          done();
        });
    });
  });
});
