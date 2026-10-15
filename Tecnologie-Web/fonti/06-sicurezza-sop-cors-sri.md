# Fonti: Same-Origin Policy, CORS, Subresource Integrity

Legenda: [V] = letta in questa sessione; [NV] = non verificata.

## Fonti

1. **Same-origin policy** – MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy [V]. Definisce l'origine (schema, host, porta) con una tabella di esempi e spiega cosa è consentito (scritture e incorporamento cross-origin) e cosa è bloccato (letture cross-origin).
2. **Cross-Origin Resource Sharing (CORS)** – MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS [V]. Header `Origin` (inviato dal browser) e `Access-Control-Allow-*` (inviati dal server), richieste semplici contro richieste con preflight (`OPTIONS`), credenziali, `Access-Control-Max-Age`.
3. **Subresource Integrity** – MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity [V]. Attributo `integrity` (`sha256/384/512-<base64>`) su `<script>` e `<link>`, necessità di `crossorigin="anonymous"` per le risorse di altri domini, generazione dell'hash con `openssl`.
4. **Introduction (Getting started)** – Bootstrap 5.3, documentazione ufficiale. https://getbootstrap.com/docs/5.3/getting-started/introduction/ [V]. Mostra il tag CDN (jsDelivr) di CSS e bundle JS con `integrity` e `crossorigin="anonymous"`, e spiega che l'hash cambia a ogni versione. Collegamento diretto al corso.
5. **Subresource Integrity** – W3C Recommendation. https://www.w3.org/TR/SRI/ [NV: non aperta].
6. **Fetch Standard (CORS protocol)** – WHATWG. https://fetch.spec.whatwg.org/ [NV: non aperta; è la specifica normativa di CORS].

## Sintesi

La Same-Origin Policy è una regola del browser: uno script caricato da un'origine (stessa combinazione di protocollo, host e porta) non può leggere le risposte di un'altra origine. Cambia anche solo la porta o `http` contro `https` e le origini sono diverse; il percorso non conta. La policy non vieta di incorporare risorse altrui (immagini, script, fogli di stile da una CDN) né di inviare form: vieta di leggerne il contenuto da JavaScript. Quindi un `fetch` verso un altro dominio parte, ma lo script riceve la risposta solo se il server la autorizza.

CORS è il meccanismo con cui il server può rilassare la regola: risponde con `Access-Control-Allow-Origin` indicando quali origini possono leggere la risposta. Per richieste "non semplici" (metodi come PUT/DELETE, header personalizzati, `Content-Type: application/json`) il browser prima manda una richiesta di preflight `OPTIONS` e procede solo se il server approva. Un errore CORS si risolve quindi lato server, non nel client; è una protezione del browser, non del server (un client come curl non la applica).

SRI affronta un problema diverso: fidarsi di uno script caricato da una CDN. Il tag porta l'hash atteso del file nell'attributo `integrity`; il browser lo calcola sul file scaricato e lo esegue solo se coincide, proteggendo da una CDN compromessa. Per risorse cross-origin serve `crossorigin="anonymous"`, perché la verifica richiede una richiesta in modalità CORS (e la CDN deve inviare gli header CORS adatti). Non c'è divergenza tra le fonti.

## Cosa correggere o aggiungere negli appunti

In `04-bootstrap.md` (dove compaiono i tag CDN) aggiungere due frasi su cosa fanno `integrity` e `crossorigin` e perché l'hash va aggiornato cambiando versione. In `01-applicazioni-web-http.md` o `03-...` aggiungere un breve riquadro "Sicurezza" con SOP e CORS, usando le definizioni sopra, e specificare che essi si incontreranno quando il front-end farà `fetch` verso un back-end con origine diversa (es. porte diverse in sviluppo).
