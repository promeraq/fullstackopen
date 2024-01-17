describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Superuser",
      username: "root",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:5173");
  });

  it.only("front page can be opened", function () {
    cy.contains("BLOGS");
  });

  it("login form is shown", function () {
    cy.contains("Log in").click();
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("Log in").click();
      cy.get("#username").type("root");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();

      cy.contains("Superuser logged in");
    });
    it("fails with wrong credentials", function () {
      cy.contains("Log in").click();
      cy.get("#username").type("root");
      cy.get("#password").type("root");
      cy.get("#login-button").click();

      cy.contains("Wrong credentials");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
        username: "root",
        password: "salainen",
      }).then((response) => {
        localStorage.setItem(
          "loggedBlogappUser",
          JSON.stringify(response.body)
        );
        cy.visit("");
      });
    });

    it("A blog can be created", function () {
      cy.contains("Create new").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("Anonim");
      cy.get("#url").type("www.google.com");
      cy.contains("save").click();
      cy.contains("a blog created by cypress");
    });
    it("blog can be liked", function () {
      cy.createBlog({
        title: "New Blog",
        author: "Authro",
        url: "url",
      });
      cy.get(".showContent").click();
      cy.contains("likes:0");
      cy.get("#likeButton").click();
      cy.contains("likes:1");
    });
  });
  describe("When logged in only the post entry creator can delete it", function () {
    beforeEach(function () {
      cy.login({ username: "root", password: "salainen" });
      cy.createBlog({
        title: "new blog",
        author: "author",
        url: "url",
      });
      it("removing blogs", function () {
        cy.contains("new blog")
          .parent()
          .find("button")
          .should("contain", "view")
          .click();
        cy.contains("new blog")
          .parent()
          .parent()
          .find("button")
          .should("not.contain", "delete");

        cy.get(".deleteButton").click();
        cy.contains("new blog").should("not.exist");
      });
      it("blogs are in descending order by likes", function () {
        cy.get(".showContent").eq(1).click();
        cy.get(".likeButton").eq(0).click();
        cy.get(".showContent").eq(0).click();
        cy.contains("likes 0");
      });
    });
  });
});
