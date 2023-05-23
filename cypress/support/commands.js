// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/// <reference  types="Cypress">
/// <reference  types="Cypress-xpath">

Cypress.Commands.add('login', (email, password) => {
  cy.get('#user-name').type(email)
  /*.pause()
  cy.get('#user-name').type(email, {clear: false})
  cy.get('#user-name').type(email, {clear: true})*/
  cy.get('#password').type(password)
    .debug()
  cy.get('#login-button').click()
})

Cypress.Commands.add('enterDetailsAndContinue', (firstName, lastName, pinCode) => {
  cy.get('#first-name').type(firstName)
  cy.get('#last-name').type(lastName)
  cy.get('#postal-code').type(pinCode)
  cy.get('#continue').click()
})

/*Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.clear) {
    text = `{selectAll}{backspace}${text}`
  }
  return originalFn(element, text, options)
})*/