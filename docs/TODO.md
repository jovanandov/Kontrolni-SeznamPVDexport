# TODO List

## Trenutne naloge (16.4.2024)

### Visoka prioriteta
1. Urediti prikaz vprašanj v kontrolnem seznamu:
   - [ ] Pravilno oblikovanje vprašanj
   - [ ] Dodati možnost za vnos opomb
   - [ ] Implementirati shranjevanje odgovorov
   - [ ] Dodati validacijo odgovorov
   - [ ] Dodati indikator napredka

2. Implementirati odpiranje obstoječih kontrolnih seznamov:
   - [ ] Dodati gumb na začetno stran
   - [ ] Implementirati pregled zgodovine
   - [ ] Dodati možnost filtriranja in iskanja
   - [ ] Implementirati prikaz statusa kontrolnega seznama

### Srednja prioriteta
1. Izboljšati uporabniško izkušnjo:
   - [ ] Dodati nalagalne indikatorje
   - [ ] Izboljšati prikaz napak
   - [ ] Dodati potrditvena sporočila
   - [ ] Optimizirati performanse

2. Implementirati izvoz podatkov:
   - [ ] Izvoz v XLSX format
   - [ ] Izvoz v PDF format
   - [ ] Dodati možnost prilagajanja izvoza
   - [ ] Implementirati predogled pred izvozom

### Nizka prioriteta
1. Dodatne funkcionalnosti:
   - [ ] Dodati možnost za dodajanje prilog
   - [ ] Implementirati komentarje
   - [ ] Dodati zgodovino sprememb
   - [ ] Implementirati obvestila

## Zaključene naloge
- [x] Implementacija prijave in registracije
- [x] Implementacija začetne strani
- [x] Osnovna struktura kontrolnega seznama
- [x] Podpora za XLSX datoteke
- [x] Nalaganje kontrolnih seznamov iz XLSX
- [x] Implementacija avtentikacije
- [x] Implementacija avtorizacije
- [x] Implementacija uporabniških pravic in vlog
- [x] Upravljanje uporabnikov (admin, moderator, uporabnik)
- [x] Popravki in izboljšave (hash: 5f6a8d0)

# Seznam potrebnih implementacij

## 0. Metodologija dela [POMEMBNO] Vsakič
- [] Pred vsako implementacijo:
  - [] Detajlni pregled celotne podatkovno bazo   
  - [] Detajlni pregled celotne relevantne kode
  - [] Razumevanje vseh odvisnosti med komponentami
  - [] Postavljanje vprašanj za razjasnitev nejasnosti
  - [] Priprava detajlnega načrta sprememb
  - [] Potrditev razumevanja pred začetkom implementacije
- [] Med implementacijo:
  - [] Postopno uvajanje sprememb
  - [] Sprotno preverjanje delovanja
  - [] Dokumentiranje sprememb
- [ ] Po implementaciji:
  - [ ] Testiranje vseh povezanih funkcionalnosti
  - [ ] Preverjanje varnostnih implikacij
  - [ ] Posodobitev dokumentacije

### Dokumentacija in beleženje
- [x] Vzdrževanje LOG.md:
  - [x] Dnevno beleženje pomembnih dogodkov
  - [x] Analiza varnostnih incidentov
  - [x] Beleženje rešenih težav
  - [x] Shranjevanje pomembnih logov
  - [x] Označevanje kritičnih dogodkov za sledenje

## 1. Začetna stran [IMPLEMENTIRANO]
- [x] Implementacija vnosnih polj:
  - [x] Osebna številka (prikazana iz prijavljenega uporabnika)
  - [x] Št. projekta (obvezno polje)
  - [x] Št. ponovitev (obvezno polje)
  - [x] Tip (dropdown, obvezno polje)
- [x] Implementacija gumbov:
  - [x] Start New Checklist
  - [ ] Open Existing Checklist
  - [x] Settings (dostop samo za admin/moderator)
  - [x] Spreminjanje gesla
  - [ ] Reset gesla (z varnostnim vprašanjem)

## 2. Nastavitve [DELNO IMPLEMENTIRANO]
- [x] Glavna navigacija
- [x] Omejitev dostopa samo na admin/moderator uporabnike
- [x] TIPI zavihek
  - [x] Seznam tipov
  - [x] Dodajanje novega tipa
  - [x] Urejanje tipa
  - [x] Brisanje tipa
  - [x] Uvoz XLSX
- [ ] IZVOZI zavihek
  - [ ] Nastavitve JSON izvoza
  - [ ] Nastavitve XLSX/PDF izvoza
  - [ ] PDF nastavitve (logo, glava/noga, font, barve)
