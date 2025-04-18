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