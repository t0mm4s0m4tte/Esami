# 06 - Alberi binari

Fonte: Drive > "PDF " > `8_Alberi_pt1.pdf`, `pt2.pdf`, `pt3.pdf`. Nota: pt2 (BFS) si interrompe a metà della simulazione.

## Mappa
Il capitolo fissa la terminologia degli alberi, definisce il tipo C e l'albero ordinato (BST), presenta le operazioni (init, crea_nodo, add con percorso, add_ord, rimuovi_tutto) e le visite: in profondità (DFS: pre/in/post-order, anche con uno stack esplicito) e in ampiezza (BFS, con una coda). Il nodo generico (`void*`) è nel file 07.

## Terminologia
Una lista, una coda o uno stack sono strutture lineari: ogni nodo ha al più un successore e un predecessore. L'**albero** rompe la prima restrizione, perché un nodo può avere molti successori, ma conserva la seconda: ha al più un predecessore. L'**albero binario** limita i successori a due, il sinistro e il destro. Tutto il vocabolario che segue serve a descrivere questa forma.

I nodi si distinguono per la loro posizione:
- la **radice** è l'unico nodo senza predecessore;
- una **foglia** è un nodo senza figli, e l'insieme delle foglie è la **frontiera**;
- un **nodo interno** ha almeno un figlio (anche la radice, se ha figli).

Fra due nodi collegati da un **arco** orientato si parla di **padre/genitore** e **figlio**; gli **antecedenti/antenati** di un nodo sono quelli sul percorso radice->nodo, i **discendenti** quelli nel suo sottoalbero. Il **percorso assoluto** va dalla radice a un nodo ed è unico, quindi identifica il nodo; il **percorso relativo** collega due nodi qualsiasi, e alcuni archi vi sono percorsi in senso inverso. Un **sottoalbero** è un albero contenuto in un albero, e ogni nodo ha un sottoalbero sinistro e uno destro.

Le misure sono quattro:
- la **distanza** fra due nodi è il numero di archi del percorso relativo;
- la **profondità di un nodo** è la sua distanza dalla radice (radice a profondità 0);
- la **profondità dell'albero** è la massima profondità dei nodi, quindi 0 se c'è solo la radice e **-1 per l'albero vuoto**;
- il **grado** di un nodo è il numero dei suoi figli.

Un albero di grado N si dice **completo** se tutte le foglie sono a profondità N e tutti gli interni hanno N figli (formulazione della slide; [DA VERIFICARE] il testo parla di "profondità N" ma per albero binario completo di profondità h intende grado 2 - ambiguità della slide). Un **albero degenere** ha tutti i nodi con al più un figlio e quindi si riduce a una lista. Infine la **definizione ricorsiva**: un albero o è vuoto o è un nodo con successori che sono alberi (al più 2 per noi). Questa definizione è ciò che rende naturali le funzioni ricorsive sugli alberi, come già per le liste.

## Albero ordinato / BST
Se i valori dei nodi sono ordinabili, si possono disporre in modo che per ogni nodo n con figli i valori nel sottoalbero sinistro siano < valore(n) < i valori nel sottoalbero destro. Un albero binario ordinato così è un **albero binario di ricerca** (BST). Il vantaggio è che per cercare un valore si sa a ogni nodo da che parte andare; il vincolo è che ogni operazione che modifica l'albero deve lasciarlo ordinato.

## Tipo e operazioni base
Il tipo C ricalca quello della lista, con due puntatori al posto di uno. Le operazioni previste sono `init`, `crea_nodo`, `add(nuovo, &T, ...)`, `remove`, `stampa`, `conta_nodi` e le visite.
```c
typedef struct nodo* tree;
struct nodo { tree left; tree right; int dato; };

void init(tree *T) { *T = NULL; }
tree crea_nodo(int el) {
  tree nuovo = (tree) malloc(sizeof(struct nodo));
  nuovo->dato = el; nuovo->left = NULL; nuovo->right = NULL;
  return nuovo;
}
```

