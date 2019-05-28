context('Logout', () => {
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
        cy.request({
          method: 'POST',
          url: 'http://localhost:4000/users/login',
          headers: {
            'csrf-token': response.body
          },
          body: {
            email: 'alice@example.com',
            password: 'alices_password'
          }
        });
        cy.visit('http://localhost:3000/#/');
    });
  });

  // Alice is logged in and wants to log out from the application.
  describe('logout functionality', () => {
    // She clicks the logout link and is logged out from the application and redirected to the login page.
    it('should redirect to the login page when logout link clicked', () => {
      cy.get('.link').click();
      cy.location('hash').should('eq', '#/');
      cy.location('hash').should('eq', '#/login');

      // Alice remembers that she forgot to write a post and logs in again.
      cy.get('#email').type('alice@example.com');
      cy.get('#loginButton').should('be.disabled');
      cy.get('#password').type('alices_password');
      cy.get('#loginButton').click();
      cy.location('hash').should('eq', '#/');
    });
  })
})
