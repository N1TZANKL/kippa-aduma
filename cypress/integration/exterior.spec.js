describe("Login/Register functionalities", function () {
    it("Checks that default page is the login page", function () {
        cy.visit("/");

        // assert default page = login
        cy.url().should("include", "/login");
    });

    it("Checks that the link between login <-> register pages works", function () {
        cy.visit("/login");

        // click on the link to register page
        cy.contains("here").click();

        // assert link to register works
        cy.url().should("include", "/register");

        // click on the link back to login page
        cy.contains("here").click();

        // assert link to login works
        cy.url().should("include", "/login");
    });

    it("Checks user can fill & send register form", function () {
        const user = "cypress_test";
        const password = "123456";

        cy.visit("/register");

        cy.get("form")
            .within(() => {
                // fill out form
                cy.get('input[name="username"]').type(user).should("have.value", user);
                cy.get('input[name="nickname"]').type(user).should("have.value", user);
                cy.get('input[name="password"]').type(password).should("have.value", password);
                cy.get('input[name="password-validate"]').type(password).should("have.value", password);
            })
            .submit();

        // assert successful registration + login by querying for kippa logo
        //cy.get(".logo");
    });
});
