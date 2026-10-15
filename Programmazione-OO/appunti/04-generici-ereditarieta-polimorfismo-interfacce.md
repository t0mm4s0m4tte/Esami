# 04 - Generici, ereditarietà, binding dinamico, classi astratte, interfacce
Fonte: doc Appunti (Lez. 11-16, 18 [equals], 19-20).

## Mappa
- Generici (classi, metodi statici, raw type, erasure, autoboxing, bounded)
- Ereditarietà (extends, super, protected, override/hiding), assert vs if
- Tipo apparente/esatto, binding dinamico, sottotipo, cast, instanceof
- Classi astratte (Figura), interfacce (Comparable)
- equals: override vs overload

## 1. Generici (Lez. 11)
Il problema di partenza è la duplicazione: senza generici servono classi diverse per ogni tipo (PairIS, NodeInteger...) oppure una classe su Object con cast manuali, che spostano gli errori a runtime. I generici trasferiscono il controllo dei tipi al **compilatore**, che rifiuta gli usi scorretti prima dell'esecuzione.

```java
public class GenericPair<T,S> { private T first; private S second;
  public GenericPair(T f, S s){...}          // nel costruttore (definizione) niente <T,S>
  public T getFirst(){..} ... }
GenericPair<Integer,String> p = new GenericPair<>(10,"Mario");  // diamond
public static <T,S> GenericPair<S,T> inv(GenericPair<T,S> p){ return new GenericPair<S,T>(p.getSecond(), p.getFirst()); }
```

Dentro la classe T è "agnostico": non se ne sa nulla, quindi si possono usare solo i metodi di Object. Per un metodo statico generico i parametri `<T,S>` si dichiarano **prima** del tipo di ritorno; senza di essi il metodo degrada a `<Object,Object>`.

Esiste una via di fuga che conviene conoscere per capirne i rischi: il **raw type** (`GenericPair p = ...`), con cui il compilatore rinuncia ai controlli (solo un warning con `-Xlint`) e gli errori emergono a runtime. Si spiega con la **type erasure**: nel bytecode i generici diventano `Object`, scelta fatta per la retrocompatibilità con il codice pre-JDK 5. Un'altra conseguenza è che i primitivi non sono ammessi come parametri di tipo, quindi si usano i **wrapper** (`Integer`, `Double`, `Boolean`) con l'**autoboxing**, a costo di un oggetto nello heap per ogni boxing (overhead). Su queste basi si costruiscono `GenericNode<T>` e `GenericStack<T>`, in cui la pila memorizza *indirizzi* di oggetti (es. Integer).

## 2. Ereditarietà (Lez. 12-13)
L'ereditarietà permette di costruire una classe a partire da un'altra riusandone il comportamento. `extends` esprime una relazione IS-A asimmetrica: la sottoclasse eredita i membri public e protected (e package-private se è nello stesso package), mentre quelli **private** non sono accessibili. I costruttori non vengono **mai ereditati**.

Il comportamento ereditato si può modificare con l'**overriding** (metodi di istanza con la stessa firma; l'originale resta raggiungibile con `super.m()`), mentre l'**hiding** riguarda campi o metodi statici omonimi ed è sconsigliato. Quanto ai costruttori, `super(...)` deve essere la **prima istruzione**; se omessa, la JVM inserisce `super()`, che dà errore di compilazione se la superclasse non ha un costruttore senza parametri.

```java
class BottleWithCap extends Bottle { private boolean open;
  public BottleWithCap(int c){ super(c); open=false; }
  @Override public int add(int q){ if(open) return super.add(q); return 0; }
  @Override public String toString(){ return super.toString()+" (open = "+open+")"; } }
```

Tra private e public sta **protected**: visibile nel package e in tutte le sottoclassi. Si usa, ad esempio, per `top` in DynamicStack e per `lati` in Poligono.

Un caso di studio di invarianti che si sommano è la catena **DynamicStack -> DynamicStackMax -> DynamicStackSize**: ogni classe mantiene la propria invariante (stack LIFO; `max`; `size`) appoggiandosi alla superclasse. In Size, `push(n)` chiama `super.push` (Max aggiorna `max`, poi il `super.push` di DynamicStack crea il Node) e quindi fa `size++`. Nel `pop`, se l'elemento tolto coincide con il max, si chiama `resetMax()` (privato), che scorre tutti i nodi: è un trade-off tra memoria e tempo. Tutto avviene su un solo oggetto nello heap, che contiene tutti i campi (`#top`, max, size). La gerarchia Vehicle -> Car -> ElectricCar illustra invece l'utilità dei livelli intermedi, che evitano di replicare codice o di inquinare le classi.

