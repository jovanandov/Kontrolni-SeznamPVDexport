# Sledenje napredku

## 15. april 2025
- Implementirana avtentikacija in avtorizacija
  - Dodana prijava/odjava
  - Dodana registracija novih uporabnikov
  - Implementirana zaščita poti
- Posodobljen uporabniški vmesnik
  - Dodana prijavna stran
  - Dodana registracijska stran
  - Implementirana navigacijska vrstica
- Popravki in optimizacije
  - Popravljena obdelava CSRF tokena
  - Optimizirana avtentikacija
  - Izboljšana obdelava napak

## 14. april 2025
- Inicializacija projekta
  - Ustvarjena osnovna struktura
  - Nastavljena razvojna okolja
  - Konfigurirana povezava med frontend in backend

# Spremembe v projektu

## 2025-04-15
- Inicializiran Git repozitorij
- Ustvarjena .gitignore datoteka
- Preimenovana glavna veja v main
- Narejen prvi commit z osnovno strukturo projekta
- Implementirana osnovna struktura aplikacije
- Dodana prijava in odjava
- Implementirano zaščiteno območje
- Implementirana navigacija med stranmi
- Implementirane osnovne komponente:
  - Layout
  - Navbar
  - Checklist
  - Settings
- Posodobljena dokumentacija (README.md)
- Implementirane CORS in sejne nastavitve
- Implementirana avtentikacija in avtorizacija
- Implementirane API klice za komunikacijo med frontendom in backendom

## Git Workflow
- Vse spremembe se commitajo direktno v `main` vejo
- Vsak commit mora imeti jasen opis sprememb
- Spremembe se beležijo v tej datoteki (TRACK.md)
- Uporablja se .gitignore za izključitev nepotrebnih datotek

## Prejšnje spremembe

# Dnevne spremembe

## 15. april 2025

### Spremembe v backendu
- Spremenjen `RegisterView` in `LoginView` za uporabo osebne številke namesto uporabniškega imena
- Posodobljena sporočila o napakah v slovenščini
- Implementirana registracija uporabnikov

### Spremembe v frontendu
- Spremenjeni API klice za uporabo osebne številke
- Posodobljene komponente `Login` in `Register` za uporabo osebne številke
- Posodobljen `AuthContext` za podporo osebne številke
- Popravljena napaka z večkratnim izvozom v `Navbar.tsx`

### Opombe
- Backend in frontend sta pravilno zagnana
- Vse spremembe so bile uspešno implementirane
- Potrebno je še preveriti delovanje registracije in prijave z osebno številko
