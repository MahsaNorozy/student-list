# Studentenverwaltung

Eine Webanwendung zur Verwaltung von Studierenden und ihren Noten.

## Funktionen

- Studierendenliste anzeigen
- Neue Studierende mit Noten hinzufügen
- Studierende und ihre Noten bearbeiten
- Studierende löschen

## Technologie-Stack

- Frontend: React, TypeScript, Vite
- Backend: ASP.NET Core Web API, SQLite, GraphQL

## Projekt starten

1. **Backend starten**
   - Wechsle in das Backend-Projektverzeichnis (`student-list-backend`)
   - Baue das Projekt:
     ```
     dotnet build
     ```
   - Starte das Backend:
     ```
     dotnet run
     ```

2. **Frontend starten**
   - Wechsle in das Frontend-Projektverzeichnis (`student-list`)
   - Starte die Anwendung:
     ```
     npm run dev
     ```

## Hinweise

- Die Anwendung verwendet eine **GraphQL-API** für die Kommunikation zwischen Frontend und Backend.
- Der Quellcode enthält **TSDoc**‑Kommentare.

## Tests und Testabdeckung

- Das Projekt verwendet **Vitest** mit **React Testing Library** für Unit-Tests.
  Alle Tests ausführen:

  ```
  npm test
  ```

- Das Projekt verwendet **Cypress** für E2E‑Tests.  
  Interaktiv (GUI):

  ```
  npm run cy:open
  ```
