# Fonti: metodi HTTP, idempotenza, status code, REST

Legenda: [V] = letta in questa sessione; [NV] = non verificata.

## Fonti

1. **RFC 9110: HTTP Semantics** – R. Fielding (Ed., Adobe), M. Nottingham (Ed., Fastly), J. Reschke (Ed., greenbytes), IETF, giugno 2022 (STD 97). https://www.rfc-editor.org/rfc/rfc9110.html [parzialmente verificata: titolo, autori, data e numeri di sezione confermati dall'indice (§9.2.1 Safe Methods, §9.2.2 Idempotent Methods, §15 Status Codes); il testo di queste sezioni non è stato letto in questa sessione]. Fonte normativa. Difficoltà alta, si consulta per le definizioni.
2. **HTTP request methods** – MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods [V]. Tabella con safe/idempotent/cacheable: `PUT` non safe, idempotente; `DELETE` non safe, idempotente; `PATCH` non safe e non idempotente (cacheable solo in casi particolari). Gli altri metodi (GET, HEAD, OPTIONS safe e idempotenti; POST né l'uno né l'altro) non sono nel riepilogo che ho ottenuto: li ricavo dalla definizione dell'RFC 9110 e vanno ricontrollati.
3. **HTTP response status codes** – MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status [V]. Classi 1xx-5xx e significato di 200, 201, 301, 302, 400, 401, 403, 404, 500. Livello base.
4. **REST (glossario)** – MDN Web Docs. https://developer.mozilla.org/en-US/docs/Glossary/REST [V]. Definizione sintetica di REST come insieme di vincoli architetturali e osservazione che "REST API" in pratica indica spesso qualsiasi servizio HTTP. L'elenco dei vincoli (client-server, stateless, cacheable, uniform interface, layered, code on demand) non è sulla pagina ma viene dalla tesi di Fielding.
5. **Architectural Styles and the Design of Network-based Software Architectures** (cap. 5, REST) – Roy T. Fielding, tesi di dottorato, UC Irvine, 2000. https://ics.uci.edu/~fielding/pubs/dissertation/top.htm [NV: URL noto, non aperto in questa sessione]. Fonte originale di REST.

## Sintesi

Oltre a GET (leggere una risorsa) e POST (inviare dati per creare o elaborare), HTTP definisce PUT (sostituire la risorsa all'URL indicato con il corpo inviato), DELETE (eliminarla) e PATCH (modificarla parzialmente). Un metodo è "safe" se non è pensato per cambiare lo stato del server (GET, HEAD, OPTIONS), ed è "idempotente" se ripetere la stessa richiesta più volte produce lo stesso effetto di una sola volta: lo sono tutti i safe più PUT e DELETE. POST non è né safe né idempotente (due POST uguali possono creare due risorse) e PATCH in generale non è idempotente. L'idempotenza conta perché il client può riprovare in sicurezza dopo un errore di rete.

Per gli status code: 200 OK è il successo generico; 201 Created segnala che una nuova risorsa è stata creata (tipico dopo POST); 301 Moved Permanently e 302 Found sono redirect rispettivamente permanente e temporaneo (il nuovo URL è nell'header `Location`); 400 Bad Request è una richiesta malformata; 401 Unauthorized significa in realtà "non autenticato"; 403 Forbidden significa autenticato ma non autorizzato; 404 Not Found risorsa inesistente; 500 Internal Server Error errore generico del server. Le classi sono 1xx informativi, 2xx successo, 3xx redirezione, 4xx errore del client, 5xx errore del server.

Un'API REST modella il dominio come risorse identificate da URL (`/articoli/42`) e le manipola con i metodi HTTP standard, senza stato di sessione sul server tra una richiesta e l'altra, e in genere con rappresentazioni JSON. Divergenza da segnalare: in pratica molte API dette "REST" non rispettano tutti i vincoli di Fielding; MDN lo ammette esplicitamente.

## Cosa correggere o aggiungere negli appunti

In `01-applicazioni-web-http.md` aggiungere una sezione con PUT/DELETE/PATCH e la distinzione safe/idempotente, una tabella o un paragrafo con i codici 200, 201, 301, 302, 400, 401, 403, 404, 500 (la sezione "Cose da saper fare" già chiede di riconoscere le categorie), e un paragrafo introduttivo su REST. Precisare che 401 vuol dire "non autenticato". Ricontrollare nell'RFC 9110 §9.2.1-9.2.2 la lista esatta dei metodi safe e idempotenti prima di impararla a memoria.
