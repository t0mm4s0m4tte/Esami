# 07 - Strategia d'esame, trappole, mini-simulazione
Fonte: "Sintesi_Logica_Matematica" (regole d'esame e trappole) + "Formulario" (tabelle V/F). Simulazione: esercizi tipo scritti da me sulla falsariga delle fonti.

## Regole d'esame (da Sintesi)
Per superare l'esame servono **almeno 18 punti su 32, di cui almeno 10 nel primo esercizio**, che è composto da quesiti a risposta multipla; l'appello è il 2027-02-08. Questa soglia sul primo esercizio rende i quesiti a risposta multipla la parte da non sbagliare: conviene trattare ogni opzione (a, b, c, d) come un'affermazione V/F **indipendente** dalle altre, e ricordare che un'opzione del tipo "A e B" è falsa se anche una sola delle due parti è falsa. [DA VERIFICARE] La struttura esatta degli altri esercizi e i relativi punteggi non risultano dai documenti (il file "Argomenti dei Corsi - II Anno" non include Logica Matematica): conviene chiedere al docente o guardare i vecchi appelli.

## Trappole (checklist rapida)
Le trappole seguenti sono quelle in cui gli esercizi di questo corso fanno cadere più spesso; sono raccolte in una checklist da rileggere subito prima dell'esame, ciascuna con il rimando al file in cui è spiegata.
1. **Antisimmetrica ≠ non simmetrica.** Un ordine può essere simmetrico solo sulla diagonale.
2. ht binario = **max**+1 (non somma); ht = altezza albero - 1; lh atomo=3, lh sempre multiplo di 3.
3. A→B: falsa solo con V→F. "Non contraddizione" ≠ "tautologia".
4. Tavole di verità: **una sola** per premesse e conclusione.
5. Nell'assegnazione contano solo le occorrenze **libere**; ∃z sovrascrive il valore assegnato a z.
6. **Un simbolo di relazione non costruisce termini.** Un simbolo di funzione deve essere totale nella struttura (⟨ℕ,−⟩ non è struttura).
7. ∀ con →, ∃ con ∧. ∀x∃y ≠ ∃y∀x. ∀zP→Q: il quantificatore copre solo P.
8. Finito vs infinito: iniettiva⇔suriettiva solo se |A|=|B| finiti. f iniettiva e B infinito non dà A infinito; la controimmagine di una iniettiva può essere vuota.
9. Cardinalità: sequenze **finite** numerabili, **infinite** continuo; ℝ, P(ℕ), ℕ^ℕ, {0,1}^ℕ stesso continuo; ℚ, ℤ, ℕ×ℕ numerabili.
10. Divisibilità: 0 massimo, 1 minimo. sup = *minimo* dei maggioranti, può non esistere.
11. Distributività: Div(n) e P(X) sì; M3 e N5 no (Birkhoff).
12. Induzione: base da k se serve (2n+1<$2^n$ da n≥3); verificare che il passo regga per tutti gli n della base.
13. Codominio ≠ immagine: k:ℝ→ℝ≤0, x↦-2|x| è suriettiva, h:ℝ→ℝ, x↦2|x| no.
14. Validità FOL: dimostrazione per ogni struttura; soddisfacibilità: un esempio.

## Tavola V/F veloce (da Formulario)
Le affermazioni su funzioni e cardinalità vengono spesso proposte in forma V/F, e la maggior parte si decide ricordando che nel finito valgono i principi dei cassetti mentre nell'infinito cadono. Sono vere:
- se f è iniettiva e B è finito allora A è finito;
- se f è suriettiva e A è finito allora B è finito;
- se |A|=|B| sono finiti e f è iniettiva allora è suriettiva;
- il prodotto di numerabili è numerabile;
- se A è infinito e |B|≤|A| allora |A×B|=|A|;
- se A è infinito e B finito allora A∖B è infinito.

Sono invece false:
- "f iniettiva ⇒ ogni controimmagine ha **esattamente** 1 elemento";
- "f iniettiva e B infinito ⇒ A infinito".

## Esercizi svolti collegati

Le regole d'esame di questo file sono ora verificate su tracce vere: il [file 08 §0](08-esercizi-ed-esami-svolti.md#0-comè-fatto-lesame) conferma che l'esame ha 32 punti (14 + 9 + 9), che la sufficienza è 18 con almeno 10 nel primo esercizio e che i secondi due esercizi sono un esercizio aperto su ordini/semantica/conseguenza logica e una formalizzazione, e dà le soluzioni dei quattro appelli del 2026 (sedici versioni). Le trappole 5 (assegnazioni e ∃z), 6 (relazione non costruisce termini), 8 (iniettiva/suriettiva nel finito) e 11 (distributività) compaiono proprio nei quesiti a risposta multipla dei temi; nella stessa fonte ci sono due punti dove la chiave ufficiale e la verifica divergono (relazione "coprima" e π(A) in ⟨N, |⟩), riportati nella tabella degli errori. La mini-simulazione qui sotto resta quella scritta da me: per allenarsi su tracce ufficiali usare il file 08.

## Mini-simulazione (tempo ~90 min, svolta dopo aver provato da solo)
La simulazione ricalca la struttura dell'esame: un primo esercizio a risposta multipla, uno di formalizzazione, uno di semantica e uno di dimostrazione. Va svolta prima da soli e poi confrontata con le soluzioni.

**Es. 1 (risposta multipla, ≥10 punti).** Per ciascuna dire V/F.
a) ∃x∀y R(x,y) ⊧ ∀y∃x R(x,y). **V** (dato x0 che vale per tutti, per ogni y prendi x0).
b) ∀y∃x R(x,y) ⊧ ∃x∀y R(x,y). **F**: R(x,y)⇔x=y su ℕ (∀y∃x vera, ∃x∀y falsa).
c) A→B ≡ ¬B→¬A. **V.**
d) Esiste una biezione tra ℚ e ℤ×ℕ. **V** (entrambi numerabili).
e) ⟨ℕ,−⟩ è una L-struttura per L={f}, f binario. **F** (non totale).
f) Il reticolo Div(30) è distributivo. **V.**
g) sequenze infinite di cifre {0,1}: numerabili. **F.**

**Es. 2 (formalizzazione).** In L={<,+,P} su ℕ: (i) "esistono infiniti primi": ∀x∃y(x<y∧P(y)). (ii) "ogni numero tranne forse un numero finito è somma di due primi": ∃x∀y(x<y→∃u∃v(P(u)∧P(v)∧y=u+v)). (iii) "x è pari": ∃z(x=z+z).

**Es. 3 (semantica).** Struttura ⟨{0,1,2},<⟩. Valuta: ∃x∀y(x<y∨x=y) (esiste un minimo): V (x=0). ∃x∀y(y<x∨y=x) (massimo): V (x=2). ∀x∃y(x<y): F (x=2 non ha y). Ulteriore: ∀x∃y(x<y) ∧ ∀x¬(x<x) ∧ trans. è soddisfacibile (⟨ℕ,<⟩) ma non ha modelli finiti.

**Es. 4 (dimostrazione).** (a) Per induzione $\sum _{i=0}^n$ (2i+1)=(n+1)^{2}. (b) Dimostrare |ℕ|<|P(ℕ)| (diagonale). (c) Hasse Div(12) e dire se è distributivo.
