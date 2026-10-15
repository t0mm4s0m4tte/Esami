# 05 - Abstract Data Type: stack, queue, set

Fonte: Drive > "PDF " > `7_ADT_Code_Stack_Set_pt1.pdf`, `pt2.pdf`, `pt3.pdf`. Gli ADT sono un esame tipico: sapere interfaccia + 2 implementazioni (array, lista).

## Mappa
Il capitolo spiega che cos'è un ADT (con l'esempio della radio) e lo applica a tre strutture: lo stack (LIFO), realizzato con lista e con array; la queue (FIFO), realizzata con array circolare e con lista; il set/multiset, realizzato con lista, funzioni variadiche e liste ordinate. Tutte riusano i pattern di puntatori e ricorsione del file 04.

## ADT
Un Abstract Data Type è un tipo di dato definito **indipendentemente dall'implementazione**: ha un dominio (lo stato) e un insieme di operazioni (l'interfaccia, cioè le specifiche delle operazioni). Chi lo usa non ha bisogno di conoscerne l'interno. Nell'esempio della radio lo stato è la coppia `<accesa/spenta, canale>` e le operazioni sono accendi, spegni e sintonizza. La conseguenza importante è che un ADT può avere molte implementazioni: cambiando il tipo di dato interno si aggiornano le funzioni **senza cambiare l'interfaccia**, e il codice che lo usa continua a funzionare (esercizio consigliato).
```c
#define ON 1
#define OFF 0
typedef struct { int accensione; int canale; } radio;
void accendi(radio *r)  { r->accensione = ON; }
void spegni(radio *r)   { r->accensione = OFF; }
void sintonizza(radio *r, int c) { r->canale = c; }
```
(Nelle slide `int accensione=OFF;` dentro la struct è sintatticamente errato in C: refuso, serve un init.)

## Stack (pila), LIFO
Lo stack è una pila: l'ultimo elemento inserito è il primo a uscire. Le operazioni sono push (aggiungi in cima), pop (rimuovi dalla cima), empty, full (se la capienza è limitata) e peek (legge senza rimuovere). L'interfaccia è `void push(tipo el, stack *s)`, `tipo pop(stack *s)`, `int empty(stack s)`, `int full(stack s)`, `tipo peek(stack s)`; in C `int` fa da booleano (0 = falso).

Le applicazioni mostrano perché la struttura è così diffusa: lo stack di esecuzione (record di attivazione), l'inversione di una stringa (push delle lettere, poi pop), la valutazione di espressioni (forma prefissa/postfissa), il tasto back del browser, le politiche LRU nei sistemi operativi e la visita in profondità di un albero.

### Implementazione con lista (riusa `liste.h`)
Con una lista lo stack è quasi gratuito: la cima è la testa, push è l'inserzione in testa e pop la cancellazione dalla testa. Lo stack è vuoto esattamente quando la lista è NULL e non è mai pieno. Poiché `pop` deve poter segnalare il caso "nulla da togliere", si restituisce `NOVALUE`, una costante ad hoc fuori dal range significativo, e il chiamante controlla `if (result != NOVALUE)`; se non esiste un valore adatto si restituiscono due valori (dato più flag di validità).
```c
#include "liste.h"           /* lista, crea_nodo, ins_testa(int, lista*), del_testa(lista*) */
typedef lista stack;
int empty(stack s) { return !s; }          /* vuoto <=> NULL */
int full(stack s)  { return 0; }           /* nessun limite */
void push(int el, stack *s) { if (s) ins_testa(el, s); }
int pop(stack *s) {
  lista top; int result = NOVALUE;
  if (s) if (!empty(*s)) { top = del_testa(s); result = top->dato; }
  return result;
}
int peek(stack s) { int r = NOVALUE; if (!empty(s)) r = s->dato; return r; }
```
Compilazione: `gcc -o stack stack.c liste.c`.
[DA VERIFICARE] nella slide `pop` il nodo `top` restituito da `del_testa` è usato dopo la cancellazione: dipende da come `del_testa` fa/non fa `free` (qui non mostrato). Se `del_testa` libera il nodo, `top->dato` è un use-after-free.

