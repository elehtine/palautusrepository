describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'ELlAS',
      name: 'Elias Lehtinen',
      password: 'kissa123'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.get('#loginForm')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('ELlAS')
      cy.get('#password').type('kissa123')
      cy.get('#login-button').click()
      cy.contains('Elias Lehtinen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('ELlAS')
      cy.get('#password').type('salis')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})
