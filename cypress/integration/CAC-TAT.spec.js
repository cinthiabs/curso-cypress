/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function() {  //suite de teste
    beforeEach(() => {
        cy.visit('./src/index.html')   
    });

    it('Verifique o titulo da aplicação',function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it('Preenche os campos obrigatórios e envia o formulário', function() { // teste case
        const longText = 'meu primeiro teste! meu primeiro teste! meu primeiro teste! meu primeiro teste! meu primeiro teste! meu primeiro teste! meu primeiro teste! meu primeiro teste! meu primeiro teste!';
        cy.get('#firstName').type('Cinthia')
        cy.get('#lastName').type('Barbosa')
        cy.get('#email').type('cinthia@gmail.com')
        cy.get('#open-text-area').type(longText,{delay: 0})
        cy.contains('.button','Enviar').click()
        cy.get('.success').should('be.visible','Sucesso')
    })
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() { // teste case
        cy.get('#firstName').type('Cinthia')
        cy.get('#lastName').type('Barbosa')
        cy.get('#email').type('cinthiagmail.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('.button','Enviar').click()
        cy.get('.error > strong').should('be.visible')

    })  
    
    it('Campo telefone continua vazio quando preenchido com valor não númerico', function() { // teste case
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value','')
   })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Cinthia')
        cy.get('#lastName').type('Barbosa')
        cy.get('#email').type('cinthiagmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.contains('.button','Enviar').click()

        cy.get('.error > strong').should('be.visible')
       
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Cinthia').should('have.value','Cinthia' ).clear().should('have.value','' )
        cy.get('#lastName').type('Barbosa').should('have.value','Barbosa' ).clear().should('have.value','' )
        cy.get('#email').type('cinthia@gmail.com').should('have.value','cinthia@gmail.com' ).clear().should('have.value','' )
        cy.get('#phone').type(12345678).should('have.value',12345678 ).clear().should('have.value','' )
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('.button','Enviar').click()
        cy.get('.error > strong').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldAndSubmit()
        cy.get('.success').should('be.visible','Sucesso')
    })   
})