### Implementazione con array
Con l'array la capienza è fissa (`MAX`) e basta un contatore: `top` è la prossima cella libera, quindi lo stack è vuoto quando `top == 0` e pieno quando `top == MAX`. Push scrive in `dato[top]` e poi incrementa; pop decrementa e legge `dato[top-1]`.
```c
#define NOVALUE -1000
#define MAX 5
typedef struct { int top; int dato[MAX]; } stack;   /* top = prossima cella libera */
void init(stack *s)  { if (s) s->top = 0; else printf("\n s non esiste\n"); }
int empty(stack s)   { return (s.top == 0); }
int full(stack s)    { return (s.top == MAX); }
void push(int el, stack *s) {
  if (s) if (!full(*s)) { s->dato[s->top] = el; s->top = s->top + 1; }
         else printf("\n stack pieno\n");
  else printf("\n parametro non definito\n");
}
int pop(stack *s) {
  int result = NOVALUE;
  if (s) if (!empty(*s)) { result = s->dato[s->top - 1]; s->top = s->top - 1; }
         else printf("\n stack vuoto");
  else printf("\n parametro non definito\n");
  return result;
}
int peek(stack s) { int r = NOVALUE; if (!empty(s)) r = s.dato[s.top - 1]; else printf("\n stack vuoto"); return r; }
```
Esiste una variante in cui `top` è invece la cella in cima alla parte occupata (inizializzato a -1). Nella slide `typedef {...} stack;` manca `struct`: la sintassi corretta è `typedef struct {...} stack;`.

## Queue (coda), FIFO
La coda è l'opposto della pila: si serve prima chi è arrivato per primo. Le operazioni sono enqueue (in fondo, alla tail), dequeue (dalla testa, head), empty, full, peek e init. Le applicazioni tipiche sono il buffer produttore-consumatore, lo scheduling della CPU (processi ready) e la **visita in ampiezza** (BFS) degli alberi.

### Array circolare
Con un array semplice, togliendo dalla testa si libererebbero celle all'inizio che non si potrebbero più riusare. Per non sprecarle si "torna all'inizio" con il modulo: `succ(i) = (i+1) % MAX`. I campi sono `dato[MAX]`, `head` (da dove si toglie), `tail` (dove si aggiunge) e `num`, il numero di elementi presenti.
```c
#define MAX 5
#define NOVALUE -10000
typedef struct { int dato[MAX]; int head, tail, num; } queue;
void init(queue *Q) { Q->head = 0; Q->tail = 0; Q->num = 0; }
int empty(queue Q) { return Q.num == 0; }
int full(queue Q)  { return Q.num == MAX; }
int succ(int i)    { return (i+1) % MAX; }
void enqueue(int el, queue *Q) {
  if (!full(*Q)) { Q->tail = succ(Q->tail); Q->dato[Q->tail] = el; (Q->num)++; }  /* "tail torna a essere l'ultimo pieno" */
  else printf("\n la coda e' piena\n");
}
int dequeue(queue *Q) {
  int result = NOVALUE;
  if (Q) if (!empty(*Q)) { result = Q->dato[Q->head]; Q->head = succ(Q->head); (Q->num)--; }
         else printf("\n Q vuota\n");
  else printf("\n non esiste\n");
  return result;
}
```
Il contatore `num` serve a distinguere la coda piena da quella vuota, perché con `head == tail` le due situazioni sarebbero ambigue. `empty`, `full` e `peek` sono lasciati per esercizio; peek è simile a dequeue ma senza modificare, e la coda è passata per valore.

[DA VERIFICARE] coerenza di `init`: con `tail=0` iniziale e `enqueue` che incrementa **prima** di scrivere, la prima cella scritta è la 1 e head=0 punterebbe a una cella vuota. Per essere coerente con "tail = ultimo pieno" `init` dovrebbe porre `tail = MAX-1` (oppure `enqueue` scrive in `tail` e poi incrementa). Le slide mostrano anche `succ(Q->tail, MAX)` con due argomenti mentre `succ` ne ha uno: refuso. Usa la versione coerente all'esame.

### Lista con head e tail
Con una lista si tengono due puntatori: `head` per togliere e `tail` per aggiungere in O(1), senza dover scorrere la lista. La coda è vuota quando `head` è NULL e non è mai piena. Nell'enqueue l'**ordine** è importante: prima si aggancia il nuovo nodo dopo la vecchia tail e solo dopo si sposta `tail`; l'ordine invertito (`Q->tail = nuovo; Q->tail->next = nuovo;`) è un errore.
```c
typedef struct { lista head; lista tail; int num; } queue;
void init(queue *Q) { Q->head = NULL; Q->tail = NULL; Q->num = 0; }
int  empty(queue Q) { return Q.head == NULL; }       /* full: sempre 0 */
void enqueue(int el, queue *Q) {
  lista nuovo = crea_nodo(el);
  if (Q)
    if (empty(*Q)) { Q->head = nuovo; Q->tail = nuovo; Q->num = 1; }
    else { Q->tail->next = nuovo; Q->tail = nuovo; Q->num++; }   /* ordine: prima aggancia, poi sposta tail */
}
int dequeue(queue *Q) {
  int result = NOVALUE;
  if (Q) if (!empty(*Q)) {
    lista tmp = Q->head;
    result = Q->head->dato;
    Q->head = Q->head->next;
    free(tmp);                       /* liberare la memoria! */
  }
  return result;
}
```
[DA VERIFICARE] nelle slide `dequeue` non mostra `Q->num--` né il reset di `tail` a NULL quando la coda diventa vuota: sono da aggiungere (altrimenti `tail` resta un puntatore a nodo liberato).

