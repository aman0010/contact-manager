import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/index';
import bookshelf from '../../src/db';

/**
 * Tests for '/api/signup'
 * Tests for '/api/signin'
 */
describe('Users Controller Test', () => {
  before((done) => {
    bookshelf
      .knex('users')
      .truncate()
      .then(() => done());
  });

  it('should create a new user with valid data', (done) => {
    const user = {
      email: 'test@test.com',
      password: 'test',
    };

    request(app)
      .post('/api/signup')
      .send(user)
      .end((err, res) => {
        const { data } = res.body;

        expect(res.status).to.be.equal(201);
        expect(data).to.be.an('object');
        expect(data).to.have.property('id');
        expect(data).to.have.property('email');
        expect(data).to.have.property('password');
        expect(data).to.have.property('created_at');
        expect(data).to.have.property('updated_at');
        expect(data.email).to.be.equal(user.email);

        done();
      });
  });

  it('should respond with bad request for empty JSON in request body', (done) => {
    const user = {};

    request(app)
      .post('/api/signup')
      .send(user)
      .end((err, res) => {
        const { code, message } = res.body.error;

        expect(res.status).to.be.equal(400);
        expect(code).to.be.equal(400);
        expect(message).to.be.equal('Empty JSON');

        done();
      });
  });

  it('should respond with "User already exists" if existing email provided', (done) => {
    const user = {
      email: 'test@test.com',
      password: 'test',
    };

    request(app)
      .post('/api/signup')
      .send(user)
      .end((err, res) => {
        const { code, message } = res.body.error;

        expect(res.status).to.be.equal(409);
        expect(code).to.be.equal(409);
        expect(message).to.be.equal('User already exists');

        done();
      });
  });

  it('should not create user if invalid email is provided', (done) => {
    const user = {
      email: 'test',
      password: 'test',
    };

    request(app)
      .post('/api/signup')
      .send(user)
      .end((err, res) => {
        const { code, message, details } = res.body.error;

        expect(res.status).to.be.equal(400);
        expect(code).to.be.equal(400);
        expect(message).to.be.equal('Bad Request');
        expect(details).to.be.an('array');
        expect(details[0]).to.have.property('message');
        expect(details[0]).to.have.property('param', 'email');

        done();
      });
  });

  it('should return login jwt token', (done) => {
    const user = {
      email: 'test@test.com',
      password: 'test',
    };

    request(app)
      .post('/api/signin')
      .send(user)
      .end((err, res) => {
        const { data } = res.body;

        expect(res.status).to.be.equal(200);
        expect(data).to.have.property('token');

        done();
      });
  });

  it('should return "Password did not match" if wrong password provided', (done) => {
    const user = {
      email: 'test@test.com',
      password: 'wrongpassword',
    };

    request(app)
      .post('/api/signin')
      .send(user)
      .end((err, res) => {
        const { code, message } = res.body.error;

        expect(res.status).to.be.equal(401);
        expect(code).to.be.equal(401);
        expect(message).to.be.equal('Password did not match');

        done();
      });
  });

  it('should return "User not found" if unregistered email provided', (done) => {
    const user = {
      email: 'unregistered@unregistered.com',
      password: 'wrongpassword',
    };

    request(app)
      .post('/api/signin')
      .send(user)
      .end((err, res) => {
        const { code, message } = res.body.error;

        expect(res.status).to.be.equal(401);
        expect(code).to.be.equal(401);
        expect(message).to.be.equal('User not found');

        done();
      });
  });
});
