/// <reference types="Cypress" />

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Minh Vo",
      username: "minhvo",
      password: "password"
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is show", function () {
    cy.contains("Log in to application");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy
        .get("#username")
        .type("minhvo");
      cy
        .get("#password")
        .type("password");
      cy
        .get("button")
        .click();

      cy.contains("Minh Vo logged in");
    });

    it("fails with wrong credentials", function () {
      cy
        .get("#username")
        .type("minhvo");
      cy
        .get("#password")
        .type("aaaa");
      cy
        .get("button")
        .click();

      cy
        .get("html")
        .should("not.contain", "Minh Vo logged in");
      cy.contains("invalid username or password");
    });

    describe("When logged in", function () {
      beforeEach(function () {
        cy.login({
          username: "minhvo",
          password: "password"
        });
      });

      it("A blog can be created", function () {
        cy
          .contains("new blog")
          .click();

        cy
          .get("#title")
          .type("New blog");
        cy
          .get("#author")
          .type("Author");
        cy
          .get("#url")
          .type("url.com");
        cy
          .contains("create")
          .click();

        cy.contains("New blog Author");
      });

      describe("and a blog exists", function () {
        beforeEach(function () {
          cy.createBlog({
            title: "New blog",
            author: "Author",
            url: "url.com"
          });
        });

        it("user can like a blog", function () {
          cy
            .contains("New blog Author")
            .parent()
            .find("button")
            .click();
          cy
            .contains("New blog Author")
            .parent()
            .find(".likeButton")
            .click();

          cy.contains("likes 1");
        });

        it("user can remove their blog", function () {
          cy.createBlog({
            title: "Temporary blog",
            author: "Author",
            url: "url.com"
          });

          cy
            .contains("Temporary blog Author")
            .parent()
            .find("button")
            .click();
          cy
            .contains("Temporary blog Author")
            .parent()
            .find(".removeButton")
            .click();

          cy
            .get("html")
            .should("not.contain", "Temporary blog Author");
        });

      });
    });
  });
});