## Set e multiset
Un set è una raccolta **senza ordinamento**: non esistono un primo e un ultimo elemento. Nel **multiset** (bunch) lo stesso elemento può comparire più volte ({0,1,0,3,4,1,1}), nel **set** ogni elemento compare al più una volta ({3,2,1,5}). L'interfaccia è la stessa, e cambia solo `aggiungi`, che nel set inserisce soltanto se l'elemento è assente. Le operazioni sono:

- `int elem(el, set S)`, `int vuoto(set S)`, `void init(set *S)`, `int cardinality(set S)`;
- `set *costruisci(x1..xn)`, `set *crea_max(int N)`;
- `void aggiungi(set *S, el)`;
- `void togli(set *S, el)` (prima occorrenza), `void togli_tutti(set *S, el)`.

L'implementazione più naturale è una lista: l'insieme è illimitato e `aggiungi` è l'inserzione in testa. Se si vogliono `cardinality` e `vuoto` in O(1) si aggiungono dei metadati. Con un array l'insieme sarebbe limitato e andrebbe ricordato il numero di elementi.
```c
typedef lista set;                       /* illimitato, aggiungi = inserzione in testa */
void init(set *S) { *S = NULL; }
/* alternativa con metadati: */
typedef struct { lista dati; int numero; } set;
void init(set *S) { S->dati = NULL; S->numero = 0; }    /* poi cardinality/vuoto in O(1) */
```

### togli_elem (ricorsiva, per riferimento; la slide non fa free)
Rimuove la prima occorrenza di `el` e restituisce 1 se l'ha trovata e rimossa, 0 se non c'era, -1 se il parametro è mal definito.
```c
/* 1 = trovato e rimosso, 0 = non c'era, -1 = parametro mal definito */
int togli_elem(lista *L, int el) {
  if (L)
    if (*L)
      if ((*L)->dato == el) { *L = (*L)->next; return 1; }     /* manca free del nodo */
      else return togli_elem(&(*L)->next, el);
    else return 0;
  else return -1;
}
```
Per un `togli_elem` corretto aggiungere `lista t = *L; *L = t->next; free(t);`.

### Funzioni variadiche (facoltativo)
Una funzione variadica accetta un numero variabile di argomenti: serve `#include <stdarg.h>` e almeno un parametro fisso che dica quanti e quali sono i variabili. Si usa per costruire un set a partire da un elenco di valori.
```c
set *costruisci(int num, ...) {
  va_list ptr; set *nuovo = NULL;
  if (num > 0) {
    nuovo = (set*) malloc(sizeof(set)); init(nuovo);
    va_start(ptr, num);                       /* secondo arg: ultimo parametro obbligatorio */
    for (; num > 0; num--) aggiungi(nuovo, va_arg(ptr, int));   /* va_arg(lista, tipo) */
    va_end(ptr);                              /* [non nelle slide: buona pratica] */
  }
  return nuovo;                               /* NULL se num==0 */
}
```
P_IN: num >= 0 e i restanti argomenti sono num. P_OUT: nuovo è un set con cardinalità num coi soli valori passati; NULL se num == 0. (Le slide usano `mset` e `set` mischiati: refuso.)

### Set efficiente con lista ordinata
Se i dati sono ordinabili si può tenere il set come lista ordinata. Il vantaggio è che per sapere se un elemento è presente non serve scorrere tutta la lista, con meno tempo nella ricerca; lo svantaggio è che la lista va mantenuta ordinata, quindi niente inserzione in testa e più tempo nell'inserzione. La scelta conviene quando nell'ambito applicativo sono frequenti i doppioni, e va valutata caso per caso.

## Cose da saper fare all'esame
- Definire l'interfaccia di un ADT e implementarlo in 2 modi (array e lista), con `init/empty/full/push/pop/peek` o `enqueue/dequeue/...`.
- Implementare queue circolare con `%` e spiegare perché serve `num`.
- Usare stack/queue per un compito (inversione stringa; BFS/DFS).
- Implementare set: `aggiungi` senza duplicati, `togli`, `togli_tutti`, `elem`, `cardinality`; spiegare differenza set/multiset e vantaggi della lista ordinata.
- Gestire i valori di errore (`NOVALUE`) e i controlli sul parametro NULL.

## Dubbi
Le slide pt3 mostrano solo l'idea per il set ordinato: il codice di `aggiungi` per set, `elem` e `togli_tutti` non è fornito e va scritto seguendo i pattern delle liste. Un eventuale ADT "insieme con array" non è svolto.
