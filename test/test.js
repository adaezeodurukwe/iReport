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
});

// Create incident endpoint
describe('POST API endpoint', () => {
    it('should create an incident', (done) => {
        chai.request(app)
            .post('/api/v1/red-flags')
            .send({
                createdBy: 'Adaeze',
                type: 'intervention',
                location: 'Lat: 700, Long: 450',
                images: ['img1.jpg'],
                comment: 'description of incident',
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status').to.be.an('number');
                expect(res.body).to.have.property('data').to.be.an('array');
                expect(res.body.data[0]).to.have.property('id');
                expect(res.body.data[0]).to.have.property('message').to.be.equal('Created red-flag record');
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
                expect(res).to.be.a.json();
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status').to.be.an('int');
                expect(res.body).to.have.property('data').to.be.an('array');
                expect(res.body.data).to.have.property('id');
                expect(res.body.data).to.have.property('message').to.be.equal.to('Updated red-flag record’s location');
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
                expect(res).to.be.a.json();
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status').to.be.an('int');
                expect(res.body).to.have.property('data').to.be.an('array');
                expect(res.body.data).to.have.property('id');
                expect(res.body.data).to.have.property('message').to.be.equal.to('Updated red-flag record’s comment');
                done();
            });
    });
});

// Delete incident endpoint
describe('GET API endpoint /api/v1/red-flags/<red-flag-id>', () => {
    it('should return all incidents', (done) => {
        chai.request(app)
            .delete('/api/v1/red-flags')
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.a.json();
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status').to.be.an('int');
                expect(res.body).to.have.property('data').to.be.an('array');
                expect(res.body.data).to.have.property('id');
                expect(res.body.data).to.have.property('message').to.be.equal.to('red-flag record has been deleted');
                done();
            });
    });
});
