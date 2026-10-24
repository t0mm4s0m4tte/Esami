# Flashcard - Principi di Programmazione OO
Formato D/R. Carte con [DA VERIFICARE] segnalano punti incerti degli appunti.

## 01 - Fondamenti, classi, memoria, invarianti

D: Cosa distingue la scomposizione OO da quella algoritmica?
R: Algoritmica (C): sequenza di passi. OO: insieme di agenti che si scambiano messaggi in relazione client-server. Vantaggio principale: riuso dei componenti.

D: Definisci astrazione e incapsulamento (information hiding).
R: Astrazione: ignorare i dettagli inessenziali e descrivere il componente con un modello contrattuale (Meyer: "dati questi input garantisco questo servizio"). Incapsulamento: nascondere il COME, così l'implementazione cambia senza toccare i client.

D: Differenza tra le gerarchie IS-A e PART-OF?
R: IS-A = ereditarietà (struttura delle classi). PART-OF = aggregazione (struttura degli oggetti). Sono ortogonali; si sceglie la gerarchia di classi come primaria.

D: Distingui attributo, campo e stato.
R: Attributo: concetto di modello/progetto. Campo: la variabile che lo realizza nel codice. Stato: insieme dei valori dei campi a runtime.

D: Cosa sono OOA, OOD, OOP?
R: Le tre fasi dello sviluppo: analisi dei requisiti e del vocabolario del dominio, progetto di classi e moduli, codifica.

D: In `C x = new C();` quali tre eventi avvengono e dove?
R: (1) La dichiarazione crea la variabile x nello stack. (2) `new` alloca l'oggetto nello heap con valori di default. (3) L'indirizzo dell'oggetto è memorizzato in x.

D: Cosa contengono stack, heap e area delle classi?
R: Stack: frame dei metodi/variabili locali (per gli oggetti solo indirizzi). Heap: gli oggetti. Area classi: metadati delle classi e variabili static.

D: Cos'è null e cosa succede se lo si dereferenzia?
R: Indirizzo degenere uguale per tutte le classi. Accedere a un campo o chiamare un metodo su null lancia NullPointerException; si previene con `if (x != null)`.

D: Vero/Falso: due oggetti con gli stessi dati sono lo stesso oggetto in Java.
R: Falso. L'identità si basa sull'indirizzo: due oggetti con gli stessi dati restano distinti (a differenza di due struct C con gli stessi dati, indistinguibili).

D: Differenza tra membro static e di istanza?
R: Static: una sola copia nell'area classi, accesso `Classe.membro`; è di fatto una variabile globale, da riservare a costanti e utility pure. Di istanza: nello heap, una copia per oggetto.

D: Cos'è `this`?
R: Parametro implicito di ogni metodo di istanza: l'oggetto ricevente. È l'unico modo di riferirsi a se stessi da dentro il metodo.

D: `toString()` stampa la stringa?
R: No: la RESTITUISCE. È `println(x)` che chiama `x.toString()`. Il default di Object produce `C@indirizzoHex`.

D: Una classe `public` in un file: quali vincoli?
R: Al massimo una classe public per file e il nome del file coincide con quello della classe. Senza modificatori la classe è package-private.

D: Come si realizza l'incapsulamento con getter/setter? Cosa significa non scrivere il setter?
R: Campi private, interfaccia public. Il getter dà lettura controllata, il setter valida prima di assegnare. Nessun setter = attributo immutabile (protezione più forte).

D: Cosa stampa/produce `(int) 3.9` e come si arrotonda?
R: Il cast tronca: dà 3. Per arrotondare serve `Math.round`.

D: Cosa fa `a = b` con a, b oggetti? Che fine fanno i vecchi dati di a?
R: Copia l'indirizzo (alias), non il contenuto. I vecchi dati di a, se nessun altro li referenzia, diventano irraggiungibili e il Garbage Collector li recupera.

D: Rectangle: perché base, height e area sono private e non c'è setArea?
R: setBase e setHeight ricalcolano l'area, e senza setArea è impossibile uno stato incoerente (es. base 2, altezza 2, area 50).

D: Calculator RPN con stack LIFO: traccia "23+9*".
R: {2} {2,3} {5} {5,9} {45}. Risultato 45 (cifre singole, conversione `c - '0'`).

D: Calculator RPN: cosa succede con input "1+++*"?
R: Pop su stack vuoto: size diventa -1 e si ha ArrayIndexOutOfBoundsException. Con input "1234455+" invece restano residui nello stack.

