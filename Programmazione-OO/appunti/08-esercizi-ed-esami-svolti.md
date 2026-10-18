# 08 - Esercizi ed esami svolti (esercizi d'esame 23-24, quiz di laboratorio, esame di laboratorio)

Fonte: Moodle di Principi di Programmazione Orientata agli Oggetti 2025/26, cartelle `_moodle-raw/Programmazione-OO/POO-B` (teoria) e `.../POO-LAB` (laboratorio). Il materiale con funzione di esercizio è: **(1)** i sei file Java `Esercizio1..6.java` dell'archivio `23-24-Esercizi di esame-…zip` (sono gli esercizi della lezione 23-24, con la soluzione scritta nei commenti, ma **senza il testo delle domande**: nei file ci sono solo codice e risposte); **(2)** tre quiz di laboratorio con le soluzioni e le spiegazioni del docente (`Soluzioni Quiz gerarchia.pdf`, `Soluzioni Questionario Upcast e Downcast.pdf`, `Soluzioni Quiz Binding Dinamico e Cast.pdf`); **(3)** il testo d'esempio dell'esame di laboratorio (`esercizi esame laboratorio PPOO.pdf`, "Banca") con il codice della cartella `- Codice Cartella` (`BankAccount`, `BankAccountProfit`, `BankAccountMinors`, `TestBankAccount`); **(4)** `confronto array C Java.pdf` (già riassunto nel file 01 §6); **(5)** due file di esperimenti, `TestSuper.java` e `NodeUtilExtra.java`. Tutto il codice Java di questo file è stato **compilato ed eseguito** con javac/java 17: le uscite riportate sono quelle reali. Sono invece escluse perché non leggibili le "Note iPad" (scrittura a mano, riconoscimento del testo inservibile) e non riletti riga per riga i codici di lezione (vedi in fondo). Non esistono temi d'esame datati per la teoria: ne resta un esempio senza data nella sezione 1.

## Mappa

