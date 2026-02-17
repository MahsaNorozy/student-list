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

## Struktur des Projekts

> Das Projekt besteht aus zwei separaten Repositories (Frontend und Backend).
> Beide Repositories müssen geklont werden, bevor die Schritte im Abschnitt „Projekt starten“ ausgeführt werden.

## Voraussetzungen

- .NET SDK 9.0
- Node.js (Version 18 oder höher)

## Projekt starten

1. **Backend starten**
   - Wechsle in das Backend-Projektverzeichnis (`student-list-backend`)
   - Stelle sicher, dass die .NET-Tools wiederhergestellt werden:
     ```
     dotnet tool restore
     ```
   - Führe die Migrationen aus:
     ```
     dotnet ef database update
     ```
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
   - Installiere die Abhängigkeiten:
     ```
     npm install
     ```
   - Starte die Anwendung:
     ```
     npm run dev
     ```
   - Die Anwendung ist anschließend unter http://localhost:5173 erreichbar.

## Hinweise

- Die Anwendung verwendet eine **GraphQL-API** für die Kommunikation zwischen Frontend und Backend.
- Der Quellcode enthält **TSDoc**‑Kommentare.

## Tests und Testabdeckung

- Das Projekt verwendet **Vitest** mit **React Testing Library** für Unit-Tests.
  Alle Tests ausführen:

  ```
  npm test
  ```

- Das Projekt verwendet **Cypress** für E2E-Tests.
  **Terminal 1** - Dev-Server starten (muss laufen bleiben):

  ```
  npm run dev
  ```

  **Terminal 2** - Cypress öffnen:

  ```
  npm run cy:open
  ```
