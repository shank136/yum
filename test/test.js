//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp)

describe('Server', () => {

    describe('/GET api', () => {
        it('it should render welcome message', (done) => {
            chai.request(server)
                .get('/api')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.be.eql({ message: 'Welcome to Yum API' })
                })
                done()
        })
    })

    describe('/GET login', () => {
        it('it should generate token', (done) => {
            chai.request(server)
                .get('/api/login')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('token')
                })
                done()
        })
    })

    describe('/POST loadstationinfo', () => {
        it('it should save station information', (done) => {
            chai.request(server)
                .post('/api/loadstationinfo')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6Inl1bXVzZXIxMjMiLCJlbWFpbCI6Inl1bXVzZXIxMjNAeXVtLmNvbSJ9LCJpYXQiOjE1OTEyMTk0ODEsImV4cCI6MTU5MTIyMDA4MX0.vss2XGVDB5GXNlhQP0_loQQO4p-1jUAp-W37gdJBS-w')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('response')
                    res.body.should.have.property('authData')
                })
                done()
        })
    })

    
    describe('/POST stationinfo', () => {
        it('it should load station information for given id', (done) => {
            chai.request(server)
                .post('/api/stationinfo/21')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6Inl1bXVzZXIxMjMiLCJlbWFpbCI6Inl1bXVzZXIxMjNAeXVtLmNvbSJ9LCJpYXQiOjE1OTEyMTk0ODEsImV4cCI6MTU5MTIyMDA4MX0.vss2XGVDB5GXNlhQP0_loQQO4p-1jUAp-W37gdJBS-w')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('response')
                    res.body.should.have.property('authData')
                })
                done()
        })
    })
})