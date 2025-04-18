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

### Dodana podpora za XLSX datoteke
- Implementiran uvoz strukture kontrolnih seznamov iz XLSX datotek
- Dodana nova polja v model `Vprasanje`:
  - `obvezno`: Boolean polje za označevanje obveznih vprašanj
  - `opis`: Tekstovno polje za dodatne opise
  - `moznosti`: Tekstovno polje za možne odgovore pri multiple_choice tipu
- Posodobljen model `Tip` za boljšo podporo segmentom
- Implementirano brisanje obstoječih segmentov pred uvozom novih
- Dodana validacija XLSX datotek
- Dodan prenos vzorčne XLSX datoteke

### Popravki in izboljšave
- Popravljena napaka pri povezavi med tipi in segmenti
- Izboljšana postavitev uporabniškega vmesnika v nastavitvah
- Dodana podpora za ponovljiva vprašanja
- Posodobljena dokumentacija z navodili za XLSX uvoz

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

## Zgodovina sprememb

### 15.4.2024
- Implementirana začetna stran za vnos podatkov novega kontrolnega seznama
- Implementirana osnovna struktura strani za kontrolni seznam
- Popravljena prijava in preusmerjanje po prijavi
- Dodana podpora za XLSX datoteke
- Uspešno naložen prvi kontrolni seznam iz XLSX datoteke
- Posodobljena dokumentacija s trenutnim stanjem in TODO listo

### Znane težave (15.4.2024)
1. Potrebna je ureditev prikaza vprašanj v kontrolnem seznamu
2. Manjka funkcionalnost za odpiranje obstoječih kontrolnih seznamov
3. Potrebna je implementacija shranjevanja odgovorov

### TODO (naslednja seja)
1. Urediti prikaz vprašanj v kontrolnem seznamu:
   - Pravilno oblikovanje vprašanj
   - Dodati možnost za vnos opomb
   - Implementirati shranjevanje odgovorov
2. Dodati gumb za odpiranje obstoječih kontrolnih seznamov
3. Implementirati pregled zgodovine kontrolnih seznamov
4. Dodati možnost za izvoz kontrolnega seznama
5. Izboljšati uporabniško izkušnjo:
   - Dodati nalagalne indikatorje
   - Izboljšati prikaz napak
   - Dodati potrditvena sporočila

### Naslednji koraki
1. Implementacija shranjevanja odgovorov
2. Implementacija odpiranja obstoječih kontrolnih seznamov
3. Izboljšava uporabniškega vmesnika za kontrolni seznam

# Dnevnik razvoja

## 2024-04-18
- Implementirana pravilna logika za število ponovitev iz projekta
- Izboljšan prikaz serijskih številk (odstranjen ID tipa iz prikaza)
- Dodana funkcionalnost za masovni vnos odgovorov
- Implementirani gumbi za hitre odgovore (DA/NE/N/A) za vsako ponovitev
- Dodana možnost posamičnega urejanja odgovorov po masovnem vnosu
- Implementirana obvestila o uspešnosti/napakah pri shranjevanju (toast)
- Izboljšana uporabniška izkušnja pri vnosu odgovorov
- Popravljena logika za shranjevanje odgovorov v bazo

### Tehnične podrobnosti
- Posodobljena struktura serijskih številk (format: projektId-ponovitev)
- Implementirano pravilno branje števila ponovitev iz projekta_tipi
- Dodana validacija vhodnih podatkov pri shranjevanju
- Izboljšano rokovanje z napakami pri API klicih
- Optimizirana logika za prikaz in shranjevanje odgovorov

### Popravki
- Odpravljena napaka pri prikazu števila ponovitev
- Popravljena logika za generiranje serijskih številk
- Izboljšano delovanje masovnega vnosa odgovorov
- Odpravljena napaka pri shranjevanju posameznih odgovorov

### Naslednji koraki
- Implementacija dodajanja opomb k odgovorom
- Validacija obveznih polj pred shranjevanjem
- Dodajanje pregleda vseh odgovorov pred zaključkom
- Implementacija izvoza podatkov v PDF/Excel

### Commit Hash Sledenje
Po vsakem commitu je potrebno posodobiti sledeče informacije:
- Zadnji commit hash
- Predzadnji commit hash

Trenutno stanje:
- Zadnji commit: `eb74369` (18.4.2024: Implementirane izboljšave kontrolnega seznama)
- Predzadnji commit: `e140e03` (Implementirana avtentikacija in avtorizacija)

### .gitignore
// ... existing code ...

# Dnevnik sprememb

## 25. april 2025

### Commit: d8ca0067d81eb0d0efa68588b2365980962f8c98
- Dodano avtomatsko premikanje na vrh strani ob menjavi segmenta
- Implementirana gladka animacija premikanja
- Izboljšana uporabniška izkušnja pri navigaciji med segmenti

### Prejšnji commit: 37bda884c503188953c3010996d11991695b56c6
- Dodan plavajoči gumb za shranjevanje odgovorov
- Implementirana logika za shranjevanje odgovorov
- Preverjeno delovanje shranjevanja v bazo podatkov
- Potrjeno pravilno delovanje za različne tipe vprašanj

### Znane težave
- Ni posebnih težav

### Naslednji koraki
- Implementacija masovnega vnosa besedilnih odgovorov
- Izboljšave uporabniške izkušnje pri masovnem vnosu
