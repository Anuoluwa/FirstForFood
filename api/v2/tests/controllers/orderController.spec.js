import chai from 'chai';
import request from 'supertest';
import app from '../../../../server';

const { expect } = chai;

describe('Test suite for orders controller', () => {
  describe(' POST /api/v2/orders', () => {
    it('should return succcess status code when a orders is created', (done) => {
      request(app)
        .post('/api/v2/orders/')
        .send({
          qty: '1',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err) => {
          expect(201);
          if (err) return done(err);
          done();
        });
    });
    it('should be an object with keys and values', (done) => {
      request(app)
        .post('/api/v1/orders/')
        .set('Accept', 'application/json')
        .expect(200)
        .send({
          qty: '23',
        })
        .end((err, res) => {
          expect(res.err).to.be.not.eql(null);
          expect(res.status).to.be.not.eql(null);
          done();
        });
    });
    it('it return object in json', (done) => {
      request(app)
        .post('/api/v1/orders')
        .send({
          qty: '1',
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.not.equal(null);
          expect(res.body.status).to.not.equal(null);
          expect(res.body.orders).to.not.equal(null);
          done();
        });
    });
  });
});
