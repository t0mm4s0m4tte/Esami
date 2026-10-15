# 05 - Formalizzazione (italiano -> logica del primo ordine)
Fonte: Drive "Logica Matematica - Appunti" (Formalizzazione, Esercizi di Formalizzazione, Simboli logici pt.2 §8), "Formulario" (pattern), "Sintesi" §5 e §10. (ET) = esercizio tipo svolto da me.

## Mappa
Formalizzare significa tradurre una frase in italiano in una formula del primo ordine, ed è la parte del corso che più si impara con l'allenamento. Il capitolo raccoglie le regole di traduzione (∀→, ∃∧, negazioni), i pattern ricorrenti (aritmetici, di conteggio e unicità, di parentela), il modo di ricavare formule da diagrammi di Hasse o grafi, e le scelte preliminari di linguaggio e universo del discorso, che condizionano tutto il resto.

## Procedura
Prima di scrivere una formula bisogna decidere in che mondo si sta parlando, e per questo conviene seguire sempre gli stessi passi.
1. Fissa il **linguaggio** L (costanti, funzioni, relazioni con arietà) e l'**universo del discorso**: se è ℝ serve un predicato N(x) per restringere a ℕ, se è ℕ no.
2. Individua costanti (nomi propri), predicati (proprietà e legami), funzioni (c(x)="capoufficio di x").
3. Traduci secondo le regole d'oro e controlla le variabili libere: un enunciato ne ha 0, una "proprietà di x" ne ha 1.
4. Se manca una costante (per esempio 2) costruiscila: 2 = 1+1 (**de-sugaring**).

## Regole d'oro
Quasi tutti gli errori di formalizzazione vengono dall'abbinare male quantificatore e connettivo. La coppia canonica è questa:
- "Ogni P è Q" si traduce con **∀x(P(x)→Q(x))**;
- "Esiste un P che è Q" con **∃x(P(x)∧Q(x))**.

Le combinazioni ∀∧ e ∃→ sono quasi sempre errori: ∀x(P∧Q) afferma che tutto è P, ∃x(P→Q) è banalmente vera appena c'è un elemento che non è P. Le negazioni seguono dalle equivalenze del file 04: "Nessun P è Q" è ∀x(P→¬Q) ≡ ¬∃x(P∧Q); "Non tutti i P sono Q" è ∃x(P∧¬Q), e va distinta da "tutti i P sono non-Q" (un "non tutti sono onesti" non vuol dire "tutti disonesti").

L'ordine dei quantificatori cambia il significato: in ∀x∃y la y può dipendere da x, in ∃y∀x no. Questo permette di esprimere sfumature come "arbitrariamente grandi", ∀x∃y(x<y∧P(y)), contro "sufficientemente grandi", ∃x∀y(x<y→P(y)). Una equivalenza utile per spostare i quantificatori è ∀x∀y∀z(G(y,x)∧G(z,y)→A(x,z)) ≡ ∀x∀y(∃z(G(z,x)∧G(y,z))→A(x,y)). Sul piano della notazione, quella infissa si associa a destra (t1+t2+t3 = t1+(t2+t3)), e i predicati unari di restrizione vanno aggiunti solo se l'universo è più grande del dominio dell'enunciato.

## Pattern aritmetici (Formulario/Sintesi)
Le proprietà aritmetiche si esprimono con pochi schemi che conviene ricordare a memoria, perché ricompaiono in quasi ogni esame. Il punto concettuale è che zero e uno si definiscono tramite il loro comportamento (elemento neutro di + e di ·), e da questi si costruiscono pari e primi; il "sup" si definisce come il minimo dei maggioranti, replicando la definizione del file 06.

