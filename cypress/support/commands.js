// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", ({ username, password }) => {
  cy
    .request(
      "POST",
      `${Cypress.env("BACKEND")}/login`,
      { username, password })
    .then(
      response => {
        localStorage.setItem(
          "loggedBloglistAppUser",
          JSON.stringify(response.body)
        );
        cy.visit("");
      }
    );

});

Cypress.Commands.add("createUser", ({ name, username, password }) => {
  cy
    .request({
      url: `${Cypress.env("BACKEND")}/users`,
      method: "POST",
      body: { name, username, password }
    })
    // eslint-disable-next-line no-unused-vars
    .then(response => cy.visit(""));
});

Cypress.Commands.add("createBlog", ({ url, author, title }) => {
  cy
    .request({
      url: `${Cypress.env("BACKEND")}/blogs`,
      method: "POST",
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("loggedBloglistAppUser")).token}`
      },
      body: { url, author, title }
    }
    ).then(
      // eslint-disable-next-line no-unused-vars
      response => cy.visit("")
    );
});