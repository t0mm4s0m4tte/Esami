# 09 - Esercizi, codice di laboratorio ed esempi svolti
Fonte: Moodle di Programmazione II, corsi Prog2-B (teoria, docente C. Baroglio) e Prog2-LAB (laboratorio, G. Torta), cartelle scaricate in `_moodle-raw/Programmazione-II`. I quiz Moodle non sono scaricati (solo i file).

Nel Moodle di questa materia **non ci sono esami passati, simulazioni né eserciziari con testo e soluzione**. Quello che c'è è di tre tipi: pochi testi di esercizio (il canile, le quattro funzioni di `list-rec.h`, i quattro programmi di debug), codice scritto dai docenti a lezione o in laboratorio (alberi, liste, ricettario, biblioteca), e le trascrizioni automatiche di 12 lezioni. Per questo il file non è un elenco di appelli ma una raccolta di **esercizi d'esame plausibili con la loro soluzione**: ogni programma qui sotto è stato compilato ed eseguito con gcc (TDM-GCC 64 bit, Windows) prima di scriverne l'esito. Dove i risultati dipendono dalla piattaforma lo dico. Le soluzioni delle funzioni lasciate vuote dal docente sono mie e sono segnalate con [INT].

## Mappa

- [1. Cosa dicono le lezioni sull'esame](#1-cosa-dicono-le-lezioni-sullesame)
- [2. Debug: quattro programmi con un bug e gdb](#2-debug-quattro-programmi-con-un-bug-e-gdb)
- [3. Matrici di puntatori: `pari_dispari`](#3-matrici-di-puntatori-pari_dispari)
- [4. Il laboratorio sugli alberi binari di ricerca](#4-il-laboratorio-sugli-alberi-binari-di-ricerca)
- [5. Liste ricorsive: `list-rec`](#5-liste-ricorsive-list-rec)
- [6. Tipo opaco, modulo, accoppiamento: i numeri complessi](#6-tipo-opaco-modulo-accoppiamento-i-numeri-complessi)
- [7. Il progetto sul set ordinato](#7-il-progetto-sul-set-ordinato)
- [8. Il canile](#8-il-canile)
- [9. Gli esempi delle lezioni](#9-gli-esempi-delle-lezioni)
- [10. Errori nei materiali del docente](#10-errori-nei-materiali-del-docente)
- [Cosa resta da integrare](#cosa-resta-da-integrare)
- [Dubbi](#dubbi)

## 1. Cosa dicono le lezioni sull'esame

Teoria: [01 - Modalità d'esame](01-organizzazione-software-compilazione.md#modalità-desame-dal-corso-aa-2024-25---da-verificare-per-aa-2026-27).

Nella prima lezione (trascrizione del 21/02/2025, testo generato da un riconoscimento vocale, quindi con errori) la docente conferma le regole già riportate nel file 01: la parte di laboratorio, che sull'iscrizione compare con il nome "esonero" pur non essendolo, vale al massimo 3 punti e se ne richiede almeno 1; il punteggio resta valido per cinque appelli consecutivi; la teoria vale 30 e la sufficienza è 17 ("siamo un po' generosi, non dev'essere diciotto"); il voto finale è la somma. Per poter fare l'esame bisogna avere consegnato su Moodle i progetti di laboratorio (dieci esercizi, dice) superando i test automatici, e la consegna resta aperta tutto l'anno.

Aggiunge due informazioni nuove sulla prova di teoria: contiene domande a risposta chiusa e aperta e **tre esercizi di programmazione**, uno "di base", uno sulle strutture dinamiche (di solito le liste) e uno su strutture più complesse come gli alberi. Dice inoltre che a volte il testo chiede esplicitamente una soluzione iterativa o ricorsiva, e che se non lo specifica si può scegliere quella preferita. Nelle lezioni sulla correttezza (non ho annotato quale delle trascrizioni) ripete che la terminazione va verificata sul codice e non sulle intenzioni, e sembra dire che continuare a eseguire un ciclo di ricerca dopo aver trovato l'elemento è considerato un errore che fa perdere punti. [DA VERIFICARE: il riconoscimento vocale è approssimativo; quest'ultima frase è la mia interpretazione di un passo confuso, e la frase sul numero di correzioni a cui "ognuno ha diritto" è troppo confusa per essere riportata.]

## 2. Debug: quattro programmi con un bug e gdb

Teoria: [02 - Concetti](02-correttezza-e-algoritmi-su-array.md#concetti) (correttezza rispetto alla specifica), [01 - Compilatore](01-organizzazione-software-compilazione.md#compilatore-4-fasi).

Il laboratorio fornisce quattro programmi, `debug1.c`...`debug4.c`, ciascuno con un errore diverso, e le slide di Garetto su gdb. Sono utili anche per lo scritto, perché i quattro bug sono i quattro tipi classici: un puntatore nullo, un indice fuori dai limiti, una formula sbagliata e una condizione sbagliata. Le uscite qui sotto sono quelle ottenute compilando con `gcc -g -O0`.

In `debug1.c` la funzione `buggyFunction` assegna `*ptr = 10` con `ptr` uguale a `NULL`. Il programma stampa "Starting program..." e poi termina per violazione di segmento. Con gdb, `run` si ferma sulla riga 5 con il segnale SIGSEGV, `bt` mostra la catena `buggyFunction` chiamata da `main` alla riga 10, e `info locals` mostra `ptr = 0x0`, che è la diagnosi. La correzione è allocare la memoria (o puntare a una variabile) prima di scrivere.

In `debug2.c` il ciclo di `processArray` usa `i <= size` invece di `i < size`, e legge quindi `arr[5]` in un array di 5 elementi. Non c'è nessun errore a tempo di esecuzione: il programma stampa "Element 5:" seguito da un valore qualunque letto dalla memoria adiacente (nelle mie prove 493 e 517, diverso a ogni esecuzione), che è il comportamento indefinito tipico. In gdb conviene fermarsi con `break 6` e stampare `p arr[0]@6`, che mostra i cinque valori veri e un sesto estraneo; l'espressione `p A[10]@5` della slide funziona allo stesso modo.

In `debug3.c` la funzione dovrebbe sommare i numeri da 1 a n, e il commento nel sorgente dice che il risultato atteso per n=5 è 15, ma stampa 30 perché somma `i * 2`. La correzione è `sum += i`. È un errore di logica che nessun compilatore e nessun gdb segnalano: lo si trova solo confrontando con la specifica, ad esempio con un `watch sum` che mostra i valori 2, 6, 12, 20, 30 al posto di 1, 3, 6, 10, 15.

In `debug4.c` `countEvenNumbers` conta i numeri pari ma usa `arr[i] % 2 == 1`, quindi conta i dispari: su `{2,4,6,8,10}` stampa 0 invece di 5. In gdb, fermandosi dentro il ciclo, `p arr[i] % 2` vale 0 mentre la condizione chiede 1, e `watch count` non scatta mai. La correzione ovvia è `== 0`, ma attenzione al caso collegato: per testare i dispari `== 1` è sbagliato anche con la condizione giusta, perché in C `-3 % 2` vale `-1` (il resto ha il segno del dividendo); si scrive `!= 0`.

I comandi di gdb richiesti dalle slide sono pochi. Si compila con `gcc -g` (senza ottimizzazioni), si avvia con `gdb eseguibile`, e si usano `b` (`break`, anche condizionato: `b f if x == 0`), `r`, `c`, `n` (esegue la riga senza entrare nelle funzioni), `s` (entra), `f` (`finish`, fino al termine della funzione), `p` per stampare (`p &x`, `p A[10]@5`), `pt` per il tipo, `set var x=4` per modificare, `watch x` per fermarsi quando cambia, `display x` per vederlo a ogni arresto, `bt`, `up`, `down`, `info locals`, `info args`, `l` per elencare il sorgente e `quit`. Dopo un crash il file di core permette un'analisi "post mortem".

## 3. Matrici di puntatori: `pari_dispari`

Teoria: [03 - Allocazione dinamica e accesso](03-struct-puntatori-union.md#allocazione-dinamica-e-accesso).

`matrice.c` contiene `int *pari_dispari(int **str, int N)`, che dato un array di N puntatori a righe di N interi restituisce un array di N valori, uno per riga: 1 se la somma della riga è pari, 0 se è dispari. Il `main` costruisce due cose diverse: `m1`, un `int[10][10]`, e `m2`, un array di 10 puntatori ognuno inizializzato con una `malloc` di 10 interi. Il punto da capire è che la chiamata `pari_dispari(m1, 10)` (lasciata commentata) **non è lecita**: `m1` è un unico blocco contiguo di 100 interi, senza puntatori alle righe, e il suo tipo `int (*)[10]` non è `int **`; solo `m2` ha la forma che la funzione si aspetta.

Il programma, così com'è, ha quattro difetti. Primo, `malloc` non azzera la memoria, quindi le righe di `m2` contengono valori indeterminati e le somme (e i risultati stampati) sono privi di significato: nella mia esecuzione compariva `0,0,1,2,2,0,0,1,0,1,`, diverso a ogni esecuzione e diverso dall'atteso, e le assegnazioni `m2[0][5] = 7` e `m2[9][3] = 3` non servono a nulla finché le altre celle sono casuali; serve `calloc`. Secondo, il risultato 2 che compare nella riga precedente è possibile perché `s % 2` vale `-1` quando `s` è negativo e dispari, e `1 - (-1)` fa 2: per ottenere sempre 0 o 1 serve `((s % 2) + 2) % 2` oppure `s % 2 != 0`. Terzo, la funzione alloca `out` prima di controllare le righe e, se trova una riga nulla, esce con `return NULL` senza liberarlo (perdita di memoria); il controllo va fatto prima. Quarto, nel `main` il risultato non è mai liberato e le righe di `m2` nemmeno, e l'indirizzo è stampato con `%lx` e un cast a `unsigned long`, che su un sistema a 64 bit con `long` a 32 bit (Windows) tronca l'indirizzo: per i puntatori si usa `%p`.

Versione corretta [INT]:

```c
int *pari_dispari(int **str, int N) {
  if (!str) return NULL;
  for (int i = 0; i < N; i++) if (!str[i]) return NULL;   /* prima di allocare */
  int *out = malloc(sizeof(int) * N);
  if (!out) return NULL;
  for (int i = 0; i < N; i++) {
    int s = 0;
    for (int j = 0; j < N; j++) s += str[i][j];
    out[i] = 1 - (((s % 2) + 2) % 2);
  }
  return out;
}
```

Con le righe azzerate da `calloc` restituisce `1,1,1,1,1,1,1,1,1,1,`; dopo `m2[0][5] = 7`, `m2[9][3] = 3` e `m2[4][0] = -3` restituisce `0,1,1,1,0,1,1,1,1,0,` (verificato). Con `str == NULL` restituisce `NULL`.

## 4. Il laboratorio sugli alberi binari di ricerca

Teoria: [06 - Tipo e operazioni base](06-alberi-binari.md#tipo-e-operazioni-base), [06 - Albero ordinato / BST](06-alberi-binari.md#albero-ordinato--bst).

Il laboratorio ha due cartelle di codice, "file iniziali" e "file finali". Gli iniziali contengono `tree.c` con `mkNode`, `insertTree`, `maxTree`, `containsTree`, `depthTree` e `removeTree`; i finali aggiungono `minTree` e, sotto il commento "NUOVI METODI", `sizeTree`, `sumTree`, `ncontainsTree`, `balancedTree`, `filterleTree`, `getTree`, oltre a un header `tree.h` e a un `test-tree.c`. Il tipo è `typedef struct node* tree` con i campi `left`, `right`, `data`, e l'albero vuoto è `NULL`. Nel passaggio dagli iniziali ai finali cambia anche `depthTree`: all'inizio un nodo senza figli aveva profondità 1 (il valore di un figlio nullo era 0), alla fine l'albero vuoto vale -1 e una foglia 0, cioè la profondità conta gli archi.

Il significato delle funzioni nuove, che sono quelle che un esame può chiedere di scrivere, si capisce meglio con un esempio. Prendo l'albero costruito inserendo nell'ordine 10, 5, 15, 3, 8, 12, 20, 1: ha radice 10, figlio sinistro 5 (con figli 3 e 8, e 3 ha figlio sinistro 1), figlio destro 15 (con figli 12 e 20). Allora `sizeTree` è 8, `sumTree` 74, `depthTree` 3 (il cammino 10-5-3-1), e `balancedTree` è vero, perché in ogni nodo le profondità dei due sottoalberi differiscono al più di 1. `getTree(t, i)` restituisce l'i-esimo elemento in ordine crescente (senza costruire la sequenza): si calcola la dimensione del sottoalbero sinistro `l`, e se `i < l` si scende a sinistra, se `i == l` la risposta è la radice, altrimenti si scende a destra con `i - l - 1`. Per questo `printTree` del test stampa `1,3,5,8,10,12,15,20,`. `ncontainsTree(t, x, n)` cerca `x` ma scendendo al più di `n` livelli sotto la radice: `ncontains(t,8,1)` è falso e `ncontains(t,8,2)` vero (8 sta a profondità 2), `ncontains(t,1,2)` è falso e `ncontains(t,1,3)` vero, `ncontains(t,10,0)` è vero. `filterleTree(t, x)` restituisce un albero con gli elementi minori o uguali a `x`: `filterle(t,10)` ha 5 elementi (1,3,5,8,10), `filterle(t,9)` ne ha 4 (1,3,5,8), `filterle(t,12)` ne ha 6, e l'albero originale non cambia.

La funzione `filterleTree` ha però una caratteristica da conoscere: costruisce solo i nodi del cammino di ricerca (`_new_node`) e **condivide** con l'originale i sottoalberi sinistri interi. I due alberi non sono indipendenti: poiché `removeTree` modifica i nodi sul posto, rimuovere un elemento dall'originale può cambiare anche l'albero filtrato. Se serve una copia vera bisogna duplicare ricorsivamente anche i sottoalberi.

Il `test-tree.c` fornito inserisce dieci numeri `rand() % 20` dopo `srand(1234)`. Il risultato dipende dall'implementazione di `rand` (glibc su Linux e libreria di Windows danno sequenze diverse), quindi non si può dire "l'albero giusto"; con TDM-GCC su Windows ottengo 8 nodi (gli inserimenti duplicati vengono ignorati da `insertTree`), somma 91, minimo 1, massimo 18, profondità 4, non bilanciato, e dopo `removeTree(t, 18)` 7 nodi e somma 73. [DA VERIFICARE su Linux: i valori cambiano.]

### Gli errori di `removeTree`

La funzione è la parte più delicata, e il codice del laboratorio ha due difetti che ho verificato con piccoli programmi. Nel ramo "trovato l'elemento da eliminare" ci sono tre casi: sinistro vuoto e destro no (restituisce il destro), destro vuoto e sinistro no (restituisce il sinistro), e "tutti gli altri". Il terzo caso è pensato per i nodi con due figli (si sostituisce `t->data` con il massimo del sottoalbero sinistro e lo si elimina da lì), ma contiene anche i nodi **senza figli**. Quindi eliminare una foglia esegue `maxTree(t->left)` con `t->left == NULL` e il programma termina per violazione di segmento (provato su `10,5,15,3` eliminando 3). Il secondo difetto è che la chiamata `removeTree(t->left, t->data)` ignora il valore restituito: se il nodo con il massimo ha un figlio sinistro, la funzione lo restituisce ma nessuno lo collega al padre, e il valore resta **duplicato**. Sull'albero di esempio, `removeTree(t, 5)` produce `1,3,3,8,10,12,15,20,` (due volte il 3) invece di `1,3,8,10,12,15,20,`. È l'errore tipico di chi dimentica di riassegnare il risultato di una funzione ricorsiva che restituisce l'albero.

Versione corretta [INT], provata con eliminazioni consecutive di 5, 20, 1, 10 e 99 (assente) sull'albero di esempio:

```c
tree removeTree(tree t, int x) {
  if (t == NULL) return NULL;
  if (x < t->data) { t->left  = removeTree(t->left,  x); return t; }
  if (x > t->data) { t->right = removeTree(t->right, x); return t; }
  /* x == t->data */
  if (t->left == NULL || t->right == NULL) {
    tree figlio = (t->left != NULL) ? t->left : t->right;   /* NULL se foglia */
    free(t);
    return figlio;
  }
  t->data = maxTree(t->left);
  t->left = removeTree(t->left, t->data);
  return t;
}
```

Le sequenze ottenute sono `1,3,8,10,12,15,20,` poi `1,3,8,10,12,15,` poi `3,8,10,12,15,` poi `3,8,12,15,` e infine la stessa perché 99 non c'è.

Altre osservazioni minori: `tree.h` ha `#ifndef _TREE_H` ma definisce `TREE_H` (nomi diversi), quindi la protezione contro l'inclusione doppia non funziona; `containsTree` non gestisce l'albero vuoto (`t == NULL`) e, quando `x` è minore della radice ma manca il figlio sinistro, finisce a cercare nel sottoalbero destro, dove non può trovarlo (il risultato è giusto ma il lavoro è inutile); `balancedTree` ricalcola `depthTree` a ogni nodo, quindi costa $O(n^{2})$ nel caso peggiore, mentre una versione che restituisce insieme altezza ed esito costa $O(n)$.

## 5. Liste ricorsive: `list-rec`

Teoria: [04 - Ricorsione su liste](04-liste-linkate-e-ricorsione.md#ricorsione-su-liste), [04 - Ricorsione in testa vs in coda](04-liste-linkate-e-ricorsione.md#ricorsione-in-testa-vs-in-coda).

L'esercizio di laboratorio sulle liste ha l'header `list-rec.h` con il tipo `ListNode`/`ListNodePtr` e sei funzioni, delle quali il docente ha scritto in classe solo tre: `fromTo_rec(m, n)`, che costruisce la lista dei numeri da `m` a `n` (vuota se `m > n`), `reverse_rec`, e `reverse_ite_const`. Le altre, `occurrences_rec`, `included_rec`, `zipSum_rec`, sono dichiarate nell'header e non implementate; `reverse_rec_const_aux` è un'ulteriore funzione lasciata con corpo vuoto (il compilatore avvisa che manca il `return`). Il `main` costruisce le liste con una funzione variadica `mkListv(count, ...)`.

Le tre funzioni scritte sono istruttive per le differenze. `fromTo_rec` crea il nodo, poi ricorre sul resto e vi attacca il risultato, quindi la profondità di ricorsione è n. `reverse_rec` rovescia **sul posto**: ricorre sul resto, poi fa puntare il secondo nodo al primo e azzera il `next` del primo; restituisce la nuova testa. Dopo la chiamata la variabile che puntava alla vecchia testa punta ora all'ultimo nodo, quindi l'unico uso corretto è `l = reverse_rec(l)`. `reverse_ite_const` invece non tocca l'originale (il parametro è `const`): costruisce una copia con inserimenti in testa. Con la sequenza del `main` (`fromTo_rec(0,5)`, `fromTo_rec(6,5)`, `mkListv(3,3,2,1)`, poi due rovesciamenti) l'uscita è `0,1,2,3,4,5,` / riga vuota / `1,2,3,` / `3,2,1,` / `1,2,3,`. Si noti che `mkListv(3,3,2,1)` produce la lista `1,2,3`, cioè con l'ordine degli argomenti invertito, perché inserisce in testa, e che con `count = 0` restituirebbe un puntatore non inizializzato (`l` non è inizializzato, solo `lo`). L'assegnazione `l = reverse_ite_const(l)` nel `main` lascia inoltre la vecchia lista senza più riferimenti, senza liberarla.

Le tre funzioni mancanti, scritte da me e provate [INT]:

```c
int occurrences_rec(ListNodePtr lp, int x) {
  if (!lp) return 0;
  return (lp->data == x) + occurrences_rec(lp->next, x);
}

/* ogni elemento di l1 compare in l2, nello stesso ordine (anche non consecutivi) */
_Bool included_rec(ListNodePtr l1, ListNodePtr l2) {
  if (!l1) return 1;
  if (!l2) return 0;
  if (l1->data == l2->data) return included_rec(l1->next, l2->next);
  return included_rec(l1, l2->next);
}

ListNodePtr zipSum_rec(ListNodePtr a, ListNodePtr b) {   /* liste di ugual lunghezza */
  if (!a) return NULL;
  ListNodePtr n = malloc(sizeof(ListNode));
  n->data = a->data + b->data;
  n->next = zipSum_rec(a->next, b->next);
  return n;
}
```

Risultati verificati: su `2,1,2,2,5` le occorrenze di 2 sono 3 e quelle di 9 sono 0; `2,3,4` è inclusa in `1,2,3,4,5` ma non viceversa; la lista vuota è inclusa in qualunque lista e nessuna lista non vuota è inclusa nella vuota; `3,1` non è inclusa in `1..5` perché l'ordine è diverso; `zipSum(1..5, 10..14)` dà `11,13,15,17,19,`. Il testo dell'header dice "compaiono nello stesso ordine": io l'ho letto come sottosequenza, non come sottolista contigua [DA VERIFICARE sul testo del docente]. `zipSum_rec` ha come precondizione l'uguaglianza delle lunghezze: se la seconda lista è più corta legge un puntatore nullo.

## 6. Tipo opaco, modulo, accoppiamento: i numeri complessi

Teoria: [01 - Codice su più file](01-organizzazione-software-compilazione.md#codice-su-più-file), [05 - ADT](05-adt-stack-queue-set.md#adt).

Le slide del laboratorio "Tipo opaco e molto altro" (G. Torta, da F. Damiani) non hanno corrispondente nei file di teoria e aggiungono un argomento che può essere chiesto a parole: perché e come si rende opaco un tipo. Il problema è realizzare il tipo dei numeri complessi con somma, prodotto, modulo, argomento ed `equal` a meno di un `ε`. La prima soluzione, `dcomplex.h`, dichiara una `struct` con i campi `re` e `im` nell'header. È un tipo **trasparente**: il codice cliente può scrivere `c.re`, e se si volesse passare alla rappresentazione polare (modulo e argomento) bisognerebbe riscrivere anche tutti i clienti. In termini ingegneristici il modulo (un `.c` compilabile separatamente) e la sua *signatura* (il `.h`, cioè la parte visibile) sono legati da un **accoppiamento** forte; la **coesione** del modulo, cioè quanto le sue funzioni ruotino attorno a un unico concetto, è invece alta, ed è per questo che aggiungere a `dcomplex.h` una `printDcomplex` (funzione di input/output, concetto diverso) o una `dctoa` la abbasserebbe. Un buon sistema ha accoppiamento basso e coesione alta.

La soluzione è il tipo opaco `typedef struct dcomplex *Pdcomplex;` in un header che non rivela i campi, con la definizione della `struct` nel solo `.c`. Servono allora le funzioni `mkPdcomplex`, `re`, `im` e `dsPdcomplex(Pdcomplex *pc)` (libera e imposta `*pc = NULL`), perché il cliente non può più allocare né leggere i campi. Il vantaggio verificabile è il seguente: ho scritto due implementazioni (cartesiana e polare) con lo stesso header, e ho compilato **una sola volta** `client.c` in `client.o`; collegandolo con `cart.o` oppure con `polar.o` (`gcc -o app client.o polar.o`) il programma stampa lo stesso risultato per il prodotto di `1+2i` e `3+4i`, cioè `-5 +10i`, e per la somma `4 +6i`, con `|1+2i| = 2.2361` e `arg(3+4i) = 0.9273`. Nella versione polare `product` moltiplica i moduli e somma gli argomenti, mentre `sum` deve passare dalle componenti cartesiane `re` e `im`.

Gli svantaggi che le slide fanno discutere sono due: la gestione manuale di allocazione e deallocazione (se si dimentica `dsPdcomplex` c'è perdita di memoria; se due variabili puntano allo stesso blocco e se ne libera una, l'altra diventa un puntatore pendente), e il costo di `malloc` e `free`. Le slide si chiudono chiedendo se esista un compromesso fra i due approcci, e il materiale estratto si ferma lì [DA VERIFICARE sul PDF se la risposta compare nelle ultime pagine].

Il codice delle slide non compila e contiene diversi errori, che è bene riconoscere perché il docente li lascia per far discutere: la macro `#define ABS(x) ((x) > 0) ? (x) : -(x);` termina con un punto e virgola e non ha parentesi esterne, e usata come `ABS(a-b) <= eps` dà l'errore "expected ')' before ';'" (verificato); in `modulus` compare `c1.re` invece di `c.re`; `Bool` non è definito (serve `<stdbool.h>`); il nome `agument` è un refuso; nella versione opaca il prodotto calcola la parte immaginaria come `re1*im2 - im1*re2` invece di `re1*im2 + im1*re2` (per `(1+2i)(3+4i)` darebbe -2 invece di 10); nella versione polare i tipi `Dcomplex`/`Pdcomplex` e i nomi `mkDcomplex`/`dsDcomplex` sono mescolati, c'è un `return −>argument` senza oggetto, e in `equal` le parentesi di `ABS(...) <= epsilon` sono sbilanciate. Il file `.c` dovrebbe inoltre includere `<stdlib.h>` per `malloc`. Nelle mie versioni ho usato `fabs`.

## 7. Il progetto sul set ordinato

Teoria: [05 - Set e multiset](05-adt-stack-queue-set.md#set-e-multiset), [05 - Set efficiente con lista ordinata](05-adt-stack-queue-set.md#set-efficiente-con-lista-ordinata), [04 - Inserzione ordinata](04-liste-linkate-e-ricorsione.md#inserzione-ordinata-4-casi).

La cartella "inizio lavori su progetto 5" contiene solo `intLinkedListSortedSetADT.c`, uno scheletro in cui tutte le funzioni restituiscono un valore fittizio (`false`, `-1`, `NULL`) e solo `mkSSet` è scritta: alloca una `struct intSortedSet` con i campi `first`, `last` e `size`, quindi un set ordinato di interi realizzato come lista concatenata con puntatori a primo e ultimo elemento. I due header (`intSortedSetADT.h`, `intLinkedListSortedSetADT.h`) **non sono nel Moodle**, perciò non si può compilare e non conosco le firme esatte oltre a quelle visibili nello scheletro. L'interfaccia è: distruzione (`dsSSet`), `sset_add`, `sset_remove`, `sset_member`, `isEmptySSet`, `sset_size`, `sset_extract` (che scrive in `*ptr` un elemento), uguaglianza, inclusione larga e stretta, unione, intersezione, sottrazione, e minimo e massimo con le versioni che li estraggono.

Come progettare le operazioni è deducibile dalla teoria, e lo riassumo senza codice (è un progetto da consegnare). La lista è tenuta ordinata crescente e senza duplicati, quindi `sset_add` è l'inserzione ordinata a quattro casi dell'argomento liste (lista vuota, inserzione in testa, in mezzo o in coda) con in più il rifiuto se l'elemento è già presente e l'aggiornamento di `size` e, in coda, di `last`; `sset_member` si ferma appena incontra un elemento maggiore. Unione, intersezione, sottrazione, uguaglianza e inclusione si ottengono tutte con una **scansione parallela** delle due liste, in tempo $O(n + m)$, esattamente come la fusione del merge sort, senza ricorrere alla `member` (che darebbe $O(n\cdot m)$). `sset_min` e l'estrazione del minimo toccano `first` in tempo costante; il massimo si legge in costante grazie a `last`, ma estrarlo richiede di scorrere fino al penultimo nodo, quindi $O(n)$, a meno di usare una lista doppiamente concatenata. [INT: è un'indicazione di progetto mia, non una soluzione del docente.]

## 8. Il canile

Teoria: [05 - Set e multiset](05-adt-stack-queue-set.md#set-e-multiset), [08 - Codice essenziale](08-lettura-scrittura-file.md#codice-essenziale), [04 - Definizione e tipo](04-liste-linkate-e-ricorsione.md#definizione-e-tipo).

È l'unico esercizio vero e proprio del corso di teoria, svolto in aula. Il testo chiede un programma di supporto a un canile che mantenga l'insieme delle razze rappresentate e l'insieme dei cani ospitati. Di ogni cane si registrano razza, età e genere (e il nome); di ogni razza il nome e il numero di cani presenti. L'insieme dei cani va realizzato come **multiset** (nessun attributo identifica il cane, quindi possono esserci ripetizioni) e quello delle razze come **set**, riadattando le funzioni viste a lezione ai nuovi elementi. All'avvio si caricano i cani (da input o da file) e si costruisce anche il set delle razze; poi servono le funzioni per aggiungere e rimuovere un cane aggiornando le strutture, e una per visualizzare in modo ordinato il contenuto di entrambe. Il testo raccomanda di dividere il programma in più file.

I tipi sono quelli dell'header fornito: `cane` (nome, razza, età, genere), la lista `cl` di cani e il multiset `msetc` con testa `o` e contatore `num`; `razza` (nome, `num_individui`), la lista `rl` di razze e il set `setr` con testa `r` e contatore `num`. Il multiset è una lista non ordinata, quindi l'inserzione avviene in testa; il set delle razze è una lista **ordinata alfabeticamente**, e `addr` è un'inserzione ordinata ricorsiva sul puntatore al puntatore che restituisce 1 se la razza è nuova (e allora `aggiorna_sr` incrementa il contatore delle razze), 0 se esisteva già (e allora aumenta soltanto `num_individui`). L'architettura è una catena di piccole funzioni, ciascuna per il suo livello: `aggiungi_cane` chiede i dati e chiama `add_msc`, che a sua volta chiama `add_lc` e `crea_nodo`; e il risultato di `aggiungi_cane` è passato a `aggiorna_sr`, con l'invocazione annidata `aggiorna_sr(&razze, aggiungi_cane(&ospiti))`. Il `main` ha tre fasi: lettura da `cani.txt` con un ciclo `fscanf("%s %s %d %c\n", ...)` fino a `feof`, un ciclo di menu con `switch` (1 inserisci, 2 rimuovi, 3 visualizza, 4 esci), e infine riscrittura del file con `fopen(..., "w")` e `fprint_msc`.

Il codice dato non è completo né corretto: `crea_nodo` non ha il `return tmp;` (comportamento indefinito), `crea_nodorl` è definita due volte, `crea_nodorl` non inizializza `num_individui` (lo fa `addr`), e mancano del tutto `init_msc`, `init_sr`, `togli_cane`, `print_msc`, `fprint_msc` e `stampa_razze`. Nel `main` il ciclo `while (!feof(dati))` è fragile: se il file non esiste, `fopen` restituisce `NULL` e `feof(NULL)` fa terminare il programma; se il file è vuoto, `fscanf` fallisce e il cane "letto" è fatto di valori indeterminati ma viene comunque inserito; è più robusto controllare il valore restituito da `fscanf` (`== 4`). Inoltre `scanf("%s")` su campi di 20 caratteri può traboccare, e nel menu `togli_cane(&ospiti)` non ha accesso al set delle razze, quindi **non può aggiornarne i contatori**: dopo una rimozione il numero di cani della razza resterebbe sbagliato.

Ho completato le parti mancanti, usando il codice del docente (con il `return` aggiunto) e provando il tutto su un `cani.txt` di quattro cani [INT]. Le funzioni di rimozione sono le seguenti:

```c
int rimuovi_cane(listac *L, char *nome, cane *out) {   /* primo cane con quel nome */
  if (!L || !*L) return 0;
  if (!strcmp((*L)->c.nome, nome)) { listac t = *L; *out = t->c; *L = t->next; free(t); return 1; }
  return rimuovi_cane(&(*L)->next, nome, out);
}
void togli_razza(listar *L, char *nome, int *num) {     /* un individuo in meno; a 0 si toglie la razza */
  if (!L || !*L) return;
  if (!strcmp((*L)->r.nome, nome)) {
    if (--(*L)->r.num_individui == 0) { listar t = *L; *L = t->next; free(t); (*num)--; }
  } else togli_razza(&(*L)->next, nome, num);
}
void togli_cane(msetc *M, setr *R) {
  char nome[MAXS]; cane c;
  printf("Nome del cane da rimuovere: "); scanf("%19s", nome);
  if (rimuovi_cane(&M->o, nome, &c)) { M->num--; togli_razza(&R->r, c.razza, &R->num); }
  else printf("nessun cane di nome %s\n", nome);
}
```

Con il file `Tito bassotto 4 m / Luna labrador 2 f / Rex labrador 5 m / Bibi barboncino 7 f` il programma mostra i quattro ospiti (in ordine inverso a quello del file, perché il multiset inserisce in testa) e le tre razze in ordine alfabetico (barboncino 1, bassotto 1, labrador 2); dopo la rimozione di Tito, di Rex e di un inesistente Pippo restano Bibi e Luna e le razze barboncino 1 e labrador 1 (il bassotto è sparito dal set perché il suo contatore è arrivato a 0).

## 9. Gli esempi delle lezioni

Teoria: [03 - Passaggio di struct a funzione](03-struct-puntatori-union.md#passaggio-di-struct-a-funzione), [03 - union](03-struct-puntatori-union.md#union), [07 - Nodo generico](07-puntatori-a-funzione-e-nodi-generici.md#nodo-generico-void--funzioni), [04 - Definizione e tipo](04-liste-linkate-e-ricorsione.md#definizione-e-tipo).

La cartella Prog2-B contiene alcuni programmi commentati, usati a lezione come esempi. Li riassumo con ciò che mostrano e con i punti in cui potrebbero diventare domande d'esame.

`struc.c` mostra una `struct coord` allocata staticamente e una dinamicamente, con la domanda lasciata nel commento "cosa succede se passo `sdinamica` invece di `*sdinamica`?" alla funzione `stampa(struct coord p)`: poiché `stampa` riceve la struct **per valore**, passare il puntatore è un errore di tipo, e infatti il compilatore risponde "incompatible type for argument 1 of 'stampa'" (verificato). La forma giusta è `stampa(*sdinamica)`. `cursorep.c` mostra il puntatore come cursore su un array: `init(int *a)` scrive 100...109 spostando `a` con `a++`, `stampa(int a[])` è lo stesso parametro scritto come array, e il ciclo con `cursore = prova + 9` e `valore = 10` percorre l'array a ritroso scrivendo 10, 9, ..., 2 e poi, **fuori dal ciclo** (perché la condizione `cursore != prova` lo interrompe prima di arrivare alla prima cella), l'ultima assegnazione `*cursore = valore` scrive 1 in `prova[0]`; l'uscita è `100 101 ... 109` e poi `1 2 3 4 5 6 7 8 9 10` (verificata).

`biblioteca.c` definisce un `libro` con `char titolo[10]` e `char autori[200]`, una `bib` con un array di 20 libri e un contatore `numero` che indica la prima cella libera, e le funzioni `piena`, `init`, `inserisci` (che copia con `strcpy` e incrementa `numero`) e `stampa_bib`. Il programma funziona con "1984" e "Odissea", ma `titolo` ha spazio per 9 caratteri più il terminatore: con un titolo più lungo `strcpy` scrive oltre l'array, nei byte iniziali del campo seguente. Inserendo "Il Gattopardo" e "Lampedusa" ho ottenuto la stampa `Il GattopaLampedusa Lampedusa`, perché la copia dell'autore sovrascrive il terminatore del titolo; l'effetto esatto dipende dal compilatore, ma il difetto (nessun controllo della lunghezza) è reale. Si risolve con `strncpy` e un terminatore esplicito, oppure con una dimensione sufficiente.

`union.c` è l'esempio della tagged union: `nome` contiene un `enum nazione paese` come etichetta e una `union` fra `nomeITA` (nome, cognome) e `nomeUSA` (first, middle, last). Il programma ha una trappola ben riuscita: dopo aver riempito `nome1.n.NI` con "Rosa" e "Rossi", il codice scrive "Rose", "Daisy", "Spring" in `nome1.n.NU` (voleva `nome2`, che resta mai riempito), e poiché i membri di una union occupano la **stessa memoria** il nome italiano viene sovrascritto: la stampa `nn->n.NI.nome` produce "Rose" e non "Rosa" (verificato). Morale: nella union è valido un solo membro alla volta, e l'etichetta serve a ricordare quale.

`test_sprintf.c` ricorda che `sprintf` scrive il risultato formattato in una stringa a scelta, mentre `strcat` accoda; il buffer del risultato è allocato di `strlen(s1) + strlen(s2) + 1` byte (il +1 è il terminatore). Il difetto è a monte: `scanf("%s", s1)` su un `char[20]` deborda con parole di 20 o più caratteri; si usa `%19s`. `ricettario.c` realizza una ricetta con una lista di ingredienti, con `ins_testa` e `rimuovi` ricorsiva sul puntatore al puntatore (che libera il nodo con `free`, a differenza della slide), ma `togli_elem` è dichiarata `int` e non restituisce nulla, e `rimuovi` elimina solo la prima occorrenza.

`voidtree.c` ha un albero i cui nodi portano un `void *dato` e un carattere `tipo` ('d' per un intero, 's' per una stringa). `stampagen` e `stampagen2` stampano in modo diverso a seconda del tipo (la seconda con uno `switch` e un caso di default), e il `main` costruisce due nodi, uno con l'intero 10 e uno con la stringa "ciao", e stampa `dato: 10` e `dato: ciao` (verificato). Anche qui `crea_nodo` non ha il `return`: l'esempio funziona perché, senza ottimizzazioni, il compilatore lascia il valore di `malloc` nel registro che si usa per la restituzione, ma è un comportamento indefinito che con `-O2` può far fallire il programma. Nel `stampagen` il `else` si lega all'`if` interno (`tipo == 'd'`), che è proprio ciò che si voleva, ma rende il codice fragile.

## 10. Errori nei materiali del docente

Raccolgo qui gli errori trovati, perché chi si esercita sui file del docente li ricopia facilmente.

| Dove | Errore | Come si manifesta | Correzione |
|---|---|---|---|
| `tree.c` `removeTree` | foglia: va nel caso "due figli" | `maxTree(NULL)`: crash (verificato) | restituire `NULL` (e `free`) se non ha figli |
| `tree.c` `removeTree` | risultato di `removeTree(t->left, ...)` ignorato | valore duplicato: `1,3,3,8,...` (verificato) | `t->left = removeTree(t->left, t->data)` |
| `tree.h` | `#ifndef _TREE_H` / `#define TREE_H` | protezione inefficace | stesso nome nei due |
| `tree.c` `filterleTree` | condivide i sottoalberi sinistri con l'originale | alberi non indipendenti | copia completa se serve |
| `list-rec.c` `mkListv` | `l` non inizializzata; inserisce in testa | con `count = 0` puntatore casuale; ordine invertito | inizializzare, o inserire in coda |
| `list-rec.c` `reverse_rec_const_aux` | corpo vuoto con tipo non `void` | warning, comportamento indefinito se chiamata | completare o eliminare |
| `matrice.c` | `malloc` senza azzerare; `s % 2` con negativi; `out` perso al `return NULL`; `%lx` su puntatore | risultati casuali, valore 2, memory leak, indirizzo troncato | `calloc`, `s % 2 != 0`, controllo prima di allocare, `%p` |
| `aggiungi_cani.txt` | `crea_nodo` senza `return`; `crea_nodorl` duplicata | comportamento indefinito; errore di compilazione | `return tmp;`, una sola definizione |
| `main_cani.txt` | `feof` senza controllo di `fopen` e del risultato di `fscanf` | arresto se il file manca; cane fantasma se è vuoto | testare `fscanf(...) == 4` |
| `biblioteca.c` | `titolo[10]` e `strcpy` | sovrascrittura del campo seguente (verificata) | `strncpy` o buffer più grande |
| `union.c` | si scrive `nome1.n.NU` invece di `nome2` | "Rose" al posto di "Rosa" (verificato) | `nome2.n.NU` |
| `voidtree.c`, `ricettario.c` | funzioni non `void` senza `return` | comportamento indefinito | restituire un valore |
| slide Tipo opaco | macro `ABS`, `c1.re`, parte immaginaria del prodotto, tipi `Dcomplex`/`Pdcomplex` mescolati, `Bool` non definito | errore di compilazione (macro verificata); risultato sbagliato | vedi §6 |
| `debug1.c`...`debug4.c` | errori voluti | vedi §2 | vedi §2 |

## Cosa resta da integrare

- **I quiz Moodle** e i test automatici dei dieci progetti di laboratorio non sono nel materiale scaricato (solo file). Dei progetti c'è solo lo scheletro del numero 5; mancano i testi degli altri e gli header del set ordinato.
- **Le 12 trascrizioni** delle lezioni di teoria (21/02, 24/02, 28/02, 3/03, 7/03, 14/03, 17/03, 21/03, 28/03, 31/03, 11/04, 14/04 del 2025) sono ciascuna di circa 100 kB di parlato: le ho scorse con ricerca per parole chiave sull'esame e ne ho letto i passi sull'esame, ma **non le ho lette per intero**. Potrebbero contenere esercizi svolti a voce o indicazioni su cosa è "importante per l'esame" non riportate nelle slide.
- **Le slide di teoria** (`0_introduzione`...`10_union`, `Puntatori`, `RW_file`, `commenti-cursorep`) sono già integrate nei file 01-08 a partire da un'altra fonte (Drive) e non le ho rilette integralmente qui: ho confrontato solo `Puntatori.pdf`, `RW_file.pdf` e `commenti-cursorep.pdf` con gli appunti esistenti, che le coprono. Le figure sono perse nell'estrazione. Le slide `7_ADT (code-stack-set)-canile.pdf` sono state lette (testo dell'esercizio del canile).
- **Le slide del lab su tipo opaco** (`02-Tipo-Opaco-e-molto-altro.pdf`) sono state lette fino al "compromesso" finale; le pagine successive, se esistono, non sono state estratte [DA VERIFICARE sul PDF].
- **Esami passati con data e appello**: non ce ne sono. Il README segnala la mancanza.

## Dubbi

- [DA VERIFICARE] Le uscite di `test-tree.c` dipendono da `rand()` e sono quelle di TDM-GCC su Windows; su Linux la sequenza cambia.
- [DA VERIFICARE] Interpretazione di `included_rec` (sottosequenza o sottolista) e testo originale del progetto 5.
- [DA VERIFICARE] Le modalità d'esame della trascrizione 2025 valgono per l'a.a. 2026-27? Vedi anche il file 01.
- [INT] Tutte le soluzioni delle funzioni lasciate vuote dal docente (liste, `removeTree` corretta, `pari_dispari` corretta, canile, tipo opaco) sono mie e non passate dal docente.