D: Stack su array: push e pop in due righe.
R: `push: stack[size]=x; size++` / `pop: size--; return stack[size]`. È la size a decidere cosa è presente; gli elementi sopra size restano nell'array ma senza significato.

D: Perché `assert` non basta come difesa in produzione?
R: Le asserzioni sono attive solo con `java -ea`; di default sono ignorate. Sono uno strumento di debug (per le API pubbliche si usano le eccezioni, file 06).

D: Cosa deve confrontare `equals(Stack)`?
R: Stessa size, stessa capacità (`stack.length`) e il contenuto solo fino a size-1, non su tutta la capacità.

D: Definisci invariante di classe.
R: Condizione che vale per ogni oggetto in ogni momento osservabile: il costruttore la stabilisce, ogni metodo pubblico la preserva.

D: Invariante di Bottle?
R: `0 < capacity && 0 <= level <= capacity` (capacity immutabile, level variabile).

D: Scrivi `add(int q)` di Bottle e dì cosa restituisce.
R: `int added = Math.min(q, capacity - level); level += added; return added;` (con `assert q >= 0`). Restituisce la quantità effettivamente aggiunta.

D: DieHard: scrivi pour(a,b) in una riga.
R: `b.add(a.remove(b.getCapacity() - b.getLevel()))`; equivalente `a.remove(b.add(a.getLevel()))`, perché add restituisce quanto ha accettato.

D: DieHard con b3 e b5: come si ottengono 4 galloni?
R: Riempi b5; versa in b3 (restano 3/2); svuota b3; versa ancora (2/0); riempi b5; versa in b3: b5 contiene 4.

D: Fraction: quale invariante e come la mantengono i metodi?
R: den > 0 e frazione ridotta ai minimi termini. simplify() e MCD (Euclide, private static) sono invocati da costruttore e setter; se den<0 si moltiplica per -1 num e den; `assert den != 0`.

D: Fraction: come si scrive equals e cosa restituiscono add/multiply?
R: equals con prodotto incrociato (`a*d == b*c`). add e multiply restituiscono una NUOVA Fraction senza modificare il ricevente.

D: Tabella C vs Java per gli array: natura, fuori range, dimensione, init.
R: C: puntatore al 1o elemento, fuori range = comportamento indefinito, dimensione non nota, init garbage, memoria malloc/free. Java: oggetto nello heap, ArrayIndexOutOfBoundsException, `.length`, init default (0/false/null), GC. In entrambi la dimensione non cambia dopo la creazione.

D: [DA VERIFICARE] Il passaggio dei parametri in Java è solo per valore?
R: Gli appunti (Lez. 02) lo affermano: per gli oggetti si passa il valore dell'indirizzo. La formulazione esatta usata dal docente all'orale non è confermata.

## 02 - Costruttori, equals, aggregati, UML, leak

