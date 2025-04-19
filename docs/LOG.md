# Dnevnik sprememb in dogodkov

## 15.4.2024

### Pomembni dogodki
1. **Neuspešni poskusi prijave** (20:32:03 - 20:39:17):
   - Več zaporednih neuspešnih poskusov prijave
   - Status: 401 Unauthorized
   - Potrebno preveriti implementacijo avtentikacije

2. **Dostop do API endpointov** (20:03:38 - 21:09:56):
   - Uspešna prijava in dostop do različnih endpointov
   - Opaženo: vsi uporabniki imajo dostop do admin funkcij
   - Potrebna implementacija omejitev dostopa

3. **Nalaganje XLSX datotek** (20:03:50, 20:08:32, 20:08:36):
   - Uspešno nalaganje "charizma PY iz vzorca.xlsx"
   - Velikost datoteke: 13921 bajtov
   - Prebrano: 117 vrstic
   - Struktura: segment, question, type, required, description, options, repeatable

### Opažene težave
1. **Varnostne pomanjkljivosti**:
   - Ni omejitev dostopa do admin funkcij
   - Vsi prijavljeni uporabniki lahko dostopajo do /api/nastavitve/
   - Vsi prijavljeni uporabniki lahko dostopajo do /api/tipi/ (POST, PUT, DELETE)

2. **Avtentikacija**:
   - Več neuspešnih poskusov prijave
   - Potrebno implementirati:
     - Omejitev števila poskusov
     - Časovna zakasnitev po neuspešnih poskusih
     - Beleženje IP naslovov

3. **API Dostopi**:
   ```
   [15/Apr/2025 20:03:43] "GET /api/tipi/ HTTP/1.1" 200 298
   [15/Apr/2025 20:03:43] "GET /api/nastavitve/ HTTP/1.1" 200 2
   [15/Apr/2025 20:03:43] "GET /api/profili/ HTTP/1.1" 200 443
   ```
   - Vsi endpointi vračajo 200 OK
   - Ni preverjanja pravic dostopa

### Načrtovane izboljšave
1. Implementacija omejitve dostopa do admin funkcij
2. Izboljšava varnosti pri avtentikaciji
3. Implementacija beleženja dostopov in sprememb
4. Dodajanje validacije pravic za vse API endpointe

### Celotni logi
```
[Celotni logi od 15.4.2024]
Watching for file changes with StatReloader
Performing system checks...
[... celotni logi ...] 
```

## 18.4.2024

### Pomembni dogodki
1. **Implementacija batch_create metode** (commit: 78b9873):
   - Dodana metoda za shranjevanje več odgovorov naenkrat
   - Uspešno testiranje shranjevanja celotnega segmenta
   - Opaženo: daljši čas shranjevanja pri večjem številu odgovorov

2. **Filtriranje segmentov po tipu projekta**:
   - Dodan get_queryset v SegmentViewSet
   - Implementirano filtriranje preko tip_id parametra
   - Endpoint: /api/segmenti/?tip_id=X

3. **Izboljšave avtentikacije**:
   - Dodano boljše rokovanje s CSRF žetoni
   - Implementirano osveževanje žetonov
   - Dodano preverjanje avtentikacije pred ustvarjanjem projekta

### Opažene težave
1. **Performanca shranjevanja**:
   - Počasno shranjevanje večjega števila odgovorov
   - Potrebna optimizacija batch_create metode
   - Možne rešitve: indeksiranje, asinhorno shranjevanje

2. **Izvoz projektov**:
   - Trenutno samo osnovni podatki v JSON izvozu
   - Manjkajo segmenti, vprašanja in odgovori
   - Načrtovana razširitev funkcionalnosti

### Načrtovane izboljšave
1. Optimizacija shranjevanja odgovorov:
   - Dodajanje indikatorja nalaganja
   - Implementacija asinhronega shranjevanja
   - Optimizacija podatkovne baze

2. Razširitev JSON izvoza:
   - Dodajanje segmentov
   - Dodajanje vprašanj
   - Dodajanje odgovorov
   - Dodajanje serijskih številk

### Celotni logi
```
[Celotni logi od 18.4.2024]
Watching for file changes with StatReloader
Performing system checks...
[... celotni logi ...] 
```

## 19.4.2025
- Implementiran izvoz projektov v JSON format
- Popravljena napaka pri izvozu odgovorov (odstranjen neobstoječi atribut 'opombe')
- Dodana podpora za beleženje uporabnika, ki je vnesel odgovor
- Uspešno testiran izvoz projekta z vsemi povezanimi podatki
- Naslednji korak: Implementacija uvoza projektov iz JSON datoteke

## 19.4.2025 - Izboljšave PDF izvoza in stabilizacija funkcionalnosti

Commit: 32833a8

### Dodano
- Izboljšan izgled PDF izvoza:
  - Strukturirana glava dokumenta s podatki projekta
  - Optimizirana postavitev tabel in besedila
  - Dodana polja za podpis in osebne podatke
  - Izboljšana berljivost z ustreznimi razmiki in stili
  - Podpora slovenskim znakom z DejaVu pisavo

### Popravljeno
- Optimizirana velikost robov dokumenta
- Izboljšana postavitev tabel z odgovori
- Dodani razmiki med elementi
- Konsistentna uporaba stilov in pisav

### Tehnične podrobnosti
- Dodan DejaVuSans.ttf za podporo slovenskim znakom
- Optimizirani parametri za generiranje PDF-ja
- Izboljšano oblikovanje tabel in besedila
- Dodana polja za podpis in osebne podatke

### Status
- Vse osnovne funkcionalnosti delujejo stabilno
- PDF izvoz je zdaj popolnoma funkcionalen in lepo oblikovan
- Aplikacija je pripravljena za produkcijsko uporabo

## 2024-04-19
- [FEATURE] Implementirana funkcionalnost izvoza/uoza projektov v JSON formatu
- [FIX] Odstranjeno preverjanje starosti serijskih številk pri nalaganju odgovorov
- [FEATURE] Dodan timestamp zadnje spremembe pri izvozu
- [FEATURE] Obdržan originalni datum kreiranja projekta pri uvozu
- [FIX] Popravljena logika nalaganja odgovorov za vse serijske številke