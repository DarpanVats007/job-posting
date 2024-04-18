describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");

    cy.get("#root").should("exist");

    cy.get('[data-testid="job-list-location"]').should("exist").type("poland");
    cy.get('[data-testid="job-list-department"]').should("exist");
    cy.get('[data-testid="search-button"]').should("exist").click();

    cy.wait(6000);

    cy.get('[data-testid="job-list-posting-name"]').should("exist");
    cy.get('[data-testid="job-list-posting-location"]').should("exist");
    cy.get('[data-testid="navigate-to-posting"]')
      .should("exist")
      .should("be.visible")
      .first()
      .click();

    cy.get('[data-testid="job-description"]').should("exist");
    cy.get('[data-testid="job-qualifications"]').should("exist");
    cy.get('[data-testid="back"]')
      .should("exist")
      .should("be.visible")
      .first()
      .click();
  });
});
