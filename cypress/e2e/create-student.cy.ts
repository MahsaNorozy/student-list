describe("Neuen Studenten anlegen (stubbed GraphQL)", () => {
  it("füllt Formular aus, sendet Mutation und zeigt neuen Studenten in der Liste", () => {
    // Intercept alle GraphQL-POSTs und antworte für AddStudent / GetStudents
    cy.intercept("POST", "**/graphql", (req) => {
      const op = req.body?.operationName || "";
      const q = req.body?.query || "";

      if (op === "AddStudent" || /addStudent/i.test(q)) {
        req.reply({
          data: {
            addStudent: {
              grades: [],
              id: 123,
              matriculationNumber: "98765",
              name: "Test Student",
            },
          },
        });
        return;
      }

      if (
        op === "GetStudents" ||
        /query\s+GetStudents/i.test(q) ||
        /students/i.test(q)
      ) {
        req.reply({
          data: {
            students: [
              {
                id: 123,
                matriculationNumber: "98765",
                name: "Test Student",
              },
            ],
          },
        });
        return;
      }

      req.continue();
    }).as("graphql");

    // Dev‑Server starten vorher: npm run dev (falls du baseUrl in cypress.config.ts gesetzt hast)
    cy.visit("/students/new");

    // Formularfelder (Selector nach name-Attributen aus StudentForm.tsx)
    cy.get('input[name="name"]').type("Test Student");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="address"]').type("Musterstr. 1");
    cy.get('input[name="program"]').type("Informatik");
    cy.get('input[name="matriculationNumber"]').type("98765");
    cy.get('input[name="semester"]').clear().type("1");

    // Note hinzufügen über UI (entsprechend StudentForm.tsx)
    cy.get("button").contains("Note hinzufügen").click();

    // erstes grade-block ausfüllen
    cy.get(".grade-block")
      .first()
      .within(() => {
        cy.get('input[placeholder="Kursname"]').type("Mathematik");
        cy.get('input[placeholder="Note"]').type("1.3");
        // Date im Format YYYY-MM-DD
        cy.get('input[type="date"]').type("2025-10-26");
        // Checkbox "Bestanden" anhaken
        cy.get('input[type="checkbox"]').check();
      });

    // Submit
    cy.get('button[type="submit"]').contains("Hinzufügen").click();

    // Warte auf die abgefangene GraphQL-Anfrage (Mutation)
    cy.wait("@graphql");

    // Erwartung: Weiterleitung zur Liste und Anzeige des neuen Namens
    cy.url().should("include", "/students");
    cy.contains("Test Student").should("be.visible");
  });
});
