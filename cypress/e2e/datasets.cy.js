/// <reference types="cypress" />

describe('Datasets workflows', () => {

    beforeEach(() => {
        cy.login()
        cy.visit('/company-dashboard')
        cy.wait(1000)
        cy.visit('/datasets/new')
        //cy.visit('http://localhost:9000/company-dashboard')
        //cy.visit('http://localhost:9000/datasets/new')
    })

    it('No language selected', () => {

        cy.get('[data-cy=modal-next-btn').click()
        cy.get('[data-cy=language-modal]').should('be.visible')

    })

    it('One language selected', () => {

        cy.get('[data-cy=language-0]').check()
        cy.get('[data-cy=modal-next-btn').click()
        cy.get('[data-cy=language-modal]').should('not.be.visible')
        cy.get('[data-cy=selected-language-1]').should('not.exist')

    })

    it('Select two languages', () => {

        cy.get('[data-cy=language-0]').check()
        cy.get('[data-cy=language-1]').check()
        cy.get('[data-cy=modal-next-btn').click()
        cy.get('[data-cy=selected-language-1]').should('be.visible')

    })

    it('Save dataset without any data', () => {

        cy.get('[data-cy=language-0]').check()
        cy.get('[data-cy=modal-next-btn').click()
        cy.get('[data-cy=save-dataset-btn]').click()
        cy.get('[data-cy=dataset-title').should('have.class', 'input-error')
        cy.get('[data-cy=dataset-price').should('have.class', 'input-error')
        cy.get('[data-cy=dataset-description').should('have.class', 'textarea-error')
        cy.get('[data-cy=load-file-btn').parent().should('have.class', 'border-error')

    })

    it('Filling dataset form one by one', () => {

        cy.get('[data-cy=language-0]').check()
        cy.get('[data-cy=modal-next-btn').click()
        cy.get('[data-cy=save-dataset-btn]').click()
        cy.get('[data-cy=dataset-title').type('Test')
        cy.get('[data-cy=dataset-title').should('not.have.class', 'input-error')
        cy.get('[data-cy=dataset-price').type('1')
        cy.get('[data-cy=dataset-price').should('not.have.class', 'input-error')
        cy.get('[data-cy=dataset-description').type('Test')
        cy.get('[data-cy=dataset-description').should('not.have.class', 'textarea-error')
        cy.fixture('datatest.csv').then(fileContent => {
            cy.get('[data-cy=load-file-btn]').click()
            cy.get('[data-cy=dataset-file]').selectFile({ contents: Cypress.Buffer.from(fileContent), fileName: 'datatest.csv', mimeType: 'text/csv' }, { force: true })
        })
        cy.get('[data-cy=load-file-btn').parent().should('not.have.class', 'border-error')

    })

    it('Check file columns', () => {
        
        cy.get('[data-cy=language-0]').check()
        cy.get('[data-cy=modal-next-btn').click()
        cy.fixture('datatest.csv').then(fileContent => {
            cy.get('[data-cy=load-file-btn]').click()
            cy.get('[data-cy=dataset-file]').selectFile({ contents: Cypress.Buffer.from(fileContent), fileName: 'datatest.csv', mimeType: 'text/csv' }, { force: true })
        })
        for (let i = 0; i < 4; i++) {
            cy.get(`[data-cy=title-column-${i}]`).should('contain', `TEST${i+1}`)
        }
    })

})