# KSZ - Kontrolni Seznam Zgodovine

Aplikacija za upravljanje s kontrolnimi seznami zgodovine.

## Trenutno stanje projekta

### Backend
- ✅ Server teče na http://0.0.0.0:8000/
- ✅ Implementirani vsi potrebni modeli
- ✅ Implementirane vse potrebne serializacije
- ✅ Implementirani vsi potrebni ViewSeti
- ✅ Implementirane vse potrebne URL poti
- ✅ Implementirana avtentikacija
- ✅ Implementirana registracija uporabnikov
- ✅ Implementirane CORS nastavitve
- ✅ Implementirane sejne nastavitve

### Frontend
- ✅ Aplikacija teče na http://localhost:5173/
- ✅ Implementirane vse potrebne komponente:
  - ✅ App.tsx
  - ✅ Layout.tsx
  - ✅ AuthContext.tsx
  - ✅ Navbar.tsx
  - ✅ Checklist.tsx
  - ✅ Settings.tsx
  - ✅ Login.tsx
- ✅ Implementirana navigacija
- ✅ Implementirano zaščiteno območje
- ✅ Implementirana avtentikacija
- ✅ Implementirane API klice

## Tehnološki sklad

### Frontend
- React.js
- Material-UI
- React Router
- Axios

### Backend
- Django REST Framework
- SQLite
- Django ORM

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
- Horizontalna/vertikalna navigacija
- Prikaz aktivnega segmenta in sosednjih
- Opcija za scrollanje
- Floating "Shrani napredek" gumb
- Gumb "Naslednji segment" avtomatsko scrolla na vrh

#### Prikaz Vprašanj
- Vsako vprašanje ima:
  - Besedilo vprašanja
  - Tip odgovora
  - Repeatability flag
  - Ponovitve (če je repeatability true)
  - Serijske številke

#### Masovni Vnos
- Boolean/Multiple Choice:
  - Gumbi "VSI DA" in "VSI NE"
- Textual:
  - Text input polje
  - Gumb "Prenesi"

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

### JSON Format
```json
{
  "projekt": "123",
  "osebna_stevilka": "456",
  "tip": "Tip1",
  "datum": "2024-03-20",
  "napredek": {
    "segment1": {
      "vprasanja": [
        {
          "id": 1,
          "vprasanje": "Vprasanje 1",
          "repeatability": true,
          "odgovori": [
            {"serijska_stevilka": "123-1", "odgovor": "Da"},
            {"serijska_stevilka": "123-2", "odgovor": "Ne"}
          ]
        }
      ]
    }
  }
}
```

### Direktoriji
- Ločeni direktoriji za:
  - JSON datoteke
  - XLSX/PDF izvoze
- Samodejno ustvarjanje map po številki projekta

## 🔄 Funkcionalnosti

### Ponovljivost
- Vprašanja z repeatability=true se ponavljajo glede na število ponovitev
- Vsaka ponovitev dobi svojo serijsko številko
- Vprašanja z repeatability=false se ne ponavljajo

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


---

