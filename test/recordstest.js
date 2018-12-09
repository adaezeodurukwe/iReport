// // Records endpoints test

// import chai, { expect } from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../app';
// import * as schema from '../server/db/dbschema';
// import userModel from '../server/model/userModel';
// import recordsModel from '../server/model/recordsModel';

// chai.use(chaiHttp);


// describe('test records endpoints', () => {
//     before(async () => {
//         await schema.createRecordsTable();
//         await schema.createUserTable();
//         const user = await
// userModel.create('Adaeze', 'Eric',
// 'doodoo', 'deedee', 'daizyodurukwe44r4@gmail.com', 'puma', '09098889876');
//         console.log(user);
//     });
//     describe('g', () => {
//         beforeEach((done) => {
//             chai.request(app)
//                 .post('api/v1/auth/signin')
//                 .send({
//                     email: 'daizyodurukwe@gmail.com',
//                     password: 'puma',
//                 })
//                 .end((err, res) => {
//                     console.log(res);
//                     c
//                     console.log(token)
//                     done();
//                 });
//         });
//     });
//     it('POST a report', (done) => {
//         chai.request(app)
//             .post('api/v1/auth/red-flags')
//             .set('x-access-token', token)
//             .send({
//                 type: 'red flag',
//                 location: 'gwagwalada',
//                 images: '{\"img.png\"}',
//                 comment: 'plenty comments',
//             })
//             .end((err, res) => {
//                 expect(res).to.have.status(201);
//                 expect(res.body).to.be.an('object');
//                 expect(res.body).to.have.property('status').to.be.a('number');
//                 expect(res.body).to.have.property('data').to.be.an('array');
//                 expect(res.body.data[0]).to.have.property('id');
//                 expect(res.body.data[0]).
// to.have.property('message').to.be.equal('Created red-flag record');
//                 done();
//             });
//     });

//     after(async () => {
//         await schema.dropRecordsTable();
//         await schema.dropUserTable();
//     });
// });
