/// <reference types="cypress" />

describe('Login validations', () => {

  beforeEach(() => {
    cy.visit('/login')
  })

  const usr = 'juan@prueba.com'
  const psw = 'Prueba123'

  it('Invalid email', () => {

    cy.intercept('POST', '/api/auth').as('authResponse')

    cy.get('[data-cy=email]').type('fsakgfask@fajskhsa.com')
    cy.get('[data-cy=password]').type(psw)
    cy.get('[data-cy=submit]').click()
    
    cy.wait('@authResponse').then((interception) => {

      expect(interception.response.statusCode).to.eq(401)
      expect(interception.response.body.message).to.contain('User not found')

    })
    
  })

  it('Invalid password', () => {

    cy.intercept('POST', '/api/auth').as('authResponse')

    cy.get('[data-cy=email]').type(usr)
    cy.get('[data-cy=password]').type('falds')
    cy.get('[data-cy=submit]').click()
    
    cy.wait('@authResponse').then((interception) => {

      expect(interception.response.statusCode).to.eq(401)
      expect(interception.response.body.message).to.contain('Invalid password')

    })
    
  })

  it('Email not entered', () => {

    cy.get('[data-cy=password]').type(psw)
    cy.get('[data-cy=submit]').click()
    
    cy.get('[data-cy=missing-email]').should('be.visible')
    
  })

  it('Password not entered', () => {
    
    cy.get('[data-cy=email]').type(usr)
    cy.get('[data-cy=submit]').click()
    
    cy.get('[data-cy=missing-password]').should('be.visible')
    
  })

  it('Email and password not entered', () => {
    
    cy.get('[data-cy=submit]').click()
    
    cy.get('[data-cy=missing-email]').should('be.visible')
    cy.get('[data-cy=missing-password]').should('be.visible')
    
  })

  it('Show and hide password', () => {

    cy.get('[data-cy=password]').type(psw)
    cy.get('[data-cy=show-password]').click()
    
    cy.get('[data-cy=password]').should('have.attr', 'type', 'text')

    cy.get('[data-cy=show-password]').click()

    cy.get('[data-cy=password]').should('have.attr', 'type', 'password')
    
  })

  })
