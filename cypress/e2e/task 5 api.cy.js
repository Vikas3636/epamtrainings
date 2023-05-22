describe('API Testing', () => {
    let books
    let index = 0
    let indexForMock = 1
    let mockedBooks


    it.only('demo books without mocking', () => {
        cy.fixture("apiDemoQaBooks").then((bookDetails) => {
            books = bookDetails
        })
        cy.request('GET', 'https://demoqa.com/BookStore/v1/Books').then((response) => {
            expect(response.status).to.equal(200)
            books.forEach((book) => {
                expect(response.body.books[index].isbn).to.equal(book.isbn)
                expect(response.body.books[index].title).to.equal(book.title)
                expect(response.body.books[index].subTitle).to.equal(book.subTitle)
                expect(response.body.books[index].author).to.equal(book.author)
                expect(response.body.books[index].publish_date).to.equal(book.publish_date)
                expect(response.body.books[index].publisher).to.equal(book.publisher)
                expect(response.body.books[index].pages).to.equal(book.pages)
                expect(response.body.books[index].description).to.equal(book.description)
                index++
            })
            cy.visit("https://demoqa.com/books")
            books.forEach((book) => {
                cy.get('a:contains("' + book.title + '")').click({ force: true })
                cy.get('#ISBN-wrapper #userName-value').should('have.text', book.isbn)
                cy.get('#title-wrapper #userName-value').should('have.text', book.title)
                cy.get('#subtitle-wrapper #userName-value').should('have.text', book.subTitle)
                cy.get('#author-wrapper #userName-value').should('have.text', book.author)
                cy.get('#publisher-wrapper #userName-value').should('have.text', book.publisher)
                cy.get('#pages-wrapper #userName-value').should('have.text', book.pages)
                cy.get('#description-wrapper #userName-value').should('have.text', book.description)
                cy.go('back')

            })
        })
    })

    

    it('demo books aftermocking', () => {
        cy.fixture("apiMocking").then((mockedBookDetails) => {
            mockedBooks = mockedBookDetails
        })
        cy.visit('https://demoqa.com')
        cy.intercept('GET', 'https://demoqa.com/BookStore/v1/Books', { fixture: 'mockBooks.json' }).as('interceptTest')
        cy.xpath("//h5[normalize-space()='Book Store Application']").click()
        cy.wait('@interceptTest').then((mockedResponse) => {
            const responseMock = mockedResponse.response
            expect(mockedResponse.response.statusCode).to.eq(200)
            mockedBooks.forEach((mockedBook) => {
                expect(responseMock.body.books[index].isbn).to.equal(mockedBook.isbn)
                expect(responseMock.body.books[index].title).to.equal(mockedBook.title)
                expect(responseMock.body.books[index].subTitle).to.equal(mockedBook.subTitle)
                expect(responseMock.body.books[index].author).to.equal(mockedBook.author)
                expect(responseMock.body.books[index].publish_date).to.equal(mockedBook.publish_date)
                expect(responseMock.body.books[index].publisher).to.equal(mockedBook.publisher)
                expect(responseMock.body.books[index].pages).to.equal(mockedBook.pages)
                expect(responseMock.body.books[index].description).to.equal(mockedBook.description)
                index++
            })
            mockedBooks.forEach((mockedBook) => {
                cy.get('.rt-tr-group:nth-of-type(' + indexForMock + ') .mr-2>a').should('contains.text', mockedBook.title)
                cy.get('.rt-tr-group:nth-of-type(' + indexForMock + ') .rt-td:nth-of-type(3)').should('have.text', mockedBook.author)
                cy.get('.rt-tr-group:nth-of-type(' + indexForMock + ') .rt-td:nth-of-type(4)').should('have.text', mockedBook.publisher)
                indexForMock++
            })
        })
    })
})