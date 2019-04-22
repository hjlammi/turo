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

    it('should have another input field for confirming password', () => {
      cy.get('.field')
        .find('label').eq(2) // second label
        .should('contain', 'Confirm password')
        .and('have.attr', 'for', 'password');

      cy.get('.field')
        .find('input').eq(2) // second input
        .should('have.attr', 'id', 'password');
    });

    it('should have a login button', () => {
      cy.get('.form')
        .find('button')
        .should('have.length', 1);
    });
  })
})
