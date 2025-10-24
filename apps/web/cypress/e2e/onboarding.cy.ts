describe("Onboarding Flow", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('input[name="email"]').type("admin@rmpos.com");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.url().should("not.include", "/login");
    cy.visit("/onboarding");
  });

  it("debería completar todo el flujo de onboarding exitosamente", () => {
    cy.contains("Información Legal").should("be.visible");
    cy.get('input[name="legalName"]').type("Mi Empresa Test S.A.");
    cy.get('input[name="cuit"]').type("20402291584");
    cy.get('input[name="cuit"]').should("have.value", "20-40229158-4");
    cy.selectRadixOption('button[role="combobox"]', "Responsable Inscripto");
    cy.contains("button", "Siguiente").click();

    cy.contains("Información Adicional").should("be.visible");
    cy.get('input[name="name"]').type("Mi Tienda Test");
    cy.get('input[name="phone"]').type("1234567890");
    cy.get('input[name="email"]').type("test@miempresa.com");
    cy.contains("button", "Siguiente").click();

    cy.contains("Configuración de Impuestos").should("be.visible");

    cy.get('button[role="checkbox"]').first().click({ force: true });
    cy.wait(300);

    cy.contains("button", "Siguiente").click();

    cy.contains("Métodos de Pago").should("be.visible");

    cy.get('button[role="checkbox"]').first().click({ force: true });
    cy.wait(300);

    cy.contains("button", "Siguiente").click();

    cy.contains("Resumen de Configuración").should("be.visible");

    cy.contains("Mi Empresa Test S.A.").should("be.visible");
    cy.contains("20-40229158-4").should("be.visible");
    cy.contains("Mi Tienda Test").should("be.visible");

    cy.url().should("include", "/onboarding");

    cy.contains("button", "Finalizar Configuración").should("be.visible");
  });

  it("debería validar los campos requeridos", () => {
    cy.contains("button", "Siguiente").click();

    cy.contains("Información Legal").should("be.visible");
  });

  it("debería formatear correctamente el CUIT", () => {
    cy.get('input[name="cuit"]').type("20402291584");

    cy.get('input[name="cuit"]').should("have.value", "20-40229158-4");

    cy.get('input[name="cuit"]').clear().type("ABC20402291584XYZ");
    cy.get('input[name="cuit"]').should("have.value", "20-40229158-4");
  });

  it("debería permitir navegar entre pasos usando el header", () => {
    cy.get('input[name="legalName"]').type("Test");
    cy.get('input[name="cuit"]').type("20402291584");
    cy.get('button[role="combobox"]').first().click();
    cy.contains("Responsable Inscripto").click();

    cy.contains("button", "Siguiente").click();

    cy.contains("Información del Negocio").should("be.visible");

    cy.contains("button", "Anterior").click();

    cy.contains("Información Legal").should("be.visible");
  });

  it("no debería enviar el formulario al presionar Enter", () => {
    cy.get('input[name="legalName"]').type("Test{enter}");

    cy.contains("Información Legal").should("be.visible");
  });

  it("debería permitir seleccionar diferentes condiciones de IVA", () => {
    cy.get('input[name="legalName"]').type("Test S.A.");
    cy.get('input[name="cuit"]').type("20402291584");

    cy.selectRadixOption('button[role="combobox"]', "Responsable Inscripto");
    cy.get('button[role="combobox"]')
      .first()
      .should("contain", "Responsable Inscripto");

    cy.selectRadixOption('button[role="combobox"]', "Monotributista");
    cy.get('button[role="combobox"]')
      .first()
      .should("contain", "Monotributista");

    cy.selectRadixOption('button[role="combobox"]', "Exento");
    cy.get('button[role="combobox"]').first().should("contain", "Exento");

    cy.selectRadixOption('button[role="combobox"]', "Consumidor Final");
    cy.get('button[role="combobox"]')
      .first()
      .should("contain", "Consumidor Final");

    cy.contains("button", "Siguiente").click();
    cy.contains("Información del Negocio").should("be.visible");
  });

  it("debería permitir seleccionar y deseleccionar impuestos y métodos de pago", () => {
    cy.get('input[name="legalName"]').type("Test S.A.");
    cy.get('input[name="cuit"]').type("20402291584");
    cy.selectRadixOption('button[role="combobox"]', "Responsable Inscripto");
    cy.contains("button", "Siguiente").click();

    cy.contains("button", "Siguiente").click();

    cy.contains("button", "Siguiente").click();

    cy.contains("Configuración de Impuestos").should("be.visible");

    cy.get('button[role="checkbox"]')
      .first()
      .then(($checkbox) => {
        const wasChecked = $checkbox.attr("data-state") === "checked";
        if ($checkbox && $checkbox[0]) {
          $checkbox[0].click();
        }
        cy.wait(200);
        cy.get('button[role="checkbox"]')
          .first()
          .should(
            "have.attr",
            "data-state",
            wasChecked ? "unchecked" : "checked"
          );
      });

    cy.get('button[role="checkbox"]').eq(1).click({ force: true });
    cy.wait(200);
    cy.get('button[role="checkbox"]')
      .eq(1)
      .should("have.attr", "data-state", "checked");

    cy.contains("button", "Siguiente").click();

    cy.contains("Métodos de Pago").should("be.visible");

    cy.get('button[role="checkbox"]').first().click({ force: true });
    cy.wait(200);
    cy.get('button[role="checkbox"]').eq(1).click({ force: true });
    cy.wait(200);

    cy.get('button[role="checkbox"]')
      .first()
      .should("have.attr", "data-state", "checked");
    cy.get('button[role="checkbox"]')
      .eq(1)
      .should("have.attr", "data-state", "checked");

    cy.contains("button", "Siguiente").click();
    cy.contains("Resumen de Configuración").should("be.visible");
  });
});
