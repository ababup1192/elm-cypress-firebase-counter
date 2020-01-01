describe("Elm Counter Test", function() {
  const counterButtonElementId = '[data-cypress-id="counter-num"]';

  beforeEach(function() {
    cy.visit("http://localhost:1234/");

    cy.get(counterButtonElementId).should("not.have.text", "Now loading");
    cy.contains("reset").click();
  });

  it("Increment number", function() {
    cy.contains("+").click();

    cy.get(counterButtonElementId).should("have.text", "1");
  });

  it("Decrement number", function() {
    cy.contains("-").click();

    cy.get(counterButtonElementId).should("have.text", "-1");
  });
});
