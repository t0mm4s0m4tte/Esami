# 06 - Ordini e reticoli
Fonte: Drive "Logica Matematica - Appunti" (Relazioni §9, Reticoli), "Formulario" (Hasse, reticolo), "Sintesi" §9. (ET) = esercizio tipo svolto da me. Il documento Appunti si interrompe a metà della dimostrazione di CSB (§7).

## Mappa

Questo capitolo prende gli ordini parziali introdotti nel file 02 e ne studia la struttura fine. Si parte da poset, estremo superiore e inferiore, minimo e massimo, e si arriva ai reticoli e alla dualità; si osserva che un reticolo si può vedere sia come struttura relazionale (L_ord) sia come struttura algebrica (L_ret). Seguono la completezza e il teorema di Tarski-Knaster, gli omomorfismi e i sottoreticoli, la distributività (con i reticoli proibiti N5 e M3) e alcune costruzioni (somme, prodotti, Down(P)).

- [Poset e reticoli](#poset-e-reticoli)
- [Completezza](#completezza)
- [Morfismi, sottoreticoli](#morfismi-sottoreticoli)
- [Distributività](#distributività)
- [Costruzioni](#costruzioni)
- [Esercizi svolti / tipo (ET)](#esercizi-svolti--tipo-et)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## Poset e reticoli
Un poset ⟨P,≤⟩ è un insieme con una relazione riflessiva, antisimmetrica e transitiva. Dato X⊆P, un **maggiorante** è un elemento p maggiore o uguale a ogni x∈X; il **sup X** è il *minimo dei maggioranti* (unico, se esiste) e l'inf X è il massimo dei minoranti. La clausola "se esiste" è essenziale: due elementi incomparabili in fondo, sotto due maggioranti a loro volta incomparabili, non hanno sup, perché l'insieme dei maggioranti non ha un minimo.

Un **reticolo** è un poset non vuoto in cui ogni coppia {x,y} ha sup (x∨y, il join) e inf (x∧y, il meet); in questo modo ∨ e ∧ diventano vere operazioni binarie. Sono reticoli gli ordini totali (le catene), Div(n) con la divisibilità (∨=mcm, ∧=MCD, e risulta distributivo) e P(X) con l'inclusione (∪, ∩). L'ordine e le operazioni si determinano a vicenda: x≤y ⇔ x∧y=x ⇔ x∨y=y.

Vale una **dualità**: la relazione inversa R⁻¹ inverte l'ordine e produce il poset duale P^Δ; di conseguenza se un enunciato scritto con {∧,∨,≤} vale in tutti i reticoli, vale anche il suo duale, ottenuto scambiando ∧↔∨ e invertendo ≤. In pratica la dualità dimezza il lavoro nelle dimostrazioni. Un reticolo si può assiomatizzare in due modi: con L_ord, cioè riflessività, antisimmetria, transitività più l'esistenza di sup e inf, oppure con il linguaggio algebrico L_ret (Σ_ret), cioè commutatività e associatività di ∧ e ∨ più le leggi di assorbimento (x∨y)∧y=y e (x∧y)∨y=y. Nei diagrammi di Hasse gli elementi più bassi sono più piccoli e si disegna solo la copertura.

## Completezza
Un reticolo è **completo** se sup X e inf X esistono per **ogni** X⊆P, anche infinito o vuoto; ogni reticolo finito è completo. È una condizione più forte di quella di Dedekind (per gli ordini totali: ogni X≠∅ limitato superiormente ha un sup): ⟨ℝ,≤⟩ è Dedekind-completo ma non è un reticolo completo, perché manca di minimo e massimo, mentre l'intervallo [a,b]⊆ℝ lo è.

Il risultato centrale è il teorema di **Tarski-Knaster**: se P è un reticolo completo e f:P→P è monotona (x≤y⇒f(x)≤f(y)), allora f ha almeno un punto fisso. La dimostrazione considera A={x | x≤f(x)} e a=sup A:
1. per ogni x∈A si ha x≤a, quindi f(x)≤f(a) per monotonia, e siccome x≤f(x) si ottiene x≤f(a);
2. dunque f(a) è un maggiorante di A e perciò a≤f(a);
3. applicando f, per monotonia f(a)≤f(f(a)), cioè f(a)∈A, e allora f(a)≤a;
4. per antisimmetria f(a)=a.

Il teorema è esattamente ciò che serve a CSB (file 03): la funzione F:P(X)→P(X), F(A)=g[Y∖f[X∖A]] è monotona su un reticolo completo, e il suo punto fisso A fornisce la biezione, che usa f su A e g⁻¹ fuori.

## Morfismi, sottoreticoli
Una funzione tra poset è monotona se x≤y⇒f(x)≤f(y) e antitona se x≤y⇒f(y)≤f(x). Tra reticoli si chiede di più: un **omomorfismo** conserva le operazioni, f(a∧b)=f(a)∧f(b) e f(a∨b)=f(a)∨f(b), e ne segue la monotonia; un isomorfismo è un omomorfismo biettivo. Un sottoinsieme S⊆R è un sottoreticolo quando è chiuso per ∧ e ∨ di R. Attenzione a un falso amico: che S sia sottoreticolo e reticolo completo **non** implica che sia un sottoreticolo completo, perché per X infinito sup_S(X) può differire da sup_R(X) (si ha sup_R(X)≤sup_S(X)).

## Distributività
Un reticolo è distributivo quando x∧(y∨z)=(x∧y)∨(x∧z) e x∨(y∧z)=(x∨y)∧(x∨z); basta in realtà che valga una delle due leggi, perché globalmente ciascuna implica l'altra. Una caratterizzazione strutturale è data dal teorema di **Birkhoff**: un reticolo è distributivo se e solo se non contiene un sottoreticolo isomorfo a **N5** (il pentagono, in cui a ∧ (b∨c) ≠ (a∧b)∨(a∧c)) o a **M3** (il diamante, con tre atomi incomparabili tra 0 e 1). Div(n) è sempre distributivo. Per dimostrare che un reticolo non è distributivo, se contiene M3 o N5 come sottoreticolo basta esibire la violazione sui tre elementi.

## Costruzioni
Dai reticoli se ne costruiscono altri, e si vuole sapere quando il risultato è ancora un reticolo:
- la **somma disgiunta** P⊔Q (universo P×{0}∪Q×{1}, ordini separati) non è mai un reticolo se P e Q non sono vuoti, perché mancano i sup tra un elemento di P e uno di Q;
- la **somma lineare** P⊕Q mette ogni elemento di P sotto ogni elemento di Q ed è un reticolo se lo sono P e Q;
- il **prodotto** P×Q ha ordine (p,q)≤(p',q') ⇔ p≤p' e q≤q', con operazioni componente per componente;
- **Down(P)**, l'insieme dei segmenti iniziali (y≤x∈X⇒y∈X), è un sottoreticolo di P(P) chiuso per ∪ e ∩, e quindi è sempre un reticolo distributivo.

## Esercizi svolti / tipo (ET)
- **ET1** {a,b,c,d} con a,b<c,d (c,d incomparabili): {a,b} ha maggioranti {c,d} senza minimo -> sup non esiste -> non reticolo (esempio Sintesi).
- **ET2** Div(12): elementi 1,2,3,4,6,12. 4∨6=mcm=12, 4∧6=MCD=2, 2∨3=6. Reticolo distributivo.
- **ET3** Div(20) (1,2,4,5,10,20) e Div(105) (cubo booleano 2³) sono reticoli distributivi (vedi coperture in file 02).
- **ET4** P({a,b,c}) con ⊆: 8 elementi, reticolo distributivo, ∨=∪, ∧=∩; sup di {{a},{b}} = {a,b}.
- **ET5** Dimostrare x∧(y∨z) ≥ (x∧y)∨(x∧z) in ogni reticolo: x∧y≤x∧(y∨z) e x∧z≤x∧(y∨z) (monotonia dell'inf), quindi il loro sup (x∧y)∨(x∧z) è ≤ x∧(y∨z). (La disuguaglianza opposta richiede distributività.)
- **ET6** ⟨ℚ∩[0,1],≤⟩ è reticolo (totale) ma non completo: X={q|q²<1/2} non ha sup in ℚ.
- **ET7** f:ℕ→ℕ, f(n)=n+1 è monotona senza punto fisso: ⟨ℕ,≤⟩ non è reticolo completo (manca il sup di ℕ) -> Tarski non applicabile; su [0,1] ogni f monotona ha punto fisso.

## Cose da saper fare all'esame
- Dato un Hasse/poset: trovare minimo, massimo, minimali/massimali, maggioranti/minoranti, sup/inf; stabilire se è reticolo (cerca coppie senza sup/inf) e se è distributivo (cerca M3/N5).
- Disegnare Hasse di Div(n), P(A), catene, prodotti.
- Enunciare e dimostrare Tarski-Knaster; spiegare il ruolo in CSB.
- Costruire ∧/∨ in prodotti e somme; usare la dualità.

## Dubbi
- [DA VERIFICARE] Il documento riporta N5 con la relazione (a∧b)∨(a∧c)=c≠a=a∧(b∨c), ma le etichette dipendono dal diagramma (non leggibile in testo): verificare sul disegno delle slide 7.2.
- [DA VERIFICARE] Sulla "nuance strutturale" (slide 23) esistono reticoli in cui la legge (a∨b)∧c=(a∧c)∨(b∧c) vale per certe terne ma l'altra no ("diamante con vertice sdoppiato"); non l'ho ricostruita, da controllare sulla slide.
- [DA VERIFICARE] La sezione CSB (§7) è troncata nel documento Appunti e va completata dal PDF 7.2/2.4 (Drive, cartella Slide Decks).
- ET1-ET7 sono miei, non delle fonti.
