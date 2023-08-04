describe("Bloglist App", () => {
  beforeEach(function() {
    cy.visit("");
  });

  it("front page can be opened", () => {
    cy.get("html").contains("login");
  });

  describe("Login", () => {
    beforeEach(function() {
      cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
      cy.createUser({
        name: "Kobi Rockata",
        username: "kobisan",
        password: "helloworld123"
      });
    });

    it("login form can be shown", () => {
      cy.get("button#login-toggle").click();
    });

    it("user can login", function() {
      cy.contains("login").click();
      cy.get("input#login-username").type("kobisan");
      cy.get("input#login-password").type("helloworld123");
      cy.get("button#login-submit").click();
      cy.contains("Kobi Rockata is logged in");
    });

    it("login fails with wrong password", function() {
      cy.contains("login").click();
      cy.get("input#login-username").type("kobisan");
      cy.get("input#login-password").type("helloworld12");
      cy.get("button#login-submit").click();
      cy
        .get(".error")
        .should("contain", "Invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
      cy
        .get("html")
        .should("not.contain", "Kobi Rockata is logged in");
    });
  });

  describe("when logged in", () => {
    beforeEach(function () {
      cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset-blogs-only`);
      cy.login({ username: "kobisan", password: "helloworld123" });

    });

    it("a new blog can be added", () => {
      const testBlog = {
        author: "Test Author",
        title: "Test title",
        url: "https://testurl.com"
      };

      cy.get("button#add-blog-toggle").click();
      cy.get("input#author-input").type(testBlog.author);
      cy.get("input#title-input").type(testBlog.title);
      cy.get("input#url-input").type(testBlog.url);

      cy.get("button#new-blog-submit").click();
      cy.contains(`${testBlog.title} ${testBlog.author}`);
    });

    describe("when a blog already exists", () => {
      beforeEach(function() {
        cy.createBlog({
          url: "test url",
          author: "test author",
          title: "test title"
        });
      });

      it("test new blog shown", () => {
        cy.contains("test author");
        cy.get("button#blog-toggle").first().click();
        cy.get("button#like-button").first().click();
      });
    });
  });
});
