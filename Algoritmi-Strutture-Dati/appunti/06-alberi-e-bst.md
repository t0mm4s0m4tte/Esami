# 06 - Alberi, visite, alberi binari di ricerca (BST)

Fonte: doc Drive "Appunti" (Alberi, Alberi di Ricerca). Gli esercizi 13.2 sono nei PDF [DA VERIFICARE se coperti: vedi README].

## Mappa
Si parte dalle definizioni e dalla terminologia degli alberi, con le varianti e le rappresentazioni in memoria; si passa alle visite in profondità e in ampiezza (ricorsiva, con pila, con coda); infine si studiano i BST: ricerca, minimo/massimo, successore, inserimento, cancellazione, effetto dell'ordine di inserimento e visite in-order e pre-order.

## Alberi

Un **albero** è un grafo connesso e aciclico; un insieme di alberi disgiunti è una **foresta**. Il doc ne dà anche una definizione induttiva, Tree(A), ma la definizione completa non è riportata [DA VERIFICARE]. La terminologia è quella familiare: la radice è l'unico nodo senza padre, le foglie non hanno archi uscenti, gli altri sono nodi interni, e si parla di padre, figlio, fratello, discendente e avo. Un **ramo** è un cammino dalla radice a una foglia, il **livello** di un nodo è la sua distanza dalla radice (la radice sta a livello 0) e l'**altezza** dell'albero è il livello massimo, cioè la lunghezza del ramo più lungo. L'altezza è la grandezza che conta di più in tutto ciò che segue, perché il costo delle operazioni sui BST ne dipende direttamente.

Esistono diverse varianti:
- l'albero **sorgente** ha archi uscenti solo dalla radice, il **pozzo** il contrario;
- l'albero **k-ario** ha grado k (il massimo numero di figli);
- l'albero **ordinato** attribuisce significato all'ordine dei figli.

L'albero **binario posizionale** si definisce induttivamente: ∅∈BT(A), e se a∈A e l,r∈BT(A) allora ConsTree(a,l,r)∈BT(A).

Per la memoria, il caso binario si rappresenta con nodi a puntatori (key, left, right) in cui nil è l'albero vuoto. Per gli alberi k-ari si usa la rappresentazione **child-sibling**: ogni nodo punta al suo primo figlio (child) e al fratello successivo (sibling), cosicché un albero k-ario diventa di fatto un albero binario con un solo tipo di nodo. La stampa indentata ne mostra l'uso:

```
printTree(t,d): if t!=NULL { stampa d tab + t->key; for (cl=t->child; cl!=NULL; cl=cl->sibling) printTree(cl,d+1) }
```

## Visite

Visitare un albero significa toccare ogni nodo una volta sola, e la domanda è con quale disciplina scegliere il prossimo nodo da visitare. La visita ricorsiva usa implicitamente lo stack delle chiamate e dà la visita in profondità (DFS); rendere esplicita la pila dà la DFS iterativa; sostituire la pila con una coda trasforma la stessa routine in visita in ampiezza (BFS). L'intuizione è proprio questa: l'unica differenza tra DFS iterativa e BFS è la struttura dati, **pila contro coda**, perché la pila riprende sempre l'ultimo nodo scoperto (si scende a fondo) mentre la coda serve prima i nodi scoperti per primi (si procede per livelli). Il costo è O(n) in entrambi i casi: ogni nodo viene inserito ed estratto una volta, per 2n operazioni in tutto.

```
TREE-DFS(T):           visita T.key; C<-T.child; while C!=nil { TREE-DFS(C); C<-C.sibling }
TREE-DFS-STACK(T):     S<-pila vuota; Push(S,T); while S non vuota { T'<-Pop(S); visita T'; for all C figlio di T' Push(S,C) }
TREE-BFS(T):           Q<-coda vuota; Enqueue(Q,T); while Q non vuota { T'<-Dequeue(Q); visita T'; for all C figlio di T' Enqueue(Q,C) }
```

Un dettaglio utile nella DFS con pila: poiché l'ultimo inserito è il primo estratto, per esplorare i figli da sinistra a destra bisogna inserirli in ordine inverso. Nell'esempio del doc la DFS visita r,a,c,d,b, mentre la BFS (con i figli accodati da destra a sinistra) visita r,b,a,d,c.

## BST

Un **albero binario di ricerca** è un albero binario in cui, per ogni nodo a, le chiavi del sottoalbero sinistro sono minori di a.key, quelle del destro maggiori, e i due sottoalberi sono a loro volta BST. Ogni nodo ha key, left, right e anche **parent**. L'idea è che la proprietà d'ordine permette di scartare metà dell'albero a ogni confronto, esattamente come nella ricerca binaria: tutte le operazioni costano quindi **O(h)**, con h l'altezza, e il loro valore pratico dipende interamente da quanto l'albero è bilanciato (da qui la motivazione per gli alberi rosso-neri, vedi 07).

La **ricerca** (ricorsiva o iterativa) confronta la chiave con il nodo corrente e scende a sinistra o a destra finché trova la chiave o arriva a nil. Il **minimo** si trova scendendo sempre a sinistra (`while T.left != nil`) e il massimo scendendo a destra, per la stessa proprietà.

