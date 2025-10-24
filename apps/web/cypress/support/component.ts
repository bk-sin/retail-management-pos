Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("pointer-events")) {
    return false;
  }
  return true;
});

Cypress.config("defaultCommandTimeout", 10000);
