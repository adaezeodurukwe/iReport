// User enpoints tests


import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import * as schema from '../server/db/dbschema';

chai.use(chaiHttp);

describe('create user', () => {
    before('betore testing', async () => {
        await schema.createUserTable();
    });

    it('Should create user and return token', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                firstname: 'Adaeze',
                lastname: 'Eric',
                username: 'deeEric',
                email: 'daizyodurukwenneoma@gmail.com',
                password: 'puma',
                phone: '08136770975',
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.a('object');
                expect(res.body.data[0]).to.have.property('token');
                done();
            });
    });
    it('not create user without firstname', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                lastname: 'Eric',
                username: 'deeEric',
                email: 'daizyodurukwenneoma@gmail.com',
                password: 'puma',
                phone: '08136770975',
            })
            .end((err, res) => {
                expect(res).to.have.status(422);
                expect(res.body).to.be.a('object');
                done();
            });
    });
    it('not create user without lastname', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                firstname: 'Eric',
                username: 'deeEric',
                email: 'daizyodurukwe007755@gmail.com',
                password: 'puma',
                phone: '08136770975',
            })
            .end((err, res) => {
                expect(res).to.have.status(422);
                expect(res.body).to.be.a('object');
                done();
            });
    });

    it('should throw error for invalid email', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                firstname: 'Adaeze',
                lastname: 'Eric',
                username: 'deeEric',
                email: 'daizyodurukwe',
                password: 'puma',
                phone: '08136770975',
            })
            .end((err, res) => {
                expect(res).to.have.status(422);
                expect(res.body).to.be.a('object');
                done();
            });
    });

    it('should throw error if password is less than four characters', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                firstname: 'Adaeze',
                lastname: 'Eric',
                username: 'deeEric',
                email: 'daizyodurukwe007755@gmail.com',
                password: 'pum',
                phone: '08136770975',
            })
            .end((err, res) => {
                expect(res).to.have.status(422);
                expect(res.body).to.be.a('object');
                done();
            });
    });
});

describe('login user', () => {
    it('sign in user and return token', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'daizyodurukwenneoma@gmail.com',
                password: 'puma',
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.data[0]).to.have.property('token');
                done();
            });
    });
    it('should not login - wrong password', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'daizyodurukwenneoma@gmail.com',
                password: 'err',
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.a('object');
                done();
            });
    });
    it('Should return error if user is not found', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'gusco@gmail.com',
                password: 'err',
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.a('object');
                done();
            });
    });
});
