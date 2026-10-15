# 11 - Laboratorio (Git, testing/Makefile, Doxygen/debug, HybridSort, Hash, Priority Queue ternaria, Grafi)

Fonte: doc Drive "Appunti" (sezione Laboratorio: Lab 01, 02, 03.1, 03.2, 05, 07, 09). Dati utili per eventuali domande sul lab/orale e per ricordare le specifiche dei progetti.

## Mappa
Lab 01 Git/GitLab; Lab 02 Unit testing (TDD, Unity) e Makefile; Lab 03.1 Doxygen e debugging; Lab 03.2 HybridSort; Lab 05 libreria Hash Table (ex2); Lab 07 Priority Queue con heap ternario e scheduler (ex3); Lab 09 libreria Grafi con BFS (ex4).

## Lab 01 - Git

Git organizza il lavoro in tre aree: la working directory, la staging area (dove si porta ciò che si vuole salvare con `git add`) e il repository (dove si registra con `git commit -m "..."`). Un file può essere untracked oppure tracked, e in quest'ultimo caso unmodified, modified o staged. Il ciclo di lavoro è:
1. `git pull`, sempre prima di cominciare, per partire dall'ultima versione remota;
2. modifica;
3. `git add`;
4. `git commit`;
5. `git push`.

I comandi principali sono `git clone <url>`, `git status`, `git add f`, `git commit -m`, `git log`, `git pull` e `git push`. Per i branch: `git branch <n>` crea, `git checkout <n>` passa al branch, `git merge <n>` (da main) fonde il branch. Il file `.gitignore` (per esempio `out/*.a`, `*.txt`) va committato.

## Lab 02 - Unit testing e Makefile

I test di unità devono essere **automatici, focalizzati e indipendenti**. Si procede bottom-up, testando prima le unità usate dalle altre; non si usano globali non costanti condivise tra test, e per verificare più unità insieme si scrivono integration test. Il **TDD** impone un ciclo in tre fasi:
1. **Rosso**: scrivere un test che fallisce;
2. **Verde**: scrivere il codice minimo che lo fa passare;
3. **Refactor**.

La regola è che non si scrive codice senza un test che lo richiede.

In C si usa **Unity**: ci sono `setUp()` e `tearDown()`, le funzioni `test_*`, un `main` con `UNITY_BEGIN()`, `RUN_TEST(f)` e `UNITY_END()`, e le macro `TEST_ASSERT_*(atteso, ottenuto)`. Il caso di studio è SortedArray: create, is_empty, size, add (mantiene l'ordine con una funzione di confronto fornita dall'utente), get(i), free; si estende con il ridimensionamento a raddoppio.

Il **Makefile** automatizza la compilazione. Ha variabili (CC, CFLAGS, SRC_DIR, BUILD_DIR, usate con `$(VAR)`), target (`all` è il predefinito, poi `clean`) e regole: la compilazione è `$(BUILD_DIR)/%.o: $(SRC_DIR)/%.c` con `$(CC) $(CFLAGS) -c $< -o $@`, mentre il linking usa `$^` (tutti i prerequisiti) e `$@` (il target). Il flusso tipico è `make clean`, `make`, `./bin/tests`.

## Lab 03.1 - Doxygen e debug

Doxygen genera la documentazione dai commenti: si crea la configurazione con `doxygen -g Doxyfile` e la si esegue con `doxygen Doxyfile`. Le impostazioni usate sono INPUT ./src ./include, FILE_PATTERNS *.h *.c, RECURSIVE YES, EXCLUDE ./test, OUTPUT_DIRECTORY ./docs, GENERATE_HTML YES, GENERATE_LATEX NO, EXTRACT_ALL YES, EXTRACT_STATIC NO. I commenti validi sono `/** ... */`, `/*! ... */`, `/**< ... */` (per il membro che precede), `///` e `//!`, con i tag `@brief`, `@param nome` e `@return`; i commenti Doxygen si scrivono solo negli **header (.h)**.

Nel debug i breakpoint permettono di ispezionare lo stato e controllare il flusso. I comandi di avanzamento sono:
- **Step Over**: esegue la riga senza entrare nelle funzioni;
- **Step Into**: entra nella funzione chiamata;
- **Step Out**: esce al chiamante.

Poi ci sono Riprendi, Pausa, Ferma e Riavvia.

## Lab 03.2 - HybridSort

L'idea di HybridSort è combinare due ordinamenti sfruttando il punto debole di ciascuno. Il **QuickSort** è veloce in media (O(n log n)) ma ha overhead ricorsivo e rischia O(n^2) con un pivot sfortunato; il **SelectionSort** è sempre O(n^2) ma ha overhead minimo e quindi conviene su array piccoli. Così, se la partizione ha dimensione n >= k si usa QuickSort, se n < k SelectionSort. La soglia **k va determinata sperimentalmente**, perché dipende da CPU, cache, compilatore e dati: se è troppo bassa il beneficio è nullo, se è troppo alta si tende a O(n^2).