Un'ultima distinzione riguarda gli errori. Si usa `if` per gli scenari leciti che cambiano il flusso (come `abs`), mentre `assert` serve per le condizioni che devono *sempre* essere vere, ossia dove la violazione è un errore del chiamante (come `sqrt` con x>=0). Restituire valori "robusti" (es. pop -> -1) è ambiguo, perché non distingue il risultato dall'errore; le **eccezioni** risolvono il problema (file 06). Un esercizio correlato sugli array "ragged": `ok(a)` controlla `a==null`, `a[i]==null` e `a[i].length < r` prima di verificare la simmetria `a[i][j]==a[j][i]`.

## 3. Tipo apparente/esatto e binding dinamico (Lez. 14-15)
Il cuore del polimorfismo in Java sta nella distinzione tra due tipi che una variabile oggetto possiede contemporaneamente. Il **tipo apparente** è quello dichiarato (`Bottle b`) e il compilatore controlla solo quello. Il **tipo vero (esatto)** è quello dell'oggetto creato con `new` (`BottleWithCap`) e la JVM lo usa a runtime.

Le due fasi rispondono a domande diverse. In compilazione il metodo deve esistere nel tipo apparente. In esecuzione la JVM parte dal tipo vero e risale la gerarchia fino alla versione più specifica del metodo: è il **dynamic binding**, base del polimorfismo per inclusione. Una conseguenza rassicurante: se il codice compila, un'implementazione eseguibile esiste.

La relazione di **sottotipo `<:`** è riflessiva, antisimmetrica e transitiva (un ordine parziale). Vale la **sostituibilità**: se C <: D, un C è utilizzabile dove serve un D, ma non il viceversa. Anche i primitivi seguono lo schema, con `int <: double` (upcast implicito, downcast esplicito con troncamento).

Il **downcast** `(C) obj` compila se C è compatibile con il tipo apparente; a runtime lancia `ClassCastException` se il tipo vero non è <: C. Se invece le gerarchie sono disgiunte l'errore è già in compilazione.

| caso | compila | runtime |
|---|---|---|
| tipo vero <: C | sì | ok |
| C <: tipo apparente ma tipo vero no | sì | ClassCastException |
| C e D disgiunti | no | - |

L'operatore **instanceof** completa il quadro: `obj instanceof C` è false se obj è null (un null-check implicito), ed è alla base del pattern *check-then-cast*.

Il polimorfismo rende il codice estendibile. In un array `Figura[]` con Quadrato e Cerchio, `figure[i].draw()` sceglie la versione giusta a runtime: aggiungere Triangolo non cambia il ciclo (principio **Open-Closed**). Nell'esempio Persona/Docente/Studente, `toString` è sovrascritto e usa `super.toString()`, mentre `nomeToString()` è definito solo in Persona e non viene mai sovrascritto.

## 4. Classi astratte (Lez. 16)
Quando una superclasse non sa dare un'implementazione sensata di un metodo (l'area di una "figura" generica), la soluzione ingenua dei "corpi vuoti" (metodi che ritornano 0) è fragile: dimenticare un override produce un errore logico silente. Con `abstract` l'errore diventa di **sintassi**, quindi il compilatore lo intercetta.

Le regole sono le seguenti:
- una classe abstract non è istanziabile;
- un metodo abstract (senza corpo) obbliga la classe a essere abstract;
- una classe abstract può avere metodi concreti e anche **costruttori** (richiamati con `super`);
- una sottoclasse è concreta solo se implementa **tutti** i metodi astratti ereditati.

La gerarchia di riferimento è: `Figura` (abstract: `area()`, `perimetro()`) -> `Cerchio` (raggio >= 0) e `Poligono` (abstract, lati >= 3) -> `Rettangolo` (`super(4)`), `Trapezio` (isoscele: `assert baseMinore>0 && baseMinore<=baseMaggiore && altezza>0`; lato obliquo con Pitagora, `Math.sqrt/pow`), `PolReg` (lati `protected` per `setLati`). Le formule sono raccolte qui:

| figura | area | perimetro |
|---|---|---|
| cerchio | `PI*r*r` | `2*PI*r` |
| rettangolo | `b*h` | `2(b+h)` |
| trapezio | `(bm+BM)*h/2` | `2*lato()+bm+BM` |
| PolReg | `n*(lato*apotema/2)` | `lato*n` |

