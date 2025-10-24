/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      fillOnboardingLegalInfo(data: {
        legalName: string;
        cuit: string;
        ivaCondition: string;
      }): Chainable<void>;
      selectRadixOption(
        triggerSelector: string,
        optionText: string
      ): Chainable<void>;
      checkRadixCheckbox(label: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit("/login");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should("not.include", "/login");
  });
});

Cypress.Commands.add("fillOnboardingLegalInfo", (data) => {
  cy.get('input[name="legalName"]').clear().type(data.legalName);
  cy.get('input[name="cuit"]').clear().type(data.cuit);
  cy.selectRadixOption('button[role="combobox"]', data.ivaCondition);
});

Cypress.Commands.add(
  "selectRadixOption",
  (triggerSelector: string, optionText: string) => {
    cy.document().then((doc) => {
      doc.body.style.pointerEvents = "auto";
      doc.body.removeAttribute("data-scroll-locked");
    });

    cy.get(triggerSelector)
      .first()
      .should("be.visible")
      .then(($trigger) => {
        if ($trigger && $trigger[0]) {
          $trigger[0].click();
        }
      });

    cy.get('[role="listbox"]', { timeout: 5000 }).should("be.visible");

    cy.document().then((doc) => {
      doc.body.style.pointerEvents = "auto";
    });

    cy.get('[role="option"]')
      .filter(`:contains("${optionText}")`)
      .first()
      .should("be.visible")
      .then(($option) => {
        if ($option && $option[0]) {
          $option[0].click();
        }
      });

    cy.wait(300);
  }
);

Cypress.Commands.add("checkRadixCheckbox", (label: string) => {
  cy.contains("label", label, { matchCase: false })
    .parents(".flex.items-center")
    .find('button[role="checkbox"]')
    .then(($checkbox) => {
      const isChecked = $checkbox.attr("data-state") === "checked";
      if (!isChecked && $checkbox && $checkbox[0]) {
        $checkbox[0].click();
      }
    });

  cy.wait(200);
});

export {};
