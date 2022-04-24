const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/app.js'); //c'est l'app "express"
//import { describe, it } from 'mocha'
const mocha = require('mocha');

// Configurer chai
chai.use(chaiHttp);
chai.should();

mocha.describe("Test de l'API message", () => {
    mocha.it("user", (done) => {
        const request = chai.request(app.default).keepOpen();
        const user = {
            login: "pikachu",
            password: "1234",
            lastname: "chu",
            firstname: "pika"
        };

        const message1 = {
            message : "FER III 💀💀💀💀"
        }
        const message2 = {
            message : "CHALLENGER"
        }

        request
            .put('/api/user')
            .send(user)

            .then((res) => {
                res.should.have.status(201);
                console.log(`Retrieving user ${res.body.id}`)
                return Promise.all([
                    request
                        .post(`/api/messages/user/${res.body.id}/messages`)
                        .send(message1)
                        .then((res) =>{
                            //console.log(res.body)
                        }),

                    request
                        .put(`/api/messages/user/${res.body.id}/messages`)
                        .send({message1, message2})
                        .then((res) => {
                            res.should.have.status(200)
                        }),

                    request
                        .put(`/api/messages/user/${res.body.id}/messages`)
                        .send({message1})
                        .then((res) => {
                            res.should.have.status(400)
                        }),

                    request
                        .get(`/api/messages/user/${res.body.id}/messages`)
                        .then((res) => {
                            chai.assert.deepEqual(res.body.message.msg1, "Hello World\n, Quel beau reseau")
                            res.should.have.status(200)
                        }),
                    request
                        .get(`/api/messages/user/5/messages`)
                        .then((res) => {
                            res.should.have.status(401)
                        }),
                    
                    request
                        .get(`/api/messages/user/${res.body.id}/messages/friends`)
                        .then((res) => {
                            chai.assert.deepEqual(res.body.status, 200)
                            res.should.have.status(200)
                        }),

                    request
                        .get(`/api/messages/user/${res.body.id}/infos`)
                        .then((res) => {
                            res.should.have.status(200)
                            chai.assert.deepEqual(res.body.count, 2)
                        }),
                    request
                        .get(`/api/messages/user/10/infos`)
                        .then((res) => {
                            res.should.have.status(404)
                        }),
                    request
                        .get(`/api/messages/infos`)
                        .then((res) => {
                            res.should.have.status(200)
                            chai.assert.deepEqual(res.body.count, 6)
                        })
                ])
            }).then(() => done(), (err) => done(err))
            .finally(() => {
                request.close()
            })

    })
})