| Proprietà | Formula (x libera) |
|---|---|
| x pari | ∃y(x=y+y) |
| x dispari | ¬∃y(x=y+y) |
| x zero (⟨ℕ,+⟩) ψ0(x) | ∀y(x+y=y) |
| x uno (⟨ℕ,·⟩) ψ1(x) | ∀y(x·y=y) |
| x primo in ⟨ℕ,+,·⟩ | ¬ψ0(x) ∧ ¬ψ1(x) ∧ ∀y∀z(y·z=x → y=x ∨ z=x) |
| x primo in ⟨ℕ,·,1⟩ | ¬(x=1) ∧ ∀y∀z(y·z=x → y=1 ∨ z=1) |
| x primo in ⟨ℕ,1,<,+,\|⟩ | 1<x ∧ ∀y(y\|x → y=1 ∨ y=x) |
| z maggiorante di x,y | ψ(x,y,z)= x≤z ∧ y≤z |
| z = sup{x,y} | ψ(x,y,z) ∧ ∀w(ψ(x,y,w)→z≤w) |
| ogni elemento non nullo ha inverso | ∀x(¬∀z(z·x=x) → ∃y∀z((y·x)·z=z)) |
| ogni primo >2 è dispari (senza costante 2) | ∀x(1+1<x ∧ pr(x) → ¬((1+1)\|x)) |

Per una proprietà come "x è primo" si lascia **x libera**: è una proprietà di x, non un enunciato.

## Conteggio e identità (si usa "=")
Per dire quanti elementi hanno una proprietà serve l'uguaglianza, perché solo con essa si possono dichiarare distinti due elementi:
- **almeno due P**: ∃x∃y(x≠y∧P(x)∧P(y));
- **almeno tre P**: si aggiunge un terzo elemento distinto dagli altri due, ∃x∃y∃z(x≠y∧x≠z∧y≠z∧P(x)∧P(y)∧P(z));
- **al più** è la negazione di "almeno uno in più": al più 2 Q è ¬∃x∃y∃z(distinti ∧ Q(x)∧Q(y)∧Q(z)), e al più 1 è ∀x∀y(P(x)∧P(y)→x=y);
- **esattamente** combina i due: **esiste un unico P** è ∃x(P(x)∧∀y(P(y)→y=x)), ed "esattamente 2" è "almeno 2" e "al più 2".

Con lo stesso strumento si esprimono proprietà delle funzioni: f iniettiva è ∀x∀y(f(x)=f(y)→x=y), f suriettiva è ∀y∃x(f(x)=y), e l'elemento neutro o lo zero si scrivono come sopra.

## Parentele (B(x,y)= x genitore di y, D(x)= x maschio)
Le parentele si costruiscono componendo la sola relazione di genitorialità:
- **fratelli/sorelle** y e z: hanno un genitore comune e sono diversi, ∃x(B(x,y)∧B(x,z)∧y≠z);
- **nonno** x di y: è il genitore di un genitore, ∃w(B(x,w)∧B(w,y));
- **zio** y di z: è fratello di un genitore di z, ed è maschio, ∃w∃x(B(w,z)∧B(x,w)∧B(x,y)∧w≠y) ∧ D(y); per la zia si usa ¬D(y).

## Esercizi dalle fonti
Gli esercizi delle fonti si dividono in tre famiglie. Quelli aritmetici sfruttano i pattern della tabella: "primo tra due quadrati consecutivi" (con ·,<,1,+,P) è ∀x(1<x → ∃z(P(z)∧x·x<z<(x+1)·(x+1))); "primi p, p+k arbitrariamente grandi" è ∀x∀y∃z(y<z∧P(z)∧P(z+x)∧¬∃w(z<w<z+x∧P(w))); "il più piccolo primo è pari" è ∀x(P(x)∧∀y(P(y)∧y≠x→x<y)→∃z(x=z+z)); infine "ogni naturale ≠0 è somma di due naturali distinti" in ℕ è ∀x(x≠0→∃y∃z(y≠z∧y+z=x)), mentre in ℝ servono i predicati N(·) su x, y, z.

Quelli in linguaggio naturale mettono alla prova la scelta di costanti e funzioni. Barbara (b), amica di Donatella (c), ama il teatro e non il cinema: A(b,c)∧T(b)∧¬C(b); si noti che c è qui una costante (Donatella) mentre nell'esercizio di Ugo è una funzione (capoufficio), perché la scelta dipende dalla struttura. Il "ladro gentiluomo" dà ∀x(L(x)→¬O(x)) ∧ ∃x(L(x)∧G(x)∧O(x)), le cui due parti sono contraddittorie (nessun ladro onesto contro un ladro gentiluomo onesto). Il modus tollens di Andrea è ∀x(T(x)→B(x))∧¬B(a) → ¬T(a), e "se ci sono almeno due P allora f è suriettiva" è ∃x∃y(P(x)∧P(y)∧x≠y)→∀y∃x f(x)=y. Nell'esercizio Ugo/capoufficio (c(x), I impiegato, B lavora bene, L(x,y)=x licenzia y) l'ingiustizia è ∃x(I(x)∧B(x)∧L(c(x),x)), "il capo di Ugo non licenzia chi lavora bene" è ∀x(I(x)∧B(x)→¬L(c(u),x)) e "chi non lavora bene è licenziato salvo Ugo" è ∀x(I(x)∧¬B(x)∧x≠u→L(c(x),x)). Nell'esame di logica, chi non studia e non svolge alcun esercizio non supera l'esame: ¬S(x)∧∀y(E(y)→¬F(x,y)) → ¬P(x,f(l)) (sotto ∀x).

