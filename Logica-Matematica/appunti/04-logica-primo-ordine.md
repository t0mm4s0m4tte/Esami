# 04 - Logica del primo ordine: sintassi e semantica
Fonte: Drive "Logica Matematica - Appunti" (Linguaggi del primo ordine, Termini, Formule, Variabili libere e vincolate, Strutture, Interpretazione, Conseguenza logica/validità/soddisfacibilità), "Formulario", "Sintesi" §2-3. (ET) = esercizio tipo svolto da me.

## Mappa

La logica proposizionale non può esprimere frasi come "ogni numero ha un successore", perché non guarda dentro le proposizioni. Il primo ordine aggiunge ciò che manca: un linguaggio L = Const ∪ Fun ∪ Rel (simboli con arietà), le variabili Vbl, l'uguaglianza =, i connettivi ¬∧∨→↔ e i quantificatori ∀∃. Il capitolo segue lo schema già visto: prima la sintassi (termini, formule atomiche e composte, variabili libere e vincolate, enunciati), poi la semantica (L-strutture, assegnazioni, interpretazione di termini e formule), infine verità, validità, soddisfacibilità e conseguenza per gli enunciati.

- [Sintassi](#sintassi)
- [Variabili libere/vincolate](#variabili-liberevincolate)
- [Semantica](#semantica)
- [Esempi dalle fonti](#esempi-dalle-fonti)
- [Esercizi tipo (ET)](#esercizi-tipo-et)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## Sintassi
Nel primo ordine esistono due categorie sintattiche distinte, e confonderle è l'errore più frequente. I **termini** denotano *elementi* dell'universo (non verità): Term0=Vbl∪Const e Term(n+1)=Term(n) ∪ {f(t1..tk) | k=ar(f)}. Un simbolo di relazione non costruisce mai termini, per cui f(R(x,y)) è un errore: le relazioni producono formule, le funzioni producono termini. Anche qui ht(t) è il minimo n con t∈Term(n), cioè l'altezza dell'albero meno uno, e lh è il numero di simboli. Un esempio dalla fonte: h(f(h(x,z,g(f(c),y))),g(x,f(g(z,y))),f(h(f(z),h(y,c,x),z))), con ar f=1, g=2, h=3, ha lh=48 e ht=5 (ricontrollato: 48 simboli senza virgole, profondità di parentesi 5).

Le stringhe senza virgole si analizzano così:
1. se il primo simbolo è una variabile o una costante, è il primo argomento t1;
2. se è un simbolo di funzione h, t1 arriva fino alla ")" che bilancia h;
3. si ripete finché non si sono letti ar(f) argomenti.

Per esempio f(g(g(x))cf(g(z)xg(c))) con ar f=3 dà t1=g(g(x)), t2=c, t3=f(g(z)xg(c)). Se l'arietà è violata (f(xx) con ar f=1, oppure h(abx) senza parentesi) la stringa non è un termine. Un caso istruttivo: i termini nel linguaggio L={+,·,1} sono esattamente i polinomi a coefficienti in ℕ, per esempio +(+(·(x,x),·(+(1,1),x)),1) rappresenta x²+2x+1, e 3 si costruisce come 1+(1+1).

Le **formule atomiche** sono R(t1..tn) con n=ar(R), oppure t1=t2 (un solo simbolo "="). Le formule si ottengono da quelle atomiche con (¬φ), (φ□ψ), (∀xφ), (∃xφ); come prima Fml0 sono le atomiche, Fml(n+1) aggiunge l'applicazione di una regola, e ht(φ) è l'altezza dell'albero meno uno. La costante logica principale si riconosce dal secondo simbolo:
- se è ¬, la formula è una negazione;
- se è ∀ o ∃, è un quantificatore e la sottoformula è tutto ciò che segue la variabile;
- se è "(", il connettivo principale è quello che segue la ")" bilanciata.

Sulle priorità c'è un punto in cui sbagliare è facile. ¬, ∀ e ∃ legano più di tutti, ma legano soltanto la formula atomica o parentesizzata che li segue; subito dopo vengono ∧ e ∨, infine → e ↔, con associazione a destra. Quindi ∀zP(z)→Q(z) significa (∀zP(z))→Q(z), e per far entrare Q nel raggio del quantificatore servono le parentesi: ∀z(P(z)→Q(z)). Un esempio dalla fonte: ∃xP(x)→∀zR(z,y)∧g(x)=f(x,y) si legge (∃xP(x))→((∀zR(z,y))∧(g(x)=f(x,y))).

## Variabili libere/vincolate
Ci si riferisce alle singole **occorrenze** di una variabile, non alla lettera: un'occorrenza è vincolata se compare subito dopo ∀/∃ o nel raggio d'azione di un quantificatore su quella variabile, altrimenti è libera. Ne consegue che la stessa lettera può essere libera in un punto e vincolata in un altro della stessa formula. L'insieme FV delle variabili libere si calcola per ricorsione:
- per una formula atomica sono tutte quelle che vi compaiono;
- FV(¬ψ)=FV(ψ);
- FV(ψ□χ)=FV(ψ)∪FV(χ);
- FV(∀xψ)=FV(∃xψ)=FV(ψ)∖{x}.

Sull'albero basta risalire dalla foglia verso la radice: se si incontra ∀x o ∃x su quella variabile l'occorrenza è vincolata, altrimenti è libera.

Un **enunciato** è una formula con FV=∅: è l'unica a cui ha senso chiedere se "vale" in una struttura senza assegnazioni. Scrivere φ(x1..xn) significa FV(φ)⊆{x1..xn}, un limite superiore. Esempio dalla fonte: in ((∃x f(x,y)=c)→((∀zR(z))∨S(z))) la x è vincolata, la y è libera, e la z di R(z) è vincolata da ∀z mentre quella di S(z) è **libera**.

## Semantica
Dare significato a una formula del primo ordine richiede di fissare un mondo in cui interpretarla. Una **L-struttura** A è una tupla ⟨A, R^A⊆A^n, f^A:A^n→A, c^A∈A⟩ con dominio A≠∅, in cui a ogni simbolo di relazione corrisponde una relazione, a ogni simbolo di funzione una funzione *totale* e a ogni costante un elemento. Per questo ⟨ℕ,−⟩ NON è una struttura (3−5∉ℕ); simboli distinti possono comunque avere la stessa interpretazione. Una **assegnazione** a1/x1,… associa elementi del dominio alle variabili. I termini si valutano per ricorsione, t^A[ā/x̄]: una variabile vale l'elemento assegnato, una costante vale c^A, f(t1..tk) vale f^A(t1^A,…,tk^A); il risultato dipende solo dalle variabili che vi occorrono.

Le formule si valutano nello stesso modo: t=s è vera se i due termini denotano lo stesso elemento, R(t1..tk) è vera se (t1^A,…,tk^A)∈R^A, i connettivi funzionano come nel proposizionale. I quantificatori sono il punto nuovo: A⊧∃yψ se esiste b∈A tale che ψ è vera sostituendo b a y, A⊧∀yψ se ciò vale per ogni b∈A. In entrambi i casi l'assegnazione data alla variabile quantificata viene ignorata (sovrascritta). Esempio: ∃z(P(x,z)∧P(z,y)) in ⟨ℕ,<⟩ con 2/x, 4/y, 4/z è vera con z=3, e l'assegnazione 4/z non conta. Dalle flashcard della fonte, in (ℝ,+,·,0): f(g(z,z),y) con y=-2, z=√2 dà 2-2=0; g(f(c,c),g(c,c))=0; f(c,f(g(x,c),y)) con x=2/3, y=-2 dà -2.

A partire da qui le nozioni sono le stesse del proposizionale, con "struttura" al posto di "interpretazione". Una formula è valida (⊧φ) se è vera in **ogni** struttura, soddisfacibile se esiste una A⊧φ, insoddisfacibile se non ne esiste nessuna; per insiemi Γ, anche infiniti, A⊧Γ significa A⊧ogni elemento di Γ. La conseguenza Γ⊧φ vale quando ogni A⊧Γ ha A⊧φ, e restano validi i ponti già noti: φ valida ⇔ ¬φ insoddisfacibile; Γ⊧φ ⇔ Γ∪{¬φ} insoddisfacibile; ψ1..ψn⊧φ ⇔ ⊧(ψ1∧…∧ψn)→φ; φ≡ψ ⇔ stessi modelli ⇔ ⊧φ↔ψ. Il simbolo ⊧ ha quindi tre usi da non confondere:
- A⊧φ[ā/x̄]: soddisfazione;
- ⊧φ: validità;
- Γ⊧φ: conseguenza.

La differenza decisiva rispetto al proposizionale è metodologica: non esiste una tavola di verità, perché le strutture sono infinite e di ogni taglia. Per dimostrare soddisfacibilità, non-validità o non-conseguenza si **esibisce una struttura** (un modello o un contromodello); per dimostrare validità o conseguenza bisogna ragionare **per ogni struttura**, con un argomento generale.

Le regole sui quantificatori vanno conosciute con precisione, perché qui sta metà degli errori:
- le negazioni scambiano i quantificatori: ¬∀xP ≡ ∃x¬P e ¬∃xP ≡ ∀x¬P;
- ∃ distribuisce su ∨ con equivalenza, ma su ∧ solo come conseguenza: ∃x(P∧Q)⊧∃xP∧∃xQ, e non viceversa;
- dualmente ∀ distribuisce su ∧ con equivalenza, mentre su ∨ vale solo (∀xP∨∀xQ)⊧∀x(P∨Q) (ogni numero è pari o dispari, ma non vale che tutti siano pari o tutti dispari);
- l'ordine dei quantificatori cambia il senso: ∀x∃y x<y è vera in ℕ, mentre ∃y∀x x<y è falsa perché non c'è un massimo.

## Esempi dalle fonti
Gli esempi delle fonti mostrano bene come la stessa formula cambi verità al cambiare della struttura. ∀x∀y∃z(z+y=x) è vera in ℤ, falsa in ℕ (manca la sottrazione) e falsa anche in ℤ se + viene interpretato come prodotto; analogamente ∃x∀yP(x,y) è vera in ⟨ℕ,≤⟩ (con x=0) ma falsa in ⟨ℤ,≤⟩ e in ⟨ℕ,≥⟩, perché lì manca un minimo o un massimo. La densità ∀x∀y(R(x,y)→∃z(z≠x∧z≠y∧R(x,z)∧R(z,y))) è vera in ⟨ℝ,<⟩ e falsa in ⟨ℤ,<⟩, mentre la suriettività ∀y∃x f(x)=y è soddisfacibile ma non valida.

Molte proprietà note si lasciano scrivere come insiemi di enunciati. Un'**equivalenza** soddisfa {∀xR(x,x), simmetria, transitività}; un **ordine** soddisfa {rifl, antisim ∀x∀y(R(x,y)∧R(y,x)→x=y), trans}; e l'indipendenza degli assiomi si mostra con una struttura che ne soddisfa alcuni ma non altri, per esempio ⟨ℕ,≤⟩ soddisfa rifl+trans ma non la simmetria. Due esempi più fini: la primalità in L={f,c}, con φ: ∀x∀y(f(x,y)=c→∀z f(x,z)=z ∨ ∀z f(y,z)=z), è soddisfatta da ⟨ℕ,·,17⟩ ma non da ⟨ℕ,·,12⟩ (si ricordi che ∀z f(x,z)=z definisce x=1); la linearità ∀x∀y(R(x,y)∨R(y,x)) in ⟨Div(k),|⟩ è vera se e solo se k è potenza di un primo, quindi per 1≤k≤10 vale per k∈{1,2,3,4,5,7,8,9} ed è esclusa per 6 e 10.

## Esercizi tipo (ET)
- **ET1** Calcola ht e FV di (∀x(P(x,y)→∃z R(z,x)))∨S(z). ht: atomiche 0; ∃zR(z,x): 1; P(x,y)→∃zR: 2; ∀x(…): 3; ∨ con S(z): 4. FV={y,z} (z di S(z) libera; z di R(z,x) vincolata da ∃z).
- **ET2** In ⟨ℕ,<⟩ valuta ∀x∃y(x<y) e ∃y∀x(x<y): prima vera (y=x+1), seconda falsa (nessun y maggiore di tutti, nemmeno di sé stesso: y<y falso). Dunque ∀x∃yP ⊭ ∃y∀xP: contromodello ⟨ℕ,<⟩.
- **ET3** Mostra ∀x(S(x)→P(x)), ∀x(A(x,c)→S(x)) ⊧ ∀x(A(x,c)→P(x)): sia A⊧premesse, a∈A con A(a,c); dalla 2ª S(a); dalla 1ª P(a). Vale per ogni A e a: conseguenza.
- **ET4** ∃x(P(x)∧Q(x)) ⊧ ∃xP(x)∧∃xQ(x) vale; il viceversa no: A=⟨{0,1},P={0},Q={1}⟩ rende vera la conclusione ma ∃x(P∧Q) falsa.
- **ET5** L={R}, ∀x R(x,x) è soddisfacibile (⟨ℕ,≤⟩) e non valida (⟨ℕ,<⟩).
- **ET6** Valuta in ⟨ℕ,<⟩ con 2/x,3/y: ∃z(x<z∧z<y): servirebbe n con 2<n<3 -> falsa; con 2/x,4/y -> vera (n=3).

## Esercizi svolti collegati

Per la sintassi e le variabili libere/vincolate vedi [file 08 §9](08-esercizi-ed-esami-svolti.md#9-sintassi); per la semantica ([§10](08-esercizi-ed-esami-svolti.md#10-semantica-del-primo-ordine)) ci sono la valutazione di termini e formule con un'assegnazione, gli insiemi di verità in strutture aritmetiche e in ⟨N, |⟩, la verità degli enunciati nelle strutture finite o numeriche, la soddisfacibilità e validità di enunciati con funzioni iniettive, la conseguenza logica con controesempio costruito (per esempio ∃x(P→Q) non implica ∃xP→∃xQ). Agli esami la semantica compare come [quesiti sulle variabili libere e sull'insieme di verità](08-esercizi-ed-esami-svolti.md#1-esercizio-1-quesiti-a-risposta-multipla) e nell'[Esercizio 2](08-esercizi-ed-esami-svolti.md#2-esercizio-2-ordini-reticoli-strutture-e-conseguenza-logica), dove si dimostra o si confuta una conseguenza logica e si calcolano gli insiemi di verità φ, ψ e π in ⟨N, |⟩ (il calcolo di π(A) del 23 settembre ha un errore nella soluzione ufficiale, segnalato nel file). Le notazioni delle quattro versioni cambiano solo nei nomi.

## Cose da saper fare all'esame
- Dire se una stringa è termine/formula; ht, lh, albero; sottoformule; costante principale; ripristinare parentesi dalle priorità.
- Elencare FV e classificare ogni occorrenza di variabile; riconoscere enunciati.
- Valutare termini e formule in una L-struttura con assegnazione (ricorsione sull'albero).
- Dimostrare/confutare validità, soddisfacibilità, conseguenza, equivalenza con strutture esplicite (⟨ℕ,<⟩, ⟨ℤ,≤⟩, ⟨ℝ,<⟩, strutture finite {a,b,c} con relazioni disegnate).
- Distinguere verità per enunciati (struttura) e per formule aperte (struttura + assegnazione).

## Dubbi
- [DA VERIFICARE] Priorità in FOL: la fonte pone ∧,∨ sullo stesso livello "media" e →,↔ "minima", mentre per la proposizionale elenca ¬>∧>∨>→>↔. Chiedere al prof se all'esame ∧ e ∨ si possono mescolare senza parentesi.
- [DA VERIFICARE] Nel documento, ∃/∀ sono a volte resi come "∃" attaccato e simboli ð/ð«/𝔄 sono artefatti di conversione (struttura 𝔄, P(·)).
- [DA VERIFICARE] Esempio fonte "(+((x,x),1)=0) traduce x²+1=0": la stringa riportata è malformata (doppia parentesi); intende +(·(x,x),1)=0.
- [DA VERIFICARE] Esempio ht(φ)=4 con albero altezza 5 per ∃x(¬R(x,c)∧(P(x)→f(x)=c)): coerente con la regola ht=altezza albero-1.
- ET1-ET6 sono miei, non delle fonti.
