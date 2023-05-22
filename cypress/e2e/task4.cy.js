describe('cypress training task4', () => {

    let products
    let index = 3 //products starts from Index 3rd div

    before(() => {
        cy.fixture("productDetails").then((productDetails) => {
            products = productDetails
        })
    })

    it('saucedemoTest', () => {

        cy.log('Open the website')
        cy.visit('https://www.saucedemo.com/')
            .debug()

        cy.log('login with standard user')
        cy.login('standard_user', 'secret_sauce')

        products.forEach((products) => {
            cy.xpath("//div[normalize-space()='" + products.productName + "']/ancestor::div[@class='inventory_item_description']//button[@class='btn btn_primary btn_small btn_inventory']").click()
        })
        cy.log('click add to cart and go to cart page')
        cy.get('.shopping_cart_link').click()

        products.forEach((products) => {
            let productName = products.productName
            let productPrice = products.productPrice
            cy.get('.cart_list>div:nth-of-type(' + index + ') .inventory_item_name').should('have.text', productName)
            cy.get('.cart_list>div:nth-of-type(' + index + ') .inventory_item_price').should('contains.text', productPrice)
            index++
        })

    })

})