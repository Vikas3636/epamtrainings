describe('Orange HRM Test', () => {

    it('Verify title positive', () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.title().should('eq','OrangeHRM')

    })

    it('Verify title negative', () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.title().should('eq','OrangeHRM123456789')

    })



}
) 