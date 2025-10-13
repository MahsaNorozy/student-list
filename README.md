# Studentenverwaltung

Eine Webanwendung zur Verwaltung von Studenten und deren Noten.

## Funktionen

- Studentenliste anzeigen
- Neue Studenten mit Noten hinzufügen
- Studenten und ihre Noten bearbeiten

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
   - Wechsle in das Frontend-Verzeichnis (`student-list`)
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

https://jestjs.io/docs/getting-started
npm test to test

npm run test:coverage
und dann bekommst man eine Ausgabe mit Prozentzahlen zur Testabdeckung.
zeigt dann zusätzlich den Coverage-Bericht (Text im Terminal + HTML-Report im Ordner coverage/).
