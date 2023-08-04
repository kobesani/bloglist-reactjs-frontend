describe("Bloglist App", () => {
  beforeEach(function() {
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", () => {
    cy.contains("login");
  });

  it("login form can be shown", () => {
    cy.contains("login").click();
  });

  it("user can login", function() {
    cy.contains("login").click();
    cy.get("input#login-username").type("kobisan");
    cy.get("input#login-password").type("helloworld123");
    cy.get("button#login-submit").click();
    cy.contains("Kobi Rockata is logged in");
  });
});
