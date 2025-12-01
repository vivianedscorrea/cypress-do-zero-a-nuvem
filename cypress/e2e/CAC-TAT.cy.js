describe('Aplicação Local Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10) 
    cy.get('#firstName')
      .type('Viviane')
    cy.get('#lastName')
      .type('Correa')
    cy.get('#email')
      .type('vivianecorreasv@gmail.com')
    cy.get('#phone')
      .type('51 9953764')
    cy.get('#product')
      .select('mentoria')
    cy.get('#support-type')
      .find('input[name="atendimento-tat"][value="feedback"]')
      .check()                              
    cy.get('#check')
      .find('input[name=email][value=email]')
      .check()
    cy.get('#open-text-area')
      .type(longText, {delay: 0})
    cy.contains('button', 'Enviar')
      .click()

    cy.get('.success')
      .should('be.visible','Mensagem enviada com sucesso.')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10) 
    cy.get('#firstName')
      .type('Viviane')
    cy.get('#lastName')
      .type('Correa')
    cy.get('#email')
      .type('vivianecorreasv')
    cy.get('#phone')
      .type('51 9953764')
    cy.get('#product')
      .select('mentoria')
    cy.get('#support-type')
      .find('input[name="atendimento-tat"][value="feedback"]')
      .check()                                    
    cy.get('#check')
      .find('input[name=email][value=email]')
      .check()
    cy.get('#open-text-area')
      .type(longText, {delay: 0})
    cy.contains('button', 'Enviar')
      .click()

    cy.get('.error').should('be.visible','Valide os campos obrigatórios!')
    })

    it('campo telefone continua vazio quando preenchido com valor não numerico', () => {
    cy.get('#phone')
      .type('abc')
      .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10) 
    cy.get('#firstName')
      .type('Viviane')
    cy.get('#lastName')
      .type('Correa')
    cy.get('#email')
      .type('vivianecorreasv@gmail.com')
    cy.get('#product')
      .select('mentoria')
    cy.get('#support-type')
      .find('input[name="atendimento-tat"][value="feedback"]')
      .check()                                    
    cy.get('#check')
      .find('input[name=phone][value=phone]')
      .check()
    cy.get('#open-text-area')
      .type(longText, {delay: 0})
    cy.contains('button', 'Enviar')
      .click()
    cy.get('.error')
      .should('be.visible','Valide os campos obrigatórios!')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10) 
    cy.get('#firstName')
      .type('Viviane')                          // digita no input
      .should('have.value', 'Viviane')          // valida que digitou certo
      .clear()                                  // limpa o campo
      .should('have.value', '')
    cy.get('#lastName')
      .type('Correa')
      .should('have.value', 'Correa')          // valida que digitou certo
      .clear()                                  // limpa o campo
      .should('have.value', '')
    cy.get('#email')
      .type('vivianecorreasv@gmail.com')
      .should('have.value', 'vivianecorreasv@gmail.com')          // valida que digitou certo
      .clear()                                  // limpa o campo
      .should('have.value', '')
    cy.get('#phone')
      .type('519953764')
      .should('have.value', '519953764')
      .clear()
      .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10) 
    cy.contains('button', 'Enviar')
      .click()

    cy.get('.error').should('be.visible','Valide os campos obrigatórios!')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
      const data = {
        firstName: 'Viviane',
        lastName: 'Correa',
        email: 'vivianecorreasv@gmail.com',
        text: 'Teste.'
      }
      cy.fillMandatoryFieldsAndSubmit(data)

      cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
      cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
      cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
      cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked');
    })

    it('Marca cada tipo de atendimento', () => {
      cy.get('#support-type input[type="radio"]').each(($item) => {
        cy.wrap($item).check().should('be.checked');
      })
    })

    it.only('Marca ambos checkboxes, depois desmarca o último', () => {
      cy.get('.group input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('.group input[type="checkbox"]').check().should('be.checkbox')
        cy.get('.button button[type="submit"]').click()
        cy.get('.error').should('be.visible','Valide os campos obrigatórios!')
    })

    it.only('seleciona um arquivo da pasta fixtures', () => {
      cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
      .should((input) => {

      })
    })
  }) 