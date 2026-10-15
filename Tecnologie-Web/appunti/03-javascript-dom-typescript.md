# 03 – Programmare lato client: JavaScript e TypeScript nell'ambiente browser

Fonte: Drive › Terzo anno › Tecnologie Web › Slide Deck - TWeb › "02 - Programmare Lato Client" (Picardi e Mauro, 2026).

## Mappa degli argomenti

- [Caratteristiche del linguaggio](#caratteristiche-del-linguaggio)
- [Tipi, variabili, array, oggetti](#tipi-variabili-array-oggetti)
- [Funzioni, scope, closure](#funzioni-scope-closure)
- [Moduli](#moduli)
- [Il DOM](#il-dom)
- [Eventi e event loop asincrono](#eventi-e-event-loop-asincrono)
- [Prototipi, costruttori, classi, `this`](#prototipi-costruttori-classi-this)
- [Asincronia oltre le callback: Promise, async/await, fetch](#asincronia-oltre-le-callback-promise-asyncawait-fetch)
- [TypeScript](#typescript)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## Caratteristiche del linguaggio

JavaScript è:
- **interpretato**: serve un motore di esecuzione;
- **imperativo e strutturato**: istruzioni, blocchi, condizionali e cicli;
- **debolmente tipato**: i dati vengono convertiti automaticamente da un tipo all'altro quando serve (il numero 35 può diventare la stringa "35", `false` può diventare 0);
- **dinamicamente tipato**: il tipo si stabilisce a run time, non va dichiarato per variabili, parametri, valori di ritorno;
- **object-oriented basato su prototipi**: gli oggetti non richiedono classi, sono collezioni di coppie proprietà/valore, e un oggetto può fare da prototipo a un altro, che ne eredita le proprietà; le classi esistono comunque come comodità;
- **funzionale e dichiarativo** in parte, perché le funzioni sono dati: si creano dinamicamente, si mettono in variabili, si passano come parametri, si assegnano a proprietà di oggetti.

Il nome ufficiale è **ECMAScript** (ES), la specifica standard in continua evoluzione; "JavaScript" è l'implementazione di Mozilla. L'ultima edizione che ha cambiato il linguaggio in modo sostanziale è ES2015 (ES6). Un programma scritto per una versione recente si può tradurre automaticamente in una precedente: si chiama **transpilazione**, e permette di usare le feature nuove su browser meno aggiornati. Nel corso non si usa nulla oltre ES2020 (ES11).

### Linguaggi compilati e interpretati

Un processore capisce solo linguaggio macchina, troppo di basso livello per programmi complessi. I linguaggi di alto livello sono **compilati** (es. C: un compilatore traduce una volta per tutte in un eseguibile specifico per la famiglia di processori) o **interpretati**: un agente di calcolo di livello più alto (interprete o motore di esecuzione, a sua volta compilato in linguaggio macchina) esegue direttamente le istruzioni di alto livello, realizzando una *macchina virtuale*. Java è **ibrido**: si compila in bytecode che è interpretato dalla JVM. Gli schemi possono avere più livelli (esempio nelle slide: un ipotetico "VoiceScript" interpretato da un motore scritto in JavaScript, che a sua volta gira su un motore JS che invoca istruzioni macchina).

### Motore e ambiente di esecuzione nel browser

Il motore realizza un **ambiente di esecuzione** = programma in esecuzione + memoria; è "vivo", con oggetti e variabili che cambiano. Può includere API per interagire con l'ambiente specifico. Nel browser c'è una sandbox per ogni pagina, che si azzera al ricaricamento. Dentro l'ambiente esiste l'oggetto `document`, cioè il **DOM** della pagina, con la **DOM API** per consultarlo e modificarlo, e la **fetch API** per fare richieste HTTP.

Per collegare uno script a una pagina: `<script type="application/javascript" src="path/myscript.js"></script>`. Se è nel `HEAD` viene eseguito subito, prima che la pagina sia caricata, e se interagisce con `document` questo potrebbe essere ancora vuoto. Per rimandare l'esecuzione ci sono tre modi:
- mettere lo `SCRIPT` in fondo, dopo `</body>` e prima di `</html>`;
- usare l'attributo **`defer`**;
- dichiarare `type="module"`, che dice al browser che il file è il punto d'ingresso di un'applicazione su più moduli (è la soluzione più usata).

## Tipi, variabili, array, oggetti

I tipi base sono `number`, `boolean`, `string`, `object`, `undefined`, `null`, `bigint`, `symbol` (array e funzioni sono oggetti). Non si distingue tra interi e decimali: tutti `number` in floating point a 64 bit (come i `double` Java); `bigint` serve per interi molto grandi. Le stringhe sono UTF-16 e si scrivono con `"`, `'` o con il backtick `` ` `` (**template literal**: tutto ciò che sta tra i backtick, spazi e tabulazioni inclusi, fa parte della stringa; permette l'interpolazione `${...}`). `undefined` rappresenta "nessun valore" (variabile non assegnata, funzione che non restituisce nulla), `null` dovrebbe essere l'"oggetto nullo"; nella pratica si usano in modo quasi intercambiabile, quindi conviene sceglierne uno e attenersi.

Le variabili si dichiarano con `let` (opzionalmente inizializzata, altrimenti `undefined`; può contenere tipi diversi in momenti diversi) o `const` (da inizializzare subito, non riassegnabile). **Attenzione**: costante non significa immutabile. Una `const` che contiene un oggetto o un array tiene sempre lo stesso riferimento, ma si possono aggiungere elementi all'array o cambiare proprietà dell'oggetto.

Un **array** si crea con `["a", "b"]` o `[]`, si accede con `amici[indice]`. Non ha dimensione fissa (la lunghezza è l'ultima posizione occupata + 1), può avere buchi (leggendoli si ottiene `undefined`) e può mescolare tipi. Metodi comuni: `length`, `pop()` (rimuove e restituisce l'ultimo), `push(v)`, `join(sep)`, `slice(start, end)` (nuovo array da `start` incluso a `end` escluso), `splice(start, delNum, add1, ..., addN)` (modifica l'array: cancella `delNum` elementi e inserisce i nuovi; con `delNum = 0` solo aggiunta).

Un **oggetto** base è un *object literal*: `const libro = { id: 8, titolo: "...", autore: "...", stato: "borrowed" }`. Si accede con la *dot notation* (`libro.titolo`) o con la *square bracket notation* (`libro["titolo"]`), che permette anche nomi non validi per la dot notation (es. `libro["ISBN-13"]` con trattino). Si possono aggiungere proprietà dopo la creazione (`libro.editore = "..."`) e cancellarle con `delete libro.stato`.

### Classi (introduzione)

```js
class Studente {
  constructor(nome) { this.nome = nome; this.votiEsami = []; }
  aggiungiVoto(voto) { this.votiEsami.push(voto); }
}
class Laureato extends Studente {
  constructor(nome, votoLaurea) { super(nome); this.votoLaurea = votoLaurea; }
}
const s = new Studente("Saverio");
```

Il **costruttore** inizializza le proprietà (`this` è l'oggetto in costruzione), i **metodi** sono funzioni che tutti gli oggetti della classe possiedono. Non c'è un elenco delle proprietà nella classe, perché gli oggetti possono acquisire o perdere proprietà a runtime e non ci sono tipi da dichiarare. Proprietà e metodi sono tutti pubblici; per l'"uso interno" si usa per convenzione un prefisso con underscore, ma è solo una convenzione. Nell'ereditarietà il costruttore della sottoclasse deve chiamare per prima cosa `super(...)`.

### Operatori e cicli

Gli operatori sono i soliti, con `+` anche per concatenare stringhe. Siccome JavaScript converte i tipi, `12 == "12"` è vero; per questo esistono `===` e `!==`, che richiedono anche lo stesso tipo (`a === b` equivale a `a == b && typeof a == typeof b`). `==` e `!=` sono fonte di bug (per esempio `undefined` viene convertito a `false` o a 0, mascherando errori di calcolo): è buona prassi usare solo `===` e `!==`. `if`, `while`, `do...while` come in C e Java. Il `for` ha tre varianti:
- `for(init; condition; increment)`: classico;
- `for (const a of iterabile)`: itera sugli elementi di un iterabile (array, string sui caratteri, `Set`, `Map`);
- `for (const key in oggetto)`: itera sui nomi delle proprietà (stringhe).

## Funzioni, scope, closure

Tre modi di dichiarare una funzione:
- **named**: `function myfun(x, y) {...}`;
- **anonymous**: `const f = function (x) {...}`;
- **arrow**: `const f = (x, y) => {...}` oppure con corpo a espressione `(x, y) => valore`.

Non si è obbligati a passare tutti i parametri (i mancanti sono `undefined`), e una funzione senza `return` restituisce `undefined`: un errore di invocazione o un `return` dimenticato può manifestarsi in un punto molto diverso del programma. Si possono dichiarare ovunque e sono visibili nello scope in cui nascono. Bisogna distinguere la **funzione come dato** (il nome senza parentesi) dalla sua **invocazione** (nome con parentesi, che è un'espressione con un risultato): una funzione può essere passata come parametro attuale a un'altra, che la chiama col nome del parametro formale, per esempio `applica("c'era una volta", s => s.split(' ').length)`.

Uno **scope** (ambito di visibilità) è creato da ogni blocco tra graffe (if/else, while/for, corpo di funzione, anche un blocco arbitrario). Gli scope si annidano, quello più esterno (l'intero script) è lo scope globale. Variabili e funzioni sono visibili nello scope in cui sono definite e nei suoi discendenti.

La **closure** è il meccanismo per cui le variabili di uno scope sopravvivono alla sua chiusura finché c'è uno scope interno ancora attivo che le usa. Esempio: `functionCreator` crea un array `somearray` e restituisce una funzione interna che lo usa; anche dopo la fine di `functionCreator`, la funzione restituita continua a vedere `somearray`. È tipico dei linguaggi funzionali ed è necessario perché le funzioni siano "elementi di prima classe": le graffe chiuse segnano la fine *statica* dello scope, ma la fine della sua vita *dinamica* arriva solo quando nessuno lo usa più.

### Array e programmazione dichiarativa

Siccome le funzioni si possono passare, si può scrivere in stile **dichiarativo**: si dice *cosa* si vuole ottenere, non *come*. Invece di un ciclo `for` con `push`, `const quadrati = numeri.map(x => x * x);`. Altri metodi:
- `forEach(fun)`: esegue `fun` per ogni elemento, ignorando il ritorno;
- `find(f)`: primo elemento per cui `f` è true (c'è `findLast`);
- `findIndex(f)`: la posizione, `-1` se nessuno (c'è `findLastIndex`);
- `every(f)`: true se `f` è vera per tutti;
- `some(f)`: true se vera per almeno uno;
- `reduce(accumulatore, valoreIniziale)`: accumula i valori in un unico risultato; l'accumulatore è una funzione `(accumulato, prossimo) => ...`, e `numeri.reduce((somma, v) => somma + v, 0)` calcola la somma.

## Moduli

In JavaScript il codice può essere diviso in più file in modo arbitrario, senza compilazione che controlli le dipendenze, purché al momento dell'esecuzione gli script da cui dipendo siano già stati eseguiti. Il modo rudimentale (elencare i `<script>` nell'ordine giusto nell'HTML) regge per progetti piccoli ma non per applicazioni complesse con librerie di terze parti, dove le dipendenze devono essere chiare. Soluzione: **ogni file JavaScript è un modulo**, che può importare ed esportare oggetti, variabili, funzioni, classi. Ciò che non è esportato resta privato (protegge i meccanismi interni).

- **Standard export**: `export function f() {...}`, `export let v = ...`, `export class C {...}`.
- **Default export**: `export default ...`, quando un modulo esporta una sola cosa.
- **Default import**: `import nomeQualsiasi from "altro.js"` (il nome è libero).
- **Standard import**: `import {a, b} from "altro.js"`; con rinominazione `import {a as x, b as y} from "..."`; con namespace `import * as Q from "altro.js"` (poi `Q.a`).

## Il DOM

Il browser usa HTML e CSS per inizializzare il **DOM**, una struttura dati ad albero che rappresenta il documento; nell'ambiente è l'oggetto `document`. I nodi sono: la radice, nodi intermedi (elementi HTML) e foglie (elementi, testo, commenti). Il DOM vive finché la pagina non viene chiusa o ricaricata.

### DOM API e interfacce

Il termine **interfaccia** indica il "fronte esterno" di un servizio: la **UI** è il fronte verso gli utenti, l'**API** il fronte verso altri software/programmatori, l'**object interface** di un oggetto (proprietà e firme dei metodi) è il modo in cui l'oggetto si può usare nel codice, a prescindere da come è implementato, e può essere implementata da classi diverse. Un'interfaccia può essere pubblicata *a posteriori* (faccio il servizio e poi pubblico l'API) o *a priori* come contratto/specifica, implementabile da fornitori diversi (come un mockup per una UI). La **DOM API** è del secondo tipo: una specifica del W3C, che i browser (i fornitori) devono rispettare. È fatta di oggetti da fornire (il DOM, gli elementi) e delle loro object interface. Non contiene componenti imperative, quindi non definisce classi: ogni browser è libero di implementare gli oggetti come vuole. JavaScript non ha le object interface come costrutto del linguaggio (servirebbero solo al controllo statico dei tipi): dire che i nodi `DIV` "implementano `HTMLDivElement`" significa che hanno proprietà e metodi elencati nella specifica.

La gerarchia delle interfacce, in breve: `EventTarget` è alla base; `Node` la estende (e `Window` è un `EventTarget`); da `Node` derivano `Document`, `DocumentFragment`, `Element`, `Attr`, `CharacterData` (da cui `Text` e `Comment`); da `Element` deriva `HTMLElement`, che ha le specializzazioni `HTMLDivElement`, `HTMLInputElement`, `HTMLSelectElement`, `HTMLParagraphElement`, `HTMLHeadingElement`, `HTMLFormElement`, `HTMLImageElement`, ...

Le interazioni con il DOM sono di tre tipi:
- **navigazione/attraversamento**: trovare elementi e leggerne le caratteristiche, per lo più con `Element`;
- **modifica**: aggiungere, togliere, spostare elementi, cambiare classi e attributi, sempre per lo più con `Element`;
- **gestione degli eventi**: registrare listener, con `EventTarget`.

In "vanilla JavaScript" il ciclo di base di una UI è:
1. trovare nel DOM gli elementi su cui intervenire;
2. registrare su di essi dei listener;
3. quando l'evento si verifica, modificare opportunamente il DOM.

### Navigare il DOM

- **Per tipo, classe, id** (metodi di `Element` e `Document`): `getElementById(id)` (un elemento o `null`), `getElementsByTagName(tag)` e `getElementsByClassName(cls)` (`HTMLCollection`).
- **Da `document`**: `document.documentElement` (radice), `document.head`, `document.body`.
- **Da un nodo**: `node.childNodes` (`NodeList`, tutti i figli anche non elemento), `node.parentElement` (l'elemento genitore, `null` se manca o non è un elemento), `node.parentNode` (il nodo genitore di qualunque tipo); da un elemento: `element.children` (`HTMLCollection` dei soli figli elemento).
- **Per selettore CSS**: `querySelector(sel)` (primo corrispondente o `null`), `querySelectorAll(sel)` (`NodeList` **statica**) da `document` o da un elemento (ricerca discendente); `closest(sel)` risale verso la radice e trova il primo antenato (o l'elemento stesso) che corrisponde, o `null`.

`HTMLCollection` e `NodeList` sono collezioni *array-like* ma **non array**: non si possono usare i metodi di `Array`, ma si può ciclare con `for` tradizionale e `for..of`. La differenza cruciale è **live vs statica**: le collezioni ottenute con ricerca per tag/id/classe e con le proprietà di attraversamento sono **live** (si aggiornano se il DOM cambia); quelle di `querySelectorAll` sono **statiche** (per aggiornarle bisogna rifare la query). Con `Array.from(coll)` le si trasferisce in un array, che però è sempre statico.

### Modificare il DOM

Modifica *bulk*: `element.innerText` e `element.innerHTML` (contenuto come testo o come HTML; assegnarli sostituisce l'intero sottoalbero). Creazione: `document.createElement(tag)` crea l'elemento ma **non** lo aggiunge al DOM. Rimozione: `element.remove()`. L'aggiunta "ortodossa" usa `insertAdjacentElement(where, anElem)`, `insertAdjacentHTML(where, htmlString)`, `insertAdjacentText(where, textString)`. Se `anElem` era già nel DOM viene **spostato** con tutto il sottoalbero. Il parametro `where` è una di queste stringhe, relative all'elemento su cui si chiama il metodo:
- `beforebegin`: fratello predecessore, prima del tag di apertura;
- `afterbegin`: primo figlio;
- `beforeend`: ultimo figlio;
- `afterend`: fratello successore, dopo il tag di chiusura.

Classi e attributi: `element.classList.add(c)`, `.remove(c)`, `.toggle(c)`, e un metodo per sapere se la classe c'è; cambiare le classi cambia le regole di stile applicate, quindi è un modo molto efficace di ottenere interattività (far apparire/scomparire elementi, evidenziarli, spostarli). Per gli attributi `getAttribute(nome)` (restituisce una stringa) e `setAttribute(nome, valore)`.

## Eventi e event loop asincrono

L'ambiente JavaScript interagisce con il mondo esterno tramite **eventi**, messi in una coda e consumati da un **singolo thread** (*asynchronous single-thread event loop*). Gli eventi possono essere **esogeni** (generati spontaneamente da agenti esterni, come l'utente: imprevedibili) o **endogeni** (conseguenza di una richiesta fatta dall'applicazione: si può prevedere con ragionevole certezza che arriveranno). Perché un evento venga gestito, l'ambiente deve conoscere la funzione che risponde: si chiama **listener** per gli esogeni (sta in ascolto e risponde ogni volta) e **callback** per gli endogeni (indicata all'avvio della richiesta, richiamata a completamento). La logica è la stessa: associare a un tipo di evento una funzione. Poiché c'è un solo thread, un'elaborazione lunga **blocca tutta l'applicazione**, perciò le operazioni time-consuming (richieste HTTP, scritture nel DB interno al browser) sono **asincrone**: l'istruzione che le avvia non si blocca ad aspettare il risultato, ma richiede la callback da invocare al termine. Eccezione: i Web Workers, thread paralleli per compiti che non toccano il DOM.

Eventi tipici del DOM:
- del mouse: `click`, `mouseenter`, `mouseleave`, `mouseout`, `mouseover`, `mousedown`, `mouseup`, `mousemove` (sui touch screen gli eventi touch si possono gestire a parte o assimilare);
- della tastiera: `focus`, `blur`, `keydown`, `keyup`;
- dei form: `submit`, `reset`;
- di `document`: `scroll`;
- di `window`: `resize`.

Per la maggior parte delle app bastano gli eventi del mouse.

Si registra un listener con `domObj.addEventListener(nomeEvento, listener)`; `listener` è una funzione che riceve un oggetto evento (con le informazioni dettagliate; le interfacce sono `Event`, `MouseEvent`, `KeyboardEvent`, `FocusEvent`, ...). Si toglie con `removeEventListener(nomeEvento, listener)`.

### Bubbling, capturing, effetti di default

Un evento nasce su un elemento preciso (il **target**) e **risale** l'albero fino alla radice (**bubbling**): il listener di ogni antenato viene invocato. Perché? Se non ci fosse il bubbling un click sul footer verrebbe visto solo cliccando sul suo sfondo vuoto; invece "click sul footer" in genere significa "click sul footer incluso ciò che contiene". Dentro un listener, `evento.target` è l'elemento sorgente, `evento.currentTarget` quello che sta emettendo (a cui è attaccato il listener). `evento.stopPropagation()` blocca la propagazione.

In realtà l'evento arriva al target *scendendo* l'albero (fase di **capturing**, che precede il bubbling), ma di default durante la discesa i listener non vengono chiamati. Si può chiedere di invocarli in discesa con `addEventListener(nome, listener, {capture: true})`. Bloccando la propagazione in fase di capturing l'evento non arriva al target e il bubbling non parte: serve per gestione totalmente personalizzata di certi eventi. Alcuni eventi hanno **effetti di default** (click su `A` → navigazione, tasto destro → menu contestuale, TAB → prossimo input) e `evento.preventDefault()` li impedisce; per bloccarli in un'intera area conviene farlo in fase di capturing.

## Prototipi, costruttori, classi, `this`

In JavaScript ogni oggetto (tranne `Object.prototype`) ha un **prototipo**, un altro oggetto di cui eredita le proprietà. Gli oggetti primordiali sono la funzione `Object` (invocata implicitamente ogni volta che si crea un oggetto) e l'oggetto `Object.prototype`, prototipo di default di tutti gli oggetti (non è strano che `Object` abbia proprietà: le funzioni sono oggetti). Se si legge una proprietà che l'oggetto non ha, il motore la cerca nel prototipo, poi nel prototipo del prototipo e così via lungo la **prototype chain** fino a `Object.prototype`. Invece in **scrittura** il prototipo è ignorato: se la proprietà non esiste nell'oggetto stesso, viene aggiunta lì; se il prototipo ne aveva una con lo stesso nome si ha **overriding** (la locale nasconde quella ereditata, gli altri eredi continuano a condividere quella del prototipo). Si accede al prototipo con `oggetto.__proto__`; modificare il prototipo cambia tutti gli oggetti che ne ereditano (se cancello `abbaia` dal prototipo `fido`, anche `snoopy` e `cucciolo` la perdono; aggiungere qualcosa a `Object.prototype` la dà a tutti gli oggetti dell'app: "a nostro rischio e pericolo"). Per limitare le modifiche, in ordine di restrizione crescente:
- `Object.preventExtensions(o)`: niente nuove proprietà o cambio di prototipo;
- `Object.seal(o)`: in più non si possono perdere proprietà;
- `Object.freeze(o)`: in più i valori non si possono cambiare (sola lettura).

Per creare un oggetto da un prototipo: `const snoopy = Object.create(fido);` e poi si assegnano proprietà proprie o in overriding. Per esplorare: `Object.keys(o)` dà le proprietà proprie; `for (key in o)` itera su tutte le chiavi valide, **incluse** quelle della prototype chain ma escluse quelle di sistema (come quelle di `Object.prototype`); `o.hasOwnProperty("x")` dice se `x` è definita nell'oggetto stesso (false se assente o ereditata).

### `this` e binding

Un **metodo** è una funzione *bound* a un oggetto, che diventa il soggetto: dentro, `this` si riferisce a quell'oggetto. Il binding avviene **implicitamente** per le proprietà-funzione definite come named o anonymous function, **non** per le **arrow function**: una proprietà-funzione arrow non è un metodo e `this` non vale l'oggetto proprietario (le slide lasciano la domanda: "non è `undefined`... scopritelo da voi"). La risposta, confermata da MDN: una arrow function non ha un `this` proprio ma prende quello dello scope in cui è scritta; un object literal non crea scope, quindi in `{ nome: "x", saluta: () => this.nome }` il `this` è quello esterno (in uno script del browser `window`, quindi `this.nome` vale `undefined`; in un modulo ES `this` a livello superiore è `undefined` e l'accesso lancia un errore). Anche `call`, `apply` e `bind` non cambiano il `this` di una arrow. Regola pratica: per i metodi di un oggetto usare la sintassi a metodo (`saluta() {...}`) o `function`; usare le arrow per le callback *dentro* un metodo, dove ereditano il `this` del metodo. Il binding **esplicito** si ottiene con `f.bind(oggetto)`, che crea una copia della funzione legata a quell'oggetto; l'effetto di assegnare la funzione a una proprietà è lo stesso, tranne per le arrow function, per le quali si può solo `bind`.

### Costruttori e classi

Il sistema originario per creare oggetti "con lo stampino" sono i **costruttori**: named function (nome con la maiuscola per convenzione) invocate con `new`.

```js
function Cane(nome, razza) {
  this.tipo = "Cane"; this.nome = nome;
  if (razza !== undefined) this.razza = razza;
}
Cane.prototype.abbaia = function() {};
const fido = new Cane("Fido");
```

`new Fun(...)`:
1. crea un oggetto prototipo in `Fun.prototype`;
2. crea il nuovo oggetto `x` con prototipo `Fun.prototype`;
3. fa il binding di `this` a `x`.

Quindi tutti gli oggetti creati con lo stesso costruttore condividono il prototipo: due oggetti sono della stessa **classe** se creati dallo stesso costruttore, e i metodi si assegnano alla "classe" aggiungendoli al prototipo (le proprietà sono dell'oggetto, con valori propri, non del prototipo). Il costrutto `class` è proprio questo "sotto il cofano": la classe è un costruttore, e i metodi dichiarati dentro vanno al prototipo del costruttore. Con `extends` la catena è: l'istanza → `Beagle.prototype` → `Cane.prototype` → `Object.prototype`.

## Asincronia oltre le callback: Promise, async/await, fetch

*Integrazione da fonti esterne (MDN), non dalle slide, che presentano l'asincronia solo con le callback; serve perché il corso userà richieste HTTP dal browser.*

Le callback funzionano, ma quando un'operazione asincrona ne richiede un'altra il codice si annida sempre di più e la gestione degli errori si frammenta ("pyramid of doom"). Una **Promise** rappresenta un risultato futuro e ha tre stati: *pending* (in attesa), *fulfilled* (riuscita, con un valore) o *rejected* (fallita, con un errore). Le Promise si concatenano con `then`, evitando l'annidamento, e un errore in un punto qualsiasi della catena si propaga fino al primo `catch`. Un dettaglio che spiega molto: i callback di `then` non vengono mai eseguiti in modo sincrono, ma accodati come *microtask*.

Il legame con l'event loop single-thread delle slide è questo: ci sono due code, quella dei **task** (timer, eventi del DOM, risposte di rete) e quella delle **microtask** (callback delle Promise). L'event loop prende un job alla volta e lo esegue fino in fondo (*run-to-completion*), e svuota **tutte** le microtask prima di passare al task successivo. Per questo `Promise.resolve().then(f)` esegue `f` prima di un `setTimeout(g, 0)`. E per questo una funzione sincrona molto lunga congela l'interfaccia anche se è avvolta in una Promise: serve un Web Worker per spostare il calcolo fuori dal thread principale.

`async/await` è zucchero sintattico sulle Promise. Una `async function` restituisce sempre una Promise; dentro, `await` sospende la funzione finché la Promise si risolve, cedendo il controllo all'event loop (il codice fino al primo `await` è sincrono). Gli errori si gestiscono con `try...catch`, e `Promise.all` lancia più operazioni in parallelo. Il caso che interessa di più è `fetch`, la API del browser per le richieste HTTP: restituisce una Promise di `Response`, che va in *reject* solo per errori di rete, **non** per un 404 o 500. Quindi bisogna controllare `response.ok` a mano, e anche `response.json()` è asincrona; il body si legge una volta sola.

```js
async function carica(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(r.status);   // 404/500 non fanno reject da soli
  return await r.json();
}
```

## TypeScript

TypeScript aggiunge a JavaScript un **sistema di tipi**: si dichiara il tipo atteso di variabili, parametri e valori di ritorno. Si **compila** in JavaScript: i costrutti aggiuntivi sono solo dichiarativi e scompaiono dopo la compilazione, senza effetto sull'esecuzione (a differenza di JS o C, dove il tipo influenza lo slot di memoria). Implementa l'**inferenza dei tipi**: in compilazione deduce il tipo di funzioni ed espressioni e verifica la coerenza con i tipi promessi e con gli usi. Dà il meglio in un IDE, dove l'inferenza lavora mentre si scrive. Si "può" dichiarare il tipo perché si può scrivere `any` ("qualsiasi cosa"), ma facendolo si perde buona parte dei vantaggi: da evitare, salvo il raro caso di interazione con codice JS senza dichiarazioni. Le dichiarazioni servono a verificare a compile time la consistenza di espressioni e assegnamenti, a far esprimere le intenzioni del programmatore, a controllare che proprietà e metodi di un oggetto esistano davvero e a introdurre nelle classi i modificatori di accesso (`public`, `private`, ...) assenti in JS.

### Dipendenze e npm

Usare TypeScript fa emergere il problema della **gestione delle dipendenze**: il progetto dipende dal compilatore `tsc` e dai package. Nel web si usano estensivamente package di terze parti distribuiti tramite repository online (con statistiche su uso, gradimento, aggiornamento): se un package cambia la firma di una funzione, o viene ritirato dal suo autore, il mio progetto può rompersi; diffidare di quelli non aggiornati da anni, a meno che facciano compiti semplici e consolidati. Un **package manager** (da riga di comando) accede al registry, scarica e installa i package e dichiara le dipendenze in appositi file. Quello usato è **npm** (node package manager), nato per Node.js ma oggi progetto separato (costola di GitHub), con registry `npmjs.com`; si installa con Node.js.

Le dipendenze possono essere **globali** (come librerie del sistema operativo) o **locali** al progetto: oggi si preferisce la locale, perché rende lo sviluppo indipendente dalla configurazione del dispositivo e agevola la collaborazione (Git, GitLab). Si distinguono **dev dependencies** (servono solo in sviluppo e spariscono dopo la distribuzione: TypeScript è una di queste) e **runtime dependencies** (codice invocato a runtime, da includere nella distribuzione). Distinzione importante per il "confezionamento" del progetto.

Uso base: `npm install [-D] [-g] nome-package[@versione]` (`-D` = dev dependency, default runtime; `-g` = globale, default locale; `@latest` ultima stabile, `@next` prossima uscita, spesso instabile). Esempio: `npm install -D typescript@latest`. Struttura del progetto: `node_modules` (codice dei package, gestito da npm, non va modificato e va **escluso** da Git), `package.json` (configurazione e dipendenze, es. `{"devDependencies": {"typescript": "^5.6.3"}}`, modificabile anche a mano) e `package-lock.json` (dipendenze e sotto-dipendenze, generato da npm, da non modificare).

### Configurare e compilare

Il compilatore `tsc` è uno script JavaScript contenuto nel package e si lancia con `npx` (incluso in npm). `npx tsc --init` crea il file `tsconfig.json` con impostazioni predefinite, che vanno in parte modificate:

```json
{ "compilerOptions": {
    "target": "es2020",       // era es2016
    "module": "es2015",       // era commonjs
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "outDir": "scripts"
} }
```

Le opzioni significano:
- `target`: la versione di JavaScript prodotta in output (si usa `es2020`);
- `module`: prima di `import`/`export` ES, Node.js aveva un proprio sistema di moduli, "CommonJS"; per il browser e la sintassi ES si indica `es2015` (la versione in cui import/export sono stati introdotti);
- `esModuleInterop`: interoperabilità tra i due sistemi (conta solo se si programma per Node con sintassi ES);
- `forceConsistentCasingInFileNames`: segnala import dello stesso modulo con maiuscole/minuscole incoerenti (problema fra sistemi operativi che distinguono o no);
- `strict`: più severità nei tipi;
- `skipLibCheck`: salta la verifica dei tipi nelle librerie;
- `outDir`: dove mettere i `.js` generati.

Organizzazione: i sorgenti TypeScript in una cartella `src`; il compilatore li trova da sé e replica la loro struttura di sottocartelle in `scripts` (`outDir`), con i `.js` al posto dei `.ts`. Le pagine HTML importano gli script da `scripts`: è questa la cartella da pubblicare su un web server. Per collaborare (es. via GitLab) basta `src`, perché `scripts` si rigenera compilando. Compilare: `npx tsc`.

## Cose da saper fare all'esame

- Prevedere l'output di codice JS con `let`/`const`, `==` vs `===`, scope e closure.
- Scrivere funzioni con `map`, `find`, `every`, `some`, `reduce`, `forEach` e riscrivere un ciclo in stile dichiarativo.
- Scrivere moduli con export/import (default e standard, rinominazione, namespace).
- Usare la DOM API: trovare elementi (`getElementById`, `querySelector`/`All`, `closest`), creare e inserire nodi (`createElement`, `insertAdjacent*`), cambiare classi e attributi, sapendo la differenza tra collezioni live e statiche.
- Registrare listener, usare `target` vs `currentTarget`, spiegare bubbling/capturing, `stopPropagation`, `preventDefault`.
- Spiegare event loop single-thread, esogeni vs endogeni, listener vs callback, perché le operazioni lente sono asincrone.
- Spiegare prototype chain, overriding, `Object.create`, come funziona `new`, che `class` è zucchero sintattico, e `this` con arrow function e `bind`.
- Spiegare a cosa serve TypeScript, come si compila, e cosa fanno `package.json`, `node_modules`, `tsconfig.json` (target, module, outDir), dev vs runtime dependencies.

## Dubbi

- `[DA VERIFICARE]` Nella slide sui cicli `for` c'è scritto `for(const elem in iterabile)` per gli iterabili, ma il ciclo sugli elementi è `for...of` (l'esempio infatti usa `of`): refuso della slide. `in` itera sulle chiavi.
- `classList.has(...)` nelle slide è un errore: il metodo si chiama `classList.contains(...)` (confermato dagli esempi MDN; `has` esiste su `Set` e `Map`, da cui probabilmente la confusione). Allo stesso modo "settAttribute" è un refuso di `setAttribute`.
- Il valore di `this` in una arrow function usata come proprietà di un oggetto, lasciato come domanda aperta nelle slide, è confermato da MDN: una arrow non ha un `this` proprio, ma prende quello dello scope in cui è scritta, e un object literal non crea uno scope, quindi non è l'oggetto. Vedi la nota in "`this` e binding".
- Le slide non trattano ancora Promise, `async/await` e `fetch`: la sezione "Asincronia oltre le callback" qui sopra è un'integrazione da fonti esterne, non materiale del corso.
