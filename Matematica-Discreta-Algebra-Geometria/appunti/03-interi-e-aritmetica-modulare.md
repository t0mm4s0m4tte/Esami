# 03 - Numeri interi e aritmetica modulare (Matematica Discreta)

**Fonti e AVVERTENZA IMPORTANTE**
Mori, *Lezioni di Matematica Discreta*, cap. 4 e cap. 7: dal PDF su Drive l'estrazione del testo si interrompe all'inizio del cap. 4 (definizione di divisibilità e di elemento irriducibile). Il resto del cap. 4 (divisione euclidea, teorema fondamentale dell'aritmetica) e tutto il cap. 7 (classi resto, gruppo moltiplicativo, congruenze, applicazioni) NON erano leggibili nelle fonti; il libro di Facchini è una scansione non leggibile (testo vuoto).
Quanto segue oltre il §1 è **teoria standard ricostruita (non estratta dalle fonti)**: [ASSUNZIONE: da verificare su Mori cap. 4/7]. Ho verificato su Drive che l'estrazione di Mori si interrompe all'inizio del cap. 4 (dopo la Def 4.3) e che Facchini è una scansione senza testo, quindi per le sezioni 2-5 non esiste fonte leggibile: sono conoscenza propria (livello 4). Gli esempi numerici sono stati ricalcolati con software (calcolo verificato, ma ciò non verifica la teoria).

## Mappa degli argomenti

1. Divisibilità, invertibili, irriducibili/primi (da Mori)
2. Divisione euclidea, MCD, algoritmo di Euclide, identità di Bézout [ASSUNZIONE: da verificare]
3. Teorema fondamentale dell'aritmetica [ASSUNZIONE: da verificare]
4. Congruenze, classi resto $Z_n$, operazioni ben definite [ASSUNZIONE: da verificare]
5. $Z_n^{*}$, funzione di Eulero, Eulero-Fermat, equazioni congruenziali, CRT [ASSUNZIONE: da verificare]
---

- [1. Divisibilità (Mori 4.1-4.3)](#1-divisibilità-mori-41-43)
- [2. Divisione euclidea, MCD, Euclide, Bézout [ASSUNZIONE: da verificare]](#2-divisione-euclidea-mcd-euclide-bézout-assunzione-da-verificare)
- [3. Teorema fondamentale dell'aritmetica [ASSUNZIONE: da verificare]](#3-teorema-fondamentale-dellaritmetica-assunzione-da-verificare)
- [4. Congruenze e classi resto [ASSUNZIONE: da verificare]](#4-congruenze-e-classi-resto-assunzione-da-verificare)
- [5. Z_n*, Eulero, equazioni, CRT [ASSUNZIONE: da verificare]](#5-z_n-eulero-equazioni-crt-assunzione-da-verificare)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## 1. Divisibilità (Mori 4.1-4.3)

L'aritmetica degli interi ruota attorno alla relazione di divisibilità: a divide b (a | b) se esiste k∈Z con b = ka. Per esempio -4 | 20 mentre 3 ∤ 10. Alcuni casi limite vanno ricordati:
- ogni n divide 0 (0 = n·0);
- 0 divide solo 0;
- gli invertibili ±1 dividono tutto e sono gli unici a farlo.

In (Z,·) gli invertibili sono infatti solo ±1 (Mori, cap. 2 e 4). In Z l'addizione ha tutti gli elementi invertibili (l'opposto), mentre la moltiplicazione ha come invertibili solo ±1: è questa asimmetria a rendere interessante lo studio dei divisori.

La **Prop 4.2** dice come la divisibilità si comporta rispetto alla somma: se s = a+b,
1. un divisore comune di a e b divide s;
2. un divisore di s e di uno degli addendi divide anche l'altro (perché b = s-a).

Un intero n ∉ {0,±1} è **irriducibile** (Def 4.3) se n=ab implica che uno fra a e b è invertibile (±1). Mori distingue questa nozione dalla definizione di "primo" (n primo se n | ab ⇒ n|a oppure n|b); in Z le due nozioni sono equivalenti. [DA VERIFICARE la definizione esatta usata da Mori per "primo".]

## 2. Divisione euclidea, MCD, Euclide, Bézout [ASSUNZIONE: da verificare]

Lo strumento fondamentale è la **divisione euclidea**: per ogni a∈Z e b>0 esistono unici q,r con a = bq + r e 0 ≤ r < b. Dal resto discende il **MCD(a,b)**, il massimo divisore comune positivo; vale mcm(a,b)·MCD(a,b) = |ab|, e a,b sono **coprimi** se MCD=1. L'**algoritmo di Euclide** sfrutta l'identità MCD(a,b) = MCD(b, a mod b): si divide ripetutamente, e l'ultimo resto non nullo è il MCD.

Risalendo i passaggi dell'algoritmo (algoritmo esteso) si ottiene l'**identità di Bézout**: esistono x,y∈Z con ax+by = MCD(a,b). Ne segue che a,b sono coprimi se e solo se esistono x,y con ax+by=1, e questo è il cuore di tutto ciò che riguarda gli inversi modulari. Altri due risultati usati di continuo: il lemma di Euclide (p primo, p | ab ⇒ p|a o p|b) e il fatto che se a | bc e MCD(a,b)=1 allora a | c.

**Esempio svolto** MCD(252,198): 252 = 1·198 + 54; 198 = 3·54 + 36; 54 = 1·36 + 18; 36 = 2·18 + 0 ⇒ MCD = 18.
Risalendo: 18 = 54 - 36 = 54 - (198 - 3·54) = 4·54 - 198 = 4(252-198) - 198 = **4·252 - 5·198**. (x=4, y=-5, verificato numericamente.)
**Esempio**: MCD(87,25)=1 con 1 = -2·87 + 7·25 ⇒ $25^{-1}$ ≡ 7 (mod 87).

## 3. Teorema fondamentale dell'aritmetica [ASSUNZIONE: da verificare]

Ogni n ≥ 2 si scrive in modo unico (a meno dell'ordine) come prodotto di primi: n = $p1^{e1}$ ... pk^ek. Per esempio 360 = $2^{3}$·$3^{2}$·5. La fattorizzazione dà un modo alternativo di calcolare MCD (prodotto dei primi comuni col minimo esponente) e mcm (col massimo esponente), e permette di calcolare la funzione φ di Eulero.

## 4. Congruenze e classi resto [ASSUNZIONE: da verificare]

Due interi sono **congruenti modulo n** (a ≡ b mod n) se n | (a-b), il che equivale a dire che hanno lo stesso resto nella divisione per n. La congruenza è una relazione di equivalenza: le classi [a]_n formano una partizione di Z in n blocchi [0],...,[n-1], e l'insieme quoziente si chiama **$Z_n^{*}$* (= Z/nZ), con |$Z_n$| = n. È l'esempio concreto dell'idea di quoziente del file 01.

Le operazioni si definiscono sulle classi tramite i rappresentanti, [a]+[b] = [a+b] e [a]·[b] = [ab], e vanno quindi controllate **ben definite**: se a≡a' e b≡b' allora a+b≡a'+b' e ab≡a'b'. Questo è esattamente il "problema della buona definizione" di Mori (Nota 2.3). Con queste operazioni ($Z_n$,+) è un gruppo abeliano ciclico di ordine n (generato da [1]) e ($Z_n$,+,·) è un anello commutativo; è un **campo ⇔ n primo**. Un esempio che compare anche in Algebra Lineare (Buzano, Es. 5.9) è {0,1} con 1+1=0, cioè il campo $Z_2$. Se n è composto cade la legge di annullamento del prodotto: in $Z_6$, ad esempio, 2·3 = 0 (zero divisori).

## 5. Z_n*, Eulero, equazioni, CRT [ASSUNZIONE: da verificare]

Quali classi di $Z_n$ si possono invertire? Una classe [a] è **invertibile ⇔ MCD(a,n)=1**, e l'inverso si trova con Bézout (da ax + ny = 1 segue $a^{-1}$ ≡ x). L'insieme $Z_n^{*}$ degli invertibili è un gruppo moltiplicativo di ordine **φ(n)**, dove la funzione di Eulero φ(n) conta i k∈[1,n] coprimi con n. Valgono:
- φ(p) = p-1;
- φ($p^k$) = $p^k$ - $p^{k-1}$;
- φ(mn)=φ(m)φ(n) se MCD(m,n)=1.

Esempi: φ(12)=4 ($Z_{12}^{*}$ = {1,5,7,11}), φ(36)=12, φ(35)=24, φ(360)=96.

Due teoremi permettono di semplificare le potenze modulari. Il **teorema di Eulero**: se MCD(a,n)=1 allora $a^{\varphi(n)}$ ≡ 1 (mod n). Il **piccolo teorema di Fermat** ne è il caso particolare n=p: se p è primo e p∤a, $a^{p-1}$ ≡ 1 (mod p) (e per ogni a, $a^p$ ≡ a). Entrambi discendono dal teorema di Lagrange applicato al gruppo $Z_n^{*}$ (vedi file 04).

Le equazioni lineari in $Z_n$ seguono dal criterio di invertibilità. L'**equazione ax ≡ b (mod n)** ha soluzione ⇔ d = MCD(a,n) divide b; in tal caso ha d soluzioni modulo n: si divide tutto per d (a'x ≡ b' mod n/d, con a' invertibile) e si aggiungono i multipli di n/d. Per i sistemi vale il **teorema cinese dei resti**: se m1,...,mk sono a due a due coprimi, il sistema x ≡ $a_i$ (mod $m_i$) ha una soluzione unica modulo m1···mk.

**Esempi svolti (verificati numericamente)**
1. $7^{-1}$ mod 26 = 15 (7·15 = 105 = 4·26 + 1).
2. 14x ≡ 21 (mod 35): d = 7 | 21 ⇒ 2x ≡ 3 (mod 5) ⇒ x ≡ 4 (mod 5) ⇒ **x ∈ {4, 9, 14, 19, 24, 29, 34}** (7 soluzioni mod 35).
3. 4x ≡ 6 (mod 26): d = 2 | 6 ⇒ 2x ≡ 3 (mod 13) ⇒ x ≡ 8 (mod 13) ⇒ x ∈ {8, 21}.
4. Sistema x≡2 (3), x≡3 (5), x≡2 (7): x = 23 (mod 105).
5. Calcolo di potenze: $3^{100}$ mod 7: $3^{6}$≡1 ⇒ $3^{100}$ = $3^{96+4}$ ≡ $3^{4}$ = 81 ≡ **4**. $2^{1000}$ mod 13: $2^{12}$≡1, 1000 = 12·83+4 ⇒ $2^{4}$=16≡**3**. $7^{222}$ mod 10: φ(10)=4, 222=4·55+2 ⇒ $7^{2}$=49≡**9**.
6. Potenze di 3 mod 7: 3,2,6,4,5,1: 3 ha ordine 6 ⇒ $Z_7^{*}$ = ⟨3⟩ è ciclico (3 generatore).

---

## Esercizi svolti collegati

Inversi con Euclide esteso, resti di grosse potenze con Eulero, congruenze lineari con gcd, divisori dello zero e CRT sono nel Problema 1 di quasi ogni appello di Discreta; esempi con numeri e soluzioni in [16-esami-md-2024-2025.md](16-esami-md-2024-2025.md) (sezione "Aritmetica modulare, $Z_n$, $Z_n^{*}$, congruenze") e le domande del quiz sul resto e sulle congruenze con una sola soluzione.

## Cose da saper fare all'esame
- Calcolare MCD con Euclide e trovare coefficienti di Bézout; verificare la coprimalità.
- Risolvere congruenze lineari e sistemi (CRT), determinare l'inverso modulo n e decidere se esiste.
- Calcolare potenze modulari grandi (ridurre l'esponente con Eulero/Fermat), ultime cifre di un numero.
- Elencare $Z_n^{*}$, calcolare φ(n); scrivere le tavole di operazioni di $Z_n$ piccoli; stabilire quando $Z_n$ è campo.
- Dimostrare che le operazioni su $Z_n$ sono ben definite; dimostrare Prop 4.2.

## Dubbi
- Tutto il §2-§5 è da verificare sul libro Mori (cap. 4 seconda parte e cap. 7) o sulle slide del docente: non ho potuto leggere i capitoli. Chiedere al tutor quali dimostrazioni sono "obbligatorie" (es. Bézout, CRT, Fermat).
- Nelle edizioni passate del corso (UniTO) la parte di Discreta può includere anche relazioni d'ordine e grafi [DA VERIFICARE: non presenti nell'indice di Mori; l'indice di Mori ha solo: Insiemi, Funzioni, Combinatorica, Numeri Interi, Permutazioni, Gruppi, Aritmetica Modulare].
