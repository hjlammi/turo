context('SignUp', () => {
  before(() => {
    cy.request('DELETE', 'http://localhost:4000/e2e/users');
  });

  // Alice has heard of a new social media platform which she wants to try out.
  describe('redirect to login page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/#');
    });

    // She visits the application's main page and is redirected to the login page because she is not logged in.
    it('should redirect from main page to login page', () => {
      cy.location('hash').should('eq', '#/login');
    });

    // Because Alice has not signed up to the application before, she clicks the
    // link to the sign up page.
    it('should have a link to the sign up page', () => {
      cy.location('hash').should('eq', '#/login');
      cy.get('.link').click();
      cy.location('hash').should('eq', '#/signup');
    });
  })

  describe('signup page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/#/signup');
    });

    // Alice tries to sign up by providing her email address and the same password twice
    // but her password is less than 10 characters long i.e. too short so the sign up button remains disabled.
    it('should have a disabled button when the password is too short', () => {
      cy.get('#email').type('alice@example.com');
      cy.get('#password1').type('short');
      cy.get('#password2').type('short');
      cy.get('.form')
      .find('button')
      .should('be.disabled');
    });

    // Alice tries to sign up by providing her email address and the same password twice
    // but she mistypes the second password and cannot click the sign up button which remains disabled.
    it('should have a disabled button when second password is not the same as the first one', () => {
      cy.get('#email').type('alice@example.com');
      cy.get('#password1').type('alices_password');
      cy.get('#password2').type('alices_passsword');
      cy.get('.form')
        .find('button')
        .should('be.disabled');
    });

    // Alice finally manages to sign up successfully with a long enough password typed the same way both times.
    it('should sign up with a new customer and same password twice', () => {
      cy.get('#email').type('alice@example.com');
      cy.get('#password1').type('alices_password');
      cy.get('#password2').type('alices_password');
      cy.get('.form').find('button').should('not.be.disabled').click();
      // Alice is then redirected to the confirmation page.
      cy.location('hash').should('eq', '#/confirm');
    });
  })

  // From the confirmation page Alice can travel to login page by clicking Login link.
  describe('confirmation page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/#/confirm');
    });

    it('should have a link to the login page', () => {
      cy.get('.link')
        .should('have.text', 'Login')
        .click();
      cy.location('hash').should('eq', '#/login');
    });
  });
})
