describe("Neuen Studenten anlegen (mit gemockten GraphQL-Responses)", () => {
  // Die GraphQL-Anfragen werden nicht ans echte Backend gesendet,
  // sondern durch Fake-Antworten ersetzt.
  it("füllt Formular aus, sendet Mutation und zeigt neuen Studenten in der Liste", () => {
    // Simuliere Backend-Antworten für GraphQL-Anfragen (kein echtes Backend benötigt)
    // intercept rahgiri kardan
    cy.intercept("POST", "**/graphql", (req) => {
      // Hier wird JEDER POST-Request an /graphql abgefangen rahgiri kardan
      // POST-Request an /graphql: AddStudent, GetStudents
      // Bei GraphQL werden alle Operationen (Queries UND Mutations) als POST-Requests gesendet,
      // egal ob sie Daten lesen oder schreiben.
      const operationName = req.body?.operationName || "";
      if (operationName === "AddStudent") {
        // Fake-Antwort senden
        // req.reply sendet künstliche Antwort
        // Stoppt Request, antwortet sofort
        req.reply({
          data: {
            addStudent: {
              grades: [
                {
                  courseName: "Mathematik",
                  date: "2025-10-26",
                  gradeValue: "1.3",
                  isPassed: true,
                },
              ],
              id: 123,
              matriculationNumber: "98765",
              name: "Test Student",
            },
          },
        });
        return; // Backend wird NIE erreicht
      }

      if (operationName === "GetStudents") {
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

      req.continue(); // Request ans Backend weiterleiten
    }).as("graphql"); // Gibt diesem Intercept den Namen "@graphql"

    cy.visit("/students/new");

    // Formularfelder (Selector nach name-Attributen aus StudentForm.tsx)
    cy.get('input[name="name"]').type("Test Student");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="address"]').type("Musterstr. 1");
    cy.get('input[name="program"]').type("Informatik");
    cy.get('input[name="matriculationNumber"]').type("98765");
    cy.get('input[name="semester"]').clear().type("1");
    cy.get('select[name="gender"]').select("männlich");

    // Note hinzufügen über UI (entsprechend StudentForm.tsx)
    cy.get("button").contains("Note hinzufügen").click();

    // erstes grade-block ausfüllen
    cy.get(".grade-block")
      .first()
      .within(() => {
        cy.get('input[placeholder="Kursname"]').type("Mathematik");
        cy.get('input[placeholder="Note"]').type("1.3");
        cy.get('input[type="date"]').type("2025-10-26");
        // Checkbox "Bestanden" anhaken
        cy.get('input[type="checkbox"]').check();
      });

    // Submit
    cy.get('button[type="submit"]').contains("Hinzufügen").click();

    // Warten bis abgefangene GraphQL-Anfrage (Alias: @graphql) abgeschlossen ist
    cy.wait("@graphql");

    // Erwartung: Weiterleitung zur Liste und Anzeige des neuen Namens
    cy.location("pathname").should("eq", "/");
    cy.contains("Test Student").should("be.visible");
  });
});
