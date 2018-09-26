import chai from 'chai';
import request from 'supertest';
import app from '../../../../server';

const { expect } = chai;

describe('Test suite for menu controller', () => {
  describe(' POST /api/v2/menu', () => {
    it('should return succcess status code when a menu is created', (done) => {
      request(app)
        .post('/api/v2/menu/')
        .send({
          foodName: 'Jollof rice and chicken',
          foodDescr: 'Nigerian jollof with African cusine',
          price: '$456',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err) => {
          expect(201);
          if (err) return done(err);
          done();
        });
    });
    it('should responds with json', (done) => {
      request(app)
        .post('/apv2/menu')
        .send({
          foodName: 'Fried rice and chicken',
          foodDescr: 'Nigerian fried with African taste',
          price: '$456',
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end((err) => {
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
          foodName: 'spicy chicken burger',
          foodDescr: 'Nigerian African taste chicken',
          price: '$456',
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
          foodName: 'White rice  and chicken',
          foodDescr: 'with Nigerian peppered beef',
          price: '$456',
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.not.equal(null);
          expect(res.body.status).to.not.equal(null);
          expect(res.body.menu).to.not.equal(null);
          done();
        });
    });
  });
});