D: Quale scopo ha il costruttore e cosa fa il default?
R: Garantire uno stato iniziale valido (stabilisce l'invariante). Il default implicito inizializza int a 0, double a 0.0, riferimenti a null.

D: Vero/Falso motivato: dopo aver aggiunto `C(int x)`, `new C()` compila ancora.
R: Falso: appena si definisce un costruttore (anche con parametri) il default implicito sparisce.

D: Overloading di costruttori: condizione?
R: Signature diverse (numero, tipo o ordine dei parametri). Due costruttori con firme identiche = errore di compilazione.

D: `==` vs `equals` ereditato da Object?
R: `==` confronta indirizzi (c'è alias?). L'equals di Object fa solo `==`; per confrontare lo stato serve l'override (es. Animal: nome con equalsIgnoreCase, età, peso).

D: Cosa produce `x = y` tra oggetti e come si copia lo stato?
R: Un alias, non una copia. Per copiare servono metodi dedicati (assign, change...). L'aliasing incontrollato causa side effect difficili da debuggare.

D: AddressBook: perché due numeri maxContacts e numContacts?
R: Array parzialmente riempito: maxContacts è la capacità, numContacts quanti contatti sono validi.

D: Invariante di AddressBook (3 parti)?
R: Occupazione contigua negli indici 0..numContacts-1; nomi unici (ignorando maiuscole/minuscole); `0 <= numContacts <= capacità`.

D: Perché AddressBook non ha `getContacts()`?
R: Restituire l'array violerebbe l'incapsulamento (security leak): il client avrebbe un alias dello stato interno.

D: findIndex di AddressBook: cosa restituisce se non trova e perché?
R: Una sentinella pari a numContacts (primo indice non valido), preferibile a -1 perché coerente con l'invariante. Scorre fino a numContacts con equalsIgnoreCase.

D: Comportamento di add, changeName, changeEmail, findEmail in AddressBook.
R: add: false se nome duplicato o rubrica piena. changeName: false se origine assente o nuovo nome già presente. changeEmail: false se contatto assente. findEmail: `""` se assente.

D: Rimozione $O(1)$ in AddressBook: come funziona?
R: Si trova i, si decrementa numContacts e si fa `contacts[i] = contacts[numContacts]` (l'ordine non conta).

D: AddressBook [c0,c1,c2], rimuovo c0: com'è l'array e cosa succede a c0 e all'alias in fondo?
R: [c2,c1,c2] con numContacts=2. c0 non ha più riferimenti (GC); il c2 in fondo è invisibile perché fuori dall'intervallo valido. Rimozione logica che non preserva l'ordine.

D: UML: simboli di visibilità e static?
R: `+` public, `-` private, `#` protected; membri static sottolineati. Attributi `nome: tipo`, metodi `m(par): ret`.

D: UML: elenca le relazioni dal più debole al più forte con la notazione.
R: Dipendenza (freccia tratteggiata, usa come parametro/locale), associazione (linea continua), aggregazione (losanga bianca dal tutto alle parti, molteplicità es. 0..*), composizione (losanga nera, vita delle parti legata al tutto), ereditarietà (freccia a triangolo vuoto verso la superclasse).

D: Cos'è lo "security leak" nel corso?
R: Un getter che restituisce il riferimento a un campo mutabile consegna al client un alias: il client può alterare lo stato privato anche senza setter (es. Hacker su AnimalPair). Non è il memory leak del C.

D: Correggi `public Animal getFirst(){ return first; }`.
R: Restituisci una copia difensiva: `return new Animal(first.getName(), first.getAge(), first.getWeight());`.

D: Il leak vale anche in ingresso?
R: Sì: il costruttore deve copiare con `new` i parametri mutabili, così i campi non sono alias di oggetti del chiamante (e non restano null). Regola: mai ricevere/restituire riferimenti diretti a campi mutabili.

## 03 - Array estendibili, liste, Iterator

D: Invariante di ArrayExt e perché length > 0?
R: `0 <= size <= array.length && array.length > 0`. Con length 0 il raddoppio non produrrebbe mai spazio.

D: Strategia di extend() e perché raddoppiare?
R: Quando `size == array.length` si crea un array di capacità doppia (`Arrays.copyOf(array, 2*array.length)`); il vecchio va al GC. Il raddoppio rende il costo ammortizzato per inserimento costante (aggiungere un posto alla volta no).

D: Precondizioni di add(i,x), remove(i), get(i), set(i,x) in ArrayExt?
R: add: `0<=i<=size`. remove, get, set: `0<=i<size`.

D: Scrivi il ciclo di shifting di add(i,x) in ArrayExt e la direzione.
R: Da DESTRA verso sinistra: `for(int j=size-1; j>=i; --j) array[j+1]=array[j]; array[i]=x; size++` (dopo extend se pieno).

D: Scrivi remove(i) di ArrayExt: direzione dello shifting?
R: Da SINISTRA verso destra: `x=array[i]; for(j=i; j<=size-1; ++j) array[j]=array[j+1]; size--; return x`. Direzione sbagliata = elementi sovrascritti prima di essere copiati (x,x,x,x).

D: Definizione induttiva di lista concatenata.
R: Caso base: lista vuota = null. Passo: un nodo (elem, next) seguito dal resto della lista, senza cicli, catena terminata da null. Si entra sempre dalla testa.

D: Traduzione array -> lista: indice, i++, fine?
R: Indice i = nodo p; `i++` = `p = p.getNext()`; fine: `length` per l'array, `null` per la lista. Accesso: $O(1)$ array, $O(n)$ lista.

D: DynamicStack: invariante e operazioni push/pop.
R: Pila vuota sse `top == null`; altrimenti top è la testa e ogni nodo punta al precedente fino a null. `push(x): top = new Node(x, top)`; pop salva `top.getElem()` poi `top = top.getNext()`. (Codice ricostruito nel doc, coerente con la descrizione.)

D: Perché in toString() di DynamicStack si usa `Node temp = top`?
R: Per non modificare mai top: altrimenti la pila andrebbe persa.

D: Meglio un DynamicStack con top=null o null come pila vuota?
R: Un oggetto con top=null: il client non deve fare null-check.

D: Scrivi length ricorsivo e iterativo su Node.
R: Iterativo: `l=0; while(p!=null){l++; p=p.getNext();}`. Ricorsivo: `p==null ? 0 : 1+length(p.getNext())`.

D: Scrivi member(x) ricorsivo su lista.
R: `p==null` -> false; `p.getElem()==x` -> true; altrimenti `member(p.getNext(), x)`.

D: Vero/Falso: `p = p.getNext()` in un metodo statico rovina la lista del chiamante.
R: Falso: il riferimento è passato per valore, si sposta solo una copia locale.

D: Pericolo della ricorsione su liste molto lunghe?
R: Stack overflow (più elegante ma più costosa dell'iterativa).

D: In `sorted(p)` qual è l'ordine corretto dei controlli?
R: Prima `p.getNext() != null`, poi `p.getNext().getElem() < p.getElem()` (-> false). Invertire causa NullPointerException.

D: Cosa significa `return p==q` alla fine di equals(p,q) tra liste?
R: Il while si ferma quando una è null: `p==q` è true solo se entrambe sono null, cioè stessa lunghezza.

D: Come costruire {10,20,30,40}?
R: All'indietro, inserimento in testa: `q=new Node(40,null); q=new Node(30,q); q=new Node(20,q); q=new Node(10,q);`.

D: MiniLinkedList: invariante e perché `node(i)` è private?
R: size = numero di nodi raggiungibili da first. Esporre nodi o first darebbe al client modo di romperla (leak di riferimenti).

D: Perché `for + get(k)` su una lista è $O(n^2)$?
R: get(k) costa $O(k)$: somma 0+1+...+(n-1) = n(n-1)/2 passi.

D: Iterator: cos'è, dove vive e differenza dalla variabile `temp` di un metodo?
R: Oggetto cursore nello heap con campo privato `next`, offre hasNext() e next() (restituisce il valore e avanza): scansione $O(n)$. `temp` è locale, nello stack, vive solo durante la chiamata.

D: Come viene tradotto `for (T x : coll)`?
R: Zucchero sintattico per `iterator()` seguito da `while(hasNext()){ x = next(); ... }`. Richiede che coll sia Iterable.

D: Differenza tra Iterable<E> e Iterator<E>.
R: Iterable offre `iterator()`; Iterator offre `hasNext()` e `next()`. ListExt implements `Iterable<Integer>` e ha una classe interna ListIterator implements `Iterator<Integer>`.

D: [DA VERIFICARE] Perché si può usare il foreach sugli array?
R: Gli appunti dicono "la classe Arrays implementa Iterable", ma segnalano il dubbio: in Java il foreach sugli array è un costrutto del linguaggio, non dovuto a Iterable.

D: Come funziona il compareTo lessicografico di ListExt?
R: Scorre p,q finché entrambi non null: A<B se alla prima differenza elem(A)<elem(B) o se A è prefisso di B; A==B se finiscono insieme; A>B nel caso simmetrico.

D: Due ListExt a, b con compareTo==0: l'esito può cambiare?
R: Sì, le liste sono mutabili: dopo `b.set(7,100)` non sono più uguali.

## 04 - Generici, ereditarietà, polimorfismo, interfacce

D: Che problema risolvono i generici?
R: Duplicazione di classi per tipo (PairIS...) o uso di Object con cast manuali (errori a runtime). I generici spostano il controllo dei tipi al compilatore.

D: In `GenericPair<T,S>` il costruttore va scritto con `<T,S>`?
R: No: nel costruttore (definizione) niente `<T,S>`. All'uso: `new GenericPair<>(10,"Mario")` (diamond).

D: Dove si dichiarano i parametri di tipo di un metodo statico generico?
R: Prima del tipo di ritorno: `public static <T,S> GenericPair<S,T> inv(GenericPair<T,S> p)`. Senza, degrada a `<Object,Object>`.

D: Cosa si può fare con un valore di tipo T dentro una classe generica non vincolata?
R: Solo i metodi di Object: T è agnostico.

D: Raw type e type erasure: cosa sono e perché esistono?
R: Raw type: `GenericPair p = ...`, il compilatore rinuncia ai controlli (solo warning) e gli errori emergono a runtime. Erasure: nel bytecode i generici diventano Object, per retrocompatibilità col codice pre-JDK 5.

D: Perché i generici usano Integer e non int? Costo?
R: I primitivi non sono ammessi come parametri di tipo: si usano i wrapper con autoboxing, a costo di un oggetto nello heap per ogni boxing.

D: Cosa viene ereditato con `extends`? E i costruttori?
R: Membri public e protected (e package-private nello stesso package); i private non sono accessibili. I costruttori non si ereditano MAI.

D: Differenza overriding e hiding?
R: Overriding: metodi di istanza con stessa firma (l'originale è raggiungibile con `super.m()`). Hiding: campi o metodi statici omonimi, sconsigliato.

D: Regole su `super(...)` nei costruttori.
R: Deve essere la prima istruzione. Se omessa la JVM inserisce `super()`, che dà errore di compilazione se la superclasse non ha un costruttore senza parametri.

D: Cosa permette `protected`?
R: Visibilità nel package e in tutte le sottoclassi (es. `top` in DynamicStack, `lati` in Poligono).

D: BottleWithCap: scrivi add con tappo.
R: `@Override public int add(int q){ if(open) return super.add(q); return 0; }` con costruttore `super(c); open=false;`.

D: Catena DynamicStack -> DynamicStackMax -> DynamicStackSize: come si sommano le invarianti?
R: Ogni classe mantiene la sua (LIFO; max; size) appoggiandosi alla superclasse. In Size, push chiama super.push (Max aggiorna max, poi DynamicStack crea il Node) e poi size++. Nel pop, se l'elemento tolto è il max si chiama resetMax() (private) che scorre i nodi. Un solo oggetto nello heap con tutti i campi.

D: Quando `if` e quando `assert`?
R: `if` per scenari leciti che cambiano il flusso (es. abs). `assert` per condizioni che devono sempre essere vere, dove la violazione è un errore del chiamante (es. sqrt con x>=0).

D: Perché restituire -1 da pop su pila vuota è una cattiva idea?
R: È ambiguo: non distingue risultato valido da errore. Le eccezioni risolvono il problema.

D: Definisci tipo apparente e tipo esatto.
R: Apparente: quello dichiarato (`Bottle b`), controllato dal compilatore. Esatto (vero): quello dell'oggetto creato con `new`, usato dalla JVM a runtime.

D: Cos'è il dynamic binding?
R: A runtime la JVM parte dal tipo vero e risale la gerarchia fino alla versione più specifica del metodo, che deve esistere nel tipo apparente. Base del polimorfismo per inclusione; se compila, un'implementazione eseguibile esiste.

D: Proprietà della relazione di sottotipo `<:` e sostituibilità.
R: Riflessiva, antisimmetrica, transitiva (ordine parziale). Se C <: D un C si usa dove serve un D, non viceversa. Vale anche `int <: double` (upcast implicito, downcast esplicito con troncamento).

D: Downcast `(C) obj`: quando non compila, quando lancia ClassCastException?
R: Non compila se C e il tipo apparente sono disgiunti. Compila se C è compatibile col tipo apparente; a runtime lancia ClassCastException se il tipo vero non è <: C.

D: instanceof con null?
R: `null instanceof C` è false (null-check implicito). Base del pattern check-then-cast.

D: Perché il polimorfismo rende `figure[i].draw()` estendibile?
R: Con Figura[] di Quadrato e Cerchio il ciclo sceglie la versione a runtime; aggiungere Triangolo non cambia il ciclo (principio Open-Closed).

D: Perché una classe abstract è meglio dei "corpi vuoti" (metodi che ritornano 0)?
R: Con i corpi vuoti dimenticare un override dà un errore logico silente; con `abstract` diventa errore di sintassi intercettato dal compilatore.

D: Regole delle classi astratte.
R: Non istanziabile; un metodo abstract (senza corpo) obbliga la classe a essere abstract; può avere metodi concreti e costruttori (chiamati con super); una sottoclasse è concreta solo se implementa TUTTI i metodi astratti ereditati.

D: Area e perimetro di cerchio, rettangolo, trapezio, PolReg.
R: Cerchio `PI*r*r`, `2*PI*r`. Rettangolo `b*h`, `2(b+h)`. Trapezio `(bm+BM)*h/2`, `2*lato()+bm+BM` (lato obliquo con Pitagora). PolReg `n*(lato*apotema/2)`, `lato*n` con apotema `r*cos(PI/n)`, lato `2*r*sin(PI/n)`.

D: Scrivi maxArea(Figura[] v) e spiega perché funziona.
R: `int m=0; for(i...) if (v[i].area() > v[m].area()) m = i; return v[m];` Funziona su qualunque figura grazie al dynamic binding.

D: Interfaccia vs classe astratta: attributi, costruttori, ereditarietà.
R: Interface: solo costanti (`public static final`), niente costruttori, firme (o default), ereditarietà multipla (`implements I,J`). Abstract class: attributi di istanza e classe, costruttori, metodi concreti/astratti, ereditarietà singola. [DA VERIFICARE: metodi statici ammessi in entrambe, da confermare con la versione Java del corso.]

D: Diamond problem con interfacce: C implementa I e J con lo stesso m().
R: Non c'è ambiguità: C deve fornire la propria versione di m().

D: Semantica del risultato di `compareTo`.
R: Negativo: x precede y; 0: equivalenti; positivo: x segue y. Si implementa con `class C implements Comparable<C>`.

D: Cosa abilita Comparable e quale requisito ha binarySearch?
R: Abilita `Arrays.sort` e `Arrays.binarySearch`; quest'ultima richiede l'array GIA' ordinato secondo compareTo.

D: Bottle: compareTo e cosa ignora?
R: `return this.level - b.level;` Conta solo il livello; la capacità è ininfluente.

D: Perché `Tree<T extends Comparable<T>>`?
R: Senza il vincolo non si potrebbe chiamare compareTo. `extends` vale anche per le interfacce. `Tree<NonOrdinabile>` = errore di compilazione; `Tree<Contact>` richiede `Contact implements Comparable<Contact>`.

D: Regola generale di cast con interfacce: quando `(C) obj` compila?
R: Se esiste un tipo E con E <: C ed E <: tipo apparente (con un'interfaccia coinvolta E può esistere); a runtime serve che il tipo vero sia <: C. Esempio: `(Colore) obj` con obj tipo apparente Punto2Dim compila (potrebbe esistere Punto2DimColorato) ma dà ClassCastException se obj è un Punto2Dim semplice.

D: equals(Object) vs equals(Animal): override o overload?
R: `equals(Object)` è override: binding dinamico, richiede instanceof + downcast. `equals(Animal)` è overload: metodo diverso scelto staticamente dal tipo apparente dell'argomento.

D: Scrivi lo scheletro di un equals corretto per Animal.
R: `@Override public boolean equals(Object o){ if(!(o instanceof Animal)) return false; Animal a=(Animal)o; ... confronto dei campi ... }`

## 05 - Alberi di ricerca

D: Invariante del BST e requisito sugli elementi.
R: Sinistra < radice < destra, senza duplicati; serve un ordine totale (Comparable). La ricerca scarta metà albero a ogni confronto: $O(\log n)$ nel caso medio.

D: Perché Leaf al posto di null in Tree/Leaf/Branch?
R: Elimina i null-check: grazie al dynamic binding ogni chiamata trova un oggetto che sa rispondere e il caso base si scrive nella Leaf. Le Leaf possono essere una sola istanza condivisa con più riferimenti.

D: Struttura delle classi del modello ad albero.
R: `abstract class Tree` con sottoclassi `Leaf` (albero vuoto, nessun dato) e `Branch` (campi elem, left, right). Interfaccia: empty, max, contains, insert, remove, toString (con `protected abstract toStringAux`).

D: contains(x) in Branch e in Leaf?
R: Branch: confronto con compareTo: 0 trovato, negativo a sinistra, positivo a destra. Leaf: false.

D: max() in Branch e in Leaf?
R: Branch: se `right` è Leaf il massimo è `elem`, altrimenti `right.max()`. Leaf: lancia un'eccezione (`MaxSuAlberoVuoto`); il `throw` rende superfluo il return.

D: Perché `t = t.insert(x)` e non `t.insert(x)`?
R: insert restituisce l'albero aggiornato (la radice può cambiare, es. da Leaf a Branch). Ignorare il valore lascia un albero obsoleto o errato. Vale anche per remove.

D: remove(x) con due figli: come si procede?
R: Si sostituisce l'elemento con `left.max()` e poi `left = left.remove(left.max())` per eliminare il duplicato creato. [DA VERIFICARE: il codice di remove è ricostruito; il caso con un solo figlio Leaf non è descritto esplicitamente (logicamente si restituisce l'altro sottoalbero).]

D: Dipendenza della forma del BST dall'ordine di inserimento.
R: Interi crescenti = catena a destra; stringhe decrescenti = catena a sinistra; valori di Random.nextDouble = albero circa bilanciato (solo allora $O(\log n)$ è realistica).

D: Ordine e uso delle quattro visite.
R: Pre (R,SX,DX): clonazione. In (SX,R,DX): BST in ordine crescente. Post (SX,DX,R): valutazione di espressioni. Per livelli (BFS): giochi come gli scacchi.

D: Visite di t = Branch(1, Branch(2,L,L), Branch(3, L, Branch(72, L, Branch(9,L,L)))).
R: Pre: 1 2 3 72 9. In: 2 1 3 72 9. Post: 2 9 72 3 1. Livelli: 1 | 2 3 | 72 | 9.

D: leavesAt(n): scrivilo per Leaf e Branch e calcola i valori sull'albero t di prima.
R: Leaf: `n==0 ? 1 : 0` (la foglia è l'albero vuoto). Branch: `n==0 ? 0 : left.leavesAt(n-1) + right.leavesAt(n-1)`. Su t: leavesAt(0)=0, (1)=0, (2)=3, (3)=1, (4)=2, (5)=0.

D: livello(int path): come funziona?
R: Restituisce il valore del nodo se `path==0`, altrimenti delega ai figli con `path-1`.

D: detach(x): perché il confronto deve essere null-safe e come si scrive?
R: Non si può chiamare `x.equals` con x null: `x == null ? elem == null : x.equals(elem)`. Va controllato x != null prima di x.equals (ordine del cortocircuito). Se non c'è nulla da staccare si restituisce `this`; la Leaf restituisce se stessa (condivisione, spirito Flyweight).

D: Esercizio: al Check Point 1 quante Leaf nello heap e quanti riferimenti?
R: Una sola Leaf, con 5 riferimenti che puntano ad essa.

## 06 - Eccezioni e design pattern

D: Perché le eccezioni sono meglio di assert e valori speciali?
R: Assert è disattivo di default, i valori come -1 sono ambigui. L'eccezione è un oggetto che segnala l'errore "fuori banda" lasciando il ritorno al risultato vero, e porta stato (getMessage, campi custom).

D: Disegna la gerarchia delle eccezioni.
R: Throwable -> Error (irrecuperabili: VirtualMachineError, AssertionError) ed Exception. Exception -> checked + RuntimeException (radice delle unchecked).

D: Checked vs unchecked: cause, obbligo del compilatore, esempi.
R: Checked: cause esterne (I/O, rete, input), obbligo try-catch o throws (IOException, FileNotFoundException, DenZeroException). Unchecked: bug di programmazione, nessun obbligo (NPE, ArithmeticException, ClassCastException, NumberFormatException, IndexOutOfBounds, IllegalArgument/StateException).

D: Differenza tra `throw` e `throws`.
R: `throw` è l'istruzione che lancia l'eccezione; `throws` è la clausola nella firma, un contratto verso il chiamante.

D: Ruolo di try, catch, finally.
R: try racchiude il codice a rischio; catch interviene se il tipo è compatibile; finally è sempre eseguito (pulizia risorse).

D: Regole di buon uso dei catch.
R: Non catturare Throwable; mai catch vuoto (swallowing); ordinare i catch dal più specifico al più generico, altrimenti gli specifici sono irraggiungibili.

D: Quale eccezione lanciano `1/0`, `Integer.parseInt("ciao")`, `a[10]` con `a = new int[10]`, `obj.toString()` con obj null, `(Float)"ciao"`?
R: ArithmeticException; NumberFormatException; ArrayIndexOutOfBounds (IndexOutOfBounds); NullPointerException; ClassCastException (da prevenire con instanceof).

D: Scrivi lo schema del ciclo di recupero.
R: `while(!done){ try{ ...leggi/elabora...; done=true; } catch(Eccezione e){ segnala errore e richiedi } }`

D: Quando sostituire assert con eccezioni?
R: Quando il controllo riguarda l'API pubblica: IllegalArgumentException / IllegalStateException fanno rispettare il contratto verso i client (es. quantità negativa in Bottle); assert resta per controlli interni di debug.

D: Static factory method: cosa risolve (Frazione)?
R: Costruttore `private` e `public static Frazione create(int n, int d) throws DenZeroException`. Se la validazione fallisce l'oggetto non viene creato: ogni istanza esistente è ben formata.

D: Come si definisce una custom exception?
R: Estendendo Exception (checked, obbliga la gestione) o RuntimeException (errore prevenibile), con costruttore `super(msg)`; può avere stato (DenZeroException con campo den e getter).

D: Perché in `Leaf.max()` con `throw new MaxSuAlberoVuoto();` non serve il return?
R: Il throw è un terminal path (bottom type): il metodo non può proseguire.

D: Cos'è un design pattern e i suoi quattro elementi? Classificazione GoF?
R: Soluzione generale a un problema ricorrente: nome, problema, soluzione, conseguenze. Categorie GoF: creazionali, strutturali, comportamentali.

D: Singleton: struttura, lazy initialization, variante.
R: Costruttore private, istanza in attributo statico privato, `getInstance()` la crea alla prima richiesta (`if(instance==null) instance=new Database();`). Variante: Multiton (n istanze predefinite). L'unicità si verifica con hashCode() identico.

D: Composite: ruoli e comportamento di add() su una foglia.
R: Component (astratta, interfaccia comune; add/remove di default lanciano SinglePartException), Composite (aggrega i figli e delega), Leaf (atomico). add() su una foglia lancia l'eccezione. Esempio: Computer = MainSystem + Monitor + Tastiera. [DA VERIFICARE: il doc usa Vector, all'esame può bastare qualsiasi lista.]

D: State: problema risolto, ruoli e transizioni dell'orologio.
R: Evita cascate di if/else sullo stato (rigide, contrarie all'estendibilità) delegando all'oggetto stato corrente. Context (Clock) + stati concreti che chiamano `clock.setState()`. MODE: Normal -> UpdatingHr -> UpdatingMin -> Normal; CHANGE: accende la luce / ore++ / minuti++.

D: Come si combinano State e Singleton?
R: Gli stati sono singleton (`newInstance(Clock c)` con lazy init) per non ricreare oggetti a ogni transizione.

D: Categoria e scopo di Singleton, Composite, State, Iterator.
R: Singleton: creazionale, unicità. Composite: strutturale, parte/tutto uniforme. State: comportamentale, comportamento per stato. Iterator: comportamentale, attraversamento disaccoppiato dall'aggregato.

## 07 - Esercizi tipo scritto e orale

D: Es. 2: classi A, B (astratta), C. Perché `A obj2 = new B();` non compila?
R: B è astratta e non istanziabile.

D: Es. 2: `A obj3 = new C(); obj3.m1();` cosa stampa?
R: `C.m1` e poi `B.m1` (tramite `super.m1()`): binding dinamico dal tipo vero C.

D: Es. 2: perché `A obj4 = new C(); obj4.m2(obj4);` non compila?
R: Il tipo apparente A non ha m2: il compilatore controlla solo il tipo apparente.

D: Quando è corretto togliere un metodo m2() da una classe B?
R: Solo se nessuna chiamata a m2 usa B come tipo apparente.

D: Es. 5 (interfacce): `obj4.m1(obj4);` perché è un errore, e `((D) obj2).m2();`?
R: Errore perché il tipo apparente di obj4 è C, non J (non compatibile col parametro). `((D) obj2).m2();` è corretto e stampa `D.m2` e `D.m1`.

D: Metodo in quattro passi per risolvere un esercizio di tipi.
R: (1) il metodo esiste nel tipo apparente? (2) l'argomento è compatibile col tipo apparente del parametro? (3) a runtime si risale dal tipo vero; (4) cast: compilazione con la regola del sottotipo comune, runtime con il tipo vero.

D: Scrivi inComune(p,q): true se esiste un indice con lo stesso elemento nelle due liste.
R: `if(p==null || q==null) return false; return p.getElem()==q.getElem() || inComune(p.getNext(), q.getNext());` (ricostruito dalla specifica). Es.: [1,2],[2,1] -> false; [1,2,3],[3,2,1] -> true.

D: reverse(prev) su Cons/Nil: cosa fa e cosa c'è nello stack quando si raggiunge Nil?
R: Inverte in-place con `this.next = prev`, senza creare nodi. Raggiunta Nil lo stack ha 3 record: Cons.reverse(1,..), Cons.reverse(2,..), Nil.reverse() in cima. [DA VERIFICARE: codice di Cons/Nil non incluso nel doc.]

D: ProvaOver: `a.equals(b)` con a,b di tipo apparente Animal (contenuto uguale)?
R: false: overload `equals(Animal)` scelto staticamente (secondo gli appunti).

D: ProvaOver: `c.equals(d)` con c,d di tipo apparente Object e tipo vero Animal?
R: true: override `equals(Object)` via binding dinamico.

D: ProvaOver: `e.equals(d)` con e di tipo vero Object, e `d.equals(e)`?
R: Entrambe false: la prima usa equals di Object (indirizzi); la seconda usa l'override ma `e instanceof Animal` è false.

D: Prova Comparable: come ordinare e cercare un Bottle[]?
R: `Arrays.sort` (compareTo sul livello), poi `Arrays.binarySearch` solo sull'array già ordinato.

D: Orale: perché un getter può rompere l'incapsulamento?
R: Se restituisce il riferimento a un campo mutabile (security leak): il client ottiene un alias e altera lo stato privato. Difesa: copia difensiva.

D: Orale: cosa risolve il pattern Iterator rispetto a `for + get(i)`?
R: Evita il costo $O(n^2)$ (get(i) è $O(i)$): il cursore ricorda dove si è arrivati, scansione $O(n)$.
