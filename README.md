# Studentenverwaltung

Eine Webanwendung zur Verwaltung von Studenten und deren Noten.

## Funktionen

- Studentenliste anzeigen
- Neue Studenten mit Noten hinzufügen
- Studenten und ihre Noten bearbeiten
- Studenten löschen

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
- Der Quellcode ist mit **TSDoc**-Kommentaren dokumentiert. Um die TSDoc-Kommentare zu prüfen, kann folgender Befehl im Projektverzeichnis ausgeführt werden:

```
npx eslint .
```

## Tests und Testabdeckung

- Das Projekt verwendet **Vitest** für Unit-Tests.
  Um alle Tests auszuführen, öffne ein Terminal im Projektverzeichnis und führe aus:

  ```
  npm test
  ```

  TODO: tseslint auszuführen
  TODO: npm run cy:open
