# 05 - Alberi binari di ricerca ricorsivi (Tree / Leaf / Branch)
Fonte: doc Appunti (Lez. 17, 18, 19, 23 es. 3-4).

## Mappa
- Modello Leaf-Branch (composite) invece di null
- Invariante BST, metodi, insert/remove ricorsivi
- Visite (pre/in/post/livelli), livello(), leavesAt()
- Versione generica `Tree<T extends Comparable<T>>`

## 1. Struttura
Un albero binario di ricerca (BST) è, come la lista, una struttura definita induttivamente: o è vuoto, oppure è una radice con due sottoalberi. L'ordinamento si impone con l'**invariante** "sinistra < radice < destra", senza duplicati, e richiede quindi un ordine totale sugli elementi (Comparable). Il vantaggio è la ricerca: a ogni confronto si scarta metà dell'albero, per un costo O(log n) nel caso medio.

La scelta progettuale di questo modello è rappresentare l'albero con una `abstract class Tree` e due sottoclassi: `Leaf`, che è l'albero vuoto e non contiene dati, e `Branch`, con i campi `elem`, `left`, `right`. Usare **Leaf al posto di null** elimina i null-check: grazie al dynamic binding (file 04) ogni chiamata trova sempre un oggetto che sa rispondere, e il caso base della ricorsione si scrive nella Leaf. Per questo motivo le Leaf possono anche essere **una sola istanza condivisa** nello heap, con più riferimenti che puntano ad essa (ad esempio 5).

L'interfaccia comprende:
- `empty()`, `max()`, `contains(x)`;
- `insert(x)` e `remove(x)`, che restituiscono un Tree;
- `toString()`, il quale a sua volta chiama `protected abstract toStringAux(...)` per prefissi e indentazione.

## 2. Algoritmi
Le operazioni seguono tutte la struttura del BST. La ricerca `contains` usa il risultato di `compareTo` (in forma ternaria): 0 significa trovato, un valore negativo porta a sinistra, uno positivo a destra; la Leaf risponde false. Per `max()`, in un Branch con `right` Leaf il massimo è `elem`, altrimenti si delega a `right.max()`; nella Leaf non c'è un valore da restituire e si lancia un'eccezione (file 06: `MaxSuAlberoVuoto`, e il `throw` rende superfluo il `return`).

L'`insert` scende fino a una Leaf e la sostituisce con un Branch; il punto chiave è che **restituisce l'albero aggiornato**, perché la radice stessa può cambiare. Per `remove` il caso difficile è quello con due figli: si sostituisce l'elemento con `left.max()` e poi si fa `left = left.remove(left.max())` per eliminare il duplicato così creato. Quando uno dei figli è Leaf, basta restituire l'altro sottoalbero.

Da qui nasce la **regola d'oro del client**: scrivere sempre `t = t.insert(x); t = t.remove(x);`. Ignorare il valore restituito lascia un albero obsoleto o errato.

Un'ultima osservazione: la forma dell'albero dipende dall'ordine di inserimento. Interi in ordine crescente producono una catena a destra, stringhe in ordine decrescente una catena a sinistra, valori da `Random.nextDouble` un albero circa bilanciato (e solo in questo caso la O(log n) è realistica).

## 3. Visite
Visitare un albero significa decidere in che ordine toccare radice e sottoalberi, e l'ordine scelto determina l'uso.

| visita | ordine | uso |
|---|---|---|
| pre-ordine | R, SX, DX | clonazione |
| in-ordine | SX, R, DX | BST: ordine crescente |
| post-ordine | SX, DX, R | valutazione espressioni (figli prima) |
| per livelli (BFS) | livello per livello | giochi (scacchi) |

Due metodi di profondità usano la stessa ricorsione strutturale. `livello(int path)` restituisce il valore del nodo se `path==0` e altrimenti delega ai figli con `path-1`. `leavesAt(n)` conta le foglie a profondità n, e qui va ricordato che la "foglia" è l'albero vuoto: la **Leaf** risponde `n==0 ? 1 : 0`, mentre il **Branch** non è mai una foglia e risponde `n==0 ? 0 : left.leavesAt(n-1) + right.leavesAt(n-1)`.

## 4. Esempio svolto (TestTree)
L'albero è `t = Branch(1, Branch(2,L,L), Branch(3, L, Branch(72, L, Branch(9,L,L))))`. (Nota: non è un BST, serve solo a mostrare le visite.)
- pre: `1 2 3 72 9`; in: `2 1 3 72 9`; post: `2 9 72 3 1`; livelli: `1 | 2 3 | 72 | 9`.
- `leavesAt(0)=0, (1)=0, (2)=3, (3)=1, (4)=2, (5)=0`.

## 5. Generico
La versione generica è `Tree<T extends Comparable<T>>`, con `Leaf` e `Branch` che portano lo stesso vincolo (spiegazione del vincolo nel file 04). Un `Tree<Contact>` ordina per `name` tramite `compareTo`.

L'esercizio 4, `detach(x)`, elimina ogni sottoalbero con radice == x. Il confronto deve essere null-safe: `x == null ? elem == null : x.equals(elem)`, perché non si può mai chiamare `x.equals` con x null. Come ottimizzazione, se non c'è nulla da staccare si restituisce `this`, e la Leaf restituisce se stessa: è la condivisione delle istanze, nello spirito del pattern Flyweight.

## Cose da saper fare all'esame
- Scrivere Tree/Leaf/Branch con insert, contains, max, remove (caso due figli).
- Dare le quattro visite di un albero disegnato; calcolare `leavesAt(k)`.
- Disegnare stack/heap per un albero (Leaf condivisa).
- Spiegare perché `t = t.insert(x)` e perché Leaf > null.
- Spiegare perché serve `T extends Comparable<T>`.

## Dubbi
- [DA VERIFICARE] Codice completo di `insert`/`remove` non incollato nel doc (solo descritto): sopra è la ricostruzione dalla descrizione.
- [DA VERIFICARE] Comportamento di `remove` quando un solo figlio è Leaf (non descritto esplicitamente).
