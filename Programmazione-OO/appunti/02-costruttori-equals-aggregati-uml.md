# 02 - Costruttori, equals, aggregati, UML, security leak
Fonte: doc Appunti (Lez. 04, 07, 08 [UML], 09 [leak]).

## Mappa

Il file parte dai costruttori (quello di default, l'overloading, la signature) e passa alla differenza tra identità ed equivalenza, cioè tra alias e copia. Su queste basi costruisce l'esempio degli aggregati di oggetti, Contact/AddressBook, con la sua invariante e la rimozione in O(1). Segue una sintesi dello UML per classi e relazioni, e infine il security leak, che mostra come l'aliasing possa rompere l'incapsulamento e come la copia difensiva lo ripari.

- [1. Costruttori (Lez. 04)](#1-costruttori-lez-04)
- [2. Identità vs equivalenza](#2-identità-vs-equivalenza)
- [3. Contact / AddressBook (Lez. 07)](#3-contact--addressbook-lez-07)
- [4. UML class diagram (Lez. 08)](#4-uml-class-diagram-lez-08)
- [5. Security leak (Lez. 09)](#5-security-leak-lez-09)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## 1. Costruttori (Lez. 04)
Il costruttore ha un compito preciso: garantire che ogni oggetto nasca in uno **stato iniziale valido**, preparando il terreno all'invariante di classe vista nel file 01. Se non se ne scrive nessuno, Java fornisce un costruttore di default implicito che inizializza i campi a int 0, double 0.0, riferimenti null. Attenzione però a un tranello classico: **appena si definisce un costruttore, anche solo con parametri, il default implicito sparisce**, e codice come `new C()` smette di compilare.

Una classe può avere più costruttori grazie all'**overloading**, purché abbiano **signature** diversa (numero, tipo o ordine dei parametri). Due costruttori con firme identiche sono un errore di compilazione.

## 2. Identità vs equivalenza
Poiché una variabile oggetto contiene un indirizzo, bisogna distinguere due domande: "sono lo stesso oggetto?" e "hanno lo stesso contenuto?". L'operatore `==` risponde alla prima, confrontando gli indirizzi (cioè verificando se c'è un alias). Il metodo `.equals()` ereditato da Object fa solo `==`, quindi per confrontare lo stato serve fare **override**: per Animal si confrontano il nome con `equalsIgnoreCase`, l'età e il peso.

Nello stesso ordine di idee, `x = y` produce un **alias** e non una copia. Per copiare lo stato servono metodi dedicati (`assign(Animal y)`, `change(...)`). L'aliasing incontrollato è una fonte di side effect difficili da debuggare, ed è il tema che torna nella sezione 5.

## 3. Contact / AddressBook (Lez. 07)
Un aggregato di oggetti è una classe che ne contiene altri; l'esempio guida è una rubrica. Il tassello elementare è Contact, un oggetto con nome ed email e i relativi getter/setter:

```java
public class Contact { private String name, email;
  public Contact(String n, String e){ name=n; email=e; }
  public String getName(){return name;} public String getEmail(){return email;}
  public void setName(String n){name=n;} public void setEmail(String e){email=e;}
  public String toString(){ return " - " + name + " : " + email; } }
```

AddressBook memorizza i contatti in un array parzialmente riempito, e per questo servono due numeri distinti: `maxContacts` (la capacità) e `numContacts` (quanti sono validi). Non esiste un `getContacts()`: restituire l'array violerebbe l'incapsulamento (vedi sezione 5). La correttezza della classe poggia su una invariante in tre parti:
- l'occupazione è contigua, negli indici 0..numContacts-1;
- i nomi sono unici (senza distinguere maiuscole/minuscole);
- vale `0 <= numContacts <= capacità`.

Ogni operazione deve ricevere l'array in questo stato e lasciarlo così.

Le operazioni ruotano attorno a un metodo privato `findIndex(String n)`, che scorre fino a numContacts con `equalsIgnoreCase`. Come valore di "non trovato" restituisce una **sentinella** pari a `numContacts` (il primo indice non valido), scelta preferibile a -1 perché resta coerente con l'invariante. Sopra di esso le operazioni si limitano a difendere l'invariante:
- `add` fallisce (false) se il nome è duplicato o la rubrica è piena;
- `changeName` fallisce se l'origine è assente o il nuovo nome è già presente;
- `changeEmail` restituisce false se il contatto è assente;
- `findEmail` restituisce `""` nello stesso caso.

La **rimozione in O(1)** sfrutta il fatto che l'ordine non conta: si trova l'indice i, si decrementa `numContacts` e si copia l'ultimo elemento nella posizione liberata, `contacts[i] = contacts[numContacts]`. Con [c0,c1,c2] e rimozione di c0 si ottiene [c2,c1,c2] con numContacts=2: c0 non ha più riferimenti (finisce al GC), mentre l'alias di c2 in fondo è invisibile perché fuori dall'intervallo valido. È una "rimozione logica" che non preserva l'ordine.

## 4. UML class diagram (Lez. 08)
Lo UML descrive le classi e le loro relazioni. Una classe è un riquadro con nome, attributi (`nome: tipo`) e metodi (`m(par): ret`); la visibilità si indica con `+` public, `-` private, `#` protected, e i membri **static** sono sottolineati. Le relazioni distinguono diversi gradi di legame, dal più debole al più forte:
- **Dipendenza**: freccia tratteggiata, quando C usa D come parametro o variabile locale (es. PencilDemo -> Pencil).
- **Associazione**: linea continua, con eventuali frecce o nomi.
- **Aggregazione**: linea con losanga **bianca** dal tutto alle parti, con molteplicità come `0..*` (AddressBook-Contact).
- **Composizione**: losanga **nera**, la vita delle parti è legata a quella del tutto.
- **Ereditarietà**: freccia a triangolo vuoto dalla sottoclasse alla superclasse.

## 5. Security leak (Lez. 09)
Il leak è l'esempio più istruttivo di come l'incapsulamento si possa rompere senza accorgersene. Anche in una classe senza setter, un getter che restituisce il riferimento a un campo mutabile consegna al client un alias dell'oggetto interno, e il client può modificarlo a piacere. Nell'esempio, una classe Hacker agisce su AnimalPair: ottenuto `first` con il getter, ne cambia il nome e altera lo stato privato della coppia. La difesa è restituire una copia.

```java
public Animal getFirst(){ return first; }          // LEAK: alias di first
Animal t = c.getFirst(); t.setName("X");           // altera lo stato interno!
public Animal getFirst(){ return new Animal(first.getName(), first.getAge(), first.getWeight()); } // difesa: copia
```

Lo stesso principio vale in ingresso: il costruttore di AnimalPair usa `new` per i campi, così non restano null e soprattutto non sono alias dei parametri passati dal chiamante. La regola generale è non restituire (né ricevere senza copiare) riferimenti diretti a campi mutabili, preferendo la copia profonda (clone).

## Cose da saper fare all'esame
- Dire se un codice compila dopo l'aggiunta di un costruttore (sparizione del default).
- Differenza `==` / `equals` / override vs overload di equals (vedi 04).
- Scrivere `findIndex`, `add`, `remove` di AddressBook rispettando l'invariante; disegnare l'array dopo la rimozione.
- Individuare il leak in una classe e correggerlo con copia difensiva.
- Disegnare un class diagram con aggregazione e molteplicità.

## Dubbi
- [DA VERIFICARE] "memory leak" nel doc è usato per indicare la fuga di riferimenti interni (security leak), non il significato C di memoria non liberata.
