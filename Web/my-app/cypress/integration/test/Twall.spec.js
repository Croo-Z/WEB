describe('Unit test Twall', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('#bIns').click()

        cy.get('#prenom').type('Cypress')
        cy.get('#nom').type('mot')

        cy.get('#BCOO').click()
    })

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
    })

    it('Logout', () => {

        cy.get("#logout1").click()
        cy.get('#bIns')

        return
    })

    it('Post Message', () => {

        cy.get("#newCom").type("Cypress TEST")
        cy.get("#addCom").click()
        cy.get("#user1").click()
        cy.get(".post__headerDescription").contains("Cypress TEST")

        return
    })

    it('Post Message (Already EXIST)', () => {

        cy.get("#newCom").type("Cypress TEST")
        cy.get("#addCom").click()
        cy.contains("NOT SEND")
        return
    })
    it('Go to HOME', () => {

        cy.get("#user1").click()
        cy.get("#home1").click()
        cy.get("#addCom")
        return
    })
    it('Go to Profil', () => {

        cy.get("#user1").click()
        cy.get(".infoProfilButton")
        cy.contains("Cypress")
        return
    })

    it('NavBar Aucun resultat', () => {

        cy.get("#recherche").type("Test")
        cy.get(".searchButton").click()
        cy.contains("Aucun résultat ...")
        return
    })

    it('NavBar Success', () => {

        cy.get("#recherche").type("crypto")
        cy.get(".searchButton").click()
        cy.contains("J'aurai jamais du prendre crypto")
        return
    })

    it('Like', () => {

        cy.get("#recherche").type("crypto")
        cy.get(".searchButton").click()
        cy.get("#like").click()
        cy.get("#delike")

        return
    
    })

    it('Delike', () => {

        cy.get("#recherche").type("crypto")
        cy.get(".searchButton").click()
        cy.get("#delike").click()
        cy.get("#like")

        return
    })

    it('Check Profil pic', () => {

        cy.get("#recherche").type("crypto")
        cy.get(".searchButton").click()
        cy.get("#imgprof").click()
        cy.get(".NameProfil").contains("Azarel")

        return
    })

    it('Follow', () => {

        cy.get("#recherche").type("crypto")
        cy.get(".searchButton").click()
        cy.get("#imgprof").click()
        cy.get("#followed").click()
        cy.get("#home1").click()
        cy.contains("Azarel")

        return
    })

    it('Unfollow', () => {

        cy.get("#recherche").type("crypto")
        cy.get(".searchButton").click()
        cy.get("#imgprof").click()
        cy.get("#followed").click()
        cy.get("#home1").click()
        cy.contains("Azarel").should('not.exist');
        return
    })

    after(() =>{
        cy.request('DELETE','http://localhost:4000/api/user/Cypress')
    })

})