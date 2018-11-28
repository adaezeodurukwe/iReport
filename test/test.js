// Tests for routes

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

// Get all endpoint
describe('GET API endpoint /api/v1/red-flags', () => {
    it('should return all incidents', (done) => {
        chai.request(app)
            .get('/api/v1/red-flags')
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status').to.be.a('number');
                expect(res.body).to.have.property('data').to.be.an('array');
                done();
            });
    });
});

// Get one endpoint
describe('GET API endpoint /api/v1/red-flags/<red-flag-id>', () => {
    it('should get one redflag', (done) => {
        chai.request(app)
            .get('/api/v1/red-flags/1')
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status').to.be.a('number');
                expect(res.body).to.have.property('data').to.be.an('object');
                done();
            });
    });
    it('should return false for invalid id', (done) => {
        chai.request(app)
            .get('/api/v1/red-flags/5')
            .then((res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status').to.be.a('number');
                expect(res.body).to.have.property('data').to.be.equal('Red-flag not found');
                done();
            });
    });
});

// Create incident endpoint
describe('POST API endpoint', () => {
    it('should create an incident', (done) => {
        chai.request(app)
            .post('/api/v1/red-flags')
            .send({
                author: 'Adaeze',
                type: 'intervention',
                location: 'Lat: 700, Long: 450',
                comment: 'description of incident',
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status').to.be.a('number');
                expect(res.body).to.have.property('data').to.be.an('array');
                expect(res.body.data[0]).to.have.property('id');
                expect(res.body.data[0]).to.have.property('message').to.be.equal('Created red-flag record');
                done();
            });
    });
    it('should not create an incident when field is missing', (done) => {
        chai.request(app)
            .post('/api/v1/red-flags')
            .send({
                createdBy: 'Adaeze',
                type: 'intervention',
                comment: 'description of incident',
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').to.be.equal('Missing field');
                done();
            });
    });
});

// Update location of red flag endpoint
describe('PATCH API endpoint /red-flags/<red-flag-id>/location', () => {
    it('should update location of red flag', (done) => {
        chai.request(app)
            .patch('/api/v1/red-flags/1/location')
            .send({
                location: 'Lat: 500, Long: 70',
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status').to.be.a('number');
                expect(res.body).to.have.property('data').to.be.an('array');
                expect(res.body.data[0]).to.have.property('id');
                expect(res.body.data[0]).to.have.property('message').to.be.equal('updated red-flag record\'s location');
                done();
            });
    });
    it('should return error for invalid record id', (done) => {
        chai.request(app)
            .patch('/api/v1/red-flags/5/location')
            .send({
                location: 'Lat: 500, Long: 70',
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status').to.be.a('number');
                expect(res.body).to.have.property('message').to.be.equal('Red-flag not found');
                done();
            });
    });
});

// Update comment of red flag endpoint
describe('PATCH API endpoint /red-flags/<red-flag-id>/comment', () => {
    it('should update comment on a red flag', (done) => {
        chai.request(app)
            .patch('/api/v1/red-flags/1/comment')
            .send({
                comment: 'new comment',
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status').to.be.an('number');
                expect(res.body).to.have.property('data').to.be.an('array');
                expect(res.body.data[0]).to.have.property('id');
                expect(res.body.data[0]).to.have.property('message').to.be.equal('updated red-flag record\'s comment');
                done();
            });
    });
    it('should return error when record is not found', (done) => {
        chai.request(app)
            .patch('/api/v1/red-flags/5/comment')
            .send({
                comment: 'new comment',
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status').to.be.a('number');
                expect(res.body).to.have.property('message').to.be.equal('Red-flag not found');
                done();
            });
    });
});

// Delete incident endpoint
describe('DELETE API endpoint /api/v1/red-flags/<red-flag-id>', () => {
    it('should return all incidents', (done) => {
        chai.request(app)
            .delete('/api/v1/red-flags/1')
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status').to.be.an('number');
                expect(res.body).to.have.property('data').to.be.an('array');
                expect(res.body.data[0]).to.have.property('id');
                expect(res.body.data[0]).to.have.property('message').to.be.equal('red-flag record has been deleted');
                done();
            });
    });
    it('should return error when record is not found', (done) => {
        chai.request(app)
            .delete('/api/v1/red-flags/5')
            .then((res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status').to.be.an('number');
                expect(res.body).to.have.property('message').to.be.equal('Red-flag not found');
                done();
            });
    });
});
