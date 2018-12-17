// Records endpoints test

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import * as schema from '../server/db/dbschema';


chai.use(chaiHttp);

let token;
let admintoken;
let redflagId;
let interventionId;

describe('before testing', () => {
    before(async () => {
        await schema.createRecordsTable();
        await schema.createUserTable();
    });
    describe('Before endpoints tests', () => {
        it('sign up user and return token', (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    firstname: 'Adaeze',
                    lastname: 'Eric',
                    username: 'deeEric',
                    email: 'daizyodurukwe007755@gmail.com',
                    password: 'puma',
                    phone: '08136770975',
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.a('object');
                    expect(res.body.data[0]).to.have.property('token');
                    // eslint-disable-next-line prefer-destructuring
                    token = res.body.data[0].token;
                    done();
                });
        });

        it('sign up user and return token', (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send({
                    firstname: 'Adaeze',
                    lastname: 'Eric',
                    username: 'deeEric',
                    email: 'daizyodurukwe@gmail.com',
                    password: 'puma',
                    phone: '08136770975',
                    isadmin: true,
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.a('object');
                    expect(res.body.data[0]).to.have.property('token');
                    // eslint-disable-next-line prefer-destructuring
                    admintoken = res.body.data[0].token;
                    done();
                });
        });

        /**
         * Test POST endpoints
         */
        // Test POST red flag endpoint
        describe('POST API endpoint api/v1/red-flags', () => {
            it('POST a red flag report', (done) => {
                chai.request(app)
                    .post('/api/v1/red-flags')
                    .set('x-access-token', token)
                    .send({
                        type: 'red flag',
                        location: '4.3000, 7.9000',
                        // eslint-disable-next-line no-useless-escape
                        images: '{\"img.png\"}',
                        comment: 'plenty comments',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status').to.be.a('number');
                        expect(res.body).to.have.property('data').to.be.an('array');
                        expect(res.body.data[0]).to.have.property('id');
                        expect(res.body.data[0]).to.have.property('message').to.be.equal('Created red flag record');
                        redflagId = res.body.data[0].id;
                        done();
                    });
            });

            it('return error when type is not provided', (done) => {
                chai.request(app)
                    .post('/api/v1/red-flags')
                    .set('x-access-token', token)
                    .send({
                        location: 'gwagwalada',
                        // eslint-disable-next-line no-useless-escape
                        images: '{\"img.png\"}',
                        comment: 'plenty comments',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(422);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status');
                        expect(res.body).to.have.property('message');
                        done();
                    });
            });

            it('return error when type wrong', (done) => {
                chai.request(app)
                    .post('/api/v1/red-flags')
                    .set('x-access-token', token)
                    .send({
                        type: 'record',
                        location: 'gwagwalada',
                        comment: 'plenty comments',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(422);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status');
                        expect(res.body).to.have.property('message');
                        done();
                    });
            });

            it('return error when location is not provided', (done) => {
                chai.request(app)
                    .post('/api/v1/red-flags')
                    .set('x-access-token', token)
                    .send({
                        type: 'red flag',
                        comment: 'plenty comments',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(422);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status');
                        expect(res.body).to.have.property('message');
                        done();
                    });
            });

            it('return error when comment is not provided', (done) => {
                chai.request(app)
                    .post('/api/v1/red-flags')
                    .set('x-access-token', token)
                    .send({
                        type: 'red flag',
                        location: 'gwagwalada',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(422);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status');
                        expect(res.body).to.have.property('message');
                        done();
                    });
            });
        });

        // Test POST intervention endpoint
        describe('POST API endpoint api/v1/intervention', () => {
            it('POST an intervention report', (done) => {
                chai.request(app)
                    .post('/api/v1/intervention')
                    .set('x-access-token', token)
                    .send({
                        type: 'intervention',
                        location: '4.0009, 3.0008',
                        // eslint-disable-next-line no-useless-escape
                        images: '{\"img.png\"}',
                        comment: 'plenty comments',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status').to.be.a('number');
                        expect(res.body).to.have.property('data').to.be.an('array');
                        expect(res.body.data[0]).to.have.property('id');
                        expect(res.body.data[0]).to.have.property('message').to.be.equal('Created intervention record');
                        interventionId = res.body.data[0].id;
                        done();
                    });
            });

            it('return error when type is not provided', (done) => {
                chai.request(app)
                    .post('/api/v1/intervention')
                    .set('x-access-token', token)
                    .send({
                        location: 'gwagwalada',
                        // eslint-disable-next-line no-useless-escape
                        images: '{\"img.png\"}',
                        comment: 'plenty comments',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(422);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status');
                        expect(res.body).to.have.property('message');
                        done();
                    });
            });

            it('return error when type wrong', (done) => {
                chai.request(app)
                    .post('/api/v1/intervention')
                    .set('x-access-token', token)
                    .send({
                        type: 'record',
                        location: 'gwagwalada',
                        comment: 'plenty comments',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(422);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status');
                        expect(res.body).to.have.property('message');
                        done();
                    });
            });

            it('return error when location is not provided', (done) => {
                chai.request(app)
                    .post('/api/v1/intervention')
                    .set('x-access-token', token)
                    .send({
                        type: 'intervention',
                        comment: 'plenty comments',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(422);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status');
                        expect(res.body).to.have.property('message');
                        done();
                    });
            });

            it('return error when comment is not provided', (done) => {
                chai.request(app)
                    .post('/api/v1/intervention')
                    .set('x-access-token', token)
                    .send({
                        type: 'intervention',
                        location: 'gwagwalada',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(422);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status');
                        expect(res.body).to.have.property('message');
                        done();
                    });
            });
        });

        /**
         * Test GET all endpoint
         */
        // Test GET all red flags endpoint
        describe('GET API endpoint /api/v1/red-flags', () => {
            it('should return all red flags', (done) => {
                chai.request(app)
                    .get('/api/v1/red-flags')
                    .set('x-access-token', token)
                    .then((res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status').to.be.a('number');
                        expect(res.body).to.have.property('data').to.be.an('array');
                        done();
                    });
            });
        });

        // Test GET all interventions endpoint
        describe('GET API endpoint /api/v1/interventions', () => {
            it('should return all interventions', (done) => {
                chai.request(app)
                    .get('/api/v1/interventions')
                    .set('x-access-token', token)
                    .then((res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status').to.be.a('number');
                        expect(res.body).to.have.property('data').to.be.an('array');
                        done();
                    });
            });
        });

        /**
         * Test GET endpoints
         */
        // Test GET one red flag endpoint
        describe('GET API endpoint /api/v1/red-flags/<red-flag-id>', () => {
            it('should get one redflag', (done) => {
                chai.request(app)
                    .get(`/api/v1/red-flags/${redflagId}`)
                    .set('x-access-token', token)
                    .then((res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status').to.be.a('number');
                        expect(res.body).to.have.property('data').to.be.an('object');
                        done();
                    });
            });

            it('should return error with an invalid id', (done) => {
                chai.request(app)
                    .get('/api/v1/red-flags/3818ea1f-bb6c-43bf-9503-d48957c8a6d3')
                    .set('x-access-token', token)
                    .then((res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
        });

        // Test GET one intervention endpoint
        describe('GET API endpoint /api/v1/interventions/<intervention-id>', () => {
            it('should get one intervention', (done) => {
                chai.request(app)
                    .get(`/api/v1/interventions/${interventionId}`)
                    .set('x-access-token', token)
                    .then((res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status').to.be.a('number');
                        expect(res.body).to.have.property('data').to.be.an('object');
                        done();
                    });
            });

            it('should return error with an invalid id', (done) => {
                chai.request(app)
                    .get('/api/v1/interventions/3818ea1f-bb6c-43bf-9503-d48957c8a6d3')
                    .set('x-access-token', token)
                    .then((res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
        });

        /**
         * Test PATCH location endpoints
         */
        // Test PATCH red flag location endpoint
        describe('PATCH API endpoint /red-flags/<red-flag-id>/location', () => {
            it('should update location of red flag', (done) => {
                chai.request(app)
                    .patch(`/api/v1/red-flags/${redflagId}/location`)
                    .set('x-access-token', token)
                    .send({
                        location: '5.00, 7.02',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status').to.be.a('number');
                        expect(res.body).to.have.property('message').to.be.equal('Updated red flag record\'s location');
                        expect(res.body).to.have.property('data').to.be.an('object');
                        expect(res.body.data).to.have.property('id');
                        expect(res.body.data).to.have.property('location');
                        done();
                    });
            });

            it('should return error with invalid id', (done) => {
                chai.request(app)
                    .patch('/api/v1/red-flags/3818ea1f-bb6c-43bf-9503-d48957c8a6d3/location')
                    .set('x-access-token', token)
                    .send({
                        location: '5.00, 7022',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        expect(res.body).to.be.an('object');
                        done();
                    });
            });
        });

        // Test PATCH intervention location endpoint
        describe('PATCH API endpoint /interventions/<interventions-id>/location', () => {
            it('should update location of intervention', (done) => {
                chai.request(app)
                    .patch(`/api/v1/interventions/${interventionId}/location`)
                    .set('x-access-token', token)
                    .send({
                        location: '5.00, 70.000',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status').to.be.a('number');
                        expect(res.body).to.have.property('message').to.be.equal('Updated intervention record\'s location');
                        expect(res.body).to.have.property('data').to.be.an('object');
                        expect(res.body.data).to.have.property('id');
                        expect(res.body.data).to.have.property('location');
                        done();
                    });
            });
        });

        /**
         * Test PATCH comment endpoints
         */
        // Test PATCH red flag comment endpoint
        describe('PATCH API endpoint /red-flags/<red-flag-id>/comment', () => {
            it('should update comment on a red flag', (done) => {
                chai.request(app)
                    .patch(`/api/v1/red-flags/${redflagId}/comment/`)
                    .set('x-access-token', token)
                    .send({
                        comment: 'new comment',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status').to.be.an('number');
                        expect(res.body).to.have.property('data').to.be.an('object');
                        expect(res.body).to.have.property('message').to.be.equal('Updated red flag record\'s comment');
                        expect(res.body.data).to.have.property('id');
                        expect(res.body.data).to.have.property('comment');
                        done();
                    });
            });

            it('should return error with invalid id', (done) => {
                chai.request(app)
                    .patch('/api/v1/red-flags/3818ea1f-bb6c-43bf-9503-d48957c8a6d3/comment')
                    .set('x-access-token', token)
                    .send({
                        comment: 'another new comment',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        expect(res.body).to.be.an('object');
                        done();
                    });
            });
        });

        // Test PATCH intervention comment endpoint
        describe('PATCH API endpoint /interventions/<interventions-id>/comment', () => {
            it('should update comment on an intervention', (done) => {
                chai.request(app)
                    .patch(`/api/v1/interventions/${interventionId}/comment/`)
                    .set('x-access-token', token)
                    .send({
                        comment: 'new comment',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status').to.be.an('number');
                        expect(res.body).to.have.property('data').to.be.an('object');
                        expect(res.body).to.have.property('message').to.be.equal('Updated intervention record\'s comment');
                        expect(res.body.data).to.have.property('id');
                        expect(res.body.data).to.have.property('comment');
                        done();
                    });
            });
        });

        /**
         * Test PATCH status endpoints
         */
        // Test update redflag status endpoint
        describe('PATCH API endpoint /red-flags/<red-flag-id>/status', () => {
            it('should update status on a red flag', (done) => {
                chai.request(app)
                    .patch(`/api/v1/red-flags/${redflagId}/status/`)
                    .set('x-access-token', admintoken)
                    .send({
                        status: 'resolved',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status').to.be.a('number');
                        expect(res.body).to.have.property('data').to.be.an('object');
                        expect(res.body).to.have.property('message').to.be.equal('Updated red flag record\'s status');
                        expect(res.body.data).to.have.property('id');
                        expect(res.body.data).to.have.property('status');
                        done();
                    });
            });

            it('should return error for incorrect status type', (done) => {
                chai.request(app)
                    .patch(`/api/v1/red-flags/${redflagId}/status/`)
                    .set('x-access-token', admintoken)
                    .send({
                        status: 'resolve',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(422);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status');
                        expect(res.body).to.have.property('message');
                        done();
                    });
            });

            it('should return forbidden', (done) => {
                chai.request(app)
                    .patch(`/api/v1/red-flags/${redflagId}/status/`)
                    .set('x-access-token', token)
                    .send({
                        status: 'resolved',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(403);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('message').to.be.equals('forbidden');
                        done();
                    });
            });
        });

        // Test update intervention status endpoint
        describe('PATCH API endpoint /interventions/<interventions-id>/status', () => {
            it('should update status on an intervention', (done) => {
                chai.request(app)
                    .patch(`/api/v1/interventions/${interventionId}/status/`)
                    .set('x-access-token', admintoken)
                    .send({
                        status: 'under investigation',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status').to.be.a('number');
                        expect(res.body).to.have.property('data').to.be.an('object');
                        expect(res.body).to.have.property('message').to.be.equal('Updated intervention record\'s status');
                        expect(res.body.data).to.have.property('id');
                        expect(res.body.data).to.have.property('status');
                        done();
                    });
            });

            it('should return error for incorrect status type', (done) => {
                chai.request(app)
                    .patch(`/api/v1/interventions/${interventionId}/status/`)
                    .set('x-access-token', admintoken)
                    .send({
                        status: 'unders',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(422);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status');
                        expect(res.body).to.have.property('message');
                        done();
                    });
            });

            it('should return forbidden', (done) => {
                chai.request(app)
                    .patch(`/api/v1/interventions/${interventionId}/status/`)
                    .set('x-access-token', token)
                    .send({
                        status: 'resolved',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(403);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('message').to.be.equals('forbidden');
                        done();
                    });
            });
        });

        /**
         * Test DELETE endpoints
         */
        // Test DELETE red flag endpoint
        describe('DELETE API endpoint /api/v1/red-flags/<red-flag-id>', () => {
            it('should delete red flag', (done) => {
                chai.request(app)
                    .delete(`/api/v1/red-flags/${redflagId}`)
                    .set('x-access-token', token)
                    .then((res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status').to.be.an('number');
                        expect(res.body).to.have.property('message').to.be.equal('red flag record has been deleted');
                        expect(res.body).to.have.property('data').to.be.an('object');
                        expect(res.body.data).to.have.property('id');
                        done();
                    });
            });

            it('should return error with invalid id', (done) => {
                chai.request(app)
                    .delete('/api/v1/red-flags/3818ea1f-bb6c-43bf-9503-d48957c8a6d3')
                    .set('x-access-token', token)
                    .then((res) => {
                        expect(res).to.have.status(404);
                        expect(res.body).to.be.an('object');
                        done();
                    });
            });
        });

        // Test DELETE intervention endpoint
        describe('DELETE API endpoint /api/v1/interventions/<interventions-id>', () => {
            it('should delete intervention', (done) => {
                chai.request(app)
                    .delete(`/api/v1/interventions/${interventionId}`)
                    .set('x-access-token', token)
                    .then((res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('status').to.be.an('number');
                        expect(res.body).to.have.property('message').to.be.equal('intervention record has been deleted');
                        expect(res.body).to.have.property('data').to.be.an('object');
                        expect(res.body.data).to.have.property('id');
                        done();
                    });
            });

            it('should return error with invalid id', (done) => {
                chai.request(app)
                    .delete('/api/v1/interventions/3818ea1f-bb6c-43bf-9503-d48957c8a6d3')
                    .set('x-access-token', token)
                    .then((res) => {
                        expect(res).to.have.status(404);
                        expect(res.body).to.be.an('object');
                        done();
                    });
            });
        });
    });
});