Il QuickSort usa la PARTITION di Lomuto: `x=A[r]; i=p-1; for j=p..r-1 if A[j]<=x {i++; swap A[i],A[j]}; swap A[i+1],A[r]; return i+1`. QUICKSORT(A,p,r) è: if p<r: q=PARTITION; QUICKSORT(A,p,q-1); QUICKSORT(A,q+1,r). Costo medio O(n log n), peggiore O(n^2). Le ottimizzazioni possibili sono il pivot casuale o la mediana di tre e il partizionamento a tre vie (per i duplicati).

La firma richiesta è `void hybridsort(void *base, size_t nitems, size_t size, size_t k, int (*compar)(const void*, const void*))`. Il caso d'uso è il file `records.bin`, con **20 milioni di record da 36 byte** (id u64 ai byte 0-7, field1 float ai byte 8-11, field2 i64 ai byte 12-19, field3 stringa di 16 caratteri ai byte 20-35), da ordinare con `sort_records(infile, outfile, field, k)`. I test devono coprire le funzioni ausiliarie, tutti i tipi (void*), array vuoti e piccoli, vari valori di k e i casi limite (ordinati, inversi, duplicati).

## Lab 05 - Hash table (ex2)

Si implementa una tavola hash generica (void*) con **concatenamento**. L'API (hash_table.h) ha 8 funzioni:
- `hash_table_create(f1 confronto: 0 se diversi, !=0 se uguali; f2 hash)`
- `put` (aggiorna se la chiave è presente)
- `get` (NULL se assente)
- `contains_key`
- `remove` (nessun effetto se assente)
- `size`
- `keyset` (array allocato, ordine arbitrario, il chiamante lo dealloca)
- `free` (non libera chiavi né valori)

L'applicazione è `main_ex2 <input_file> <min_length>`, che trova la parola (solo alfabetica, case-insensitive) più frequente in `iliade.txt` con lunghezza minima data. L'uso di un LLM è obbligatorio da documentare, e **put/get/remove devono essere O(1) in media**, altrimenti la consegna è invalida. La consegna richiede la cartella `ex2`, con `make all` che produce `ex2/bin/main_ex2` e `test_ex2` (test senza parametri, exit code 0 = OK); Unity è incluso; non vanno committati iliade.txt, zip e binari.

## Lab 07 - Priority queue con heap ternario (ex3)

La coda di priorità è un **max-heap ternario**: ogni nodo ha fino a 3 figli (left, mid, right) con node(i) ≥ figli. Tutte le operazioni devono essere **sub-lineari**, anche `contains` e `remove`; per questo serve una **hash table ausiliaria** che mappa ogni elemento alla sua posizione nell'array, altrimenti trovare un elemento costerebbe O(n). Esempio con inserimenti A2,B3,C5,D1,E2,F3,G4,H5: la radice è C(5) con figli H(5), G(4), B(3).

L'API (priority_queue.h) comprende `create(f1 confronto, f2 hash)`, `push`, `contains`, `top`, `pop`, `remove`, `size` e `free`. L'applicazione è una simulazione di uno scheduler **non preemptive** con priorità, che legge `tasks.csv` (ID, Start, Length, Priority; già ordinato per Start; priorità maggiore = più urgente). A ogni istante t la simulazione:
1. accoda i task con Start<=t;
2. se l'esecutore è libero estrae il massimo e fa t += Length;
3. se è libero e la coda è vuota passa a t+1.

Si termina quando tutti i task sono processati. Gli eseguibili sono `main_ex3 <in> <out>` e `test_ex3`, nella cartella `ex3`.

## Lab 09 - Grafi sparsi (ex4)

I grafi sparsi si rappresentano con **liste di adiacenza indicizzate da una tavola hash** (riuso di ex2), con spazio O(|V|+|E|). `struct graph` contiene la hash, i flag labelled e directed; `struct edge` contiene source, dest e label. L'API in graph.h ha complessità richieste precise:
- create/free
- `is_directed`, `is_labelled`, `num_nodes`: O(1)
- `num_edges`: O(n)
- `add_node`, `contains_node`: O(1)
- `remove_node`, `get_nodes`: O(n)
- `add_edge`, `contains_edge`, `remove_edge`, `get_label`: O(1)
- `get_edges`: O(n)
- `num_neighbours`, `get_neighbours`: O(1), assumendo un grafo molto sparso con grado circa costante

La funzione `void** breadth_first_visit(Graph gr, void* start, compare, hash)` restituisce un array di nodi in ordine BFS, o NULL se start è assente. L'applicazione è `main_ex4 <input_file> <city> <output_file>` su `italian_dist_graph.csv` (place1, place2, distanza in metri; archi non diretti), nella cartella `ex4` con target `test_ex4`.

## Cose da saper fare all'esame
- Scritto/orale: improbabile chiedere sintassi Git, ma possibili domande su TDD, unit test, Makefile, uso di void*/puntatori a funzione, complessità richieste per le API (hash O(1) medio, heap O(log n)), perché HybridSort usa soglia k, perché serve una hash ausiliaria per remove/contains nell'heap. [DA VERIFICARE se l'orale include il lab.]

## Dubbi
- Il testo completo degli esercizi è su GitLab (il doc dichiara le slide "parziali"); non verificabile qui.