- [0. Che cosa c'è e cosa manca](#0-che-cosa-cè-e-cosa-manca)
- [1. Gli esercizi d'esame della lezione 23-24](#1-gli-esercizi-desame-della-lezione-23-24)
- [2. Quiz di laboratorio: gerarchie, cast, binding dinamico](#2-quiz-di-laboratorio-gerarchie-cast-binding-dinamico)
- [3. Esame di laboratorio: la banca](#3-esame-di-laboratorio-la-banca)
- [4. Esperimenti "cosa stampa?"](#4-esperimenti-cosa-stampa)
- [Cosa resta da integrare](#cosa-resta-da-integrare)
- [Dubbi](#dubbi)

## 0. Che cosa c'è e cosa manca

Teoria: [07 Esercizi tipo scritto e orale](07-esercizi-tipo-scritto-orale.md).

Il file 07 segnalava due lacune: nessun testo d'esame passato e nessuna dispensa di laboratorio oltre il Lab 1. Il Moodle riempie solo in parte la prima: la **lezione 23-24 "Esercizi di esame"** contiene sei esercizi che hanno il formato di un esame (liste, gerarchie e cast, alberi, interfacce, liste con reverse), ma sono distribuiti come file `.java` senza il testo originale delle domande; le domande si ricavano dai commenti ("DOM1…DOM4", "Domanda 2, 3, 4", "CHECK POINT"). Per il laboratorio il testo d'esempio indica che l'esame di laboratorio vale "31 punti (30 e lode), sufficienza con 18" ed è uno scritto in Java con una classe di test fornita dal docente. Non risultano né un calendario d'esame né la composizione del voto: la parte da verificare con il docente.

## 1. Gli esercizi d'esame della lezione 23-24

Fonte: `POO-B/generale/23-24-Esercizi di esame-…-001.zip`, file `Esercizio1.java … Esercizio6.java`. I commenti sono quelli del docente; le uscite sono state ottenute eseguendo i file.

### Esercizio 1 - `inComune` su liste generiche

Teoria: [03 Liste concatenate](03-array-estendibili-liste-iterator.md#2-node-e-dynamicstack-lez-09-10), [04 Generici](04-generici-ereditarieta-polimorfismo-interfacce.md#1-generici-lez-11).

La classe `Node<T>` ha un elemento e un riferimento al nodo successivo. Si chiede un metodo statico generico `inComune(p, q)` che dica se due liste su `T` hanno **almeno un elemento in comune nella stessa posizione**, supponendo che nessun elemento sia `null` e usando `x.equals(y)` per il confronto. La soluzione è ricorsiva sul parallelismo delle due liste: se una delle due è vuota (`null`) non ci sono elementi in comune e si restituisce `false`; altrimenti si confrontano le teste e si ricorre sulle code, con il corto circuito `x.equals(y) || inComune(l, m)`:

```java
public static <T> boolean inComune(Node<T> p, Node<T> q) {
  if (p == null || q == null) return false;
  T x = p.getElem(), y = q.getElem();
  return x.equals(y) || inComune(p.getNext(), q.getNext());
}
```

Il `main` del file costruisce le stringhe con `"b" + i` (non letterali) per mostrare che si deve usare `equals` e non `==`: con p = {"a", "bi"}, q = {"bi", "bi"}, r = {"bi", "c"} le tre chiamate stampano `inComune(p,q) = true` (posizione 1), `inComune(q,r) = true` (posizione 0) e `inComune(r,p) = false`.

### Esercizio 2 - Classi astratte, tipo apparente e tipo esatto

Teoria: [04 Tipo apparente/esatto](04-generici-ereditarieta-polimorfismo-interfacce.md#3-tipo-apparente-esatto-e-binding-dinamico-lez-14-15), [Classi astratte](04-generici-ereditarieta-polimorfismo-interfacce.md#4-classi-astratte-lez-16).

Le classi sono: `A` astratta con `m1()` astratto; `B` astratta che estende A, implementa `m1()` (stampa "B.m1") e dichiara `m2(A)` astratto; `C` concreta che estende B, ridefinisce `m1()` (stampa "C.m1" e chiama `super.m1()`) e implementa `m2(A obj)` (stampa "B.m2" e chiama `obj.m1()`). Le quattro domande del file sono: **(DOM1)** eliminare `m2` in B produce errori nelle classi A, B, C? No, perché in A, B, C non c'è nessuna chiamata a `m2` con tipo apparente B (se ci fosse un `b.m2(a)` con `b` di tipo B, l'errore ci sarebbe). **(DOM2)** `A obj2 = new B(); obj2.m1();` produce errore di compilazione: "B is abstract; cannot be instantiated", perché si tenta di usare il costruttore di una classe astratta. **(DOM3)** `A obj3 = new C(); obj3.m1();` è corretto: il tipo apparente A contiene `m1()`, il tipo esatto è C e il binding dinamico chiama `C.m1`, che stampa "C.m1" e poi, con `super.m1()`, "B.m1". L'uscita eseguita è `C.m1` / `B.m1`. **(DOM4)** `A obj4 = new C(); obj4.m2(obj4);` produce "cannot find symbol: method m2(A) in variable obj4 of type A", perché `m2` esiste in C (tipo esatto) ma non nel tipo apparente A, e il compilatore guarda solo quello.

### Esercizio 3 - Alberi binari di ricerca, quanti `CHECK POINT 2`

Teoria: [05 Struttura](05-alberi-di-ricerca.md#1-struttura), [05 Esempio svolto](05-alberi-di-ricerca.md#4-esempio-svolto-testtree).

`Tree` è astratta con `insert(int)`; `Leaf.insert(e)` restituisce `new Branch(e, this, this)` (le due foglie del nuovo ramo sono la **stessa** `Leaf`); `Branch.insert` stampa "CHECK POINT 2", ricorre a sinistra se `elem` è minore, a destra se maggiore, ignora i duplicati e restituisce `this`. Il `main` fa `t = new Leaf(); t = t.insert(3); t = t.insert(1); t = t.insert(4); t = t.insert(2)` e stampa "CHECK POINT 1" alla fine. **Risultato eseguito: "CHECK POINT 2" quattro volte, poi "CHECK POINT 1".** Il motivo: insert(3) su Leaf non stampa nulla (crea la radice); insert(1) entra in `Branch.insert` una volta (radice); insert(4) una volta; insert(2) due volte (radice e poi il ramo con 1). Totale 1 + 1 + 2 = 4. Al "CHECK POINT 1" l'albero è radice 3 con sinistra 1 (che ha 2 a destra) e destra 4; nello heap c'è **un'unica `Leaf`** e **cinque riferimenti** puntano a lei (la sinistra del ramo 1, le due foglie di ogni ramo 2 e 4: 1 + 2 + 2), il che conferma quanto già annotato nel file 07C. Il motivo per cui la chiamata è `t = t.insert(x)` è che una `Leaf` non può "diventare" un ramo: deve restituirne uno nuovo.

### Esercizio 4 - `detach` su un albero generico

Teoria: [05 Generico](05-alberi-di-ricerca.md#5-generico), [05 Algoritmi](05-alberi-di-ricerca.md#2-algoritmi).

`Tree<T>` ha `detach(T x)`; `Leaf.detach` restituisce `this`; `Branch.detach(x)` controlla se l'elemento del ramo coincide con x, **gestendo il null**: `(x == null && elem == null) || (x != null && x.equals(elem))` (il controllo `x != null` viene *prima* di `x.equals`, per non lanciare `NullPointerException`); se coincide restituisce una nuova `Leaf` (cioè **stacca tutto il sottoalbero** radicato in quel ramo, non solo il nodo), altrimenti ricorre su entrambi i figli e restituisce `this`. Con l'albero t = ( leaf 2 ( ( leaf 1 leaf ) -3 leaf ) ) i risultati eseguiti sono: `t.detach(-3)` = ( leaf 2 leaf ) (il ramo −3 e il suo figlio 1 spariscono); con u, dove la radice contiene `null`, `u.detach(1)` = ( leaf null ( leaf -3 leaf ) ) (sparisce solo il ramo con 1); `v.detach(10)` lascia v invariato.

### Esercizio 5 - Interfacce, upcast e cast

Teoria: [04 Interfacce](04-generici-ereditarieta-polimorfismo-interfacce.md#5-interfacce-comparable-generici-vincolati-lez-19-20).

`I` ha `m1(J)`, `J` ha `m2()`, `C` è astratta e implementa I, `D` estende C e implementa J; `D.m1(J obj)` fa `if (this != obj) obj.m2();` e stampa "D.m1"; `D.m2()` stampa "D.m2" e chiama `m1(this)`. **Domanda 2:** `I obj2 = new D(); ((D) obj2).m2();` compila (D è inclusa in I, il cast verso D è lecito) e stampa `D.m2`, poi `D.m1` (in `m1(this)` vale `this == obj`, quindi non richiama `m2`). **Domanda 3:** `J obj3 = new D(); C x = (C) obj3; x.m1(new D());` compila (J e C hanno D in comune, quindi il cast è accettato) e stampa **`D.m2`, `D.m1`, `D.m1`**: `x.m1(arg)` con `this != arg` chiama `arg.m2()`, che stampa "D.m2" e chiama `m1(this)` (stampa "D.m1"), poi si torna alla `m1` iniziale che stampa il proprio "D.m1"; la stessa `m1` compare due volte sullo stack. **Domanda 4:** `C obj4 = new D(); obj4.m1(obj4);` non compila ("no suitable method found for m1(C)"), perché `obj4` ha tipo apparente C, minore di I ma non di J, mentre `m1` si aspetta un `J`; invece `obj4.m1((J) obj4)` è corretto (C e J hanno D in comune e a runtime obj4 è un D).

### Esercizio 6 - `reverse` su lista Cons/Nil

Teoria: [03 Liste](03-array-estendibili-liste-iterator.md), [07 Liste (B)](07-esercizi-tipo-scritto-orale.md#b-liste-es-1-e-6).

L'interfaccia `MyList` ha `reverse(MyList prev)` e `print()`; `Nil.reverse(prev)` stampa "CHECK POINT 2" e restituisce `prev`; `Cons.reverse(prev)` salva `next`, riorienta `this.next = prev` e richiama `next.reverse(this)`: l'inversione è **in-place**, senza creare nodi. Con `l = Cons(1, Cons(2, Nil))`, `l.print()` stampa 1 e 2 (poi una riga vuota dal `Nil.print`); poi viene stampato "CHECK POINT 1", si esegue `l = l.reverse(new Nil())` e si ottengono (in questo ordine) "CHECK POINT 2" e la lista invertita 2, 1. Al "CHECK POINT 2" lo stack contiene `main`, `Cons.reverse` (nodo 1), `Cons.reverse` (nodo 2) e `Nil.reverse` in cima. La ricorsione è "di coda" (l'ultima operazione di `Cons.reverse` è la chiamata ricorsiva), perciò l'inversione si potrebbe fare anche con un ciclo.

## 2. Quiz di laboratorio: gerarchie, cast, binding dinamico

Teoria: [04 Tipo apparente/esatto e binding dinamico](04-generici-ereditarieta-polimorfismo-interfacce.md#3-tipo-apparente-esatto-e-binding-dinamico-lez-14-15), [04 Ereditarietà](04-generici-ereditarieta-polimorfismo-interfacce.md#2-ereditarietà-lez-12-13).

Tre quiz Moodle a risposta multipla, con le risposte corrette già indicate dal docente (le ho riprodotte e ne ho controllato a mano il ragionamento; molte righe di binding le ho anche eseguite). Le regole che servono a tutti i quesiti sono tre. **Upcast** (verso la superclasse) è implicito e sempre lecito; **downcast** (verso la sottoclasse) richiede il cast esplicito e può fallire a runtime. Il compilatore ammette un cast da X a Y solo se X e Y stanno nella **stessa catena di ereditarietà** (uno è antenato dell'altro); due classi "sorelle" (nessuna estende l'altra) non si convertono l'una nell'altra neanche con il cast, e questo si vede già alla compilazione. Se il cast compila, la `ClassCastException` dipende dal **tipo reale** dell'oggetto a runtime, e `instanceof` verifica proprio quel tipo reale prima del cast.

**Quiz "ricostruire la gerarchia" (20 domande).** Da un'istruzione che compila o no, o lancia eccezione, si deduce la relazione fra le classi.

| # | Codice | Esito dato | Conclusione |
|---|---|---|---|
| 1 | `B b = new A();` compila senza cast | upcast | A extends B |
| 2 | `A a = new B();` compila senza cast | upcast | B extends A |
| 3 | `A a = new A(); B b = (B) a;` compila, ClassCastException | B è nella gerarchia ma l'oggetto è un A | B extends A |
| 4 | `A a = new B(); B b = (B) a;` funziona | upcast e poi downcast corretto | B extends A |
| 5 | `B b = (B) new A();` non compila | cast non ammesso | A e B non nella stessa gerarchia |
| 6 | `Object o = new A(); B b = (B) o;` compila, ClassCastException | il cast da Object compila sempre; l'oggetto non è un B | B compatibile ma l'oggetto reale non è un B |
| 7 | `Object o = new B();` senza cast | upcast a Object | B extends Object (vale per ogni classe) |
| 8 | `Object o = new B(); A a = (A) o;` senza eccezioni | | è coerente B extends A |
| 9 | `A a = new C(); B b = (B) a;` compila, ClassCastException | C non è un B | B e C sorelle sotto A |
| 10 | `A a = new B(); C c = (C) a;` non compila | | C non è nella gerarchia di A |
| 11 | `B b = null; A a = b;` compila | conta il tipo della variabile, non il valore | B extends A |
| 12 | `A a = (A) new B();` compila | upcast scritto esplicitamente (ridondante) | B extends A |
| 13 | `A a = new D(); B b = (B) a;` funziona | | D extends B e B extends A |
| 14 | `A a = new D(); C c = (C) a;` compila, eccezione | | D e C sotto A, D non è un C |
| 15 | `if (a instanceof C) { C c = (C) a; }` con `A a = new B();` entra solo a volte | | C superclasse di B, o coincide con B |
| 16 | `B b = new A();` non compila, resa valida da `(B) new A()` | | si aggiunge il cast e B extends A (poi a runtime fallirebbe) |
| 17 | `Object o = new C(); B b = (B) o;` compila, fallisce | | o contiene un oggetto non compatibile con B |
| 18 | `A a = new B(); Object o = a;` | sempre valido | sequenza di upcast |
| 19 | `A a = new B(); D d = (D) a;` compila | | D extends A (non garantisce che riesca) |
| 20 | `A a = new B(); B b = a;` errore, ok con `(B) a` | | è un downcast: il cast esplicito è obbligatorio |

**Quiz "Upcast e Downcast" (18 domande)**, con B sottoclasse di A, C sorella di B sotto A, e D sottoclasse di B. 1. `B b = new B(); A a = b;`: upcast corretto. 2. `A a = (A) b;`: corretto ma il cast è inutile. 3. `A a = new B(); B b = (B) a;`: downcast corretto. 4. `A a = new A(); B b = (B) a;`: `ClassCastException` a runtime. 5. `B b = new B(); C c = (C) b;`: **errore di compilazione** (B e C sono classi sorelle). 6. `A a = new B(); C c = (C) a;`: compila, `ClassCastException` a runtime. 7. `A a = new D(); B b = (B) a;`: downcast corretto (D estende B). 8. `A a = new D(); D d = (D) a;`: downcast corretto. 9. `A a = new B(); D d = (D) a;`: `ClassCastException` (un B non è un D). 10. `D d = new D(); A a = d;`: upcast corretto anche con più livelli. 11. `B b = new B(); Object o = b;`: upcast a Object. 12. `Object o = new B(); B b = (B) o;`: downcast corretto. 13. `Object o = new A(); B b = (B) o;`: `ClassCastException`. 14. `if (a instanceof B) { B b = (B) a; }`: lo scopo dell'`instanceof` è evitare la `ClassCastException`. 15. Con `A a = new B();` e `f()` definito solo in B, compila `((B) a).f();` (non `a.f()`, perché il compilatore guarda il tipo A, né `((A) a).f()`). 16. `A a = new B(); B b = a;`: errore di compilazione (downcast senza cast). 17. `D d = new D(); A a = d; B b = (B) a;`: tutto corretto (upcast e poi downcast valido perché l'oggetto è D). 18. `B b = new B(); A a = b; D d = (D) a;`: `ClassCastException` (l'oggetto resta un B anche se la variabile è di tipo A).

**Quiz "Binding dinamico e cast" (13 domande).** Con `class A { String who() {return "A";} }` e `class B extends A { String who() {return "B";} }`: 1. `A x = new B(); x.who()` stampa **B** (binding dinamico: conta il tipo reale). 2. `Cane c = new Cane(); Animale a = c;` è un upcast implicito. 3. Per chiamare `apriBagagliaio()` (solo in Auto) su un `Veicolo v = new Auto()` serve `((Auto) v).apriBagagliaio()`. 4. Con un campo `nome` ridefinito in B (`"A"` in A, `"B"` in B) e `A x = new B()`, `x.nome + " " + x.who()` stampa **A B** (i campi non sono polimorfici: vale il tipo del riferimento; i metodi di istanza si scelgono sul tipo reale). 5. Il binding dinamico riguarda i metodi di istanza ridefiniti (non i campi, né i metodi statici, né i costruttori). 6. Con metodi statici `m()` in A e in B, `A x = new B(); x.m()` stampa **A**: i metodi statici si risolvono a compile-time sul tipo del riferimento (non c'è override, c'è *hiding*). 7. `x.f()` e `((B) x).g()` stampano **B G**. 8. `f()` di istanza e `g()` statico: `x.f() + " " + x.g()` stampa **B A**. 9. Con un campo `nome` ridefinito e `f()` ridefinito che restituisce `nome`, `A x = new B(); x.f()` stampa **B** (dentro `B.f()` il campo è quello di B). 10. Le variabili usano *hiding* e binding statico. 11. Con costruttori che stampano "A" e "B", `new B()` stampa **AB** (il costruttore della superclasse viene eseguito per primo, con un `super()` implicito). 12. Se `A` ha solo `A(int x)` e `B() {}` non chiama `super(x)`, c'è un **errore di compilazione** (non esiste `super()` senza argomenti). 13. Con `B() { this(5); print("B"); }`, `B(int x) { print("C"); }` e `A()` che stampa "A", `new B()` stampa **ACB** (B() invoca B(int), che esegue prima `super()`). Le domande 1, 4, 6, 7, 8, 9 e 13 le ho eseguite: le uscite ("A B", "A", "B", "B A G", "ACB") coincidono con le risposte.

## 3. Esame di laboratorio: la banca

Teoria: [01 Incapsulamento](01-fondamenti-classi-memoria.md#3-incapsulamento-in-pratica-lez-03), [02 Costruttori](02-costruttori-equals-aggregati-uml.md#1-costruttori-lez-04), [02 Identità contro equivalenza](02-costruttori-equals-aggregati-uml.md#2-identità-vs-equivalenza), [04 Ereditarietà](04-generici-ereditarieta-polimorfismo-interfacce.md#2-ereditarietà-lez-12-13).

Fonte: `POO-LAB/generale/esercizi esame laboratorio PPOO.pdf`. Il testo definisce la **consegna generica** (una classe con una variabile statica, più attributi privati, due costruttori di cui uno senza argomenti che inizializzi un attributo con la variabile statica, get e set, `equals()` e `toString()`, un metodo di dominio, un metodo di dominio statico e, come domanda "advanced", una sottoclasse che ridefinisce metodi) e un **esempio** "Banca" da 31 punti (30 e lode, sufficienza 18) con una classe di test fornita dal docente. Si chiede una classe `BankAccount` con: una variabile statica intera `counter` che tiene l'identificatore del conto; tre attributi privati `id` (inizializzato con `counter`), `name` (String) e `total` (double); due costruttori (uno che inizializza `name` e `total`, l'altro solo `name`), con `counter` sempre incrementato; get per nome e liquidità e set solo per il nome; `equals()` e `toString()`; i metodi di dominio `deposit()` e `withdraw()` (che verifica la disponibilità e gestisce l'errore); il metodo statico `getNumAccounts()` che restituisce il numero di conti creati; e, per la parte "advanced", `BankAccountYoung` con un attributo `limit` (limite massimo per ogni prelievo) e la ridefinizione di `withdraw()`. Una soluzione che ho scritto e provato (compilata ed eseguita):

```java
class BankAccount {
  private static int counter = 0;
  private final int id; private String name; private double total;
  public BankAccount(String name, double total) { this.id = counter++; this.name = name; this.total = total; }
  public BankAccount(String name) { this(name, 0); }
  public String getName() { return name; }  public double getTotal() { return total; }
  public void setName(String name) { this.name = name; }
  public boolean deposit(double amount) { if (amount <= 0) return false; total += amount; return true; }
  public boolean withdraw(double amount) { if (amount <= 0 || amount > total) return false; total -= amount; return true; }
  public static int getNumAccounts() { return counter; }
  @Override public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof BankAccount)) return false;
    BankAccount b = (BankAccount) o;
    return name.equals(b.name) && total == b.total; }
  @Override public String toString() { return "BankAccount[id=" + id + ", name=" + name + ", total=" + total + "]"; }
}
class BankAccountYoung extends BankAccount {
  private double limit;
  public BankAccountYoung(String name, double total, double limit) { super(name, total); this.limit = limit; }
  @Override public boolean withdraw(double amount) { if (amount > limit) return false; return super.withdraw(amount); }
}
```

Provato con tre conti ("Pluto", 100; "Paperino"; "Pluto", 100), l'uscita è: `BankAccount[id=0, …] BankAccount[id=1, …]`, "Numero conti: 3", `a.equals(c): true, a==c: false`, deposito di 50 → 150, prelievo di 500 rifiutato, un `BankAccountYoung` con limite 100 rifiuta un prelievo di 150 e accetta uno di 80 (300 → 220). Punti di attenzione che il testo sottolinea: l'identificatore si prende da `counter` **prima** di incrementarlo; `equals` deve avere la forma `equals(Object)` (un `equals(BankAccount)` sarebbe un overload e non un override: file 04 §6); `withdraw` della sottoclasse può riusare `super.withdraw` dopo il controllo del limite. Il criterio di uguaglianza (qui nome e liquidità) non è fissato dal testo: potrebbe essere anche solo l'identificatore [DA VERIFICARE].

*Il codice allegato dal docente.* Nella cartella `- Codice Cartella` c'è una famiglia di classi simili ma **non identica** a quella dell'esempio: `BankAccount` (con `counter`, `id`, `owner`, `balance` protetto, `deposit` e `withdraw` che restituiscono boolean, `getCounter()` al posto di `getNumAccounts()`, nessun `equals`), `BankAccountProfit` (aggiunge un tasso `interest` e ridefinisce `deposit`, che accredita anche l'interesse percentuale) e `BankAccountMinors` (aggiunge un cointestatario e un limite di prelievo fisso di 100 in `withdraw`). L'esecuzione di `TestBankAccount.java` stampa i conti (con le `toString` a catena, per esempio "I am a BankAccountMinors. I am a BankAccountProfit. I am a BankAccount. Quo -- Balance: 300.0 -- Interests: 2 -- CoOwner: Paperino"), il contatore passa da 2 a 3 e a 4, e il deposito di 200 sul conto di Quo con interesse del 2% porta il saldo da 300 a 504 (200 + 200·2/100 = 204). La famiglia è un esempio di ereditarietà a più livelli (Profit estende BankAccount, Minors estende Profit) con `toString` che richiama `super`; il testo dell'esame di laboratorio ne è la versione ridotta.

## 4. Esperimenti "cosa stampa?"

Teoria: [04 Ereditarietà](04-generici-ereditarieta-polimorfismo-interfacce.md#2-ereditarietà-lez-12-13), [03 NodeUtil](03-array-estendibili-liste-iterator.md#3-nodeutil-metodi-statici-su-liste-lez-10).

**`TestSuper.java`** ("super è statico, a differenza di this"): `A` ha `meth()`, `B extends A` la ridefinisce e ha `other()` che fa `this.meth(); super.meth();`, `C extends B` ridefinisce `meth()` ma non `other()`. Eseguendo il test: `a.meth()` stampa "Meth of A", `b.meth()` "Meth of B", `c.meth()` "Meth of C", e `c.other()` stampa **"Meth of C" e poi "Meth of A"**: `this.meth()` è dinamico (l'oggetto è un C), mentre `super.meth()` dentro `B.other()` si riferisce sempre alla superclasse della classe *che contiene il metodo*, cioè A, anche se l'oggetto è un C. Se `C` ridefinisse `other()` con lo stesso corpo, `super` si riferirebbe a B e stamperebbe "Meth of B".

**`NodeUtilExtra.java`** (confronto di implementazioni): `max()` di una lista in versione iterativa, ricorsiva di coda (`maxTR`/`maxTRR`, con un parametro accumulatore) e ricorsiva non di coda (`maxNTR`, con `Math.max(testa, maxNTR(resto))`), e `ordered()` (lista crescente) in versione iterativa e ricorsiva di coda. `max` richiede lista non vuota (c'è un `assert`), mentre `ordered` restituisce `true` per la lista vuota. La differenza chiave è che nella versione di coda la chiamata ricorsiva è l'ultima operazione e il risultato si accumula "scendendo", mentre nella non di coda si calcola "risalendo" lo stack.

## Cosa resta da integrare

Letti: i sei file `Esercizio1..6.java` (compilati ed eseguiti), i tre PDF di quiz con soluzioni, il testo d'esame di laboratorio e le quattro classi bancarie con il loro test, `confronto array C Java.pdf`, `TestSuper.java` e `NodeUtilExtra.java` (letto in parte). **Non leggibili**: le undici "Note iPad" (appunti scritti a mano di lezione: il testo estratto è rumore; si capisce soltanto che toccano ArrayExt, liste, MiniLinkedList con Iterator, alberi `Tree/Leaf/Branch` e i pattern; non le ho usate). **Non riletti riga per riga**: gli archivi `CodiceLezione*` e `Codice_Lezione_*` (codice di lezione già coperto dagli appunti 01-06 per i casi di studio), `02-CatDemo`, `07-ContactDemo`, `08-ArrayExt`, `10-NodeUtil`, `13-DynamicStackExtends`, `16-TestFigura`, `17-Tree`, `19-…PuntoIntermittenteColorato`, `21-Eccezioni`, `22-PATTERN`, `AnotherFraction`, `OverrideOverloading`, e i circa cinquanta file `.java` della cartella `- Codice Cartella` di POO-LAB (ArrayDemo, DynamicQueue, Matrix, Rubrica, Casa, Elettrodomestico, Vacanza, List/Set…): sono codici didattici di laboratorio senza testo dell'esercizio. I quiz Moodle sono presenti solo come PDF di soluzioni. Nessun file con lo stesso nome risulta sovrascritto.

## Dubbi

- Il testo originale delle sei domande dell'esame non è nel Moodle (solo codice e commenti): le domande che ho attribuito agli esercizi 3, 4 e 6 sono dedotte dai commenti ("CHECK POINT") e dal file 07 [DA VERIFICARE].
- Non c'è un tema d'esame di teoria datato: la struttura dello scritto e la composizione del voto con l'orale vanno confermate con il docente; il testo di laboratorio dice 31 punti (30 e lode), sufficienza 18.
- Il criterio di `equals` di `BankAccount` e la gestione dell'errore in `withdraw` (booleano oppure eccezione) non sono fissati dal testo; la soluzione sopra ne sceglie uno.
