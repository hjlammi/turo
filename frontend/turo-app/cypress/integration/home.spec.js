context('Home', () => {
  before(() => {
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

  // There is an input field for writing a post and Alice decides to write her first post.
  describe('writing a post', () => {
    it('should show a new post on top of the posts feed', () => {
      cy.get('#post').type('This is my first post, yay!');
    })
  });

  // When Alice wants to log out from the application she clicks the "Log out" link
  // on the right side of the header and is logged out of the application and redirected to the login page.
  describe('logging out', () => {
    it('should not redirect to the login page when log out link is clicked', () => {
      cy.get('.header .link').click();
      cy.location('hash').should('eq', '#/login');
    });
  })
})
