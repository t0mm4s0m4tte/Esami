# 02 - Cardinalità e combinatorica (Matematica Discreta)

**Fonte**: A. Mori, *Lezioni di Matematica Discreta*, cap. 3 (letto per intero). Gli esercizi svolti in fondo sono gli Es. 3.4-3.14 del libro (soluzioni calcolate qui e ricontrollate numericamente).

## Mappa degli argomenti

---

- [1. Insiemi finiti e cardinalità](#1-insiemi-finiti-e-cardinalità)
- [2. Principio di inclusione-esclusione](#2-principio-di-inclusione-esclusione)
- [3. Metodo delle scelte successive](#3-metodo-delle-scelte-successive)
- [4. Ordinamenti, anagrammi, disposizioni](#4-ordinamenti-anagrammi-disposizioni)
- [5. Combinazioni e coefficienti binomiali](#5-combinazioni-e-coefficienti-binomiali)
- [6. Combinazioni con ripetizione](#6-combinazioni-con-ripetizione)
- [Esercizi tipo (soluzioni controllate)](#esercizi-tipo-soluzioni-controllate)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## 1. Insiemi finiti e cardinalità

Contare significa, in fondo, confrontare insiemi tramite funzioni. Due insiemi sono **equipollenti** (hanno la stessa cardinalità) se esiste una biezione A→B; si scopre così, un po' controintuitivamente, che N ≈ 2N (con f(n)=2n), N×N ≈ N (si elencano le coppie per somma a+b crescente), Z ≈ N (0,1,-1,2,-2,...) e Q ≈ N. Si scrive |A| ≤ |B| se esiste una funzione **iniettiva** A→B (equivalentemente una suriettiva B→A). Valgono il teorema di confrontabilità (|A|≤|B| oppure |B|≤|A|) e il teorema di **Schröder-Bernstein**: |A|≤|B| e |B|≤|A| implicano |A|=|B|; entrambi sono enunciati senza dimostrazione.

La distinzione fra finito e infinito si dà senza nominare i numeri: A è **infinito** se è equipollente a un suo sottoinsieme proprio (cioè esiste f: A→A iniettiva non suriettiva), **finito** se ogni f: A→A iniettiva è biettiva. Per un A finito, quindi, f: A→A è iniettiva ⇔ suriettiva ⇔ biettiva (Prop 3.6, estesa a dominio e codominio equipollenti). I prototipi dei finiti sono gli insiemi I_n = {1,...,n}: I_m ≈ I_n ⇔ m=n, ogni finito non vuoto è equipollente a un I_n (e si pone |A|=n), mentre ogni infinito X ha |N| ≤ |X|.

Da qui discende il **principio dei cassetti (o dei piccioni)**: se |A|>|B| non esiste alcuna f: A→B iniettiva, cioè con più piccioni che gabbie una gabbia ne contiene almeno due. Esempio: 10001 smartphone con PIN a 4 cifre (10⁴ PIN possibili) implicano che due abbiano lo stesso PIN.

Un insieme è **numerabile** se è equipollente a N, cioè si può elencare come successione. Di Cantor si ricordano solo gli enunciati: esistono infiniti non numerabili, R non è numerabile e |P(X)| > |X|.

## 2. Principio di inclusione-esclusione

Quando si uniscono insiemi che si sovrappongono, sommare le cardinalità conta due volte gli elementi comuni, e il principio di inclusione-esclusione corregge il conteggio. Per due insiemi **|A∪B| = |A| + |B| - |A∩B|**, formula che si può anche usare al contrario per ricavare una qualunque delle quattro quantità. Per tre insiemi: **|A∪B∪C| = |A|+|B|+|C| - |A∩B| - |A∩C| - |B∩C| + |A∩B∩C|**. Se gli insiemi sono a due a due disgiunti, |A1∪...∪An| = Σ|Ai|. Con quattro insiemi i termini sono 16; se tutte le intersezioni triple sono vuote, |A∪B∪C∪D| = Σ|X| - Σ|X∩Y|.

Nelle applicazioni aritmetiche i numeri ≤ N divisibili per k sono ⌊N/k⌋, e quelli divisibili sia per a sia per b sono i divisibili per mcm(a,b) (che è ab se a,b sono coprimi).

**Esempio svolto** (Mori): quanti n ≤ 180 non sono divisibili né per 3 né per 5? |D3|=60, |D5|=36, |D15|=12 ⇒ |D3∪D5|=84 ⇒ 180-84 = **96**.
**Esempio** (3 insiemi): quanti n in [1,660] sono divisibili per 5, 6 o 11? 132+110+60-22-12-10+2 = **260** (intersezioni: D30=22, D55=12, D66=10, D330=2).
**Esempio** (ricavare l'incognita): 129 biglietti, spettatori 109,76,55; film1∩2=52, film2∩3=44, film1∩3=28 ⇒ 129 = 109+76+55-52-44-28+x ⇒ 129 = 116 + x ⇒ x = **13** persone hanno visto tutti e tre (corretto: una versione precedente degli appunti riportava 23 per errore di calcolo).

## 3. Metodo delle scelte successive

Il principio base del conteggio è la **Prop 3.16**: |A1×...×Ak| = n1·n2·...·nk. Tradotto in regola pratica: una situazione che si ottiene con k scelte successive, con n_i possibilità alla scelta i, ha n1·...·nk esiti, anche se gli insiemi di scelta dipendono dalle scelte precedenti, purché ne dipenda solo l'insieme e non il NUMERO di possibilità. Se invece le alternative sono **in alternativa** (casi che si escludono a vicenda) si **sommano**, non si moltiplicano. Esempio dei gelati con 1, 2, 3 o 4 gusti su 14: C(n,1)+C(n,2)+C(n,3)+C(n,4); Mori calcola con n=14 (14+91+364+1001 = 1470) ma il testo dice 16 tipi e riporta 1460: dati incoerenti nel PDF [DA VERIFICARE]; la regola somma-per-casi resta valida.

Applicata alle funzioni, la regola dà **|F_{A,B}| = nᵐ** se |A|=m e |B|=n, perché per ogni elemento di A si sceglie l'immagine fra n possibilità. Esempi: PIN a 4 cifre = 10⁴; targhe con 3 lettere e 4 cifre = 26³·10⁴ = 17.576.000; menù 8·10·12·6 = 5760.

## 4. Ordinamenti, anagrammi, disposizioni

Quanti modi ci sono di mettere in fila degli oggetti? Un **ordinamento** di A (|A|=n) è una biezione I_n→A, e il loro numero è **n!** (n·(n-1)·...·1, con 0!=1). Se la lista ha elementi ripetuti, gli ordinamenti che differiscono solo per lo scambio di simboli uguali vanno identificati: il numero di **anagrammi** di una lista di lunghezza n in cui il simbolo i compare r_i volte è **n!/(r1!·r2!·...·rk!)**. MATEMATICA: 10!/(3!·2!·2!) = 151.200 (M×2, A×3, T×2). ORO: 3!/2! = 3.

Se si scelgono k elementi di A (|A|=n) tenendo conto dell'ordine, i casi sono due:
- la **disposizione con ripetizione** di ordine k è una k-pla di A^k, ovvero una funzione I_k→A, e ce ne sono **nᵏ**;
- la **disposizione semplice** (senza ripetizioni, cioè una funzione iniettiva I_k→A) si conta con **D_{n,k} = n(n-1)...(n-k+1) = n!/(n-k)!**; vale 0 se k>n e coincide con gli ordinamenti se k=n.

Esempi: podio con 12 atleti = D_{12,3} = 12·11·10 = 1320 (Mori riporta "101.320" per refuso di estrazione: il valore corretto è 1320); password di 8 simboli distinti su 36 = 36·35·...·29.

## 5. Combinazioni e coefficienti binomiali

Quando l'ordine non conta si parla di **combinazioni**: una combinazione semplice di ordine k è un sottoinsieme C⊆A con |C|=k. Ogni sottoinsieme proviene da k! disposizioni (i suoi riordinamenti), quindi **C_{n,k} = D_{n,k}/k! = n(n-1)...(n-k+1)/k!**. Questo numero si scrive con il **coefficiente binomiale** C(n,k) = n!/(k!(n-k)!) per 0≤k≤n, e C(n,k) = C_{n,k}.

I coefficienti binomiali hanno proprietà che si dimostrano con argomenti di conteggio, più che con calcoli:
- **casi banali**: C(n,0)=C(n,n)=1;
- **simmetria** C(n,k)=C(n,n-k): nasce dal fatto che passare al complementare, S↦C_A(S), è una biezione fra sottoinsiemi di cardinalità k e n-k; è utile per semplificare i calcoli, ad esempio C(100,96)=C(100,4)=3.921.225;
- **formula di Stiefel** C(n,k) = C(n-1,k) + C(n-1,k-1): si dimostra fissando a∈A, perché i sottoinsiemi di k elementi o contengono a (C(n-1,k-1) modi) oppure non lo contengono (C(n-1,k) modi).

Stiefel genera il **triangolo di Pascal-Tartaglia** (riga n: 1, n, ..., n, 1).

Il **binomio di Newton** (x+y)ⁿ = Σ_{k=0}^n C(n,k) x^{n-k} y^k spiega il nome "coefficiente binomiale": nell'espansione del prodotto di n fattori, il termine in yᵏ si ottiene scegliendo la y in k dei n fattori, e questo si può fare in C(n,k) modi. Lo si può dimostrare anche per induzione usando Stiefel. Ponendo x=y=1 si ottiene **Σ_{k=0}^n C(n,k) = 2ⁿ**, che è anche il conteggio |P(A)| = Σ_k |P_k(A)| con P_k = sottoinsiemi di cardinalità k. Es. 3.19: per n dispari Σ_{k pari}C(n,k) = Σ_{k dispari}C(n,k) = 2ⁿ⁻¹; per x=1, y=-1 Newton dà 0 se n≥1, quindi Σ pari = Σ dispari anche per n pari.

Nei problemi misti le scelte indipendenti si moltiplicano. Es. (Mori) scegliere 5 ballerini su 9 e 3 ballerine su 11: C(9,5)·C(11,3) = 126·165 = 20790 [DA VERIFICARE: il PDF estratto riporta 13860 = 84·165, probabile refuso del testo o dell'estrazione]. Formazione calcio: 3·126·35·6 = 79.380.

## 6. Combinazioni con ripetizione

Se si scelgono k elementi di A (|A|=n) potendo ripetere, senza badare all'ordine, il numero è **C'_{n,k} = C(k+n-1, n-1) = C(k+n-1, k)**. La dimostrazione è il metodo delle "stelle e barre": si dispongono k caselle e (n-1) separatori in k+n-1 posizioni, e basta scegliere quali n-1 posizioni occupano i separatori.

Esempi: monomi di grado 9 in 4 variabili: C(12,3) = 220; scatola di 24 cioccolatini di 8 tipi: C(31,7) = 2.629.575; esiti non ordinati di 10 lanci di moneta: C(11,1) = 11. Se si impone "almeno uno per tipo" si assegna prima 1 a ciascuno e si distribuiscono i k-n rimanenti (es. 12 rose in 5 colori, tutti presenti: C(7+5-1,7)=C(11,7)=330).

### Tabella decisionale
La scelta della formula dipende da due domande, se l'ordine conta e se sono ammesse ripetizioni.

| Ordine conta? | Ripetizioni? | Formula |
|---|---|---|
| sì (tutti gli n) | no | n! |
| sì (k su n) | no | n!/(n-k)! |
| sì | sì | nᵏ |
| no | no | C(n,k) |
| no | sì | C(n+k-1,k) |
| anagrammi con elementi ripetuti | | n!/(r1!...rk!) |

---

## Esercizi tipo (soluzioni controllate)
1. (Es. 3.4a) Da 1 a 1680, quanti divisibili per almeno uno tra 2, 6, 7? Poiché 6 è multiplo di 2: |D2∪D7| = 840+240-120 = **960**.
2. (Es. 3.4b) Da 1 a 2160 né per 5, né 9, né 12: |D5|=432, |D9|=240, |D12|=180, |D45|=48, |D60|=36, |D36|=60, |D180|=12 ⇒ unione = 432+240+180-48-36-60+12 = 720 ⇒ **1440**.
3. (Es. 3.5) Monete: A=argento 25, E=europee 170, T=tonde 415, A∩T=22, E∩T=152, A∩E⊆T. Unione = 25+170+415-|A∩E|-22-152+|A∩E| = **436** (|A∩E| si semplifica perché A∩E=A∩E∩T).
4. (Es. 3.6) Biondi 20, neri 18 (disgiunti), occhi azzurri 15, verdi 12 (disgiunti); B∩Az=12, B∩V=4, N∩Az=1, N∩V=7, triple vuote: totale = 20+18+15+12 - (12+4+1+7) = **41**.
5. (Es. 3.9) Sei amici in fila: a) 6!=720; b) Carlo e Franco al centro: 2·4! = 48; c) Bruno e Daniele vicini: 2·5! = 240.
6. (Es. 3.10) 11 uomini, 9 donne: a) coppie uomo-donna: 11·9=99; b) 5 uomini e 5 donne: C(11,5)·C(9,5) = 462·126 = 58.212.
7. (Es. 3.11) b) 16 informatici in 4 nazionalità con ≥1 per nazione: 1 per nazione + 12 liberi: C(12+4-1,3)=C(15,3)=455; c) 7 al sottoprogetto 1, 6 al 2, 3 ruoli distinti ai 3 rimasti: C(16,7)·C(9,6)·3! = 11440·84·6 = 5.765.760.
8. (Es. 3.12) a) mazzi bicolore: C(5,2)=10; b) per avere ≥5 rose uguali (principio dei piccioni): 5·4+1 = 21; c) 12 rose con tutti i 5 colori: C(11,4)=330.
9. (Es. 3.14) Anagrammi: ALGORITMO (O×2) 9!/2! = 181.440; INFORMATICA (I×2, A×2) 11!/(2!·2!) = 9.979.200; TORINO (O×2) 6!/2! = 360; DISPOSIZIONI (I×4, S×2, O×2) 12!/(4!·2!·2!) = 4.989.600; COROLLARIO (O×3, R×2, L×2) 10!/(3!·2!·2!) = 151.200.
10. (Es. 3.18) C(n,k) = C(n-2,k)+2C(n-2,k-1)+C(n-2,k-2): applicare due volte Stiefel.

## Cose da saper fare all'esame
- Riconoscere il tipo di problema (tabella decisionale) e calcolare; distinguere "e" (prodotto) da "oppure" (somma di casi esclusivi).
- Usare inclusione-esclusione per contare numeri divisibili / insiemi con attributi; ricavare un'intersezione incognita.
- Dimostrare: Stiefel, Newton, Σ C(n,k)=2ⁿ, C(n,k)=C(n,n-k), formula degli anagrammi, |F_{A,B}|=nᵐ, |P(A)|=2ⁿ.
- Applicare il principio dei piccioni (trovare il numero minimo che garantisce una coincidenza).
- Definizioni di finito/infinito, numerabile, equipollente; saper mostrare Z, Q, N×N numerabili.

## Dubbi
- Alcune cifre degli esempi di Mori sono state alterate dall'estrazione del PDF (ballerini, gelati, podio); le formule sono corrette ma conviene confrontare con il libro cartaceo.
- Le soluzioni ufficiali degli esercizi di Mori non sono nelle fonti: i risultati sopra sono calcolati e verificati qui.
