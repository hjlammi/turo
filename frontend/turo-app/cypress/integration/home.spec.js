context('Home', () => {
  before(() => {
    cy.request('DELETE', 'http://localhost:4000/e2e/users');
    cy.request('POST', 'http://localhost:4000/users/register', { username: 'alice', email: 'alice@example.com', password: 'alices_password' });
    cy.visit('http://localhost:3000/#/login');
    cy.get('#email').type('alice@example.com');
    cy.get('#password').type('alices_password');
    cy.get('#loginButton').click();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  // After logging in, Alice doesn't see the welcome text anymore but there is
  // a logout link in the header
  describe('header component', () => {
    it('should not have the welcome text in the header', () => {
      cy.get('.header').should('not.have.text', 'Welcome to turo-app!');
    })
  });

  // There is an input field for writing a post and Alice decides to write her first posts.
  describe('writing a post', () => {
    it('should show a new post written by the user on top of the posts feed', () => {
      cy.get('#post').type('This is my first post, yay!');
      cy.get('button').click();
      cy.get('li:first-child .content').should('have.text', 'This is my first post, yay!');
      cy.get('#post').type('This is my second post!');
      cy.get('button').click();
      cy.get('li:first-child .content').should('have.text', 'This is my second post!');
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
