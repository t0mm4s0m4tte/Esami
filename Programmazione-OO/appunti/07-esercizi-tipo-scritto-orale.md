# 07 - Esercizi tipo scritto e domande orale
Fonte: doc Appunti (Lez. 23 Esercizi 1-6, Lez. 14/18 esperimenti, ComparaBottiglie, TestList). Scritto 2027-01-21, orale 2027-01-28.

Questo file raccoglie gli esercizi svolti e le domande per il ripasso finale. Ogni sezione richiama la teoria dei file precedenti: i temi ricorrenti sono i tipi e il binding (file 04), le liste (03) e gli alberi (05).

## A. Tipi, binding, cast (stile Lez. 23 es. 2 e 5)
Gli esercizi di questo tipo presentano una gerarchia di classi (o interfacce) e chiedono, per ogni riga, se compila e cosa stampa. Nell'**Esercizio 2** ci sono le classi A, B (astratta) e C. Togliere `m2()` da B è **corretto** solo se nessuna chiamata a m2 usa B come tipo apparente. `A obj2 = new B();` è un **errore**, perché B è astratta. `A obj3 = new C(); obj3.m1();` è accettato e stampa `C.m1` e poi `B.m1` (tramite `super.m1()`). `A obj4 = new C(); obj4.m2(obj4);` è un **errore**, perché il tipo apparente A non ha m2.

L'**Esercizio 5** riguarda invece le interfacce:
- togliere `m1()` da C va bene se C è astratta (delega a D);
- `((D) obj2).m2();` è corretto e stampa `D.m2` e `D.m1`;
- `x.m1(new D());` è corretto (D è compatibile con J);
- `obj4.m1(obj4);` è un **errore**, perché il tipo apparente di obj4 è C, non J.

Il metodo di risoluzione è sempre lo stesso, in quattro passi:
1. tipo apparente: il metodo esiste?
2. l'argomento è compatibile con il tipo apparente del parametro?
3. a runtime si risale dal tipo vero;
4. per i cast: compilazione con la regola generale (esiste un sottotipo comune), runtime con il tipo vero.

## B. Liste (Es. 1 e 6)
**inComune(p,q)** deve restituire true se esiste un indice in cui le due liste hanno lo stesso elemento. Esempi: `[5,7]` e `[8,7,1]` -> true (7 all'indice 1); `[4,3,2]` e `[1,2,2]` -> true; `[1,2,3]` e `[3,2,1]` -> true (2 in posizione 1); `[1,2]` e `[2,1]` -> **false**; `[]` e `[1,2]` -> false. La soluzione ricorsiva scorre in parallelo le due liste:

```java
static boolean inComune(Node p, Node q){
  if(p==null || q==null) return false;
  return p.getElem()==q.getElem() || inComune(p.getNext(), q.getNext()); }
```
(ricostruzione dalla specifica)

**reverse(prev)** su Cons/Nil inverte la lista in-place: `this.next = prev` riorienta il riferimento senza creare nuovi nodi, e lo stack tiene i record di attivazione. Al Check Point 2 (raggiunta Nil) lo stack ha 3 record: `Cons.reverse(1,..)`, `Cons.reverse(2,..)`, e `Nil.reverse()` in cima. [DA VERIFICARE: codice di Cons/Nil non incluso nel doc.]

## C. Alberi (Es. 3 e 4)
Nell'Esercizio 3, al Check Point 1 nello heap c'è **una sola Leaf**, con **5 riferimenti** che puntano ad essa (è la condivisione descritta nel file 05). L'Esercizio 4 è `detach(x)` (file 05), dove l'ordine del cortocircuito è importante: bisogna controllare `x != null` prima di `x.equals(elem)`. Per le visite e `leavesAt` sull'albero TestTree si veda ancora il file 05.

## D. Esperimenti equals (ProvaOver, Animal)
Questi esperimenti verificano la distinzione tra override e overload di `equals` (file 04, sezione 6). La regola generale è che un ricevente con tipo apparente Object usa il metodo di Object, salvo override risolto con binding dinamico. In dettaglio:

| espressione | risultato | perché |
|---|---|---|
| `a.equals(b)` (Animal, Animal) | false | overload `equals(Animal)` scelto staticamente |
| `c.equals(d)` (Object, Object, tipi veri Animal) | true | override `equals(Object)` via binding dinamico |
| `e.equals(d)` (e Object vero) | false | `equals` di Object (indirizzi) |
| `d.equals(e)` | false | override, ma `e instanceof Animal` è false |

## E. Array e Comparable
Due prove di Comparable da saper riprodurre. Si ordina un `Bottle[]` con `Arrays.sort` (compareTo sul livello) e solo dopo si usa `Arrays.binarySearch`, che richiede l'array già ordinato. Poi si fa il foreach su ListExt: `a.compareTo(b)==0`, e dopo `b.set(7,100)` l'esito cambia.

## F. Implementazioni da saper scrivere a mano
La lista seguente è la vera checklist del programma pratico:
1. Classe con invariante + costruttore + setter validanti (Bottle/Fraction/Rectangle).
2. ArrayExt (`add`, `remove`, `extend`).
3. DynamicStack / metodi statici NodeUtil (iterativi e ricorsivi).
4. Iterator per MiniLinkedList/ListExt.
5. Gerarchia astratta Figura + `maxArea`.
6. Tree/Leaf/Branch generico con insert/remove.
7. Custom exception + static factory + ciclo di recupero.
8. Singleton / Composite / State.

## G. Domande tipo orale
Le domande si possono raggruppare per tema; per ognuna conviene preparare una risposta breve con un esempio dal materiale.
- Differenza classe/oggetto; dove vivono in memoria (stack/heap/area classi).
- Cos'è l'incapsulamento? Perché un getter può rompere l'incapsulamento? (security leak)
- Invariante di classe: definizione ed esempio (Bottle, AddressBook, DynamicStack, ArrayExt).
- `==` vs `equals`; override vs overload; perché `equals(Object)` richiede instanceof.
- Tipo apparente vs tipo esatto; dynamic binding; quando `ClassCastException`.
- Classe astratta vs interfaccia; ereditarietà multipla e diamond.
- Generics: cosa risolvono, raw type, type erasure, autoboxing, bounded generics.
- Perché l'Iterator è meglio di `for + get(i)`? Costo O(n^2) vs O(n).
- BST: invariante, perché Leaf e non null, perché `t = t.insert(x)`, cancellazione con due figli, visite.
- Checked vs unchecked, quando usare assert vs eccezione, static factory.
- Singleton/Composite/State: scopo, struttura, esempio.
- Java vs C: array, memoria, parametri.

## Dubbi
- [DA VERIFICARE] Non ho a disposizione testi di esami passati: gli "esercizi tipo" derivano solo da Lez. 23 e dai casi di studio.
- [DA VERIFICARE] Nessuna dispensa di laboratorio oltre a "Lab 1" (confronto array C/Java): il programma dei laboratori successivi non è su Drive.
