# 03 - Array estendibili, liste concatenate, DynamicStack, Iterator
Fonte: doc Appunti (Lez. 08 ArrayExt, 09, 10, 15 MiniLinkedList, 20 ListExt).

## Mappa

- [1. ArrayExt (Lez. 08)](#1-arrayext-lez-08)
- [2. Node e DynamicStack (Lez. 09-10)](#2-node-e-dynamicstack-lez-09-10)
- [3. NodeUtil: metodi statici su liste (Lez. 10)](#3-nodeutil-metodi-statici-su-liste-lez-10)
- [4. MiniLinkedList e Iterator (Lez. 15)](#4-minilinkedlist-e-iterator-lez-15)
- [5. Iterable / Iterator (Lez. 20)](#5-iterable--iterator-lez-20)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## 1. ArrayExt (Lez. 08)
Un array ha dimensione fissa, ma spesso non si sa in anticipo quanti elementi serviranno. ArrayExt risolve il problema con un array che si allarga da solo quando si riempie. L'invariante è `0 <= size <= array.length && array.length > 0`: la lunghezza deve essere positiva perché con length 0 il raddoppio non produrrebbe mai spazio.

La strategia è il **raddoppio**: quando `size == array.length` un metodo privato `extend()` crea un array di capacità doppia, tipicamente con `array = Arrays.copyOf(array, 2*array.length)`, e il vecchio array diventa irraggiungibile (GC). Raddoppiare, anziché aggiungere un posto alla volta, rende il costo ammortizzato per inserimento costante. Le precondizioni sono: `add(i,x)` richiede `0<=i<=size`, mentre `remove(i)`, `get(i)` e `set(i,x)` richiedono `0<=i<size`.

Il punto delicato è lo **shifting** degli elementi. In inserimento si scorre da destra verso sinistra per aprire un buco; in rimozione da sinistra verso destra per chiuderlo. Sbagliare verso significa sovrascrivere elementi ancora da copiare e ottenere copie multiple (x,x,x,x). La demo con capacità 10 e 12 inserimenti in posizione 0 mette alla prova sia lo shift sia l'extend.

```java
void add(int i, int x){ assert 0<=i && i<=size; if(size==array.length) extend();
  for(int j=size-1; j>=i; --j) array[j+1]=array[j];   // da DESTRA verso sinistra
  array[i]=x; size++; }
int remove(int i){ assert 0<=i && i<size; int x=array[i];
  for(int j=i; j<=size-1; ++j) array[j]=array[j+1];   // da sinistra verso destra
  size--; return x; }
```

## 2. Node e DynamicStack (Lez. 09-10)
La lista concatenata abbandona l'idea di blocco contiguo: ogni elemento sta in un **nodo** che contiene il dato e il riferimento al nodo successivo.

```java
public class Node { private int elem; private Node next;
  public Node(int elem, Node next){...}  // get/set per entrambi }
```

Il modo giusto di pensare a una lista è la sua **definizione induttiva**: il caso base è la lista vuota, rappresentata da `null`; il passo è un nodo seguito dal resto della lista, senza cicli, con la catena terminata da null. Si entra sempre dalla **testa**. Questa struttura ricorsiva spiega perché le operazioni sulle liste si scrivono altrettanto naturalmente in forma iterativa e ricorsiva (sezione 3). Il confronto con l'array è una traduzione termine a termine: all'indice i corrisponde il nodo p, a `i++` corrisponde `p = p.getNext()`, la fine è length per l'array e null per la lista. L'accesso all'elemento costa O(1) nell'array e O(n) nella lista, ma la lista non ha dimensione predefinita e i suoi nodi possono stare sparsi in memoria.

Il primo uso è **DynamicStack**, una pila senza limite di capacità il cui unico campo è `top`. L'invariante dice che la pila è vuota se e solo se `top == null`; altrimenti top è la testa e ogni nodo punta al precedente fino a null. Le operazioni diventano immediate:
- `push(x)`: `top = new Node(x, top)`;
- `pop()`: salva `top.getElem()` e poi `top = top.getNext()` (il nodo scollegato va al GC);
- `top()` ispeziona senza togliere, `empty()` è `top == null`.

Due osservazioni di stile. In `toString()` si usa una variabile ausiliaria (`Node temp = top`) e non si modifica mai `top`, altrimenti la pila andrebbe persa. Inoltre è meglio avere un oggetto DynamicStack con top=null piuttosto che il semplice null come pila vuota, perché così il client non deve fare null-check. La Lez. 09 segnala anche il pitfall del costruttore che deve usare `new` senza lasciare campi null.

[Il codice di push/pop non è riportato nel doc: sopra è la formulazione standard coerente con la descrizione.]

## 3. NodeUtil: metodi statici su liste (Lez. 10)
I metodi statici di utilità su liste mostrano bene la doppia lettura iterativa/ricorsiva, che segue la definizione induttiva: il caso base è `p == null`, il passo è l'elemento in testa combinato con il risultato sul resto.

| metodo | iterativo | ricorsivo |
|---|---|---|
| length | `l=0; while(p!=null){l++; p=p.getNext();}` | `p==null ? 0 : 1+length(p.getNext())` |
| sum | accumula `p.getElem()` | `p==null ? 0 : p.getElem()+sum(next)` |
| max | `assert p!=null; m=p.getElem();` poi `Math.max` | se `p.getNext()==null` -> elem; altrimenti max(elem, max(resto)) |
| member(x) | true appena `p.getElem()==x` | `p==null`->false; elem==x -> true; altrimenti resto |

Una tranquillizzazione utile: modificare il parametro formale (`p = p.getNext()`) non rovina la lista del chiamante, perché il riferimento è passato per valore e si sta spostando solo una copia locale. La ricorsione è più elegante ma rischia lo stack overflow su liste molto lunghe.

Due metodi richiedono attenzione particolare. In `sorted(p)` si restituisce false se `p.getNext().getElem() < p.getElem()`, ma **solo dopo** aver controllato che `p.getNext() != null`: invertire i controlli è la causa tipica di NullPointerException. In `equals(p,q)` si scorrono le due liste in parallelo e l'ultima riga `return p==q` ha un significato preciso, cioè entrambe arrivate a null, quindi stessa lunghezza:

```java
while(p!=null && q!=null){ if(p.getElem()!=q.getElem()) return false; p=p.getNext(); q=q.getNext(); } return p==q;
```

Per **costruire** `{10,20,30,40}` si procede all'indietro, per inserimento in testa: `q=new Node(40,null); q=new Node(30,q); ...`.

## 4. MiniLinkedList e Iterator (Lez. 15)
MiniLinkedList incapsula la lista in una classe con i campi `first` (il Node di testa) e `size`, e i metodi posizionali `get(i)`, `set(i,x)`, `add(i,x)`, `remove(i)`. Tutti poggiano su `private Node node(i)`, che non va esposto: l'invariante è che size coincida con il numero di nodi raggiungibili da first, e restituire nodi darebbe al client la possibilità di romperla. Per lo stesso motivo rendere `first` pubblico sarebbe un leak di riferimenti (vedi file 02).

Il problema è il costo. L'accesso posizionale costa O(i), quindi scorrere la lista con `for + get(k)` fa `0+1+...+(n-1) = n(n-1)/2` passi, cioè **O(n^2)**. La soluzione è il pattern **Iterator**: un oggetto cursore che ricorda dove si è arrivati. Vive nello **heap**, come oggetto persistente con un campo privato `next`, e offre `hasNext()` e `next()` (restituisce il valore e avanza), per una scansione **O(n)**. Non va confuso con la variabile `temp` di un metodo, che è locale, sta nello stack e vive solo durante quella chiamata. La regola pratica è: mai scorrere una lista con `get(i)`, usare l'iteratore.

## 5. Iterable / Iterator (Lez. 20)
Java formalizza il pattern con due interfacce: `Iterable<E>` (offre `iterator()`) e `Iterator<E>` (offre `hasNext()` e `next()`). Il ciclo `for (T x : coll)` è solo zucchero sintattico, tradotto in `iterator()` seguito da `while(hasNext()) { x = next(); ... }`. Anche gli array supportano il foreach (secondo il doc "la classe Arrays implementa Iterable" [DA VERIFICARE: in Java gli array hanno foreach per costrutto del linguaggio, non perché implementino Iterable]). I tipi generici richiedono i wrapper (`Integer`), e l'autoboxing converte automaticamente.

Il caso di studio è **ListExt**, che implements `Iterable<Integer>` e `Comparable<ListExt>`. Il suo iteratore `ListIterator implements Iterator<Integer>` ha un campo `next` di tipo Node: il metodo `next()` prende l'elemento, avanza il riferimento e restituisce l'`Integer`.

Il `compareTo` di ListExt è lessicografico, come il confronto tra parole, e si scrive con un while su p,q finché sono entrambi non null:
- A<B se alla prima differenza elem(A)<elem(B) oppure se A è un prefisso di B;
- A==B se entrambe finiscono insieme;
- A>B nel caso simmetrico.

Poiché le liste sono mutabili, l'esito può cambiare: due liste uguali (`compareTo==0`) smettono di esserlo dopo, ad esempio, `b.set(7,100)`.

## Esercizi svolti collegati

Due esercizi d'esame sulle liste concatenate sono svolti, con il codice originale e le uscite eseguite, nel [file 08 §1](08-esercizi-ed-esami-svolti.md#1-gli-esercizi-desame-della-lezione-23-24): `inComune(p, q)` su `Node<T>` generico (esercizio 1: ricorsione parallela sulle due liste e confronto con `equals`) e `reverse` in-place su `Cons`/`Nil` (esercizio 6: tre record di attivazione al `CHECK POINT 2`, ricorsione di coda). Il file `NodeUtilExtra.java` ([§4](08-esercizi-ed-esami-svolti.md#4-esperimenti-cosa-stampa)) confronta le versioni iterativa, ricorsiva di coda e non di coda di `max` e `ordered` su una lista. ArrayExt, DynamicStack e Iterator non hanno esercizi con testo nel Moodle (solo gli appunti a mano di lezione, non leggibili).

## Cose da saper fare all'esame
- Scrivere iterativo e ricorsivo: length, sum, max, member, equals, sorted, toString su Node.
- Implementare add/remove di ArrayExt (direzione dei cicli!) e dire perché length>0.
- Disegnare push/pop di DynamicStack sullo heap; spiegare perché toString usa `temp`.
- Spiegare O(n^2) del for-con-get e come l'Iterator lo porta a O(n); implementare un Iterator per una lista.
- Scrivere `compareTo` lessicografico.

## Dubbi
- [DA VERIFICARE] Esercizi di Lez. 23 su liste (`inComune`, `reverse` su Cons/Nil) -> vedi file 07.
