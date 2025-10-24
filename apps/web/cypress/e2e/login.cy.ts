describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("debería iniciar sesión correctamente con credenciales válidas", () => {
    cy.get('input[name="email"]').type("admin@rmpos.com");
    cy.get('input[name="password"]').type("admin123");

    cy.get('button[type="submit"]').click();

    cy.url().should("not.include", "/login");
    cy.url().should("include", "/dashboard");
  });

  it("debería mostrar error con credenciales inválidas", () => {
    cy.get('input[name="email"]').type("wrong@email.com");
    cy.get('input[name="password"]').type("wrongpassword");

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/login");
  });

  it("debería validar campos requeridos", () => {
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/login");
  });

  it("debería validar formato de email", () => {
    cy.get('input[name="email"]').type("notanemail");
    cy.get('input[name="password"]').type("password123");

    cy.get('input[name="email"]').should("have.attr", "type", "email");
  });
});
