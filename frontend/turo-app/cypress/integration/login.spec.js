/// <reference types="Cypress" />

context('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/#/login');
  });

  describe('contents', () => {
    it('should have a welcome text', () => {
      cy.get('.header')
        .should('have.text', 'Welcome to turo-app!');
    });

    it('should have a login form', () => {
      cy.get('.form')
        .find('h2')
        .should('have.text', 'Login');
    });

    it('should have an input field for username', () => {
      cy.get('.field')
        .find('label').first()
        .should('contain', 'Username')
        .and('have.attr', 'for', 'username');

      cy.get('.field')
        .find('input').first()
        .should('have.attr', 'id', 'username');
    });

    it('should have an input field for password', () => {
      cy.get('.field')
        .find('label').eq(1) // second label
        .should('contain', 'Password')
        .and('have.attr', 'for', 'password');

      cy.get('.field')
        .find('input').eq(1) // second input
        .should('have.attr', 'id', 'password');
    });

    it('should have a login button', () => {
      cy.get('.form')
        .find('button')
        .should('have.length', 1);
    });
  //       .find('tbody tr:last')
  //       .should('have.class', 'success')
  //       .find('td')
  //       .first()
  //       // checking the text of the <td> element in various ways
  //       .should('have.text', 'Column content')
  //       .should('contain', 'Column content')
  //       .should('have.html', 'Column content')
  //       // chai-jquery uses "is()" to check if element matches selector
  //       .should('match', 'td')
  //       // to match text content against a regular expression
  //       // first need to invoke jQuery method text()
  //       // and then match using regular expression
  //       .invoke('text')
  //       .should('match', /column content/i)
  //
  //     // a better way to check element's text content against a regular expression
  //     // is to use "cy.contains"
  //     // https://on.cypress.io/contains
  //     cy.get('.assertion-table')
  //       .find('tbody tr:last')
  //       // finds first <td> element with text content matching regular expression
  //       .contains('td', /column content/i)
  //       .should('be.visible')
  //
  //     // for more information about asserting element's text
  //     // see https://on.cypress.io/using-cypress-faq#How-do-I-get-an-element’s-text-contents
  //   })
  //
    // it('.and() - chain multiple assertions together', () => {
    //   // https://on.cypress.io/and
    //   cy.get('.assertions-link')
    //     .should('have.class', 'active')
    //     .and('have.attr', 'href')
    //     .and('include', 'cypress.io')
    // })
  // })
  //
  // describe('Explicit Assertions', () => {
  //   // https://on.cypress.io/assertions
  //   it('expect - make an assertion about a specified subject', () => {
  //     // We can use Chai's BDD style assertions
  //     expect(true).to.be.true
  //     const o = { foo: 'bar' }
  //
  //     expect(o).to.equal(o)
  //     expect(o).to.deep.equal({ foo: 'bar' })
  //     // matching text using regular expression
  //     expect('FooBar').to.match(/bar$/i)
  //   })
  //
  //   it('pass your own callback function to should()', () => {
  //     // Pass a function to should that can have any number
  //     // of explicit assertions within it.
  //     // The ".should(cb)" function will be retried
  //     // automatically until it passes all your explicit assertions or times out.
  //     cy.get('.assertions-p')
  //       .find('p')
  //       .should(($p) => {
  //         // https://on.cypress.io/$
  //         // return an array of texts from all of the p's
  //         // @ts-ignore TS6133 unused variable
  //         const texts = $p.map((i, el) => Cypress.$(el).text())
  //
  //         // jquery map returns jquery object
  //         // and .get() convert this to simple array
  //         const paragraphs = texts.get()
  //
  //         // array should have length of 3
  //         expect(paragraphs, 'has 3 paragraphs').to.have.length(3)
  //
  //         // use second argument to expect(...) to provide clear
  //         // message with each assertion
  //         expect(paragraphs, 'has expected text in each paragraph').to.deep.eq([
  //           'Some text from first p',
  //           'More text from second p',
  //           'And even more text from third p',
  //         ])
  //       })
  //   })
  //
  //   it('finds element by class name regex', () => {
  //     cy.get('.docs-header')
  //       .find('div')
  //       // .should(cb) callback function will be retried
  //       .should(($div) => {
  //         expect($div).to.have.length(1)
  //
  //         const className = $div[0].className
  //
  //         expect(className).to.match(/heading-/)
  //       })
  //       // .then(cb) callback is not retried,
  //       // it either passes or fails
  //       .then(($div) => {
  //         expect($div, 'text content').to.have.text('Introduction')
  //       })
  //   })
  //
  //   it('can throw any error', () => {
  //     cy.get('.docs-header')
  //       .find('div')
  //       .should(($div) => {
  //         if ($div.length !== 1) {
  //           // you can throw your own errors
  //           throw new Error('Did not find 1 element')
  //         }
  //
  //         const className = $div[0].className
  //
  //         if (!className.match(/heading-/)) {
  //           throw new Error(`Could not find class "heading-" in ${className}`)
  //         }
  //       })
  //   })
  //
  //   it('matches unknown text between two elements', () => {
  //     /**
  //      * Text from the first element.
  //      * @type {string}
  //     */
  //     let text
  //
  //     /**
  //      * Normalizes passed text,
  //      * useful before comparing text with spaces and different capitalization.
  //      * @param {string} s Text to normalize
  //     */
  //     const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase()
  //
  //     cy.get('.two-elements')
  //       .find('.first')
  //       .then(($first) => {
  //         // save text from the first element
  //         text = normalizeText($first.text())
  //       })
  //
  //     cy.get('.two-elements')
  //       .find('.second')
  //       .should(($div) => {
  //         // we can massage text before comparing
  //         const secondText = normalizeText($div.text())
  //
  //         expect(secondText, 'second text').to.equal(text)
  //       })
  //   })
  //
  //   it('assert - assert shape of an object', () => {
  //     const person = {
  //       name: 'Joe',
  //       age: 20,
  //     }
  //
  //     assert.isObject(person, 'value is object')
  })
})