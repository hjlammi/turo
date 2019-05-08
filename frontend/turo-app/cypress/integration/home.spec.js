context('Home', () => {
  beforeEach(() => {
    cy.request('DELETE', 'http://localhost:4000/e2e/users');
    cy.request('POST', 'http://localhost:4000/users/register', { username: 'alice', email: 'alice@example.com', password: 'alices_password' });
    cy.visit('http://localhost:3000/#/login');
    cy.get('#email').type('alice@example.com');
    cy.get('#password').type('alices_password');
    cy.get('#loginButton').click();
  });

  // After logging in, Alice doesn't see the welcome text anymore but there is
  // a logout link in the header
  describe('header component', () => {
    it('should not have the welcome text in the header', () => {
      cy.get('.header').should('not.have.text', 'Welcome to turo-app!');
    })
  })
})
