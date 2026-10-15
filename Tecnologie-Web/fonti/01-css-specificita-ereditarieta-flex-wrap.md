# Fonti: specificità CSS, ereditarietà, flex-wrap

Domanda: come si calcola la specificità, come interagiscono !important e ordine, quali proprietà ereditano, quali sono i valori di `flex-wrap`.

Legenda: [V] = pagina letta in questa sessione; [NV] = non verificata (non letta o letta solo in parte).

## Fonti

1. **CSS Cascading and Inheritance Level 4** – W3C CSS Working Group, Candidate Recommendation Snapshot, 13 gennaio 2022. https://www.w3.org/TR/css-cascade-4/ [V]. Specifica normativa: §6.1 definisce l'ordine di ordinamento della cascata (origine/importanza, contesto, specificità, ordine di apparizione), §7.2 l'ereditarietà. Utile come fonte "ufficiale" da citare all'esame. Difficoltà alta, linguaggio da specifica. Nota: esistono versioni più recenti (Level 5); questa è lo snapshot che ho letto.
2. **Specificity** – MDN Web Docs (Mozilla), pagina continuamente aggiornata. https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Specificity [V]. Spiega il peso a tre componenti ID-CLASSE-TIPO, cosa vale zero (`*`, combinatori, `:where()`), come `:is()/:not()/:has()` prendono la specificità dell'argomento più specifico, il ruolo di `!important` e dello stile inline. Livello base-intermedio, la migliore fonte didattica.
3. **Inheritance** – MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Inheritance [V, letto fino a 100000 caratteri]. Distingue proprietà ereditate e non, e spiega `inherit`, `initial`, `unset`, `revert`. Attenzione: l'elenco di proprietà che ereditano nel riepilogo è conoscenza generale, non una lista della pagina; per ogni proprietà si controlla la riga "Inherited: yes/no" nella sua pagina di riferimento.
4. **flex-wrap** – MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap [V]. Valori: `nowrap` (iniziale), `wrap`, `wrap-reverse`, più il recente `balance`, oltre alle parole chiave globali. Conferma che `true` non è valido.
5. **CSS Flexible Box Layout Module Level 1** – W3C. https://www.w3.org/TR/css-flexbox-1/ [NV: non aperta in questa sessione; l'URL è quello standard della specifica, da controllare].

## Sintesi

Le fonti concordano su tutto l'essenziale. La cascata decide quale dichiarazione vince quando più regole colpiscono la stessa proprietà dello stesso elemento. Prima conta l'origine e l'importanza: le dichiarazioni `!important` battono quelle normali, e (per quelle importanti) l'ordine delle origini si inverte rispetto al normale. A parità di importanza si confronta la specificità del selettore, un peso a tre numeri (ID, classi/attributi/pseudo-classi, tipi/pseudo-elementi) confrontati da sinistra a destra, non sommati come un unico numero: dieci classi non battono mai un ID. Lo stile scritto nell'attributo `style` supera qualunque selettore nel foglio di stile, ed è battuto solo da `!important`. Se anche la specificità è pari, vince la dichiarazione che compare per ultima nel documento (gli `@import` contano come se fossero scritti nel punto dell'import). Il selettore universale e i combinatori valgono zero.

Sull'ereditarietà: ogni proprietà è definita come ereditata o no. Se per un elemento non c'è alcun valore dichiarato e la proprietà è ereditata, prende il valore calcolato del genitore; altrimenti prende il valore iniziale. Tipicamente ereditano le proprietà del testo (`color`, `font-*`, `line-height`, `text-align`, `visibility`), non ereditano quelle del box (`margin`, `padding`, `border`, `background`, `display`, `width`). `inherit` forza l'ereditarietà, `initial` ripristina il valore iniziale, `unset` si comporta come `inherit` o `initial` a seconda della proprietà.

Divergenze: nessuna sostanziale. MDN aggiunge elementi più recenti rispetto allo snapshot W3C del 2022 (cascade layers, `@scope`, `balance` per `flex-wrap`), che quasi certamente il corso non tratta.

## Cosa correggere o aggiungere negli appunti

In `02-html-css.md`: sostituire la riga "Dubbi" su `flex-wrap: true` con una correzione certa (non più `[DA VERIFICARE]`): i valori validi sono `nowrap`, `wrap`, `wrap-reverse` (`true` non è valido, la slide è sbagliata; `balance` esiste ma è nuovo). Aggiungere nel paragrafo sulla cascata una spiegazione dell'algoritmo: ordine di confronto importanza, specificità (ID-CLASSE-TIPO, confronto lessicografico), ordine di scrittura; aggiungere che lo stile inline vale più di qualsiasi selettore e che `!important` si usa il meno possibile. Aggiungere un breve paragrafo sull'ereditarietà con gli esempi sopra e le parole chiave `inherit/initial/unset`. Esempio utile da inserire: `#a` (1-0-0) batte `.x .y .z` (0-3-0).
