# 01 - Fondamenti OOP, classi, memoria, incapsulamento
Fonte: doc "Principi di Programmazione Orientata agli Oggetti - Appunti" (Lezioni 01-03, 05-06 + Lab 1).

## Mappa

- [1. Concetti (Lez. 01)](#1-concetti-lez-01)
- [2. Classe, oggetto, memoria (Lez. 02)](#2-classe-oggetto-memoria-lez-02)
- [3. Incapsulamento in pratica (Lez. 03)](#3-incapsulamento-in-pratica-lez-03)
- [4. Stack (array) e assert (Lez. 05)](#4-stack-array-e-assert-lez-05)
- [5. Invarianti e design difensivo (Lez. 06)](#5-invarianti-e-design-difensivo-lez-06)
- [6. Array C vs Java (Lab 1)](#6-array-c-vs-java-lab-1)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## 1. Concetti (Lez. 01)
La programmazione orientata agli oggetti nasce per governare la complessità. Un programma non si scompone più come una sequenza di passi (scomposizione algoritmica, come in C), ma come un insieme di **agenti che si scambiano messaggi** in una relazione client-server. Il vantaggio principale è il riuso: un componente come il "Gestore Appelli" può servire sia lo studente sia il docente senza essere riscritto. Dietro c'è anche un limite cognitivo (Miller): la mente umana tiene presenti poche cose alla volta, quindi si ragiona per "pezzi" (chunking), ognuno dei quali nasconde il proprio interno.

Per rendere possibile questo ragionamento servono due idee gemelle. L'**astrazione** consiste nell'ignorare i dettagli inessenziali e nel descrivere un componente con un **modello contrattuale** (Meyer): "se mi dai questi input, ti garantisco questo servizio". Il client conosce solo l'interfaccia pubblica. L'**incapsulamento** (information hiding) è l'altra faccia: nascondere il *come* il servizio è realizzato, così che l'implementazione si possa cambiare (un database al posto di un file, una lista al posto di un array) senza toccare i client.

Le classi si organizzano secondo due gerarchie ortogonali: **IS-A** (ereditarietà, struttura delle classi) e **PART-OF** (aggregazione, struttura degli oggetti). In pratica si sceglie la gerarchia delle classi come primaria. Il processo di sviluppo segue tre fasi:
1. **OOA**: analisi dei requisiti e del vocabolario del dominio;
2. **OOD**: progetto di classi e moduli;
3. **OOP**: codifica.

Una definizione operativa di OOP richiede tre cose: gli oggetti sono gli elementi logici di base, ogni oggetto è istanza di una classe, le classi sono legate dall'ereditarietà.

Infine un po' di terminologia che conviene tenere distinta: l'**attributo** è il concetto di modello/progettazione, il **campo** è la variabile che lo realizza nel codice, lo **stato** è l'insieme dei valori dei campi a runtime. Un bug, in questa ottica, è una transizione dello stato verso una configurazione invalida, ed è esattamente ciò che invarianti e incapsulamento (sezioni 3 e 5) servono a impedire.

## 2. Classe, oggetto, memoria (Lez. 02)
Una **classe** è un blueprint: elenca attributi e metodi, fissi una volta per tutte. Un **oggetto** è invece, concretamente, un gruppo di dati nello heap che viene raggiunto tramite un indirizzo. Per capire cosa succede a runtime bisogna distinguere tre zone di memoria:
- lo **heap** contiene gli oggetti;
- lo **stack** contiene i frame dei metodi, cioè le variabili locali, che per gli oggetti sono solo *indirizzi* verso lo heap;
- l'**area delle classi** contiene i metadati delle classi e le variabili `static`.

L'istruzione `C x = new C();` si legge come tre eventi distinti:
1. la dichiarazione crea la variabile x nello stack;
2. `new` alloca l'oggetto nello heap con valori di default;
3. l'indirizzo dell'oggetto viene memorizzato in x.

Da qui discende tutto il resto: due variabili possono contenere lo stesso indirizzo (alias), una variabile può non puntare a nulla.

Quest'ultimo caso è **null**, un indirizzo degenere uguale per tutte le classi. Accedere a un campo o chiamare un metodo su null produce una `NullPointerException`; si previene con un controllo esplicito come `if (auto != null)`.

Sul piano dei file, una `class Cat` senza modificatori è package-private, mentre `public class Cat` è visibile ovunque, con due vincoli: al massimo una classe public per file, e il nome del file coincide con quello della classe. Solo la classe con il `main` è tipicamente public.

Un campo o metodo può essere **static** (di classe: una sola copia, nell'area classi, accessibile come `Classe.membro`) oppure **dinamico** (di istanza, nello heap, una copia per oggetto). Il static è di fatto una variabile globale, quindi va riservato a costanti e utility pure. Dentro un metodo di istanza, **this** è un parametro implicito che rappresenta l'oggetto ricevente: un altro oggetto che nel `main` si chiamasse `yoda` non è visibile dall'interno, e ci si riferisce a se stessi soltanto con `this`.

Due dettagli pratici. `toString()` non stampa: *restituisce* una String, ed è `println(x)` a chiamare `x.toString()`; il default di Object produce `C@indirizzoHex`. Il confronto con il C, infine, chiarisce l'identità: in Java il passaggio dei parametri è solo per valore (per gli oggetti si passa il valore dell'indirizzo) e l'identità si basa sull'indirizzo, per cui due struct con gli stessi dati sono indistinguibili, mentre due oggetti con gli stessi dati restano distinti.

```java
class Cat {
  public String name, breed; public int age;
  private static Scanner keyboard = new Scanner(System.in); // una sola tastiera
  public void readInput() { name = keyboard.nextLine(); age = keyboard.nextInt(); keyboard.nextLine(); }
  public String toString() { return " name = " + name + "\n age = " + age; }
  public int getAgeInHumanYears() { return age <= 2 ? age*11 : 22 + (age-2)*5; }
}
```

## 3. Incapsulamento in pratica (Lez. 03)
L'incapsulamento si realizza con la visibilità: `private` significa accessibile solo dalla classe, `public` costituisce l'interfaccia. Intorno ai campi privati si costruiscono i metodi di accesso. Il **getter** offre una lettura controllata (e omettere il getter rende il dato inaccessibile); il **setter** fa da guardiano, perché valida il valore prima di assegnarlo. Non scrivere alcun setter equivale a rendere l'attributo **immutabile**, la forma più forte di protezione.

Un esempio è la classe Species, il cui `setSpecies` rifiuta una population negativa. Lì compare anche il cast `(int)p`, che **tronca** invece di arrotondare (per arrotondare serve `Math.round`). Un'altra conseguenza della semantica per indirizzi è l'**alias**: l'assegnazione `a = b` copia l'indirizzo, quindi i vecchi dati di `a`, se nessun altro li referenzia, diventano irraggiungibili e vengono recuperati dal **Garbage Collector**.

Due esercizi svolti mostrano il principio in azione.

**Rectangle.** base, height e area sono privati; `setBase` e `setHeight` ricalcolano l'area, e non esiste un setter per l'area. In questo modo è impossibile ottenere uno stato incoerente come base 2, altezza 2, area 50.

**Calculator RPN** (cifre singole, conversione `c - '0'`). La calcolatrice usa uno stack LIFO su array: `push` fa `stack[size]=x; size++`, `pop` fa `size--; return stack[size]`. Traccia di "23+9*": {2} {2,3} {5} {5,9} {45}. Se l'input è `1234455+` restano residui nello stack; se è `1+++*` si fa pop su stack vuoto, size diventa -1 e si ottiene `ArrayIndexOutOfBoundsException`.

## 4. Stack (array) e assert (Lez. 05)
La classe Stack basata su array ha gli attributi `private int[] stack; private int size;` e un costruttore con `assert capacity >= 0`. I metodi `empty()` (size==0) e `full()` (size==stack.length) mostrano un'idea importante: è la *size* a decidere cosa è logicamente presente nella pila, mentre gli elementi "sopra" size restano fisicamente nell'array senza avere più significato.

Le condizioni di errore si controllano con `assert !full() : "..."` in push (overflow) e `assert !empty()` in pop (underflow). Le asserzioni però sono attive solo lanciando `java -ea`; di default vengono ignorate, quindi sono uno strumento di debug e non una difesa in produzione (per questo nel file 06 vengono sostituite da eccezioni).

Il metodo `equals(Stack)` deve confrontare la stessa size, la stessa capacità (`stack.length`) e il contenuto solo fino a `size-1`, non sull'intera capacità. Un ultimo caso di studio è il gioco di Master, in cui un metodo pubblico (`talk()`) coordina metodi privati (`reply()`, `update()`): il trucco è uno sfasamento temporale, per cui il suggerimento dato oggi diventa la risposta di domani (`oldAnswer = newAnswer`).

## 5. Invarianti e design difensivo (Lez. 06)
L'invariante di classe è la condizione che deve valere per ogni oggetto in ogni momento osservabile: il costruttore la stabilisce e ogni metodo pubblico la preserva. Nella classe **Bottle** la capacity è immutabile e il level varia, con invariante `0 < capacity && 0 <= level <= capacity`. I metodi seguono lo schema "calcola quanto si può davvero fare, poi agisci" e restituiscono la quantità effettivamente trasferita:

```java
int add(int q){ assert q >= 0; int added = Math.min(q, capacity - level); level += added; return added; }
int remove(int q){ assert q >= 0; int rem = Math.min(q, level); level -= rem; return rem; }
```

Su Bottle si costruisce l'esercizio **DieHard**, con metodi statici che operano su istanze. `pour(a,b)` travasa quanto possibile ed è scritta come `b.add(a.remove(b.getCapacity()-b.getLevel()))`; equivalentemente `a.remove(b.add(a.getLevel()))`, perché `add` restituisce quanto ha accettato. La soluzione per ottenere 4 galloni con due bottiglie b3 e b5 è:
1. riempi b5;
2. versa b5 in b3 (restano 3/2);
3. svuota b3;
4. versa ancora (2/0);
5. riempi b5;
6. versa in b3: b5 contiene 4.

La classe **Fraction** applica la stessa disciplina. `simplify()` e `MCD` (algoritmo di Euclide, `private static`) sono privati e vengono invocati dal costruttore e dai setter, così la frazione è sempre ridotta ai minimi termini. L'invariante è den > 0: se il denominatore è negativo si moltiplicano numeratore e denominatore per -1, e c'è `assert den != 0`. L'`equals` usa il prodotto incrociato (`a*d == b*c`), mentre add e multiply restituiscono una **nuova** Fraction invece di modificare quella ricevente.

## 6. Array C vs Java (Lab 1)
Il confronto tra array di C e di Java riassume buona parte della differenza di filosofia: in C l'array è un puntatore al primo elemento e il programmatore gestisce tutto, in Java è un oggetto con regole proprie.

| | C | Java |
|---|---|---|
| natura | puntatore al 1o elemento | oggetto nello heap (`new`) |
| memoria | statica o `malloc`/`free` | GC |
| fuori range | comportamento indefinito (buffer overflow) | `ArrayIndexOutOfBoundsException` |
| dimensione | non nota (va passata) | `.length` |
| init | garbage | default (0, false, null) |
| dim. cambiabile | no | no (ma fissata a runtime con `new int[n]`) |

## Esercizi svolti collegati

L'**esame di laboratorio** d'esempio ("Banca", [file 08 §3](08-esercizi-ed-esami-svolti.md#3-esame-di-laboratorio-la-banca)) applica questo file: una classe con variabile statica `counter`, attributi privati (incapsulamento), costruttori che incrementano il contatore, metodi di dominio, `getNumAccounts()` statico e una sottoclasse con limite di prelievo, svolta e provata. Il confronto fra array in C e in Java (§6 qui) è il PDF `confronto array C Java`, già integrato. Gli esercizi 3 e 6 della lezione 23-24 ([§1 file 08](08-esercizi-ed-esami-svolti.md#1-gli-esercizi-desame-della-lezione-23-24)) chiedono di ragionare su stack e heap, in particolare sul fatto che tutte le foglie di un albero sono un'unica `Leaf` condivisa (5 riferimenti nell'esercizio 3). Gli invarianti e `assert` del §5 non hanno esercizi propri nel Moodle.

## Cose da saper fare all'esame
- Disegnare stack/heap/area classi per `C x = new C(); y = x;` e dire cosa succede con alias, null, GC.
- Dire cosa stampa `toString` mancante / `==` vs `equals` (vedi 02).
- Scrivere una classe con campi privati, costruttore che valida (assert), getter/setter, invariante enunciata (Bottle, Rectangle, Fraction).
- Spiegare perché un attributo `static` è "globale travestito".
- Tracciare Calculator RPN su una stringa e prevedere eccezione.

## Dubbi
- [DA VERIFICARE] `Stack.pop` della Lez. 03 (size-- poi accesso) vs Lez. 05 (descritto "estrae l'ultimo elemento"): coerenti, ma il codice completo della classe Stack non è nel doc.
- [DA VERIFICARE] La Lez. 02 afferma "il passaggio dei parametri è solo per valore": confermare la formulazione usata dal docente all'orale.
