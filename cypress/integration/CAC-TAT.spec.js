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
        cy.get('#phone-checkbox').check()
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
    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product').select('YouTube').should('have.value','youtube')
    }) 
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria').should('have.value','mentoria')
    }) 
    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value','blog')
    })
    it('marca o tipo de atendimento "Feedback"',function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
    })
    it('arca cada tipo de atendimento',function(){
        cy.get('input[type="radio"]').should('have.length',3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]').check().should('be.checked')
        .last().uncheck().should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures',function(){
        cy.get('input[type="file"]').should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it.only('seleciona um arquivo simulando um drag-and-drop',function(){
        cy.get('input[type="file"]').should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}) // simular explorador de arquivos do computador
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
})
