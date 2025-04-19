# Kontrolni seznam - Vite + Django

## Opis projekta
Aplikacija za upravljanje kontrolnih seznamov, razvita z uporabo Vite (React) za frontend in Django REST Framework za backend.

## Tehnološki sklad
### Frontend
- React.js
- Material-UI
- React Router
- Axios
- TypeScript

### Backend
- Django REST Framework
- SQLite
- Django ORM
- pandas (za XLSX podporo)

## Implementirane funkcionalnosti
- Avtentikacija in avtorizacija
  - ✅ Prijava/odjava
  - ✅ Registracija novih uporabnikov
  - ✅ Zaščita poti
  - ⏳ Urejanje osebnih podatkov
  - ⏳ Logiranje sprememb
- Upravljanje tipov kontrolnih seznamov
  - ✅ Dodajanje/urejanje/brisanje tipov
  - ✅ Uvoz strukture iz XLSX datoteke
  - ✅ Prenos vzorčne XLSX datoteke
- Segmenti in vprašanja
  - ⏳ Hierarhična struktura: Tip -> Segmenti -> Vprašanja
  - ⏳ Različni tipi vprašanj (Da/Ne, Več izbir, Besedilo)
  - ⏳ Podpora za obvezna in ponovljiva vprašanja
- Uporabniški vmesnik
  - ✅ Prijavna stran
  - ✅ Registracijska stran
  - ✅ Navigacijska vrstica
  - ✅ Osnovna struktura aplikacije
  - ⏳ Nastavitve uporabnika

## Namestitev in zagon
1. Backend:
   ```bash
   cd backend
   python3 manage.py migrate
   python3 manage.py runserver 0.0.0.0:8000

   (cd backend && python manage.py runserver 0.0.0.0:8000)
   ```

2. Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev

   (cd frontend && npm run dev)
   ```

## Dostop
- Frontend: http://localhost:5173
- Backend: http://localhost:8000

## Razvojni status
- ✅ Osnovna struktura projekta
- ✅ Avtentikacija in avtorizacija
- ✅ Uporabniški vmesnik
- ⏳ Implementacija kontrolnih seznamov
- ⏳ Upravljanje projektov
- ⏳ Nastavitve uporabnika

## Trenutno stanje projekta (16.4.2024)

### Implementirane funkcionalnosti
- ✅ Prijava/registracija uporabnikov
- ✅ Začetna stran za vnos podatkov novega kontrolnega seznama
- ✅ Osnovna struktura strani za kontrolni seznam
- ✅ Nalaganje tipov iz XLSX datoteke
- ✅ Omejitev dostopa do nastavitev (admin/moderator)
- ⏳ Prikaz in urejanje vprašanj v kontrolnem seznamu
- ⏳ Shranjevanje odgovorov
- ⏳ Odpiranje obstoječih kontrolnih seznamov
- ⏳ Urejanje osebnih podatkov
- ⏳ Logiranje sprememb

### TODO (naslednja seja)
1. Urediti prikaz vprašanj v kontrolnem seznamu:
   - Pravilno oblikovanje vprašanj
   - Dodati možnost za vnos opomb
   - Implementirati shranjevanje odgovorov
2. Implementirati odpiranje obstoječih kontrolnih seznamov:
   - Dodati gumb na začetno stran
   - Implementirati pregled zgodovine
   - Dodati možnost filtriranja in iskanja
3. Implementirati urejanje osebnih podatkov
4. Implementirati logiranje sprememb
5. Izboljšati uporabniško izkušnjo:
   - Dodati nalagalne indikatorje
   - Izboljšati prikaz napak
   - Dodati potrditvena sporočila

### Znane težave
1. Potrebna je ureditev prikaza vprašanj v kontrolnem seznamu
2. Manjka funkcionalnost za odpiranje obstoječih kontrolnih seznamov
3. Potrebna je implementacija shranjevanja odgovorov
4. Urejanje osebnih podatkov še ni implementirano
5. Logiranje sprememb še ni implementirano

## 🚀 Zagon aplikacije

### Backend
```bash
cd backend
python3 manage.py runserver 0.0.0.0:8000
```
Backend bo dostopen na http://0.0.0.0:8000/

### Frontend
```bash
cd frontend
npm run dev
```
Frontend bo dostopen na http://localhost:5173/

### Opombe
- Na Linux sistemih je potrebno uporabiti `python3` namesto `python`
- Backend in frontend je potrebno zagnati v ločenih terminalih
- Za pravilno delovanje morata biti zagnana oba dela aplikacije

### Privzeti uporabniki
- Administrator:
  - Uporabniško ime: `admin`
  - Geslo: `AdmiNNimdAtec`
- Navadni uporabniki se lahko registrirajo preko obrazca za registracijo

## Struktura projekta

### Frontend
```
frontend/
├── src/
│   ├── components/
│   │   ├── Layout.tsx
│   │   └── Navbar.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── pages/
│   │   ├── Checklist.tsx
│   │   ├── Settings.tsx
│   │   └── Login.tsx
│   ├── api/
│   │   └── api.ts
│   ├── App.tsx
│   └── theme.ts
```

### Backend
```
backend/
├── checklist/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── backend/
│   ├── settings.py
│   └── urls.py
```

## Baza podatkov

### Tabele
```sql
-- Projekti
CREATE TABLE checklist_projekt (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    stevilka_projekta VARCHAR(50) NOT NULL,
    tip_id INTEGER NOT NULL,
    stevilo_ponovitev INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    FOREIGN KEY (tip_id) REFERENCES checklist_tip (id)
);

