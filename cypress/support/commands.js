Cypress.Commands.add('login', () => {
    cy.fixture('logindata.json').then((user) => {
        cy.request('POST', '/api/auth', user)
    })
})

Cypress.Commands.add('customLogin', (user, password) => {
    cy.request('POST', '/api/auth', {email: user, password: password})
})