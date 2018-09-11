import { expect } from 'chai';
import request from 'supertest';
import app from '../../../../server';

describe('Test suite for Server ', () => {
  it("should return 'wlecome to LiteStack API v1!'", () => {
    request(app)
      .get('/api/v1/')
      .expect(200, 'Successful!, Welcome to SwiftFood API v1!')
      .expect('Content-Type', 'application/json');
  });

  it('should return "Entry point not found"', () => {
    request(app)
      .get('/api/v1/3')
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
describe('Test suite for orders endpoint controller', () => {
  describe('GET /orders, for all orders in the endpoint', () => {
    it('should return succcess without null', (done) => {
      request(app)
        .get('/api/v1/orders')
        .end((err, res) => {
          expect(res.status).to.not.eql(null);
          expect(res.body.id).to.not.equal(null);
          done();
        });
    });
    it('respond with object in json', (done) => {
      request(app)
        .get('/api/v1/orders')
        .set('Content-Type', 'application/json')
        .expect(200);
      done();
    });
    it('should return success for response', (done) => {
      request(app)
        .get('/api/v1/orders')
        .end((error, res) => {
          expect(res.status).to.eql(200);
          done();
        });
    });
  });
});
describe('GET /orders/:id', () => {
  it('should be an object with keys and values that are not null', (done) => {
    request(app)
      .get('/api/v1/orders/1')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.orderId).to.not.equal(null);
        expect(res.body.date).to.not.equal(null);
        expect(res.body.foodItem).to.not.equal(null);
        expect(res.body.quantity).to.not.equal(null);
        expect(res.body.price).to.not.equal(null);
        expect(res.body.address).to.not.equal(null);
        expect(res.body.customerDetails).to.not.equal(null);
        done();
      });
  });
  it('should be an object with keys and values', (done) => {
    request(app)
      .get('/api/v1/orders/1')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        done();
      });
  });
});
describe('POST /orders/, to post single order resource', () => {
  describe('POST /orders', () => {
    it('should responds with json', (done) => {
      request(app)
        .post('/orders')
        .send({
          orderId: 1,
          date: '2017-11-18 13:21:10',
          foodItem: 'Appetizer - Veg Assortment',
          quantity: 3,
          price: '$6.40',
          address: '153 Muir Crossing',
          customerDetails: [{}, {}],
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
          orderId: 1,
          date: '2017-11-18 13:21:10',
          foodItem: 'Appetizer - Veg Assortment',
          quantity: 3,
          price: '$6.40',
          address: '153 Muir Crossing',
          customerDetails: [{}, {}],
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
          orderId: 1,
          date: '2017-11-18 13:21:10',
          foodItem: 'Appetizer - Veg Assortment',
          quantity: 3,
          price: '$6.40',
          address: '153 Muir Crossing',
          customerDetails: [{}, {}],
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body.orderId).to.not.equal(null);
          expect(res.body.date).to.not.equal(null);
          expect(res.body.foodItem).to.not.equal(null);
          expect(res.body.quantity).to.not.equal(null);
          expect(res.body.price).to.not.equal(null);
          expect(res.body.address).to.not.equal(null);
          expect(res.body.customerDetails).to.not.equal(null);
          done();
        });
    });
  });
});
