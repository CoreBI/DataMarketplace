/// <reference types="cypress" />

describe('Datasets workflows', () => {

    before(() => {
        cy.login()
        cy.visit('/company-dashboard')
        cy.visit('/datasets/new')
    })

    it('Upload a dataset', () => {
        
        cy.get('[data-cy=language-0]').check()
        cy.get('[data-cy=language-1]').check()
        cy.get('[data-cy=modal-next-btn').click()
        cy.fixture('datatest.csv').then(fileContent => {
            cy.get('[data-cy=load-file-btn]').first().click()
            cy.get('[data-cy=dataset-file]').first().selectFile({ contents: Cypress.Buffer.from(fileContent), fileName: 'datatest.csv', mimeType: 'text/csv' }, { force: true })
        })
        for (let i = 0; i < 4; i++) {
            cy.get(`[data-cy=title-column-${i}]`).should('contain', `TEST${i+1}`)
        }
    })

})