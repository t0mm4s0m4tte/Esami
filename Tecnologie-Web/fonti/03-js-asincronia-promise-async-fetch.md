# Fonti: asincronia in JavaScript (Promise, async/await, fetch, event loop)

Legenda: [V] = letta in questa sessione; [NV] = non verificata.

## Fonti

1. **Introducing asynchronous JavaScript** – MDN Web Docs (Learn web development). https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Introducing [V]. Contrappone codice sincrono e asincrono, mostra come una funzione lunga blocchi il main thread, introduce i callback e la "pyramid of doom". Livello base, ottimo punto di partenza.
2. **Using promises** – MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises [V]. Stati di una Promise (pending, fulfilled, rejected), concatenazione con `then`, propagazione degli errori fino al `catch`, e il fatto che i callback `then` girano come microtask mai in modo sincrono. Livello intermedio.
3. **async function** – MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function [V]. Una `async function` restituisce sempre una Promise; `await` sospende la funzione finché la Promise si risolve; si gestiscono gli errori con `try...catch`; `Promise.all` per eseguire in parallelo.
4. **Using the Fetch API** – MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch [V]. `fetch()` restituisce una Promise di `Response`; non va in reject per 404/500, solo per errori di rete, quindi si controlla `response.ok`; `response.json()` è asincrona; esempio di POST con `headers` e `body`.
5. **The JavaScript execution model / Event loop** – MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop [V]. Run-to-completion, coda dei task, microtask svuotati prima del task successivo, un solo job alla volta per agente.
6. **HTML Standard, sezione "Event loops"** – WHATWG. https://html.spec.whatwg.org/multipage/webappapis.html#event-loops [NV: non aperta, è la fonte normativa del modello task/microtask].

## Sintesi

Le fonti concordano: JavaScript esegue il codice su un solo thread, ma non resta bloccato in attesa perché le operazioni lente (rete, timer, I/O) vengono avviate dal browser (o da Node) e al termine mettono in coda un callback. L'event loop prende un job per volta dalla coda e lo esegue fino alla fine (run-to-completion); due code distinte, task (timer, eventi) e microtask (callback delle Promise), con le microtask svuotate per intero prima del task successivo. Per questo un `Promise.resolve().then(f)` esegue `f` prima di un `setTimeout(g, 0)`, e per questo una funzione sincrona molto lunga congela l'interfaccia, anche se è avvolta in una Promise (serve un Web Worker per spostare calcolo fuori dal main thread).

Le Promise sono l'evoluzione dei callback: rappresentano un risultato futuro e si concatenano evitando l'annidamento, con un unico punto per gli errori. `async/await` è zucchero sintattico sulle Promise: la funzione sembra sequenziale, ma a ogni `await` cede il controllo all'event loop. Il codice fino al primo `await` è sincrono. Il punto più insidioso con `fetch` è che una risposta 404 o 500 non è un errore per la Promise: va controllato `response.ok` (o `status`) e lanciato un errore a mano. Per esempio: `const r = await fetch(url); if (!r.ok) throw new Error(r.status); const dati = await r.json();`. Il body si legge una volta sola.

Divergenze: nessuna tra le fonti; cambia solo il livello di dettaglio (la specifica HTML distingue più tipi di coda, MDN semplifica).

## Cosa correggere o aggiungere negli appunti

In `03-javascript-dom-typescript.md` sostituire il dubbio "promise/async non ancora comparse" con una nuova sezione (o un file `05`) che spieghi in prosa: limite del callback (annidamento, errori), Promise e stati, `then/catch`, `async/await` con `try/catch`, `fetch` con controllo di `response.ok` e `json()`, e il collegamento con l'event loop single-thread (task/microtask). Anche in `01-applicazioni-web-http.md`, dove si dice che le richieste "sono non bloccanti", rimandare a questa sezione: il non bloccante è proprio l'effetto di questo modello. Segnalare che questi contenuti sono extra rispetto alle slide, ma il corso userà richieste HTTP dal browser.