L'ultima famiglia è geometrica: "per due punti distinti passa una e una sola retta" combina esistenza e unicità in ∀x∀y(P(x)∧P(y)∧x≠y→∃z(R(z)∧Q(x,z)∧Q(y,z)∧∀w(R(w)∧Q(x,w)∧Q(y,w)→z=w))).

## Formule da diagrammi (Sintesi §10)
Un diagramma di Hasse o un grafo si traduce in logica descrivendo la posizione dei nodi con la sola relazione disponibile. Le proprietà elementari sono:
- x è massimo: ∀y(y≤x); minimo: ∀y(x≤y);
- "ha due predecessori distinti": ∃y∃z(y≠z∧R(y,x)∧R(z,x));
- una catena stretta di lunghezza 2 sotto x: ∃y∃z(y≤x∧z≤y∧x≠y∧y≠z).

La strategia è costruire a strati: prima le formule semplici per i nodi vicini a minimo e massimo, poi quelle più complesse in funzione della distanza da essi. Per isolare un nodo si contano gli archi entranti e uscenti e si sfrutta la proprietà che lo rende unico.

## Esercizi tipo (ET)
- **ET1** "Ogni numero pari maggiore di 2 è somma di due primi" (L={+,·,<,1,P}): ∀x((∃y x=y+y)∧(1+1)<x → ∃u∃v(P(u)∧P(v)∧x=u+v)).
- **ET2** "C'è un massimo" (L={R}): ∃x∀y R(y,x). La sua negazione: ∀x∃y ¬R(y,x) (ogni x ha qualcuno non sotto di sé).
- **ET3** "Esiste esattamente un P e ogni P è Q": ∃x(P(x)∧∀y(P(y)→y=x))∧∀x(P(x)→Q(x)).
- **ET4** "Nessuno studente che ha studiato è bocciato": ∀x(St(x)∧S(x)→¬B(x)). Trappola: "chi studia passa" (S→P) non equivale a "chi non studia non passa" (¬S→¬P); la contronominale è ¬P→¬S.
- **ET5** In ⟨ℕ,|⟩: "x è primo" in linguaggio {|,1}: x≠1 ∧ ∀y(y|x→y=1∨y=x) (se 1 è costante).

## Cose da saper fare all'esame
- Memoria dei pattern: pari, dispari, zero, uno, primo (3 versioni), sup, inverso; parentele (fratello, nonno, zio).
- Tradurre frasi con "ogni / esiste / nessuno / almeno n / al più n / esattamente uno" scegliendo linguaggio e universo; sapere quando serve il predicato di restrizione.
- Leggere una formula e dire cosa dice in una struttura data; ricavare formule da diagrammi di Hasse.
- Evitare: ∀ con ∧ interno, ∃ con → interno, dimenticare le parentesi dopo un quantificatore.

## Dubbi
- [DA VERIFICARE] Le formule di Sintesi §5/10 e della fonte "Formalizzazione" sono state ricopiate così come sono; i simboli ≠ per ¬ nel documento originale sono artefatti.
- [DA VERIFICARE] ET2 e ET4 sono miei, non tratti da fonti: la trappola (negazione di "esiste massimo") la ricontrollerei con una soluzione del prof.
- [DA VERIFICARE] Il 4° esempio di ambiguità del linguaggio naturale ("impermeabili per bambini di gomma") è solo descritto, non formalizzato nelle fonti.
- Esercizi (documento "Esercizi"): sezione 1 "Insiemi, relazioni, funzioni, cardinalità" presente, es. 3 vuoto; nessun esercizio svolto di formalizzazione nel documento Esercizi (solo nelle slide 6.4).