Per PolReg: apotema `r*cos(PI/n)`, lato `2*r*sin(PI/n)`. Il bello di tutto questo emerge in `maxArea(Figura[] v)`, che con `if (v[i].area() > v[m].area()) m = i;` funziona su qualunque figura grazie al dynamic binding.

## 5. Interfacce, Comparable, generici vincolati (Lez. 19-20)
Un'interfaccia è il caso limite della classe astratta: dichiara solo cosa si sa fare, senza dire come. Si distingue dalla classe astratta nei punti seguenti.

| | interface | abstract class |
|---|---|---|
| attributi | solo costanti (`public static final`) | istanza e classe |
| costruttori | no | sì |
| metodi istanza | firme (o `default`) | concreti/astratti |
| statici | sì | sì |
| ereditarietà | multipla (`implements I,J`) | singola |

L'ereditarietà multipla di interfacce non crea il "diamond problem": se C implementa I e J con lo stesso `m()`, C deve fornirne la propria versione.

L'interfaccia più importante è `Comparable<T>`, con `int compareTo(T y)`: un risultato **negativo** significa che x precede y, **0** che sono equivalenti, **positivo** che x segue y. Una classe la implementa scrivendo `class C implements Comparable<C>` ("stretta a C"). Integer, Double e String la implementano già (ordine numerico/lessicografico). Una volta definita, abilita `Arrays.sort` e `Arrays.binarySearch`, che **richiede un array già ordinato** secondo il criterio di compareTo. Per Bottle, ad esempio, `compareTo` è `return this.level - b.level;`: conta solo il livello, la capacità è ininfluente.

I **generici vincolati** (bounded) usano Comparable per pretendere che il tipo sia ordinabile: `Tree<T extends Comparable<T>>` (si usa `extends` anche per le interfacce). Senza il vincolo non si potrebbe chiamare `compareTo`; con `Tree<NonOrdinabile>` si ha un errore di compilazione, e `Tree<Contact>` richiede `Contact implements Comparable<Contact>` (compareTo su `name`).

Infine la regola di **cast generale con interfacce**: un cast verso C o D compila se esiste un tipo E con `E <: C` e `E <: D` (almeno uno tra C e D è un'interfaccia, quindi un E che le unisca può esistere); a runtime serve un tipo vero E' <: C. Esempio con Punto2Dim (classe) e Colore (interfaccia): `(Colore) obj` compila perché potrebbe esistere un Punto2DimColorato, ma lancia ClassCastException se obj è un semplice Punto2Dim.

## 6. equals: override vs overload (Lez. 18)
Tutto il discorso su tipo apparente e vero si concentra in un caso classico. `equals(Object o)` è un **override** di quello di Object: il binding è **dinamico** e richiede `instanceof` più downcast. `equals(Animal a)` è invece un **overload**, un metodo diverso scelto con binding **statico** in base al tipo apparente dell'argomento.

```java
@Override public boolean equals(Object o){ if(!(o instanceof Animal)) return false; Animal a=(Animal)o; ... }
```

Gli esperimenti di ProvaOver sulla classe Animal lo mostrano in pratica (la tabella riassuntiva è nel file 07, sezione D):
- `a.equals(b)` con tipi apparenti Animal usa l'overload e dà false (indirizzi diversi);
- `c.equals(d)` ha riferimenti di tipo Object ma tipo vero Animal: usa l'override e dà true;
- `e.equals(d)` con e di tipo vero Object usa il metodo di Object (indirizzi) e dà false;
- `d.equals(e)` usa l'override ma `instanceof` fallisce, quindi false;
- con ricevente di tipo apparente Object si invoca la versione di Object indipendentemente dal cast dell'argomento.

## Cose da saper fare all'esame
- Dato un frammento con gerarchia A/B/C (+ interfacce I/J): dire se compila, cosa stampa, dove ClassCastException; distinguere tipo apparente/esatto (vedi file 07).
- Scrivere classe generica + metodo statico generico; spiegare raw type/erasure/autoboxing.
- Scrivere sottoclasse con `super(...)`, override con `super.m()`, protected.
- Scrivere gerarchia astratta (Figura) e `maxArea`; spiegare perché abstract > corpi vuoti.
- Implementare `Comparable` e usarlo con `Arrays.sort` / `Tree<T extends Comparable<T>>`.
- Spiegare override vs overload di `equals` con esempi.

## Dubbi
- [DA VERIFICARE] Lez. 19 distingue abstract class/interface sui "metodi statici: ammessi" per entrambe; confermare con la versione Java usata nel corso.
- [DA VERIFICARE] "Open-Closed" e "Liskov" citati dal doc: verificare quanto il docente li richieda all'orale.
