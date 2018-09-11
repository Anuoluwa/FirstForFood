import { expect } from 'chai';
import request from 'supertest';
import app from '../../../server';

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
