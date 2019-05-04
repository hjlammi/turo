context('SignUp', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/#/signup');
  });

  describe('contents', () => {
    it('should have a welcome text', () => {
      cy.get('.header')
        .should('have.text', 'Welcome to turo-app!');
    });

    it('should have a signup form', () => {
      cy.get('.form')
        .find('h2')
        .should('have.text', 'Sign up');
    });

    it('should have an input field for email', () => {
      cy.get('.field')
        .find('label').first()
        .should('contain', 'Email')
        .and('have.attr', 'for', 'email');

      cy.get('.field')
        .find('input').first()
        .should('have.attr', 'id', 'email');
    });

    it('should have an input field for password', () => {
      cy.get('.field')
        .find('label').eq(1) // second label
        .should('contain', 'Password')
        .and('have.attr', 'for', 'password1');

      cy.get('.field')
        .find('input').eq(1) // second input
        .should('have.attr', 'id', 'password1');
    });

    it('should have another input field for confirming password', () => {
      cy.get('.field')
        .find('label').eq(2) // second label
        .should('contain', 'Confirm password')
        .and('have.attr', 'for', 'password2');

      cy.get('.field')
        .find('input').eq(2) // second input
        .should('have.attr', 'id', 'password2');
    });

    it('should have a disabled button when input fields are empty', () => {
      cy.get('.form')
        .find('button')
        .should('be.disabled');
    });

    it('should have a disabled button when second password is not the same as the first one', () => {
      cy.get('#email').type('elli@example.com');
      cy.get('#password1').type('lousy_password');
      cy.get('#password2').type('wrong_password');
      cy.get('.form')
        .find('button')
        .should('be.disabled');
    });

    it('should have a disabled button when second password is too short', () => {
      cy.get('#email').type('elli@example.com');
      cy.get('#password1').type('short');
      cy.get('#password2').type('short');
      cy.get('.form')
        .find('button')
        .should('be.disabled');
    });

    it('should sign up with a new customer and same password twice', () => {
      cy.get('#email').type('elli@example.com');
      cy.get('#password1').type('lousy_password');
      cy.get('#password2').type('lousy_password');
      cy.get('.form').find('button').should('not.be.disabled').click();
      cy.location('hash').should('eq', '#/confirm');
    });
  })
})
