context('Login', () => {
  before(() => {
    cy.request('GET', 'http://localhost:4000/csrf-token')
      .then((response) => {
        cy.request('DELETE', 'http://localhost:4000/e2e/users');
        cy.request({
          method: 'POST',
          url: 'http://localhost:4000/users/register',
          headers: {
            'csrf-token': response.body
          },
          body: {
            username: 'alice',
            email: 'alice@example.com',
            password: 'alices_password'
          }
      });
    });
  });

  beforeEach(() => {
    cy.visit('http://localhost:3000/#/login');
  });

  // Alice has previously registered with the email 'alice@example.com' and password 'alices_password'.
  describe('login page', () => {
    // Alice types in her email but the Login button remains disabled without the password.
    it('should have login button disabled when only email is typed', () => {
      cy.get('#email').type('alice@example.com');
      cy.get('#loginButton').should('be.disabled');
      // Alice mistypes her password and an error message appears telling her that she made a mistake either with the email or the password.
      // (We don't want to tell a possible attacker which one was correct.)
      cy.get('#password').should('have.attr', 'type', 'password').type('wrong_password');
      cy.get('#loginButton').click();
      cy.get('.error').should('have.text', 'Wrong email or password!');
      // When Alice types in her email and password correctly, the login button is enabled.
      // She clicks the button and is redirected to the main page.
      cy.get('#password').clear().type('alices_password');
      cy.get('#loginButton').click();
      cy.location('hash').should('eq', '#/');
    });
  })
})
