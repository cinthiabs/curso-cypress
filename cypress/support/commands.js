Cypress.Commands.add('fillMandatoryFieldAndSubmit', function() {
    cy.get('#firstName').type('Cinthia')
    cy.get('#lastName').type('Barbosa')
    cy.get('#email').type('cinthia@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('.button','Enviar').click()
})