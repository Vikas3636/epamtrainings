describe('cypress trainings', () => {
  
  it('saucedemoTest', () => {


    let productNumber = 1
    let removeTest = "Remove"
    let productName 
    let firstName = "first name"
    let lastName = "last name"
    let pinCode = 100010

    cy.log('Open the website')
    cy.visit('https://www.saucedemo.com/')
    .debug()

    cy.log('login with standard user')
    cy.login('standard_user', 'secret_sauce')
      

    cy.log('check title')
    cy.title().should('eq','Swag Labs')

    cy.log('sort products')
    cy.get('.product_sort_container').select('Price (low to high)')

    cy.log('Get first product name and click on it')
    cy.get('.inventory_list>div:nth-child('+productNumber+') div[class$="inventory_item_name"]').then((productNameLocator) => {
      productName = productNameLocator.text()
      cy.get('.inventory_list>div:nth-child('+productNumber+')>div[class$="inventory_item_img"]').click()

      cy.log('Verify name of product is same in produt details page')
      cy.get('.inventory_details_name.large_size').should('have.text', productName)
    })
    
    .pause()
    cy.log('click add to cart and go to cart page')
    cy.get('#add-to-cart-sauce-labs-onesie').click();
    cy.get('[data-test="remove-sauce-labs-onesie"]').should('have.text', removeTest)
    cy.get('.shopping_cart_link').click()

    cy.log('check product name in cart page')
    cy.get('.inventory_item_name').then((productNameLocatorAtCartPage) => {
      let productNameAtCart = productNameLocatorAtCartPage.text()
      expect(productName).to.equal(productNameAtCart)
      })

    cy.log('Goto checkout page ')
    cy.get('#checkout').click()

    cy.log('Enter the details and click contine')
    cy.enterDetailsAndContinue(firstName, lastName, pinCode)

  })
})