- [ ] SISTEM zavihek
  - [ ] Tema (svetla/temna)
  - [ ] Jezik (SLO/ENG)
  - [ ] Avtomatska odjava
- [ ] PROFIL zavihek
  - [ ] Urejanje osebnih podatkov
  - [x] Spreminjanje gesla
  - [ ] Varnostne kopije nastavitev

## 3. Stran z vprašanji in segmenti [POTREBNO IMPLEMENTIRATI]
- [ ] Navigacija
  - [ ] Horizontalna/vertikalna navigacija
  - [ ] Prikaz aktivnega segmenta
  - [ ] Scrolling funkcionalnost
  - [ ] Floating "Shrani napredek" gumb
  - [ ] "Naslednji segment" gumb
- [ ] Prikaz vprašanj
  - [ ] Implementacija različnih tipov vprašanj
  - [ ] Podpora za ponovljiva vprašanja
  - [ ] Serijske številke
- [ ] Masovni vnos
  - [ ] "VSI DA"/"VSI NE" gumbi za boolean/multiple choice
  - [ ] Text input polje za tekstualna vprašanja

## 4. Shranjevanje in izvoz [POTREBNO IMPLEMENTIRATI]
- [ ] JSON format
  - [ ] Struktura za shranjevanje podatkov
  - [ ] Avtomatsko generiranje imen datotek
- [ ] Izvoz v XLSX
- [ ] Izvoz v PDF
- [ ] Sistem map za organizacijo datotek

## 5. Varnost [DELNO IMPLEMENTIRANO]
- [x] Osnovna avtentikacija
- [x] Registracija uporabnikov
- [x] Omejitev dostopa do nastavitev
- [ ] Avtomatska odjava 
- [ ] Logiranje sprememb
- [ ] Varnostna vprašanja za reset gesla

## 6. Optimizacije in izboljšave [POTREBNO IMPLEMENTIRATI]
- [ ] Izboljšava uporabniške izkušnje
  - [ ] Dodajanje loading indikatorjev
  - [ ] Izboljšava prikaza napak
  - [ ] Dodajanje potrditvenih sporočil
- [ ] Optimizacija performans
- [ ] Izboljšava validacije obrazcev
- [ ] Dodajanje tooltipov in pomoči

## 7. Optimizacija shranjevanja odgovorov [NOVO 19.4.2024]
- [ ] Izboljšava performans batch_create metode:
  - [ ] Implementacija indikatorja nalaganja
  - [ ] Implementacija asinhronega shranjevanja
  - [ ] Optimizacija podatkovne baze z indeksi
  - [ ] Implementacija paginated batch save
  - [ ] Dodajanje progress bara za masovno shranjevanje

## 8. Izboljšave JSON izvoza [NOVO 19.4.2024]
- [ ] Razširitev JSON izvoza:
  - [ ] Dodajanje segmentov v izvoz
  - [ ] Dodajanje vprašanj v izvoz
  - [ ] Dodajanje odgovorov v izvoz
  - [ ] Dodajanje serijskih številk v izvoz
  - [ ] Implementacija filtriranja podatkov za izvoz
  - [ ] Dodajanje možnosti za izbiro podatkov za izvoz
  - [ ] Implementacija validacije uvoženih podatkov
  - [ ] Optimizacija izvoza za velike projekte

## Prioritete (posodobljeno 16.4.2024)
1. Implementacija prikaza vprašanj in segmentov v kontrolnem seznamu
2. Implementacija shranjevanja odgovorov
3. Implementacija odpiranja obstoječih kontrolnih seznamov
4. Implementacija izvoza podatkov
5. Optimizacije in izboljšave

## Nove naloge (15.4.2024)
1. [ ] Implementacija shranjevanja odgovorov v kontrolnem seznamu
2. [ ] Implementacija odpiranja obstoječih kontrolnih seznamov
3. [ ] Dodajanje možnosti za vnos opomb pri vprašanjih
4. [ ] Implementacija pregleda zgodovine kontrolnih seznamov
5. [ ] Dodajanje možnosti za izvoz kontrolnega seznama

## TRENUTNA TOP PRIORITETA - Implementacija omejitve dostopa (16.4.2024)

### Backend spremembe [DELNO IMPLEMENTIRANO]
1. [x] Ustvariti novo datoteko `backend/checklist/permissions.py`:
   - [x] Implementirati `IsAdminOrModerator` permission class
   - [x] Dodati preverjanje `is_staff` in `is_superuser`

