

  describe('Unit test Inscription', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
      })
      it('Inscription exit', () => {

        cy.get('#bCo').click()
        cy.get('#cancelIcon').click()
        cy.get('#bCo')

        return
      })

      it('Inscription Fail (Nothing enter)', () => {

        cy.get('#bCo').click()
        cy.get('#Bins').click()
        cy.get('.Error')

        return
      })

      it('Inscription Fail (Login taken)', () => {

        cy.get('#bCo').click()
        cy.get("#prenom").type("Longuet")
        cy.get("#nom").type("Axel")
        cy.get("#login").type("CrooZ")
        cy.get("#password").type("mot")
        cy.get("#retapez").type("mot")
        cy.get('#Bins').click()
        cy.get('.Error')

        return
      })

      it('Inscription Success', () => {

        cy.get('#bCo').click()
        cy.get("#prenom").type("CypressTest")
        cy.get("#nom").type("CypressTest")
        cy.get("#login").type("Cypress")
        cy.get("#password").type("mot")
        cy.get("#retapez").type("mot")
        cy.get('#Bins').click()
        cy.get('#bCo')

        return
      })
  })
  describe('Unit test Connexion', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
      })
      it('Connexion exit', () => {

        cy.get('#bIns').click()
        cy.get('#cancelIcon').click()
        cy.get('#bIns')

        return
      })
      it('Connexion Fail (Wrong Password)', () => {


        cy.get('#bIns').click()

        cy.get('#prenom').type('CrooZ')
        cy.get('#nom').type('CrooZ')

        cy.get('#BCOO').click()

        cy.get('.error')
        return
      })

      it('Connexion Fail (Nothing enter)', () => {


        cy.get('#bIns').click()

        cy.get('#BCOO').click()

        cy.get('.error')
        return
      })

      it('Connexion Success', () => {
        cy.get('#bIns').click()

        cy.get('#prenom').type('Cypress')
        cy.get('#nom').type('mot')

        cy.get('#BCOO').click()

        cy.get('.parentTwall')
        return
      })

      after(() =>{
        cy.request('DELETE','http://localhost:4000/api/user/Cypress')
    })
  })