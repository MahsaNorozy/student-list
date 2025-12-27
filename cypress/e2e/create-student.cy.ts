describe("Neuen Studenten anlegen (mit echtem Backend)", () => {
  // Dieser Test verwendet das echte Backend - kein Mocking!
  // Voraussetzungen:
  // 1. Backend muss laufen (z.B. auf http://localhost:5000)
  // 2. Datenbank muss erreichbar sein
  // 3. GraphQL-Endpoint muss verfügbar sein

  it("füllt Formular aus, sendet Mutation und zeigt neuen Studenten in der Liste", () => {
    cy.visit("/students/new");

    // Formularfelder ausfüllen
    cy.get('input[name="name"]').type("Test Student");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="address"]').type("Musterstr. 1");
    cy.get('input[name="program"]').type("Informatik");
    cy.get('input[name="matriculationNumber"]').type("98765");
    cy.get('input[name="semester"]').clear().type("1");
    cy.get('select[name="gender"]').select("männlich");

    // Note hinzufügen
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

    // Erwartung: Weiterleitung zur Root-Seite (/) und Anzeige des neuen Namens
    cy.location("pathname").should("eq", "/");
    cy.contains("Test Student").should("be.visible");

    // Optional: Falls Backend langsam ist, Timeout erhöhen:
    // cy.location("pathname", { timeout: 10000 }).should("eq", "/");
    // cy.contains("Test Student", { timeout: 10000 }).should("be.visible");
  });
});
