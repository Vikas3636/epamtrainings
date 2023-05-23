import neatCSV from 'neat-csv'

describe('data driven using CSV file', () => {

    it('CSV Get username and password valid', () => {
        cy.fixture('credentials.csv')
            .then(neatCSV)
            .then((data) => {
                data.forEach((creds) => {
                    cy.visit('https://www.saucedemo.com/')
                    cy.get('#user-name').type(creds.username)
                    cy.get('#password').type(creds.password)
                    cy.get('#login-button').click()
                })
            })
    })
})