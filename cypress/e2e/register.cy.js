/// <reference types="cypress" />

describe('Register validations', {testIsolation: false} ,() => {

  before(() => {
    cy.visit('/register')
  })

  it('Step 1', () => {

    cy.get('[data-cy=next]').should('be.disabled')

    cy.get('[data-cy=companyName]').type('Cypress Test Company')
    cy.get('[data-cy=ubication]').type('Cypress Test Ubication')
    cy.get('[data-cy=industry]').select(1)
    cy.get('[data-cy=companySize]').select(1)

    cy.get('[data-cy=next]').should('not.be.disabled')
    cy.get('[data-cy=next]').click()

  })

  it('Owner details', () => {

    cy.get('[data-cy=next]').should('be.disabled')

    cy.get('[data-cy=firstName]').type('Cypress')
    cy.get('[data-cy=lastName]').type('Test')

    cy.get('[data-cy=next]').should('not.be.disabled')
    cy.get('[data-cy=next]').click()

  })

  it('Step 2', () => {

    cy.get('[data-cy=next]').should('be.disabled')

    cy.get('[data-cy=consumer]').check()
    cy.get('[data-cy=provider]').check()

    cy.get('[data-cy=next]').should('not.be.disabled')
    cy.get('[data-cy=next]').click()
    
  })

  it('Step 3 - Email validations', () => {

    cy.get('[data-cy=email]').type('cypress')
    cy.get('[data-cy=email-error-msg]').should('be.visible')

    cy.get('[data-cy=email]').clear().type('cypress@mail.')
    cy.get('[data-cy=email-error-msg]').should('be.visible')

    cy.get('[data-cy=email]').clear().type('cypress@mail.com')
    cy.get('[data-cy=email-error-msg]').should('not.exist')

  })

  it('Step 3 - Password validations', () => {

    cy.get('[data-cy=password-length').should('have.class', 'text-error')
    cy.get('[data-cy=password-uppercase').should('have.class', 'text-error')
    cy.get('[data-cy=password-number').should('have.class', 'text-error')
    cy.get('[data-cy=password-lowercase').should('have.class', 'text-error')

    cy.get('[data-cy=password]').clear().type('cypresstest')
    cy.get('[data-cy=password-length').should('have.class', 'text-success')

    
    cy.get('[data-cy=password]').clear().type('CYPRESSTEST')
    cy.get('[data-cy=password-uppercase').should('have.class', 'text-success')

    
    cy.get('[data-cy=password]').clear().type('123456789')
    cy.get('[data-cy=password-number').should('have.class', 'text-success')

    
    cy.get('[data-cy=password]').clear().type('cypresstest')
    cy.get('[data-cy=password-lowercase').should('have.class', 'text-success')

    cy.get('[data-cy=password]').clear().type('Cypress123')
    cy.get('[data-cy=password-length').should('have.class', 'text-success')
    cy.get('[data-cy=password-uppercase').should('have.class', 'text-success')
    cy.get('[data-cy=password-number').should('have.class', 'text-success')
    cy.get('[data-cy=password-lowercase').should('have.class', 'text-success')

  })

  it('Step 3 - Password show and hide', () => {

    cy.get('[data-cy=show-password]').click()
    cy.get('[data-cy=password]').should('have.attr', 'type', 'text')

    cy.get('[data-cy=show-password]').click()
    cy.get('[data-cy=password]').should('have.attr', 'type', 'password')

  })

  it('Step 3 - Password confirmation show and hide', () => {

    cy.get('[data-cy=show-confirm-password]').click()
    cy.get('[data-cy=password-confirmation]').should('have.attr', 'type', 'text')

    cy.get('[data-cy=show-confirm-password]').click()
    cy.get('[data-cy=password-confirmation]').should('have.attr', 'type', 'password')

  })

  it('Step 3 - Password confirmation validations', () => {

    cy.get('[data-cy=password-confirmation]').type('Cypress1234')
    cy.get('[data-cy=password-error-msg]').should('be.visible')

    cy.get('[data-cy=password-confirmation]').clear().type('Cypress123')
    cy.get('[data-cy=password-error-msg]').should('not.exist')

    cy.get('[data-cy=next]').should('not.be.disabled')
    cy.get('[data-cy=next]').click()

  })

})