2. [x] Posodobiti ViewSete v `views.py`:
   - [x] Dodati nove permission classe v `TipViewSet`
     - [x] Omejiti create/update/delete/upload_xlsx samo na admin/moderator
     - [x] Pustiti list/retrieve vsem prijavljenim uporabnikom
   - [x] Dodati `IsAdminOrModerator` v `NastavitevViewSet`
   - [ ] Posodobiti `ProfilViewSet` z omejitvami za update/delete

3. [x] Posodobiti User Serializer:
   - [x] Dodati polja `is_staff` in `is_superuser` v response
   - [x] Posodobiti `UserSerializer` v `serializers.py`

### Frontend spremembe [IMPLEMENTIRANO]
1. [x] Implementirati Route Guard:
   - [x] Ustvariti `frontend/src/guards/AdminGuard.tsx`
   - [x] Implementirati preverjanje admin/moderator statusa
   - [x] Dodati redirect na home page za nepooblaščene uporabnike

2. [x] Posodobiti Router:
   - [x] Oviti Settings route z AdminGuard
   - [x] Dodati redirect logiko

3. [x] Posodobiti Navigation:
   - [x] Skriti Settings gumb za ne-admin uporabnike
   - [x] Dodati preverjanje user.is_staff || user.is_superuser

4. [x] Posodobiti AuthContext:
   - [x] Dodati admin/moderator status v user interface
   - [x] Posodobiti vse relevantne tipe

### Testiranje [DELNO IMPLEMENTIRANO]
1. [x] Testirati backend omejitve:
   - [x] Testirati dostop do /api/tipi/ endpointa
   - [x] Testirati dostop do /api/nastavitve/
   - [ ] Testirati dostop do /api/profili/

2. [x] Testirati frontend omejitve:
   - [x] Testirati prikaz/skrivanje Settings gumba
   - [x] Testirati redirect pri direktnem dostopu do /settings
   - [x] Testirati ohranjanje admin statusa po refreshu 

## Implementacija logiranja [POTREBNO IMPLEMENTIRATI]
1. [ ] Backend logiranje:
   - [ ] Nastaviti logiranje v datoteko:
     - [ ] Dostopi do API endpointov
     - [ ] Prijave/odjave uporabnikov
     - [ ] Napake in izjeme
     - [ ] Spremembe podatkov (create/update/delete)
   - [ ] Določiti rotacijo log datotek (dnevno/tedensko)
   - [ ] Določiti format log zapisov
   - [ ] Določiti lokacijo shranjevanja logov

2. [ ] Frontend logiranje:
   - [ ] Implementirati beleženje napak
   - [ ] Implementirati beleženje uporabniških akcij
   - [ ] Pošiljanje logov na backend

3. [ ] Administracija logov:
   - [ ] Dodati vmesnik za pregled logov v admin panelu
   - [ ] Implementirati filtriranje in iskanje po logih
   - [ ] Dodati možnost izvoza logov 


   
   ### Commit Hash Sledenje
Po vsakem commitu je potrebno posodobiti sledeče informacije:
- Zadnji commit hash
- Predzadnji commit hash

Trenutno stanje:
- Zadnji commit: `e140e03` (Implementirana avtentikacija in avtorizacija)
- Predzadnji commit: `02f21bb` (Implementirana avtentikacija in registracija uporabnikov)

# Seznam opravil

## Kontrolni seznam
- [x] Osnovna struktura kontrolnega seznama
- [x] Navigacija med segmenti
- [x] Prikaz vprašanj za trenutni segment
- [x] Shranjevanje odgovorov
- [x] Podpora za večkratne ponovitve vprašanj
- [x] Pravilno branje števila ponovitev iz projekta
- [x] Izboljšan prikaz serijskih številk (brez ID tipa)
- [x] Masovni vnos odgovorov
- [x] Posamično urejanje odgovorov
- [x] Gumbi za hitre odgovore (DA/NE/N/A)
- [x] Obvestila o uspešnosti/napakah pri shranjevanju
- [ ] Dodajanje opomb k odgovorom
- [ ] Validacija obveznih polj
- [ ] Pregled vseh odgovorov pred zaključkom
- [ ] Izvoz podatkov v PDF/Excel
- [ ] Zgodovina sprememb odgovorov

## Uporabniški vmesnik
- [x] Osnovna postavitev strani
- [x] Navigacija med segmenti
- [x] Prikaz napredka
- [x] Odzivna zasnova
- [x] Izboljšan prikaz vprašanj in odgovorov
- [ ] Temni način
- [ ] Prilagodljiva velikost pisave
- [ ] Filtriranje in iskanje vprašanj
- [ ] Predogled PDF poročila

