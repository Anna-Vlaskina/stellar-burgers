describe('Тестирование страницы конструктора бургера', () => {
  describe('Тестирование конструктора', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/ingredients', {
        fixture: 'ingredients.json'
      }).as('getIngredients');

      cy.visit('/');
      cy.wait('@getIngredients');

      cy.get('[data-testid="ingredient-item"]', { timeout: 8000 }).should('have.length.at.least', 1);
    });

    it('Добавление булки в конструктор', () => {
      cy.get('[data-testid="ingredient-item"]')
        .contains('Булка тестовая')
        .parent()
        .as('bunItem');
      cy.get('@bunItem').contains('Добавить').click();
      cy.get('[data-testid="constructor-bun"]').should('have.length', 2);
    });

    it('Добавление начинки в конструктор', () => {
      cy.get('[data-testid="ingredient-item"]')
        .contains('Начинка тестовая')
        .parent()
        .as('mainItem');
      cy.get('@mainItem').contains('Добавить').click();
      cy.get('[data-testid="constructor-element"]').should('have.length.at.least', 1);
    });

    it('Добавление соуса в конструктор', () => {
      cy.get('[data-testid="ingredient-item"]')
        .contains('Соус тестовый')
        .parent()
        .as('sauceItem');
      cy.get('@sauceItem').contains('Добавить').click();
      cy.get('[data-testid="constructor-element"]').should('have.length.at.least', 1);
    });

    describe('Тестирование модального окна ингредиента', () => {
      beforeEach(() => {
        cy.contains('[data-testid="ingredient-item"]', 'Соус тестовый').click();
        cy.get('[data-testid="modal"]').should('be.visible');
        cy.get('[data-testid="ingredient-details-name"]').should('contain', 'Соус тестовый');
      });
      
      it('Закрытие по клику на крестик', () => {
        cy.get('[data-testid="modal-close"]').click();
        cy.get('[data-testid="modal"]').should('not.exist');
      });

      it('Закрытие по клику на оверлей', () => {
        cy.get('[data-testid="modal-overlay"]').click({ force: true });
        cy.get('[data-testid="modal"]').should('not.exist');
      });
    });
  });
  
  describe('Создание заказа с авторизацией', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'Bearer mock-access-token');
      cy.window().then(win => {
        win.localStorage.setItem('refreshToken', 'mock-refresh-token');
      });

      cy.intercept('GET', '**/api/ingredients**', {
        statusCode: 200,
        fixture: 'ingredients.json'
      }).as('getIngredients');

      cy.intercept('POST', '**/api/orders', {
        statusCode: 200,
        fixture: 'order.json'
      }).as('createOrder');

      cy.intercept('GET', '**/api/orders/*', {
        statusCode: 200,
        fixture: 'order-details.json'
      }).as('getOrderByNumber');

      cy.intercept('GET', '**/api/auth/user**', {
        statusCode: 200,
        fixture: 'user.json'
      });

      cy.visit('/');
      cy.wait('@getIngredients');
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      cy.window().then(win => {
        win.localStorage.removeItem('refreshToken');
      });
    });

    it('Авторизованный пользователь создаёт заказ', () => {
      cy.contains('[data-testid="ingredient-item"]', 'Булка тестовая')
        .within(() => cy.contains('Добавить').click());

      cy.contains('[data-testid="ingredient-item"]', 'Начинка тестовая')
        .within(() => cy.contains('Добавить').click());

      cy.get('[data-testid="constructor-element"]').should('have.length.at.least', 1);

      cy.get('[data-testid="constructor-button"]').click();

      cy.wait('@createOrder');

      cy.get('[data-testid="modal"]').should('be.visible');
      cy.get('[data-testid="order-number"]').should('contain.text', '12345');

      cy.get('[data-testid="modal-close"]').click();
      cy.get('[data-testid="modal"]').should('not.exist');

      cy.get('[data-testid="constructor-element"]').should('have.length', 0);
    });
  });
});
