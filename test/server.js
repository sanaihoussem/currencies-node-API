const chai =require('chai');
const chaiHttp =require('chai-http');

const app = require('../server/server');
const defines = require('../utils/defines');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Cryptocurrency API", () => {

    describe(" GET /someRoute", () => {
        it("should return status 404", (done) => {
            chai.request(app)
                .get('/someRoute')
                .end((err, res) => {
                    res.should.have.status(defines.NOT_FOUND_ERROR_CODE);
                    done();
                 });
        });
    });

    describe(" GET /currencies", () => {
        it("should return status 200 with list crypto data", (done) => {
            chai.request(app)
                .get('/currencies')
                .end((err, res) => {
                    res.should.have.status(defines.SUCCESS_CODE);
                    done();
                 });
        });
    });


    describe(" GET /currencies/Bitcoin", () => {
        it("should return status 200 with bitcoin info", (done) => {
            chai.request(app)
                .get('/currencies/Bitcoin')
                .end((err, res) => {
                    res.should.have.status(defines.SUCCESS_CODE);
                    done();
                 });
        });
    });
    
    describe(" GET /currencies/SuperBitcoin", () => {
        it("should return status 204 : crypto Name not recognized", (done) => {
            chai.request(app)
                .get('/currencies/SuperBitcoin')
                .end((err, res) => {
                    res.should.have.status(defines.CRYPTO_NOT_RECOGNIZED_ERROR_CODE);
                    done();
                 });
        });
    });

    describe(" GET /currencies/%2//0%2/", () => {
        it("should return status 400 : BAD REQUEST", (done) => {
            chai.request(app)
                .get('/currencies/%2//0%2/')
                .end((err, res) => {
                    res.should.have.status(defines.BAD_REQUEST_ERROR_CODE);
                    done();
                 });
        });
    });


    describe(" GET /currencies/.%20%20%20f/", () => {
        it("should return status 400 : BAD REQUEST", (done) => {
            chai.request(app)
                .get('/currencies/.%20%20%20f/')
                .end((err, res) => {
                    res.should.have.status(defines.BAD_REQUEST_ERROR_CODE);
                    done();
                 });
        });
    });


});