-- Uporabniki
CREATE TABLE auth_user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    password VARCHAR(128) NOT NULL,
    last_login TIMESTAMP,
    is_superuser BOOLEAN NOT NULL,
    username VARCHAR(150) NOT NULL UNIQUE,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(254) NOT NULL,
    is_staff BOOLEAN NOT NULL,
    is_active BOOLEAN NOT NULL,
    date_joined TIMESTAMP NOT NULL
);
```

## Naloge za dokončanje

1. Implementacija funkcionalnosti kontrolnega seznama
2. Implementacija funkcionalnosti nastavitev
3. Testiranje aplikacije
4. Optimizacija zmogljivosti
5. Dokumentacija

## Kaj je treba narediti
1. Preveriti povezavo med frontendom in backendom
2. Implementirati manjkajoče funkcionalnosti v komponentah
3. Testirati delovanje aplikacije
4. Odpraviti morebitne napake in optimizirati delovanje

## Naslednji koraki
1. Preveriti povezavo med frontendom in backendom
2. Implementirati manjkajoče funkcionalnosti
3. Testirati delovanje aplikacije

## Opombe
- Backend je pravilno zagnan in deluje
- Frontend je pravilno zagnan in deluje
- Potrebno je preveriti povezave med komponentami

## 📋 Pregled

Aplikacija za izpolnjevanje in vodenje kontrolnih seznamov, z lokalnim shranjevanjem, SQLite bazo in podporo za izvoz `.xlsx` in `.pdf`.

## 🛠️ Tehnološki Stack

### Frontend
- React.js
- Material-UI
- React Router
- Axios za API klice

### Backend
- Django REST Framework
- SQLite
- Django ORM
- Django REST Framework Serializers

## 📁 Struktura Projekta

```
kontrolni-seznam-vite/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── api/
│   │   └── theme/
│   └── package.json
├── backend/
│   ├── checklist/
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── manage.py
│   └── requirements.txt
├── docs/
│   ├── README.md
│   └── track.md
└── data/
    ├── projects/
    │   └── {projekt_id}/
    │       ├── json/
    │       └── exports/
```

## 🗄️ Struktura Baze

```sql
-- Projekti
CREATE TABLE projekti (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    osebna_stevilka TEXT,
    datum TEXT,
    tip TEXT,
    stevilo_ponovitev INTEGER
);

-- Uporabniki
CREATE TABLE auth_user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    password TEXT,
    is_staff BOOLEAN,
    is_active BOOLEAN,
    is_superuser BOOLEAN,
    last_login TEXT,
    date_joined TEXT
);

-- Tipi
CREATE TABLE tip (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    naziv TEXT,
    segmenti INTEGER,
    created_at DATETIME,
    updated_at DATETIME
);

-- Segmenti
CREATE TABLE segment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    naziv TEXT,
    projekt_id INTEGER,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (projekt_id) REFERENCES projekti(id)
);

-- Vprašanja
CREATE TABLE vprasanje (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    segment_id INTEGER,
    vprasanje TEXT,
    tip TEXT,
    repeatability BOOLEAN,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (segment_id) REFERENCES segment(id)
);

-- Serijske številke
CREATE TABLE serijska_stevilka (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    projekt_id INTEGER,
    stevilka TEXT,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (projekt_id) REFERENCES projekti(id)
);

