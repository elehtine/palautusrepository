describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    })
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'hellas',
      name: 'Arto Hellas',
      password: 'salainen'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('login to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login').click()

      cy.contains('wrong username/password').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#author').type('Gleb Bahmutov')
      cy.get('#title').type('Readable Cypress.io tests')
      cy.get('#url').type('https://glebbahmutov.com/blog/readable-tests/')
      cy.get('#create').click()

      cy.contains('Readable Cypress.io tests')
    })
  })

  describe('When several blogs creaded by many people exist', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({ author: 'John Doe', title: 'test1', url: 'http://example.com./test1' })
      cy.createBlog({ author: 'John Doe', title: 'test2', url: 'http://example.com./test2' })
      cy.contains('logout').click()
      cy.login({ username: 'hellas', password: 'salainen' })
      cy.createBlog({ author: 'Jane Doe', title: 'test3', url: 'http://example.com./test3' })

      cy.contains('test1').as('blog1')
      cy.contains('test2').as('blog2')
      cy.contains('test3').as('blog3')
    })

    it('Blogs can be liked', function() {
      cy.get('@blog2').click()
      cy.get('#like-button').click()
      cy.contains('likes 1').click()
    })

    it('they are ordered by number of likes', function() {
      cy.get('@blog2').click()
      cy.get('#like-button').click()
      cy.contains('likes 1').click()
      cy.visit('http://localhost:3000')
      cy.get('@blog3').click()
      cy.get('#like-button').click()
      cy.contains('likes 1').click()
      cy.get('#like-button').click()
      cy.contains('likes 2').click()
      cy.get('#like-button').click()
      cy.contains('likes 3').click()
      cy.visit('http://localhost:3000')
      cy.get('@blog1').click()
      cy.get('#like-button').click()
      cy.contains('likes 1').click()
      cy.get('#like-button').click()
      cy.contains('likes 2').click()
      cy.visit('http://localhost:3000')

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('test3')
        cy.wrap(blogs[1]).contains('test1')
        cy.wrap(blogs[2]).contains('test2')
      })
    })

    it('The creator can delete a blog', function() {
      cy.get('@blog3').click()
      cy.get('#remove-button').click()

      cy.get('home').should('not.contain', 'test3')

      cy.get('@blog2').click()
      cy.get('@blog2').should('not.contain', 'remove')
    })
  })

})
