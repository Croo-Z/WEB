describe('Unit test Profil', () => {

    before(() => {
        cy.visit('http://localhost:3000/')
        cy.get('#bCo').click()
        cy.get("#prenom").type("CypressTest")
        cy.get("#nom").type("CypressTest")
        cy.get("#login").type("Cypress")
        cy.get("#password").type("mot")
        cy.get("#retapez").type("mot")
        cy.get('#Bins').click()
        cy.get('#bCo')
        cy.get('#bIns').click()

        cy.get('#prenom').type('Cypress')
        cy.get('#nom').type('mot')

        cy.get('#BCOO').click()
        cy.get("#newCom").type("Cypress TEST")
        cy.get("#addCom").click()
        cy.get("#user1").click()
    })

    it('Delete Message', () => {

        cy.get("#delete").click()
        cy.get(".infoProfilButton").find("#friendList").click()
        cy.get(".infoTextProfil").contains("Followers : 0Likes : 0 Messages : 0")
        return
    })

    after(() =>{
        cy.request('DELETE','http://localhost:4000/api/user/Cypress')
    })
})