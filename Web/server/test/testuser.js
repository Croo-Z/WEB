const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/app.js'); // c'est l'app "express"
//import { describe, it } from 'mocha'
const mocha = require('mocha');

// Configurer chai
chai.use(chaiHttp);
chai.should();

mocha.describe("Test de l'API user", () => {
    mocha.it("user", (done) => {
        const request = chai.request(app.default).keepOpen();
        const user = {
            login: "pikachu",
            password: "1234",
            lastname: "chu",
            firstname: "pika"
        };
        
        const user1 = {
            login: "john",
            password: "1234",
            lastname: "jo",
            firstname: "hn"
        };

        const login = {
            login: "pikachu",
            password: "1234"
        };

        const login2 = {
            login : "pikachu"
        };
        const login3 = {
            login : "jo"
        };

        request
            .put('/api/user')
            .send(user)

            .then((res) => {
                res.should.have.status(201);
                console.log(`Retrieving user ${res.body.id}`)
                return Promise.all([
                    request
                        .get(`/api/user/${res.body.id}`)
                        .then((res) => {
                            res.should.have.status(200)
                            chai.assert.deepEqual(res.body, user)
                        }),

                    request
                        .get(`/api/user/4`)
                        .then((res) => {
                            res.should.have.status(404)
                        }),

                    request 
                        .post(`/api/user/login`)
                        .send(login)
                        .then((res) => {
                            res.should.have.status(200)
                        }),

                    request
                        .delete(`/api/user/${res.body.id}`)
                        .then((res) => {
                            res.should.have.status(200)
                        }),

                    request
                        .delete(`/api/user/${res.body.id}/logout`)
                        .then((res)=>{
                            res.should.have.status(200)
                        }),
                    
                    request
                        .delete(`/api/user/6/logout`)
                        .then((res) => {
                            res.should.have.status(401)
                    }),
                    
                    request
                        .put(`/api/friend/user/20/friends`)
                        .send(login2)
                        .then((res) => {
                            res.should.have.status(401)
                            chai.assert.deepEqual(res.body.message, "Utilisateur inconnu")
                        }),
                    
                    request
                        .put(`/api/friend/user/${res.body.id}/friends`)
                        .send(login2)
                        .then((res) => {
                            res.should.have.status(402)
                            chai.assert.deepEqual(res.body.message, "Impossible de se suivre soit meme")
                        }),

                    request
                        .put(`/api/friend/user/${res.body.id}/friends`)
                        .send(login3)
                        .then((res) => {
                            res.should.have.status(200)
                            chai.assert.deepEqual(res.body.id, 1)
                        }),
    
                ])
            }).then(() => done(), (err) => done(err))
            .finally(() => {
                request.close()
            })
    })
})

