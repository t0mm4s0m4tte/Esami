# Fonti: concorrenza lato server (thread-per-richiesta vs event loop di Node.js)

Legenda: [V] = letta in questa sessione; [NV] = non verificata.

## Fonti

1. **Don't Block the Event Loop (or the Worker Pool)** – Node.js project, documentazione ufficiale (sezione Learn). https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop [V]. Confronta esplicitamente un server "un thread per client" (tipo Apache), in cui il sistema operativo sospende i thread lenti, con Node, che serve molti client con pochi thread: un thread bloccato blocca tutti. Descrive i due tipi di thread (Event Loop e Worker Pool di libuv) e cosa blocca (JS sincrono lungo, regex vulnerabili, API `*Sync`, JSON enormi). Fonte principale, livello intermedio.
2. **The Node.js Event Loop** – Node.js project. https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick [V]. Node esegue il JavaScript su un thread, delega l'I/O al kernel quando possibile e riceve notifiche; le fasi (timers, poll, check, close...); `process.nextTick` e `setImmediate`. Nota: dettagli sull'ordine delle fasi cambiati da Node 20 (libuv 1.45).
3. **Introducing asynchronous JavaScript / Event loop** – MDN. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop [V]. Fornisce il modello generale (vedi file 03) valido anche in Node.
4. **Worker threads** – Node.js API docs. https://nodejs.org/api/worker_threads.html [NV: non aperta; è il riferimento per spostare calcolo CPU-intensivo fuori dall'event loop].
5. **libuv design overview** – libuv. http://docs.libuv.org/en/v1.x/design.html [NV: non aperta].

## Sintesi

Nel modello tradizionale (thread-per-richiesta, ad esempio Apache con thread o processi) ogni connessione è servita da un thread dedicato: il codice è lineare e semplice da scrivere, e se un thread attende il disco o il database è sospeso mentre gli altri proseguono. Il costo è memoria e cambi di contesto per ogni connessione, che limitano il numero di client contemporanei. Node.js sceglie un modello diverso: un solo thread esegue tutto il codice JavaScript e un event loop; le operazioni di rete e di I/O sono non bloccanti e delegate al kernel (o a un piccolo pool di worker di libuv per DNS, file system, crypto, compressione), e quando terminano si accoda un callback. Così con pochissimi thread si gestiscono moltissime connessioni inattive o in attesa, ideale per applicazioni I/O-bound.

Il prezzo è che il lavoro CPU-intensivo o il codice sincrono lungo non è preemptato da nessuno: congela tutti i client finché non termina. La documentazione ufficiale lo dice chiaramente: l'equità tra i client diventa responsabilità dell'applicazione. Le soluzioni sono suddividere il lavoro in pezzi piccoli o spostarlo in worker thread o processi separati. Le fonti non divergono: l'unica sfumatura è che "single-thread" va letto come "un solo thread per il codice JS", dato che Node ha comunque altri thread interni.

## Cosa correggere o aggiungere negli appunti

In `01-applicazioni-web-http.md`, nel dubbio sul confronto thread-per-richiesta contro loop asincrono, aggiungere i due paragrafi sopra (modello, vantaggi e limiti) e specificare che resta da collegare a ciò che dirà il docente. Precisare "single-thread" come sopra. Aggiungere una frase: Node è adatto a carichi I/O-bound, meno a calcolo pesante senza worker.
