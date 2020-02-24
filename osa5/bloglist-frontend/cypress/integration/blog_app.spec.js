describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const rightUser = {
      username: 'ELlAS',
      name: 'Elias Lehtinen',
      password: 'kissa123'
    }
    cy.request('POST', 'http://localhost:3001/api/users', rightUser)

    const wrongUser = {
      username: 'Tepi',
      name: 'Teppo Testi',
      password: 'salis'
    }
    cy.request('POST', 'http://localhost:3001/api/users', wrongUser)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#loginForm')
  })

  describe('Login', function() {
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'ELlAS', password: 'kissa123' })
    })

    it('a blog can be created', function() {
      cy.get('#title').type('Title')
      cy.get('#author').type('Author')
      cy.get('#url').type('www.blog.url')
      cy.get('#blog-button').click()
      cy.contains('Title Author')
    })

    describe.only('and a blog exists', function() {
      beforeEach(function() {
        cy.addBlog({ 
          title: 'Title',
          author: 'Author',
          url: 'www.blog.url'
        })
      })

      it('it can be viewed and liked multiple times', function() {
        cy.contains('view').click()
        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 1')
        cy.contains('like').click()
        cy.contains('likes 2')
      })

      it('it can be removed', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'Title Author')
      })

    })

    describe.only('and other users blog exists', function() {
      beforeEach(function() {
        cy.login({ username: 'Tepi', password: 'salis' })
        cy.addBlog({
          title: 'Title',
          author: 'Author',
          url: 'www.blog.url'
        })
        cy.login({ username: 'ELlAS', password: 'kissa123' })
      })

      it('it can not be removed', function() {
        cy.contains('view').click()
        cy.get('html').should('not.contain', 'remove')
      })
    })

  })
})