-- Odgovori
CREATE TABLE odgovor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vprasanje_id INTEGER,
    serijska_stevilka_id INTEGER,
    odgovor TEXT,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (vprasanje_id) REFERENCES vprasanje(id),
    FOREIGN KEY (serijska_stevilka_id) REFERENCES serijska_stevilka(id)
);

-- Nastavitve
CREATE TABLE nastavitev (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tip TEXT,
    vrednost TEXT,
    created_at DATETIME,
    updated_at DATETIME
);

-- Profili
CREATE TABLE profil (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    naziv TEXT,
    nastavitve JSON,
    created_at DATETIME,
    updated_at DATETIME
);

-- Log sprememb
CREATE TABLE log_sprememb (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cas DATETIME,
    uporabnik_id INTEGER,
    sprememba TEXT,
    stara_vrednost TEXT,
    nova_vrednost TEXT,
    FOREIGN KEY (uporabnik_id) REFERENCES auth_user(id)
);
```

## 🖥️ Vmesnik

### 1. Začetna Stran
- Vnosi:
  - Osebna številka (prikazana, pridobljena iz prijavljenega uporabnika)
  - Št. projekta (obvezno)
  - Št. ponovitev (obvezno)
  - Tip (dropdown, obvezno)
- Gumbi:
  - Start New Checklist (ustvari nov kontrolni seznam)
  - Open Existing Checklist (odpri obstoječ kontrolni seznam)
  - Settings (dostop samo za admin in moderator)
  - Spreminjanje gesla (dostopno vsem uporabnikom)
  - Reset gesla (zaščiten z varnostnim vprašanjem)

### 2. Stran Nastavitev (dostop samo za admin in moderator)
- Glavna navigacija:
  ```
  [TIPI] [IZVOZI] [SISTEM] [PROFIL] [ODJAVA]
  ```

#### Podstrani:

**TIPI:**
- Seznam obstoječih tipov
- Gumb "DODAJ NOV TIP" (naloži XLSX dokument)
- Za vsak tip:
  - Preimenuj
  - Izbriši
  - Uvozi/Posodobi .xlsx
  - Pregled segmentov

**IZVOZI:**
- Izbira lokacije za JSON, naziv .json fajla (Projekt_Tip_OsebnaŠt._DDMMYY)
- Izbira lokacije za XLSX/PDF, naziv xls/pdf (Projekt_Tip_OsebnaŠt._DDMMYY)
- PDF nastavitve:
  - Izbira logotipa
  - Nastavitev glave/noge
  - Izbira fonta
  - Nastavitev barv

**SISTEM:**
- Tema (svetla/temna)
- Jezik (slovenščina/angleščina)
- Avtomatska odjava

**PROFIL:**
- Dostop samo za admin in moderator
- Osebna številka
- Varnostne kopije nastavitev

### 3. Stran z Vprašanji in Segmenti

#### Navigacija
- Vertikalna navigacija za boljšo preglednost
- Segmenti označeni s številkami (1-22)
- Status segmenta:
  - Zelena barva ko so vsa vprašanja odgovorjena
  - Jasno označen trenutno aktiven segment
  - Indikator napredka za vsak segment

### Ponovljivost vprašanj
- Določena z `repeatability` zastavico v bazi:
  - `true`: vprašanje se ponovi za vsako ponovitev
    - Serijske številke: projekt_1, projekt_2, ...
    - Primer: "Preveri vijake" za vsako serijsko številko
  - `false`: vprašanje se pojavi samo enkrat
    - Serijska številka: projekt (brez _X)
    - Primer: "Preveri skupno dokumentacijo"

### Masovni vnos
- **Boolean in Multiple Choice vprašanja**:
  - Gumbi "VSI DA"/"VSI NE"
  - Deluje na nivoju vseh ponovitev za eno vprašanje
  - Primer: Označiti "DA" za vse serijske številke enega vprašanja

- **Tekstualna vprašanja**:
  - Text input polje
  - Gumb "Prenesi" za kopiranje vnosa na vse ponovitve
  - Primer: Vnesti opombo za vse serijske številke

### Shranjevanje in UI elementi
- **Avtomatsko shranjevanje**:
  - Sproti po vsakem odgovoru
  - Indikator uspešnega shranjevanja

- **Floating "Shrani" gumb**:
  - Vedno viden ne glede na scroll pozicijo
  - Shrani celoten segment
  - Vizualna potrditev shranjevanja

- **Indikator napredka**:
  - Prikazuje odstotek izpolnjenih vprašanj v segmentu
  - Pomaga pri sledenju napredka

### Primer strukture vprašanj v segmentu
```typescript
interface Vprasanje {
  id: number;
  vprasanje: string;
  tip: 'boolean' | 'text' | 'multiple_choice';
  repeatability: boolean;
  required: boolean;
  options?: string[]; // za multiple_choice
}

