# Fonti: `this` nelle arrow function, `classList.contains`

Legenda: [V] = letta in questa sessione; [NV] = non verificata.

## Fonti

1. **Arrow function expressions** – MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions [V]. Dice che le arrow function non hanno binding propri di `this`, `arguments`, `super` e non vanno usate come metodi. Ha un esempio con oggetto letterale in cui `b: () => ...` non vede l'oggetto mentre `c() {...}` sì, e uno con arrow dentro un metodo (`setTimeout`) che invece cattura il `this` del metodo. Precisa che `call/apply/bind` non cambiano il `this` di una arrow. Fonte principale.
2. **ECMAScript Language Specification, sezione "Arrow Function Definitions"** – Ecma International, TC39. https://tc39.es/ecma262/ [NV: non aperta; è la fonte normativa, non ho verificato il numero di sezione].
3. **this** – MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this [NV: non aperta, esiste di norma come riferimento sul comportamento di `this` nei vari contesti].
4. **Element.classList** – MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/API/Element/classList [V]. Elenca `add`, `remove`, `replace`, `toggle(token, force)`; nel suo esempio usa `classList.contains("foo")`, e non esiste alcun `has()`. Attenzione: il riepilogo che ho ottenuto non elencava `contains` tra i metodi della pagina, ma lo usa nell'esempio; la pagina di `DOMTokenList` ne dà la definizione.
5. **DOM Standard, interfaccia DOMTokenList** – WHATWG. https://dom.spec.whatwg.org/#interface-domtokenlist [parzialmente verificata: ho confermato che la sezione esiste nell'indice, ma non ho letto l'IDL; `contains` è nell'IDL secondo la mia conoscenza, da ricontrollare].

## Sintesi

Una arrow function non crea un proprio `this`: lo prende lessicalmente dallo scope in cui è scritta. Se la scrivi come proprietà di un oggetto letterale (`{ nome: "x", saluta: () => this.nome }`), lo scope che la contiene non è l'oggetto (un letterale non crea scope), ma quello esterno: in uno script del browser è `window` (quindi `this.nome` vale `undefined`), in un modulo ES o in strict mode a livello superiore può essere `undefined` (e allora l'accesso a una proprietà lancia errore). Perciò l'ipotesi degli appunti ("`this` è quello dello scope in cui l'arrow è definita") è corretta e confermata da MDN; si può togliere il "da riconfermare con il docente" per la parte fattuale. La conseguenza pratica: per i metodi di un oggetto usare la sintassi a metodo (`saluta() {...}`) o `function`; usare le arrow per le callback dentro un metodo, dove ereditano il `this` del metodo.

Per `classList`, il metodo che verifica la presenza di una classe è `contains`; `has` non esiste (è il nome usato da `Set` e `Map`, probabile fonte della confusione nella slide).

## Cosa correggere o aggiungere negli appunti

In `03-javascript-dom-typescript.md`: nel punto "Dubbi" su `classList.has` togliere `[DA VERIFICARE]` e scrivere che è un errore della slide, il metodo è `contains`. Riscrivere il punto su `this` come fatto confermato, aggiungendo l'esempio oggetto-con-arrow contro oggetto-con-metodo e la nota su `call/apply/bind` che non hanno effetto sulle arrow. Il refuso `settAttribute` resta un semplice refuso per `setAttribute` (non ho cercato una fonte specifica perché banale).