### add con percorso (albero non ordinato)
In un albero non ordinato dove aggiungere non è ovvio, quindi si passa un percorso scritto come stringa, per esempio "ssdds..." (s = sinistra, d = destra), che porta al puntatore NULL in cui inserire il nuovo nodo. Se si arriva a un nodo già presente quando il percorso è finito il posto è occupato: non si assegna, altrimenti si perderebbe il nodo.
```c
void add(int el, tree *T, char *path) {
  if (T)
    if (*T)                                           /* nodo presente */
      if (*path == '\0') printf("errore: posto occupato");   /* non assegno: perderei il nodo */
      else if (*path == 's') add(el, &((*T)->left),  path+1);
      else if (*path == 'd') add(el, &((*T)->right), path+1);
      else printf("carattere sconosciuto %c", *path);
    else                                              /* albero vuoto */
      if (*path == '\0') *T = crea_nodo(el);          /* posto giusto */
      else printf("percorso non esiste");
}
```
### add_ord (BST, senza duplicati)
Nel BST il percorso non serve: lo decide il confronto con il valore del nodo corrente. Si scende a sinistra se il nuovo valore è minore, a destra se è maggiore, e si inserisce quando si trova il posto vuoto; i duplicati vengono segnalati e rifiutati.
```c
void add_ord(tree *T, int el) {
  if (T)
    if (*T)
      if (el < (*T)->dato) add_ord(&((*T)->left), el);
      else if (el > (*T)->dato) add_ord(&((*T)->right), el);
      else printf("\nElemento gia' presente\n");
    else *T = crea_nodo(el);
}
```
### Rimozione di un (sotto)albero: ricorsione in **postorder**
Per eliminare un albero bisogna liberare ogni sottoalbero prima della sua radice: se si liberasse subito la radice, i figli non sarebbero più raggiungibili e resterebbero come leak. Questo è l'ordine postorder (sinistro, destro, poi nodo). La slide mostra solo la rimozione di tutto un sottoalbero, non quella di un nodo singolo con riposizionamento dei figli: quel criterio non è svolto.
```c
void rimuovi_tutto(tree *T) {
  if (T)
    if (*T) {
      rimuovi_tutto(&(*T)->left);
      rimuovi_tutto(&(*T)->right);
      free(*T);          /* [la slide non mostra *T = NULL: da aggiungere per coerenza] */
    }
}
```

## Visite in profondità (DFS), ricorsive (con backtracking)
Una visita in profondità segue un cammino fino in fondo e poi torna indietro (backtracking), tenendo in memoria un solo percorso radice->foglia. A seconda del momento in cui si "visita" il nodo rispetto ai due sottoalberi si ottengono tre ordini. Sull'albero A(B(D(G),E),C(F(H))) delle slide:

- **PREORDER** (nodo, sn, dx): `A B D G E C F H`
- **INORDER** (sn, nodo, dx): `D G B E A C H F` (sulle slide: "DGBEACHF"; per un BST dà l'ordine crescente)
- **POSTORDER** (sn, dx, nodo): `G D E B H F C A`

```c
void stampaPRE(tree T)  { if (T) { printf(" %d ", T->dato); stampaPRE(T->left); stampaPRE(T->right); } else printf("-"); }
void stampaIN(tree T)   { if (T) { stampaIN(T->left); printf(" %d ", T->dato); stampaIN(T->right); }  else printf("-"); }
void stampaPOST(tree T) { if (T) { stampaPOST(T->left); stampaPOST(T->right); printf(" %d ", T->dato); } else printf("-"); }
```
Il `printf("-")` nel ramo else stampa un trattino per ogni sottoalbero vuoto, e serve a leggere meglio la struttura (versione con `<` e `>` per lo stesso scopo).

### DFS con stack di appoggio
La ricorsione usa implicitamente lo stack di esecuzione; si può rendere esplicito usando uno stack di appoggio (l'ADT del file 05), che contiene il percorso corrente più i fratelli dei nodi sul percorso. Si estrae un nodo, lo si visita e si impilano i figli: prima il destro, così che il sinistro esca per primo.
```c
stack s; push(s, radice);
while (!empty(s)) {
  current = pop(s);
  /* visita current */
  if (current->right) push(s, current->right);   /* prima right, così left esce per primo */
  if (current->left)  push(s, current->left);
}
```
Nelle slide il codice scrive `if (current->left) push(current->right); if (current->right) push(current->left);` (condizioni e push incrociati: refuso). La versione corretta è quella sopra: produce il preorder A B D G E C F H.

## Visita in ampiezza (BFS)
La visita in ampiezza procede per livelli, visitando prima i nodi più vicini alla radice. Il codice è identico allo schema della DFS con stack, ma con una **coda FIFO** al posto dello stack, e questo cambio di struttura dati basta a cambiare l'ordine di visita.
```c
queue q; enqueue(q, radice);
while (!empty(q)) {
  nodo = dequeue(q);
  /* visita nodo */
  if (nodo->left)  enqueue(q, nodo->left);
  if (nodo->right) enqueue(q, nodo->right);
}
```
L'ordine sull'albero d'esempio è A B C D E F G H (per livelli). [DA VERIFICARE] il PDF si interrompe prima della fine della simulazione: l'ordine finale è dedotto dall'algoritmo.

## Cose da saper fare all'esame
- Dato un albero, dare pre/in/post-order e BFS; profondità, grado, frontiera, distanza fra nodi.
- Scrivere `crea_nodo`, `add` con path, `add_ord`, `rimuovi_tutto`, stampa nelle tre visite, `conta_nodi`, **somma dei valori** nelle tre versioni pre/in/post (esercizio suggerito), altezza, ricerca in BST.
- Scrivere DFS con stack e BFS con coda (riuso ADT del file 05).
- Spiegare perché la rimozione va in postorder (free dei figli prima del padre).
- Esercizi tipo: contare foglie, nodi con un solo figlio, massimo/minimo in BST (min = scendere sempre a sinistra).

## Dubbi
La rimozione di un singolo nodo da un BST (con riposizionamento) non è trattata nelle slide: [DA VERIFICARE] se richiesta. Il titolo di 8_Alberi_pt3 anticipa "strumenti avanzati per la gestione della memoria" (nodo generico): vedi file 07.
