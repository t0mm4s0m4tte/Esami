# 06 - Eccezioni e design pattern
Fonte: doc Appunti (Lez. 21 eccezioni, Lez. 22 pattern).

## Mappa
- Eccezioni: gerarchia, checked/unchecked, try-catch-finally, throw/throws, custom, factory
- Design pattern GoF: Singleton, Composite, State (+ Iterator)

## 1. Eccezioni (Lez. 21)
Finora gli errori sono stati gestiti con `assert` o con valori di ritorno "speciali" come -1, soluzioni limitate perché ambigue o disattivate di default. L'eccezione offre un canale separato: è un **oggetto** (istanza di Exception e derivate) che segnala un errore "fuori banda", lasciando il valore di ritorno al risultato vero. Essendo un oggetto, porta anche stato: `getMessage()` e campi custom.

La **gerarchia** parte da `Throwable`, che si divide in `Error` (problemi irrecuperabili, come VirtualMachineError e `AssertionError`) ed `Exception`. Quest'ultima comprende le eccezioni *checked* e `RuntimeException`, che è la radice di quelle *unchecked*. La differenza non è formale ma concettuale: le checked rappresentano cause esterne al programma (I/O, rete, input), le unchecked errori di programmazione.

| | Checked | Unchecked |
|---|---|---|
| cause | esterne (I/O, rete, input) | bug di programmazione |
| compilatore | obbliga try-catch o `throws` | nessun obbligo |
| esempi | IOException, FileNotFoundException, DenZeroException | NullPointerException, ArithmeticException, ClassCastException, NumberFormatException, IndexOutOfBounds, IllegalArgument/StateException |

Il meccanismo sintattico ha due parole facilmente confuse:
- `throw` è l'istruzione imperativa che lancia l'eccezione;
- `throws` è la clausola nella firma, un contratto verso il chiamante.

Dal lato di chi gestisce:
- `try` racchiude il codice a rischio;
- `catch` interviene se il tipo è compatibile;
- `finally` viene sempre eseguito (pulizia delle risorse).

Alcune regole di buon uso:
- non catturare `Throwable`;
- mai un catch vuoto (il "swallowing" nasconde l'errore);
- i catch vanno **ordinati dal più specifico al più generico**, altrimenti quelli specifici sono irraggiungibili.

Un pattern d'uso frequente è il **ciclo di recupero**: segnala, chiedi, leggi, ritenta (`while(!done){ try{...done=true;} catch(...){...} }`). Esempi di eccezioni unchecked:
- `1/0`: Arithmetic;
- `(Float)"ciao"`: ClassCast, da prevenire con instanceof;
- `Integer.parseInt("ciao")`: NumberFormat;
- `a[10]` su `new int[10]`: IndexOutOfBounds;
- `obj.toString()` su null: NPE.

Le eccezioni rimpiazzano gli assert quando il controllo riguarda l'API pubblica. In Bottle e Stack si passa da `assert` (debug, controlli interni) a **IllegalArgumentException / IllegalStateException** per far rispettare il contratto verso i client, ad esempio con una quantità negativa. Il perfezionamento è la **static factory method** (Frazione): il costruttore diventa `private` e si espone `public static Frazione create(int n, int d) throws DenZeroException`. Se la validazione fallisce l'oggetto non viene creato, quindi ogni istanza esistente è ben formata.

Per i propri errori si definisce una **custom exception**, estendendo `Exception` (obbliga la gestione) o `RuntimeException` (errore prevenibile), con costruttore `super(msg)`; può avere anche stato, come `DenZeroException` con campo `den` e il relativo getter. Un'applicazione già vista è `Leaf.max()`: `throw new MaxSuAlberoVuoto();`, dove il `throw` è un terminal path (bottom type), per cui il `return` non serve.

## 2. Design pattern (Lez. 22)
Un pattern è una soluzione generale a un problema ricorrente, descritta da quattro elementi: **nome, problema, soluzione, conseguenze**. La classificazione GoF li divide in creazionali, strutturali e comportamentali, e i tre scelti nel corso ne rappresentano uno ciascuno.

### Singleton (creazionale)
Garantisce una sola istanza della classe con un punto di accesso globale. Il costruttore è `private`, l'istanza vive in un attributo statico privato e `getInstance()` la crea alla prima richiesta (**lazy initialization**). Una variante è il **Multiton**, che gestisce n istanze predefinite in una struttura dati. L'unicità si verifica osservando `hashCode()` identico quando si ottiene l'istanza da UserInterface e da Utilities.

```java
public class Database { private static Database instance;
  private Database(){}
  public static Database getInstance(){ if(instance==null) instance=new Database(); return instance; } }
```

### Composite (strutturale)
Permette di trattare in modo uniforme parti singole e composizioni di parti, ed è la stessa idea del Leaf/Branch degli alberi. Si compone di tre ruoli:
- **Component**: astratta, con l'interfaccia comune; i suoi `add()`/`remove()` di default lanciano `SinglePartException`;
- **Composite**: aggrega i figli, ad esempio in un `Vector`, e delega;
- **Leaf**: elemento atomico.

Nell'esempio del computer, Monitor, RAM e CPU sono SinglePart; MainSystem è CPU+HardDisk+RAM; Computer è MainSystem+Monitor+Tastiera (CompoundPart). Chiamare `add()` su una foglia produce l'eccezione.

### State (comportamentale)
Evita le cascate di if/else sullo stato, rigide e contrarie all'estendibilità, delegando il comportamento all'oggetto che rappresenta lo stato corrente (composizione). C'è un **Context** (Clock) e degli stati concreti che a loro volta cambiano lo stato chiamando `clock.setState()`. Per l'orologio la tabella delle transizioni è:

| stato | MODE | CHANGE |
|---|---|---|
| NormalDisplayState | -> UpdatingHrState | accende la luce |
| UpdatingHrState | -> UpdatingMinState | ore++ |
| UpdatingMinState | -> NormalDisplayState | minuti++ |

I due pattern si possono comporre: **State + Singleton** rende gli stati singleton (`newInstance(Clock c)` con lazy init) per non ricreare oggetti a ogni transizione.

### Iterator (comportamentale)
Disaccoppia l'aggregato dal suo attraversamento (`Iterable`/`Iterator`, Java Collections, LinkedList); è già stato trattato nel file 03.

Riepilogo:

| Pattern | Categoria | Scopo | Esempio |
|---|---|---|---|
| Singleton | creazionale | unicità | Database |
| Composite | strutturale | parte/tutto uniforme | PC |
| State | comportamentale | comportamento per stato | orologio |
| Iterator | comportamentale | attraversamento | collezioni |

## Cose da saper fare all'esame
- Classificare checked/unchecked, ordinare i catch, scrivere custom exception con stato e static factory.
- Dire cosa stampa un try/catch/finally con più catch.
- Scrivere uno Singleton lazy; schizzare Composite (Component/Composite/Leaf) e State (Context + stati) per un caso nuovo.
- Spiegare differenza `throw`/`throws`, assert/eccezione.

## Dubbi
- [DA VERIFICARE] Il doc cita `Vector` per Composite: all'esame potrebbe bastare qualsiasi lista.
- [DA VERIFICARE] Lez. 21 non mostra try-with-resources: non incluso.