## Zaledni sistem
- [x] API za projekte
- [x] API za segmente
- [x] API za vprašanja
- [x] API za odgovore
- [x] API za serijske številke
- [ ] Validacija vhodnih podatkov
- [ ] Optimizacija poizvedb
- [ ] Beleženje sprememb
- [ ] Varnostno kopiranje podatkov

## Administracija
- [x] Upravljanje uporabnikov
- [x] Upravljanje projektov
- [ ] Upravljanje tipov kontrolnih seznamov
- [ ] Upravljanje pravic
- [ ] Pregled zgodovine sprememb
- [ ] Izvoz podatkov
- [ ] Uvoz podatkov iz Excel datotek

## Varnost
- [x] Osnovna avtentikacija
- [x] Avtorizacija
- [ ] Beleženje dostopov
- [ ] Omejevanje poskusov prijave
- [ ] Varno shranjevanje gesel
- [ ] HTTPS podpora

## Testiranje
- [ ] Enotiski testi (Backend)
- [ ] Integracijski testi
- [ ] E2E testi (Frontend)
- [ ] Testiranje zmogljivosti
- [ ] Varnostno testiranje

## Dokumentacija
- [x] Osnovna dokumentacija API-ja
- [x] Navodila za namestitev
- [ ] Uporabniška navodila
- [ ] Razvojna dokumentacija
- [ ] Dokumentacija API-ja (Swagger/OpenAPI)

## Optimizacija
- [ ] Zmanjšanje števila API klicev
- [ ] Predpomnjenje pogostih poizvedb
- [ ] Optimizacija nalaganja strani
- [ ] Zmanjšanje velikosti bundle-a
- [ ] Optimizacija slik in medijev

Optimizacija shranjevanje odgovorov 
- Odlično, da funkcionira! Da, shranjevanje več odgovorov naenkrat lahko traja nekaj časa, še posebej če je veliko odgovorov v enem segmentu.
Za optimizacijo bi lahko razmislili o naslednjih izboljšavah:
Dodajanje indikatorja nalaganja:
Prikazati "Shranjevanje..." obvestilo medtem ko se odgovori shranjujejo
To bi uporabniku dalo boljšo povratno informacijo
Optimizacija baze:
Dodajanje indeksov za pogoste poizvedbe
Batch shranjevanje v transakciji (kar že imamo)
Asinhrono shranjevanje:
Implementacija shranjevanja v ozadju
Uporabnik lahko nadaljuje z delom medtem ko se odgovori shranjujejo
Paginacija odgovorov:
Shranjevanje odgovorov v manjših skupinah
To bi zmanjšalo obremenitev strežnika
Če želite, lahko implementiramo katero od teh izboljšav. Katera bi bila za vas najbolj uporabna?


## Izboljšave izvoza JSON
- [ ] Razširi izvoz JSON da vključuje:
  - Segmente
  - Vprašanja
  - Odgovore
  - Serijske številke
- [ ] Implementiraj validacijo uvoženih podatkov
- [ ] Dodaj možnost izbire, katere podatke želimo izvoziti
- [ ] Optimiziraj izvoz za velike projekte

Zadnji commit: 78b9873 (Dodana batch_create metoda za shranjevanje več odgovorov naenkrat) 


## Vzdrževanje
- [ ] Redno varnostno kopiranje
- [ ] Monitoring sistema
- [ ] Beleženje napak
- [ ] Avtomatsko obveščanje o napakah
- [ ] Redno čiščenje podatkov


### Commit Hash Sledenje
Po vsakem commitu je potrebno posodobiti sledeče informacije:
- Zadnji commit hash
- Predzadnji commit hash

Trenutno stanje:
- Zadnji commit: `eb74369` (18.4.2024: Implementirane izboljšave kontrolnega seznama)
- Predzadnji commit: `e140e03` (Implementirana avtentikacija in avtorizacija)

### .gitignore
// ... existing code ...


Zadnji commit: 78b9873 (Dodana batch_create metoda za shranjevanje več odgovorov naenkrat) 

## Izboljšave uvoza/izvoza
- [ ] Implementacija uvoza projektov iz JSON datoteke
- [ ] Validacija podatkov pri uvozu
- [ ] Preverjanje obstoječih projektov in serijskih številk
- [ ] Možnost izbire, katere podatke uvoziti
- [ ] Optimizacija uvoza za velike projekte
- [ ] Dodajanje metapodatkov pri uvozu (datum uvoza, uporabnik, itd.)

Zadnji commit:  5f6a8d0 