interface Odgovor {
  vprasanje_id: number;
  serijska_stevilka: string; // projekt_X ali projekt
  odgovor: string | boolean;
  timestamp: Date;
}
```

### Prikaz vprašanj
- Vprašanja grupirana po segmentih
- Za vsako vprašanje:
  - Besedilo vprašanja
  - Ustrezen tip vnosa (checkbox/text/select)
  - Pri ponovljivih vprašanjih:
    - Seznam vseh serijskih številk
    - Možnost masovnega vnosa
  - Indikator obveznosti
  - Status odgovora (odgovorjeno/neodgovorjeno)

## 🎨 Oblikovanje

### Teme
- Svetla tema:
  - Bela ozadja
  - Modre akcentne barve
- Temna tema:
  - Temno modro ozadje
  - Svetlo sivo za tekst
  - Svetlo zeleno za akcente

### PDF Izvoz
- Serif font
- Minimalistično oblikovanje
- Tabelarni prikaz
- Opcijski elementi (logo, glava, noga)

## 🔒 Varnost

- BCrypt za gesla
- JWT za avtentikacijo
- Osnovna enkripcija za podatke
- Avtomatska odjava ob zapustitvi strani nastavitev
- Logiranje sprememb nastavitev

## 📦 Shranjevanje

### Batch Create
Aplikacija podpira masovno shranjevanje odgovorov preko `batch_create` metode. Ta funkcionalnost omogoča:
- Shranjevanje več odgovorov naenkrat
- Validacijo vseh odgovorov pred shranjevanjem
- Transakcijsko shranjevanje (vse ali nič)
- Optimizirano delovanje za večje količine podatkov

### Optimizacije
- ⏳ Indikator nalaganja med shranjevanjem
- ⏳ Asinhrono shranjevanje v ozadju
- ⏳ Optimizacija podatkovne baze z indeksi
- ⏳ Paginated batch save za velike količine podatkov

### JSON Izvoz
Projekte lahko izvozite v JSON format preko nastavitev projekta. Trenutno izvoz vsebuje:
- Osnovne informacije o projektu (ID, osebna številka, datum)
- Informacije o tipih projekta in številu ponovitev

V prihodnosti bo izvoz vseboval tudi:
- Segmente
- Vprašanja
- Odgovore
- Serijske številke

To bo omogočilo popoln izvoz projekta z vsemi povezanimi podatki za:
- Arhiviranje
- Varnostno kopiranje
- Prenos projektov med sistemi
- Analizo podatkov

### Direktoriji
- Ločeni direktoriji za:
  - JSON datoteke
  - XLSX/PDF izvoze
- Samodejno ustvarjanje map po številki projekta
### Commit hash sledenje
- Zadnji commit: `78b9873` (19.4.2024: Dodana batch_create metoda za shranjevanje več odgovorov naenkrat)
- Predzadnji commit: `eb74369` (18.4.2024: Implementirane izboljšave kontrolnega seznama)

## 🔄 Funkcionalnosti

### Ponavljanje vprašanj in serijske številke
Nekatera vprašanja se ponavljajo znotraj segmenta glede na število ponovitev, ki je določeno na začetni strani:
- Vsaka ponovitev dobi svojo serijsko številko
- Serijska številka se generira v formatu: `{projekt}_{ponovitev}`
- Primer: Za projekt "123" in 3 ponovitve bodo serijske številke:
  - 123_1
  - 123_2
  - 123_3

### Struktura odgovorov
Vsak odgovor je povezan z:
- Vprašanjem
- Segmentom
- Serijsko številko (če je vprašanje ponovljivo)
- Tipom odgovora (boolean/text/multiple_choice)

### Masovni Vnos
- Za ponovljena vprašanja
- Tip odgovora odvisen od tipa vprašanja
- Gumbi za hitro izpolnjevanje

### Izvoz
- XLSX format
- PDF format z opcijskimi elementi
- Šumniki pravilno prikazani

## 📝 Prihodnje Razširitve

### Kratkoročne
- Kamera za zajem slik
- Večjezična podpora
- Naprednejše formatiranje PDF
- Dodatni tipi vprašanj

### Dolgoročne
#### Offline Varianta
- Samostojna desktop aplikacija
- Podpora za:
  - Windows
  - Android
  - iOS
- Funkcionalnosti:
  - Lokalno shranjevanje podatkov
  - Sinhronizacija z online verzijo (ko je dostopna povezava)
  - Samostojno delovanje brez internetne povezave
  - Izvoz v XLSX/PDF brez povezave
- Varnost:
  - Lokalna enkripcija podatkov
  - Zaščita z geslom
  - Varnostne kopije na lokalni napravi
- Uporabniški vmesnik:
  - Enak kot online verzija
  - Optimiziran za delovanje brez povezave
  - Indikator stanja povezave
  - Možnost ročne sinhronizacije

## 📊 Sledenje spremembam

Projekt uporablja Git za sledenje spremembam. Glavna veja je `main`.

### Git Workflow
- Vse spremembe se commitajo direktno v `main` vejo
- Vsak commit mora imeti jasen opis sprememb
- Spremembe se beležijo v TRACK.md

### Commit Hash Sledenje
Po vsakem commitu je potrebno posodobiti sledeče informacije:
- Zadnji commit hash
- Predzadnji commit hash

Trenutno stanje:
- Zadnji commit: `e140e03` (Implementirana avtentikacija in avtorizacija)
- Predzadnji commit: `02f21bb` (Implementirana avtentikacija in registracija uporabnikov)

### .gitignore
Projekt vključuje .gitignore datoteko, ki izključuje:
- Python datoteke (__pycache__, virtualne okolja, itd.)
- Node.js datoteke (node_modules, logi, itd.)
- IDE datoteke (.idea, .vscode)
- Django datoteke (db.sqlite3, logi)
- Sistemske datoteke (.DS_Store, Thumbs.db)

### Commit History
Zgodovina sprememb je dostopna v TRACK.md datoteki, ki beleži vse pomembne spremembe v projektu.

## Struktura XLSX datoteke za uvoz

Datoteka mora vsebovati naslednje stolpce:
- `segment`: Ime segmenta vprašanj
- `question`: Besedilo vprašanja
- `type`: Tip vprašanja (boolean, text, multiple_choice)
- `required`: Ali je odgovor obvezen (true/false)
- `description`: Dodatni opis vprašanja
- `options`: Možni odgovori za multiple_choice tip (ločeni z vejico)
- `repeatable`: Ali se vprašanje lahko ponovi (true/false)

## 📋 Struktura kontrolnega seznama

### Segmenti in vprašanja
Kontrolni seznam je organiziran v segmenti, ki pokrivajo vse vidike preverjanja igralnega mesta. Vsak segment vsebuje specifična vprašanja za preverjanje določene komponente ali funkcionalnosti.

#### Seznam segmentov:
1. **Pokrov igralnega mesta**
   - Preverjanje monitorja in njegove pritrditve
   - Preverjanje zaklepa in vijakov
   - Preverjanje etiket

2. **Maska sistema**
   - Preverjanje ustnikov za kovance
   - Preverjanje zvočnika in svetlobe
   - Preverjanje LED traku

3. **Ogrodje igralnih mest**
   - Preverjanje vrat in zapiral
   - Preverjanje mehanizmov
   - Preverjanje USB polnilcev in nalepk

4. **Police igralnih mest**
   - Preverjanje števila polic
   - Preverjanje etiket

5. **Ključavnice**
   - Preverjanje ključavnic za različne vrata
   - Preverjanje dostopov

6. **Monitor InnoDisplay 24"**
   - Preverjanje garancijske etikete

7. **Sprejemnik bankovcev JCM UBA-PRO**
   - Preverjanje pritrditve
   - Preverjanje garancijskih etiket
   - Preverjanje vrat in blažilca

8. **Tiskalniki (EPIC 950, 951, 952)**
   - Preverjanje pritrditve
   - Preverjanje verzij
   - Preverjanje izpisa
   - Preverjanje etiket

9. **Sprejemnik kovancev Azkoyen**
   - Preverjanje ustnikov
   - Preverjanje garancijskih etiket
   - Preverjanje ohišja in posode

10. **Kabelska kita**
    - Preverjanje priklopov
    - Preverjanje oznak
    - Preverjanje različnih kabelov

11. **Računalnik IM**
    - Preverjanje etiket

12. **Led controller (LC1)**
    - Preverjanje nameščitve
    - Preverjanje povezav

13. **Testiranje barv (osvetlitev)**
    - Preverjanje barv za različne komponente
    - Preverjanje logotipa

14. **Testiranje IM**
    - Preverjanje RFID čitalca
    - Preverjanje stikal
    - Preverjanje zvočnikov
    - Preverjanje USB polnilcev

15. **Sprejemnik bankovcev JCM iVIZION**
    - Preverjanje verzij
    - Preverjanje bankovcev
    - Preverjanje lučke

16. **Station controller**
    - Preverjanje verzij

17. **Nastavitve**
    - Preverjanje kreditov
    - Preverjanje production mode
    - Preverjanje verzij programske opreme

18. **Licenca**
    - Preverjanje kode licence
    - Preverjanje veljavnosti

19. **Dodatki in posebnosti**
    - Preverjanje modulov
    - Preverjanje adapterjev
    - Preverjanje nosilcev

20. **Električne meritve**
    - Preverjanje nalepk

21. **Zaključna dela**
    - Preverjanje serijskih številk
    - Preverjanje nalepk
    - Preverjanje zunanjosti

22. **Slike**
    - Preverjanje fotografij različnih komponent
    - Preverjanje dokumentacije

### Tipi vprašanj
Vprašanja so razdeljena v tri glavne tipe:
1. **Boolean (Da/Ne)**
   - Za preverjanje prisotnosti ali stanja
   - Primer: "Zatisnjeni vijaki sornika zaklepa pokrova"

2. **Text**
   - Za vnos besedilnih odgovorov
   - Primer: "Monitor: brez poškodb, pravilno poravnan in nastavljen"

3. **Multiple Choice**
   - Za izbiro med več možnostmi
   - Primer: "Top door:", "Stacker access:"

### Isti vprašanja v več različnih segmentih
Nekatera vprašanja se pojavijo v več segmentih, vendar se nanašajo na različne komponente:
- "Etiketa Q.C." - preverja se za vsako komponento posebej
- "Garancijska etiketa" - preverja se za vsako komponento posebej
- "Nastavljen in pritrjen" - preverja se za vsako komponento posebej

## Funkcionalnosti

### Kontrolni seznam
- Navigacija med segmenti kontrolnega seznama
- Prikaz vprašanj za trenutni segment
- Podpora za večkratne ponovitve vprašanj
- Shranjevanje odgovorov v realnem času
- Masovni vnos odgovorov za vse ponovitve
- Posamično urejanje odgovorov
- Gumbi za hitre odgovore (DA/NE/N/A)
- Obvestila o uspešnosti/napakah pri shranjevanju

### Serijske številke
Sistem uporablja serijske številke za sledenje ponovitvam vprašanj. Format serijske številke je:
```
projektId-ponovitev
```
Primer: `2-1` (Projekt 2, prva ponovitev)

### Vnos odgovorov
Sistem omogoča dva načina vnosa odgovorov:

1. Masovni vnos:
   - Gumbi "Vsi DA", "Vsi NE", "Vsi N/A" za hitro nastavitev vseh odgovorov
   - Uporabno za začetno izpolnjevanje

2. Posamični vnos:
   - Gumbi DA/NE/N/A za vsako ponovitev
   - Tekstovno polje za vnos poljubnega odgovora
   - Možnost urejanja po masovnem vnosu

### Število ponovitev
Število ponovitev se določi na nivoju projekta in tipa kontrolnega seznama:
- Vsak projekt ima lahko več tipov kontrolnih seznamov
- Vsak tip ima svoje število ponovitev
- Sistem avtomatsko generira ustrezno število vnosnih polj

## Izvoz in uvoz projektov

### Uvoz/Izvoz projektov

Aplikacija omogoča izvoz in uvoz projektov v JSON formatu. To je uporabno za:
- Arhiviranje projektov
- Prenos projektov med različnimi sistemi
- Varnostno kopiranje podatkov

#### Izvoz projektov
- Izberite projekte za izvoz s potrditvenimi polji
- Kliknite gumb "Izvozi projekte"
- Prenesite JSON datoteko z vsemi podatki projekta

#### Uvoz projektov
- Kliknite gumb "Izberi datoteko" in izberite JSON datoteko
- Kliknite gumb "Uvozi projekte"
- Projekti bodo uvoženi s shranjenimi odgovori

#### Posebnosti JSON formata
- Shranjeni so vsi odgovori za vse serijske številke
- Obdržan je originalni datum kreiranja projekta
- Dodan je timestamp zadnje spremembe
- Vključeni so vsi podatki o projektih, vključno z:
  - Osnovnimi podatki projekta
  - Tipi projektov
  - Serijskimi številkami
  - Segmenti in vprašanji
  - Odgovori na vprašanja