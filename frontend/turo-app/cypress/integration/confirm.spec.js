context('Confirmation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/#/confirm');
  });

  describe('contents', () => {
    it('should have a thank you text', () => {
      cy.get('.confirmation > p')
        .should('have.text', 'Thanks for signing up!');
    });

    it('should have a link to the login page', () => {
      cy.get('.link')
        .should('have.text', 'Login')
        .click();

      cy.location('hash').should('eq', '#/login');
    });
  })
})