Il **successore** di N, cioè la più piccola chiave maggiore di N.key, si ragiona per casi:
- se N ha un sottoalbero destro, il successore è il minimo di quel sottoalbero (Tree-Min(N.right)): le chiavi più grandi di N stanno lì, e la più piccola è il minimo;
- se invece non lo ha, bisogna risalire con i parent fino al primo "avo sinistro", cioè al primo avo A tale che N stia nel sottoalbero A.left: quell'avo è il primo nodo maggiore di N.

L'**inserimento** aggiunge sempre una nuova **foglia**, nel punto in cui la ricerca della chiave sarebbe terminata con nil. La versione iterativa (It-Tree-Insert) scende tenendo traccia del padre P e infine collega N come figlio sinistro o destro di P. La versione ricorsiva standard, Rec-Tree-Insert, ha un difetto da ricordare: **non imposta N.parent**, e per questo serve la variante Rec-Tree-Insert-Aux.

La **cancellazione** di Z procede per tre casi.
1. Z è una foglia: si pone a nil il puntatore nel padre.
2. Z ha un solo figlio: il figlio prende il posto di Z.
3. Z ha due figli: si trova il successore di Z, si copia la sua chiave in Z e si cancella il successore.

Nel terzo caso il trucco funziona perché il successore è il minimo del sottoalbero destro, quindi **non ha figlio sinistro** e la sua cancellazione ricade necessariamente nei casi 1 o 2: la ricorsione si ferma dopo un solo passo.

### Impatto dell'ordine di inserimento
La forma dell'albero dipende dall'ordine in cui arrivano le chiavi, e questo cambia drasticamente il costo. Inserendo 5,3,1,2,8,9,10 si ottiene un albero abbastanza bilanciato di altezza 3; inserendo le stesse chiavi già ordinate (1,2,3,5,8,9,10) si ottiene un **albero degenere**, in pratica una lista di altezza n-1 = 6, e le operazioni costano O(n). Il caso migliore è l'albero completo, che ha altezza minima.

### Visite in-order e pre-order
La visita **in-order** (sinistro, radice, destro) di un BST produce le chiavi in ordine crescente: lo si dimostra per induzione, perché la lista L del sottoalbero sinistro è ordinata con chiavi minori di a e la lista R del destro è ordinata con chiavi maggiori. Una realizzazione ingenua costruisce la lista come Append(L, Cons(key,R)), ma Append costa O(|L|) e sul degenere sinistro si ottiene 1+2+...+(n-1), cioè **O(n^2)**. La versione Tree-Inorder(T,L) costruisce invece la lista all'indietro (prima il destro, poi la radice in testa, poi il sinistro) ed è **O(n)**.

La visita **pre-order** ha una proprietà diversa: reinserendo in un albero vuoto gli elementi della lista in pre-ordine si ottiene un albero **isomorfo** all'originale. È la ragione per cui il pre-order serve a serializzare un BST su file e a ricostruirlo fedelmente.

## Codice dalle slide (13)
```
Tree-Min(T): while T.left != nil: T:=T.left; return T          Tree-Max speculare
It-Search(x,T): while T != nil and x != T.key: if x<T.key T:=T.left else T:=T.right; return T
Tree-Succ(N): if N.right != nil return Tree-Min(N.right)
              else P:=N.parent; while P != nil and N = P.right: N:=P; P:=N.parent; return P
Rec-Tree-Insert(N,T): if T=nil return N; elif N.key=T.key return T
     elif N.key<T.key: T.left <- Rec-Tree-Insert(N,T.left); return T else T.right <- ...; return T      // NON imposta N.parent
Rec-Tree-Insert-Aux(N,T): // T non vuoto: se key uguale return T; se N.key<T.key: if T.left=nil {T.left<-N; N.parent<-T} else T.left<-Aux(N,T.left) (idem a destra)
It-Tree-Insert(N,T): P:=nil; S:=T; while S != nil: P:=S; (se uguale return) S := S.left/right;  // inv: se P != nil è il padre di S
     N.parent:=P; if P=nil T:=N elif N.key<P.key P.left:=N else P.right:=N
Tree-Delete(Z,T): if Z foglia: azzera il puntatore del padre; elif Z ha un solo figlio: 1-Delete(Z,T) (il figlio sale: figlio.parent := Z.parent, o diventa radice)
                  else Y:=Tree-Succ(Z); Z.key:=Y.key; Delete(Y,T)       // cancellazione "per copia"
Tree-Inorder(T,L): if T=nil return L else L:=Tree-Inorder(T.right,L); return Tree-Inorder(T.left, Cons(T.key,L))   // O(n), costruisce all'indietro
```
Per cancellare un nodo con due figli esistono due metodi, **fusione** e **copia**: le slide li mostrano entrambi, ma il pseudocodice usa la copia.

## Cose da saper fare all'esame
**Scritto**
- Disegnare il BST ottenuto da una sequenza di inserimenti; calcolarne l'altezza; cancellare un nodo (3 casi); scrivere le visite (pre/in/post, BFS).
- Scrivere iterativo/ricorsivo: search, min, successore, insert, delete; esercizi tipo su alberi binari (conteggio nodi, altezza, verifica proprietà BST — vedi PDF esercizi).
- Scrivere DFS con pila e BFS con coda.

**Orale**
- Perché il successore di un nodo con due figli non ha figlio sinistro; complessità O(h) e caso degenere; perché in-order dà l'ordinamento; perché pre-order serializza.

## Dubbi
- Post-order non è descritto nel doc (solo in-order e pre-order).
- Codice completo di Tree-Succ caso 2, Tree-Delete, Rec-Tree-Insert-Aux non riportato (solo descrizione).
