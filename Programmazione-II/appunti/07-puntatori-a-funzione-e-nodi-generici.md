# 07 - Puntatori a funzione e strutture dati generiche (void*)

Fonte: Drive > "PDF " > `9_Puntatori_a_funzione.pdf` e la parte finale di `8_Alberi_pt3.pdf` ("Strumenti avanzati per la gestione della memoria").

## Mappa
Il capitolo parte dall'idea che anche le funzioni sono dati con un indirizzo in RAM, mostra come dichiarare, assegnare e invocare puntatori a funzione e come raccoglierli in un array di handler, e arriva al nodo generico con `void*` e campi funzione (con typedef di tipi funzione), che permette di riusare lo stesso codice per interi e per stringhe.

## Puntatori a funzione
Anche il codice di un programma risiede nella RAM e ha un indirizzo base, perciò una variabile puntatore può contenerlo: la funzione diventa un dato che si può memorizzare, passare e richiamare. La sintassi è `tipo-ritorno (*nome)(tipi args)`, e le tonde attorno a `*nome` sono obbligatorie (senza si dichiarerebbe una funzione che restituisce un puntatore). Si assegna l'indirizzo della funzione e si invoca con `(*puntfunz)(args)`.
```c
int somma(int x, int y) { return x + y; }
int (*puntfunz)(int, int);     /* sintassi: tipo-ritorno (*nome)(tipi args); le tonde attorno a *nome sono obbligatorie */
puntfunz = somma;              /* assegnamento dell'indirizzo */
int r = (*puntfunz)(2, 3);     /* invocazione -> 5 */

void (*testfz)();              /* senza ritorno e senza argomenti */
testfz = ciao;  (*testfz)();   /* scrive CIAO */
```
I casi possibili sono `void (*v)(tipi)` e `tipo (*v)()`, combinabili fra loro.

## Array di puntatori a funzione (vettore delle interruzioni)
L'idea nasce dai sistemi operativi, che usano un vettore di handler con un elemento per ogni tipo di evento: l'evento fa da indice e la cella contiene la funzione da eseguire. In C si dichiara l'array mettendo la cardinalità dopo il nome. L'esempio seguente (variabile globale: visibile dall'intero programma, dichiarata fuori da main dopo `#include` e tipi) riempie il vettore in modo diverso a seconda della scelta dell'utente e poi esegue la funzione corrispondente all'evento letto, con accesso diretto alla cella giusta.
```c
int (*handler[4])(int);        /* array di 4 puntatori a funzione int->int; la cardinalità va dopo il nome */
/* variabile globale: visibile dall'intero programma, dichiarata fuori da main dopo #include/tipi */

int raddoppia(int x)  { return x + x; }
int incrementa(int x) { return x + 1; }
int per10(int x)      { return x * 10; }
int print(int x)      { printf("L'evento e' %d\n", x); return x; }

void inizializza() {
  int scelta; scanf("%d", &scelta);
  if (scelta == 1) { handler[0]=print; handler[1]=raddoppia; handler[2]=per10; handler[3]=incrementa; }
  else             { handler[0]=per10; handler[1]=raddoppia; handler[2]=per10; handler[3]=raddoppia; }
}
/* main */
inizializza();
while (!finito) {
  scanf("%d", &scelta);
  if (scelta >= 0 && scelta < 4) (*handler[scelta])(scelta);   /* accesso diretto alla cella giusta */
  else finito = 1;
}
```
Il vantaggio è che il codice è un dato, riferibile e passabile come "parametro", e questo dà programmi compatti e riusabili; lo svantaggio è una maggiore astrazione, meno intuitiva.

## Nodo generico: `void*` + funzioni
Le operazioni su un ADT (inserire, cercare, ordinare, contare) dipendono dalla struttura e non dal tipo del dato che essa contiene. Per sfruttare questa osservazione si separa l'ADT dal tipo del dato: il nodo non contiene un `int` ma un `void *dato`, puntatore generico a un'area allocata con `malloc(sizeof(TIPO))` nello heap. Poiché però un `void*` non sa nulla del tipo che punta, ogni operazione che deve capirlo (creare, stampare, confrontare) viene affidata a una funzione, il cui puntatore si memorizza nel nodo stesso. I typedef dei tipi funzione servono per leggibilità.
```c
typedef void* (*opcread)();                 /* tipi funzione per leggibilità */
typedef void  (*opstampa)(void *a);
typedef int   (*opconfronta)(void *a, void *b);

typedef struct nodo* tree;
struct nodo {
  void *dato;                /* qualsiasi tipo */
  opcread creadato;          /* crea il dato */
  opstampa stampa;           /* lo stampa */
  opconfronta confronta;     /* confronta due dati: <0, 0, >0 */
  tree left, right;
};

tree T = (tree) malloc(sizeof(struct nodo));
T->creadato = crea;  T->stampa = stampa;  T->confronta = conf;
T->left = T->right = NULL;
T->dato = (*T->creadato)();        /* crea il dato */
(*T->stampa)(T->dato);             /* lo stampa */
```
### Due implementazioni dello stesso header (`funzioni.h` identico)
Il risultato pratico è che lo stesso `funzioni.h` può essere realizzato in due modi diversi, uno per interi e uno per stringhe. Nel primo il cast `(int*)` precede la deferenziazione; nel secondo il dato è una stringa e il confronto è `strcmp` (serve `<string.h>`).
```c
/* funzioni.h */
void *crea();   void stampa(void *);   int conf(void *, void *);

/* funzioni.c - interi */
void *crea() { int *d = (int*) malloc(sizeof(int)); *d = 100; return d; }
void stampa(void *d) { printf("Il dato e' %d\n", *(int*)d); }     /* cast a int*, poi deref */
int conf(void *x, void *y) { if (*(int*)x < *(int*)y) return -1; else if (*(int*)x == *(int*)y) return 0; else return 1; }

/* funzioni.c - stringhe (richiede <string.h>) */
void *crea() { char *d = (char*) malloc(sizeof(char)*10); strcpy(d, "CIAO!"); return d; }
void stampa(void *d) { printf("Il dato e' %s\n", (char*)d); }
int conf(void *x, void *y) { return strcmp((char*)x, (char*)y); }
```
Il main (e il codice dell'albero) è **riusato** senza modifiche; si compila con l'una o l'altra implementazione (`gcc main.c funzioni.c`). `funzioni.h` è l'interfaccia e i nomi `crea/stampa/conf` sono l'unico collegamento: per questo vanno rispettati come standard.

## Cose da saper fare all'esame
- Dichiarare una variabile/array di puntatori a funzione con la sintassi giusta e invocare via `(*p)(args)`.
- Riconoscere cosa fa un dato frammento (es. quale handler viene eseguito per un input).
- Scrivere una funzione che riceve un puntatore a funzione come parametro (es. applica `f` a ogni nodo/elemento) [conseguenza del concetto; la slide mostra solo array e campi di struct].
- Scrivere le funzioni `crea/stampa/conf` per un nuovo tipo e usare il cast `void*` -> `tipo*`.
- Spiegare il vantaggio: stesso codice di algoritmi per tipi diversi.

## Dubbi
La slide usa `void crea();` nel .h del primo esempio e `void *crea();` altrove: la versione corretta è `void *crea();` perché restituisce il dato. Non sono mostrati qsort/bsearch o altri usi della libreria standard con puntatori a funzione: [DA VERIFICARE] se trattati. Infine la liberazione della memoria del `dato` generico (free del dato oltre al nodo) non è esplicitata.
