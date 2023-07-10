/// <reference types="cypress" />

describe('Landing routes in full width', () => {

  beforeEach(() => {
    cy.visit('')
    cy.viewport('macbook-15')
  })

  it('Go to login page', () => {

    cy.get('[data-cy=login-navbar-link]').click()
    cy.url().should('include', 'login')
    
  })

  it('Go to register page', () => {

    cy.get('[data-cy=register-navbar-link]').click()
    cy.url().should('include', 'register')
    
  })

  it('Go to register with home button', () => {

    cy.get('[data-cy=join-now-btn]').click()
    cy.url().should('include', 'register')

  })

  })

describe('Landing routes in mid width', () => {
  beforeEach(() => {
    cy.viewport('ipad-2')
    cy.visit('')
    cy.get('[data-cy=toggle-button]').click()
  })

  it('Go to login page', () => {

    cy.get('[data-cy=login-navbar-link]').click()
    cy.url().should('include', 'login')
    
  })

  it('Go to register page', () => {

    cy.get('[data-cy=register-navbar-link]').click()
    cy.url().should('include', 'register')
    
  })

  })
