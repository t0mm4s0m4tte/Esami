# Flashcard - Algoritmi e Strutture Dati

Formato: D: domanda / R: risposta. Fonte: appunti/ (file 01-11). [DA VERIFICARE] = punto non confermato nel materiale; [INT] = integrazione non presente nelle fonti dell'utente.

## 01 - Fondamenti, correttezza, iterazione

D: Quali sono le 4 proprietà di un algoritmo?
R: Finito (termina sempre), deterministico, non ambiguo, generale (vale per tutte le istanze).

D: Cos'è un problema computazionale?
R: Una relazione R = {(istanza, risposta) | soddisfano un criterio}; a un'istanza possono corrispondere più risposte accettabili.

D: Su quale identità si basa Euclide e quanto costa?
R: MCD(a,b)=MCD(b, a mod b), MCD(a,0)=a. Costo O(log m) (contro O(sqrt m) della fattorizzazione). Invariante del ciclo: MCD(a,b)=MCD(m,n).

D: Calcola MCD(345,150) con Euclide.
R: 345=150*2+45; 150=45*3+15; 45=15*3+0. Risultato 15.

D: Idea di Kadane e complessità?
R: DP: miglior segmento che termina in i = max(A[i], maxSegLoc + A[i]); maxSeg = max(maxSeg, maxSegLoc). O(n), ottimo (ogni elemento va letto). Forza bruta O(n^3), migliorata O(n^2).

D: Kadane su A=[2,3,-8,7,-1,2,3]: valori di maxSegLoc e risultato?
R: maxSegLoc = 2,5,-3,7,6,8,11; risultato 11.

D: Enuncia l'halting problem e la dimostrazione di insolubilità.
R: Non esiste un algoritmo Halt(P,I) che decida se P termina su I. Per assurdo (diagonale): Diag(P) = "se Halt(P,P) cicla, altrimenti termina". Diag(Diag) termina sse Halt(Diag,Diag)=false, cioè sse non termina: contraddizione.

D: Differenza tra problema insolubile e intrattabile?
R: Insolubile: nessun algoritmo (halting). Intrattabile: algoritmo esiste ma costo esponenziale (Hanoi 2^n-1 mosse; NP-completi come Ciclo di Hamilton, nessun algoritmo polinomiale noto).

D: Cos'è una specifica (pre/post-condizione)? Esempio con Div(a,b).
R: Contratto: pre = ipotesi sull'input, post = proprietà dell'output. Div: pre a>=0, b>0; post a=bq+r e 0<=r<b.

D: Correttezza parziale vs totale?
R: Parziale: se termina, l'output è corretto. Totale = parziale + terminazione.

D: Come si dimostra la correttezza di un ricorsivo? Esempio DIV-REC.
R: Induzione completa: base + ipotesi induttiva sulle chiamate ricorsive + passo. DIV-REC: base a<b -> q=0,r=a ok; passo bq+r = b(q'+1)+r = (a-b)+b = a, con 0<=r<b ereditato dall'IH.

D: Le 3 fasi di una dimostrazione con invariante di ciclo?
R: Inizializzazione (vale all'ingresso), Mantenimento (se vale all'inizio di un'iterazione vale alla fine), Terminazione (Inv ∧ ¬Guardia ⇒ Post).

D: Invariante di DIV-IT (r:=a; q:=0; while r>=b: r-=b; q++)?
R: a = bq + r ∧ 0 <= r. All'uscita r<b, quindi Inv ∧ r<b ⇒ post.

D: Vero/Falso: "l'invariante del ciclo è la guardia." Motiva.
R: Falso. La guardia è falsa all'uscita, l'invariante no (vale sempre). Altri errori tipici: invariante come operazione ("r diminuisce di m") invece che proprietà dello stato; invariante troppo debole per implicare la post.

D: Come si dimostra la terminazione?
R: Misura che decresce strettamente in un ordine ben fondato (senza catene discendenti infinite, es. naturali). Fact: n; ricerca binaria: j-i+1. Misure composte: ordine lessicografico sulle tuple.

D: Collatz e terminazione?
R: Esempio di algoritmo la cui terminazione non è dimostrata.

D: Cos'è un accumulatore e cosa non lo è?
R: Variabile che porta lo stato e il cui nuovo valore dipende dal precedente (fact e i; q e r in Div). Le variabili temporanee ricalcolate da zero a ogni iterazione non lo sono.

D: Ordine di progetto invariant-first?
R: 1) idea di cosa accumulare; 2) invariante; 3) corpo che preserva l'invariante e avvicina alla soluzione; 4) guardia; 5) inizializzazione che rende vero l'invariante.

D: Invariante e struttura della ricerca binaria iterativa su A ordinato.
R: Inv: x ∉ A[0..i-1] ∧ x ∉ A[j+1..n-1]; m=⌊(i+j)/2⌋; A[m]<x -> i=m+1; A[m]>x -> j=m-1; si esce con i>j (assente, -1). O(log n).

D: Moltiplicazione alla russa: invariante e codice?
R: Inv n*m = z + a*b. a=n,b=m,z=0; while a>0: se a dispari z+=b; a/=2; b+=b. A uscita a=0 => z=n*m. ~log2 n iterazioni (deduzione mia).

D: Invarianti di Selection e Insertion sort?
R: Selection: v[0..i-1] ordinato e ogni elemento di v[i..] >= quelli del prefisso (prefisso definitivo). Insertion: solo v[0..i-1] ordinato, nessuna ipotesi sul resto.

D: Confronta Insertion e Selection sort (confronti e scambi).
R: Insertion: confronti O(n) su input ordinato, O(n^2) su inverso; scambi da 0 a O(n^2). Selection: confronti sempre O(n^2) (indipendenti dai dati), scambi sempre n-1.

D: Quando preferire Selection sort?
R: Quando le scritture costano (Flash/EEPROM), perché fa solo n-1 scambi. Insertion è ottimo su input quasi ordinati.

D: Costi esatti di Insertion (peggiore) e Selection?
R: Tins(n)=an^2+bn+c nel caso peggiore; Tsel(n)=n^2/2+7n/2-3 indipendente dall'input.

D: Ricerca lineare vs binaria: invarianti, costi, condizioni?
R: Lineare: inv x ∉ A[0..i-1], O(n), nessuna ipotesi sull'ordine. Binaria: inv x ∉ A[0..i-1] ∧ x ∉ A[j+1..n-1], O(log n), richiede A ordinato (costo conviene se ammortizzato su molte ricerche).

D: Cos'è TRIVIAL-SORT?
R: Prova le n! permutazioni finché ne trova una ordinata; impraticabile, solo riferimento negativo.

## 02 - Complessità asintotica, ricorrenze, ricorsione

D: Definisci Tcm, Tcp, Tmedio.
R: Tcm(n)=min_{|x|=n} T'(x); Tcp(n)=max_{|x|=n} T'(x) (la più usata: garanzia); Tmedio(n)=Σ T'(x)·p_x.

D: Perché si ignorano le costanti? Esempio con T=2^n.
R: Con hardware 1000 volte più veloce 2^D'/1000=2^D => D'=D+log2(1000)≈D+10: conta l'ordine di crescita, non la macchina.

D: Definizioni formali di O, Ω, Θ, o.
R: O: ∃c>0,n0 ∀n>n0: f<=c·g. Ω: c·g<=f. Θ: c1·g<=f<=c2·g, cioè Θ=O∩Ω. o: lim f/g=0 (allora f∈O(g) e g∉O(f)).

D: Criterio del limite: lim f/g = a.
R: 0<=a<∞ => O; 0<a<=∞ => Ω; 0<a<∞ => Θ.

D: Relazione tra O e Ω?
R: Duali: f∈O(g) ⇔ g∈Ω(f).

D: Vero/Falso: "Θ è un pre-ordine e O una relazione di equivalenza."
R: Falso, è il contrario: O è un pre-ordine (riflessiva, transitiva); Θ è di equivalenza (anche simmetrica), per questo si parla di classi.

D: Proprietà operative di O.
R: c·f=O(f); f+g=O(max{f,g}); O(f)·O(g)=O(f·g); polinomio di grado k ∈ Θ(n^k).

D: Dimostra 3n^2+7n+8 ∈ O(n^2).
R: Con c=4 e n0=8: 7n+8<=n^2 per n>=8, quindi 3n^2+7n+8<=4n^2.

D: Quanto vale log2(n!) e perché serve?
R: Θ(n log n). Serve per il lower bound Ω(n log n) dell'ordinamento (e Heapsort).

D: Gerarchia delle classi di crescita.
R: 1 < log n < n^(1/2) < n < n log n < n^2 < n^p < 2^n. (Il doc ha un refuso sulla cubica; qui n^p.)

D: Regole di costo per pseudocodice.
R: Sequenza: si sommano (O(max)); selezione: test + ramo più costoso; for con m iterazioni: m·O(f); while: serve un limite superiore alle iterazioni.

D: Perché PARTITION con 3 while apparentemente annidati è Θ(n) e non O(n^2)?
R: i cresce e j decresce, ciascuno in un solo verso: il totale dei movimenti è <= n. Conviene contare i movimenti totali, non moltiplicare i costi dei cicli.

D: Cosa sono limite inferiore, superiore e algoritmo ottimo?
R: Inferiore (Ω del problema): vale per ogni algoritmo nel caso peggiore. Superiore (O): costo del miglior algoritmo noto. Ottimo: il suo O coincide con l'Ω del problema. Gap = distanza tra i due.

D: Problema Somma17: lower bound e algoritmo ottimo?
R: Ω(n) (ogni elemento va visto). Vettore di presenza C[0..17] riempito in una passata O(n), poi controllo C[i]&&C[17-i] per i=0..8 in O(1): O(n), ottimo. Forza bruta O(n^2).

D: Schema del divide et impera e ricorrenza generale.
R: Se n<=k risolvi direttamente; altrimenti dividi in P1..Ph, risolvi, combina. T(n)=D(n)+C(n)+ΣT(ni).

D: Ricorrenza e costo di Merge sort; spazio.
R: T(n)=2T(⌊n/2⌋)+n => Θ(n log n) in tutti i casi (log2 n livelli, lavoro n per livello). Spazio ausiliario O(n).

D: Risolvi per sostituzione T(n)=2T(n/2)+n.
R: T=2^k·T(n/2^k)+kn, con k=log2 n: n·T(1)+n·log2 n = Θ(n log n).

D: Quick sort: ricorrenza e costo nel caso peggiore e medio; spazio.
R: Peggiore (partizioni n-1 e 0, es. input ordinato con pivot primo): T(n)=T(n-1)+n-1 => Θ(n^2). Medio O(n log n). Spazio O(log n) medio, O(n) nel peggiore. In-place, nessuna combinazione.

D: Merge vs Quick sort.
R: Merge garantisce O(n log n) ma O(n) memoria; Quick ha costanti piccole e in-place, migliore in pratica, ma rischia Θ(n^2) su input ordinati o quasi ordinati.

D: [INT] Enuncia il Master theorem per T(n)=aT(n/b)+f(n).
R: Confronta f con n^(log_b a). Caso 1: f∈O(n^(log_b a - ε)) => Θ(n^(log_b a)). Caso 2: f∈Θ(n^(log_b a)) => Θ(n^(log_b a)·log n). Caso 3: f∈Ω(n^(log_b a + ε)) e regolarità a·f(n/b)<=c·f(n), c<1 => Θ(f). [INT: non nelle fonti dell'utente]

D: [INT] Risolvi con Master: Merge sort, ricerca binaria, slowExp, fastExp.
R: Merge T=2T(n/2)+n: caso 2, Θ(n log n). Ricerca binaria/fastExp T=T(n/2)+1: caso 2, Θ(log n). slowExp T=2T(n/2)+1: n^(log2 2)=n, caso 1, Θ(n). [INT]

D: [INT] Risolvi T(n)=T(n/2)+n e verifica la regolarità.
R: a=1,b=2, n^0=1, f=n: caso 3. Regolarità: 1·(n/2)<=(1/2)·n, c=1/2<1. T=Θ(n). [INT]

D: [INT] Karatsuba e Strassen con Master?
R: Karatsuba T=3T(n/2)+n: caso 1, Θ(n^1.585). Strassen T=7T(n/2)+n^2: Θ(n^2.807); ingenua T=8T(n/2)+n^2: Θ(n^3). [INT, DA VERIFICARE se nel programma]

D: [INT] Quando il Master theorem non si applica?
R: Sottoproblemi di taglia n-1 (Quick sort peggiore T(n-1)+n-1, Fibonacci T(n-1)+T(n-2)+1); f nelle lacune tra i casi (es. 2T(n/2)+n/log n); caso 3 senza regolarità. In questi casi albero o sostituzione. [INT]

D: Ricorsione lineare vs di coda: differenze di spazio.
R: Lineare (fact): espansione + contrazione, tempo e spazio O(n), rischio stack overflow. Di coda: chiamata ricorsiva ultima operazione, stato negli accumulatori, spazio O(1), equivalente a un ciclo con invariante prod=counter!.

D: Perché Fib ricorsivo è esponenziale e come si risolve?
R: Sottoproblemi sovrapposti: Fib(5) ricalcola Fib(3) 2 volte, Fib(2) 3, Fib(1) 5. O(φ^n), φ≈1.618. Fib_iter (a,b con inv a=Fib(c-1), b=Fib(c)): O(n) tempo, O(1) spazio.

D: Ogni ricorsione si può trasformare in iterazione?
R: Sì, con una pila esplicita (ricorsione e iterazione sono equivalenti). Percorso: ricorsione generica -> lineare -> di coda -> ciclo.

D: Torri di Hanoi: algoritmo e numero di mosse?
R: Sposta n-1 dischi su ausiliario, poi il disco n, poi n-1 su destinazione: 2^n - 1 mosse (ottimo, la risposta stessa è così lunga).

D: Quattro passi del progetto ricorsivo induttivo?
R: Scomporre, assumere l'IH, combinare, trattare i casi base; più dimostrazione di terminazione (argomenti decrescenti in ordine ben fondato).

## 03 - Confini, esponenziale, programmazione dinamica

D: Come si dimostra Ω(n log n) per l'ordinamento per confronti?
R: Albero di decisione (nodi = confronti, foglie = output). Deve avere almeno n! foglie (una per permutazione); un albero binario con s foglie ha altezza >= log2 s, quindi h >= log2(n!) ∈ Ω(n log n). Merge sort e Heapsort sono ottimi.

D: Perché Counting sort ordina in O(n+k) senza violare il limite?
R: Non usa confronti: usa il valore come indice di array (interi in [0,k]). Il vantaggio svanisce se k >> n (k=n^2 non è lineare in n).

D: Problema Gemelli (duplicati in A[1..n]): upper e lower bound?
R: TWINS n^2, TWINS' n(n-1)/2 (sempre O(n^2)); TWINS'': ordina O(n log n) e controlla adiacenti O(n) => O(n log n). Lower bound banale Ω(n): gap non chiuso dal materiale.

D: Lower bound banale per il massimo di n elementi?
R: Almeno n-1 confronti.

D: Jack vs Fast-Jack (lunghezza massima di dispari consecutivi): costi e idea?
R: Jack riparte da ogni i: caso peggiore n(n+1)/2 = O(n^2). Fast-Jack: un solo ciclo con contatore p della sequenza corrente e massimo m; return max(m,p) per l'ultima sequenza: O(n).

D: Perché slowExp è O(n) nonostante sembri divide et impera?
R: Due chiamate identiche slowExp(x,⌊n/2⌋) ricalcolano lo stesso valore: T(n)=2T(n/2)+1 => 2n-1 = O(n), come l'approccio ingenuo.

D: fastExp: idea, formula, ricorrenza.
R: Una sola chiamata y=fastExp(x,⌊n/2⌋); n pari: y*y; dispari: y*y*x (x^(2k)=(x^k)^2, x^(2k+1)=x(x^k)^2). T(n)=T(n/2)+1 => O(log n).

D: fastExp iterativo: invariante e codice.
R: Inv x^n = y^k · z. y=x,k=n,z=1; while k>0: se k dispari z*=y; y*=y; k=⌊k/2⌋. A k=0: z=x^n. O(log n).

D: D&I vs programmazione dinamica?
R: D&I efficiente con sottoproblemi indipendenti; DP con sottoproblemi sovrapposti + sottostruttura ottimale (soluzione ottima composta da soluzioni ottime dei sottoproblemi).

D: Le 4 fasi della DP.
R: 1) struttura della soluzione ottima; 2) definizione ricorsiva del valore; 3) memoization (top-down); 4) versione bottom-up che riempie la tabella dai sottoproblemi piccoli ai grandi.

D: Fibonacci: tre versioni lineari e relativi spazi.
R: Memoization Θ(n); bottom-up con vettore Θ(n) tempo e spazio; iterativa con solo gli ultimi due valori Θ(n) tempo, O(1) spazio. Ricorsiva: Θ(Φ^n).

D: Lemmi di sottostruttura ottima della LCS.
R: Se x_m=y_n: LCS(X,Y)=LCS(X_{m-1},Y_{n-1}) seguita da x_m. Se x_m≠y_n: la più lunga tra LCS(X_{m-1},Y) e LCS(X,Y_{n-1}).

D: Ricorrenza della tabella c[i,j] della LCS.
R: 0 se i=0 o j=0; c[i-1,j-1]+1 se x_i=y_j; max(c[i,j-1], c[i-1,j]) altrimenti.

D: Costo della LCS ricorsiva vs tabulata?
R: Ricorsiva diretta T(n)=2T(n-1)+1 = Θ(2^n) (prefissi ricalcolati). Tabulata: (m+1)(n+1) sottoproblemi, Θ(mn).

D: A cosa servono le frecce b[i,j] nella LCS?
R: ↖ match, ↑ da (i-1,j), ← da (i,j-1): permettono di ricostruire una LCS risalendo dalla cella finale. [DA VERIFICARE: PRINT-LCS e ottimizzazione di spazio non nel doc]

## 04 - Array, liste, pile, code

D: Costi di insert/search/delete in array non ordinato e ordinato.
R: Non ordinato: O(1), O(N), O(N). Ordinato: insert O(N) (scambi all'indietro), search O(log N) (binaria), delete O(N) (trova in log N, compatta in N).

D: Array ridimensionabile: costo ammortizzato con incremento +1 vs raddoppio?
R: +1: copia a ogni insert su array pieno, O(m) ammortizzato per insert. Raddoppio: i-esima insert costa i se i-1 è potenza di 2, altrimenti 1; totale di m insert < 3m => O(1) ammortizzato. [DA VERIFICARE: dimostrazione completa non nel doc, solo enunciato]

D: Perché contrarre l'array a 1/4 e non a 1/2?
R: Contraendo (dimezzando) a 1/4 di riempimento si evita che una sequenza di insert/delete a cavallo della soglia causi copie continue.

D: Analisi ammortizzata vs caso medio?
R: Ammortizzata (aggregazione): costo totale di m operazioni / m, garanzia sul caso peggiore di una sequenza, senza ipotesi sulla distribuzione. Il caso medio è probabilistico.

D: Primitive delle liste e loro costo.
R: cons(x,L) nuovo nodo in testa, head(L), tail(L): tutte O(1) (head/tail solo su liste non vuote).

D: Le tre versioni di lunghezza di una lista e i loro spazi.
R: LENGTH-REC (1+LENGTH-REC(Tail)): spazio O(n) per lo stack; LENGTH-TAIL-REC con accumulatore e LENGTH-ITER: spazio O(1). Tempo sempre O(n).

D: Cancellazione dopo un nodo P in lista semplice: costo e codice?
R: O(1) se si ha il puntatore a P: P.next <- Tail(Tail(P)).

D: A cosa serve il record fittizio (dummy header) in CLONE-ITER?
R: Evita di trattare separatamente il primo nodo: R<-CONS(-,nil), C<-R; per ogni nodo C.next<-CONS(Head(L),nil); C<-C.next; return Tail(R). O(n).

D: Perché SLOW-REVERSE è O(n^2) e come si fa lineare?
R: APPEND(SLOW-REVERSE(TAIL(L)), testa), con APPEND O(n) chiamata n volte. Lineari: REVERSE-ITER (3 riferimenti, O(1) spazio), REVERSE-TAIL-REC con accumulatore M, REVERSE-REC (con L.next<-nil per evitare un ciclo).

D: INSERT e DELETE in lista ordinata ricorsivi: idea.
R: Si termina in anticipo se IsEmpty(L) o x<Head(L). INSERT: CONS(x,L) in quel caso, L se x=Head, altrimenti L.next<-INSERT(x,Tail(L)). DELETE analogo; il valore restituito ricuce la lista.

D: UNION di due liste ordinate: costo e proprietà.
R: Non distruttiva (CLONE nei casi base), confronta le teste e inserisce una sola copia se uguali: O(n+m).

D: MERGESORT su liste: split, merge, ricorrenza.
R: Split con puntatori lento/veloce (veloce +2, lento +1) in una passata O(n); MERGE in-place ricucendo i next, O(n). T(n)=2T(n/2)+O(n) => O(n log n) (Master caso 2 [INT]).

D: Pila vs coda su array: overflow, underflow, capacità.
R: Pila: Push/Pop/Top O(1); Pop/Top su vuota = underflow, Push su piena (S.top=dim) = overflow. Coda su array circolare con indici front/rear e (i+1) mod dim; una cella resta libera per distinguere piena da vuota, capacità dim-1; Enqueue/Dequeue O(1).

D: Perché array circolare per la coda?
R: Su array lineare il Dequeue costerebbe O(n) (scorrimento); con aritmetica modulare è O(1).

D: Coda su lista: perché due puntatori?
R: Servono front e rear: senza rear l'Enqueue sarebbe O(n). Tutto O(1), nessun overflow.

D: Array o lista per pila/coda?
R: Array se la dimensione massima è nota e la memoria stretta; lista se è imprevedibile (prezzo: un puntatore per elemento).

## 05 - Tabelle hash

D: Indirizzamento diretto: costi e difetto?
R: Insert/Search/Delete O(1) con una cella per ogni chiave possibile; spazio ∝ |U|, non al numero di chiavi (es. matricole a 6 cifre: |U|=10^6, 200 studenti da 1 KB sprecano il 95.6%).

D: Cos'è una collisione e perché è inevitabile?
R: k1≠k2 con h(k1)=h(k2); con h: U->{0..m-1}, m<<|U|, per il principio dei cassetti. Hash perfetto solo con insieme di chiavi statico e noto.

D: Uniformità semplice?
R: Ogni cella è ugualmente probabile: |h^-1(i)|=|h^-1(j)| per ogni i,j. Esempio: k mod 10 su {00..99} è uniforme, (somma delle cifre) mod 10 no.

D: Metodo di divisione e moltiplicazione: formule e scelta di m.
R: Divisione h(k)=k mod m: evitare m=2^p (usa solo i p bit bassi), scegliere m primo non vicino a potenza di 2. Moltiplicazione h(k)=⌊m(kA mod 1)⌋, A=(√5-1)/2 consigliato; qui m non è critico.

D: Concatenamento: costi di Insert, Search, Delete e fattore di carico.
R: α=n/m (lunghezza media delle liste). Insert in testa O(1); Search scorre la lista; Delete O(1) con liste doppie. Peggiore Θ(n); medio Θ(1+α); con m∝n, α=Θ(1) => O(1) atteso.

D: Costo medio di ricerca con successo nel concatenamento (derivazione)?
R: Per x_i (inserimento in testa) si esaminano x_i e i successivi nella stessa lista: (n-i)/m in media. (1/n)Σ[1+(n-i)/m] = 1 + α/2 - α/(2n) = Θ(1+α). Senza successo: Θ(1+α).

D: Indirizzamento aperto: definizione e vincolo su α.
R: Elementi dentro T; sequenza di ispezione h(k,i), i=0..m-1, che deve essere una permutazione di {0..m-1}. Necessariamente α<=1. Search conclude "assente" quando incontra una cella vuota.

D: Ispezione lineare, quadratica, doppio hashing: formule e problemi.
R: Lineare (h'(k)+i) mod m: addensamento primario. Quadratica (h'(k)+c1·i+c2·i^2) mod m: elimina il primario ma resta il secondario (stessa sequenza per stesso hash iniziale); c1,c2 vanno scelti perché sia una permutazione. Doppio (h1(k)+i·h2(k)) mod m: elimina entrambi.

D: Ispezioni attese in indirizzamento aperto (hashing uniforme)?
R: Senza successo <= 1/(1-α) (α=0.5 -> 2; α=0.9 -> 10). Con successo <= (1/α)·ln(1/(1-α)) (α=0.5 -> <1.387; α=0.9 -> <2.559). Esplode per α->1; non superare α=0.8.

D: Vero/Falso: "in indirizzamento aperto basta svuotare la cella per cancellare." Motiva.
R: Falso: si interrompono le sequenze di ispezione di altre chiavi. [DA VERIFICARE: il doc non dettaglia la soluzione; tipicamente un marcatore "deleted"]

D: Concatenamento vs indirizzamento aperto: medio, peggiore, criticità.
R: Concatenamento Θ(1+α), peggiore Θ(n), criticità puntatori/cache. Aperto O(1/(1-α)), peggiore O(n), degrada per α->1 e delete complessa. Concatenamento: α circa costante (~1).

## 06 - Alberi e BST

D: Definizioni: albero, foresta, livello, altezza, ramo.
R: Albero = grafo connesso e aciclico; foresta = alberi disgiunti. Livello = distanza dalla radice (radice a 0); altezza = livello massimo (ramo più lungo); ramo = cammino radice-foglia.

D: Rappresentazione child-sibling?
R: Ogni nodo punta al primo figlio (child) e al fratello successivo (sibling): un albero k-ario diventa un albero binario con un solo tipo di nodo.

D: Differenza tra DFS e BFS su alberi e costo?
R: Solo la struttura dati: pila (si scende a fondo) vs coda (per livelli). O(n) in entrambi: ogni nodo inserito ed estratto una volta.

D: DFS con pila: ordine dei figli?
R: L'ultimo inserito è il primo estratto: per visitare da sinistra a destra vanno inseriti in ordine inverso.

D: Definizione di BST e costo delle operazioni.
R: Per ogni nodo a: sottoalbero sinistro < a.key < sottoalbero destro, ricorsivamente. Ogni nodo ha key, left, right, parent. Operazioni O(h): dipendono dal bilanciamento.

D: Come si trova minimo, massimo?
R: Minimo: scendere sempre a sinistra (while T.left != nil); massimo: a destra.

D: Successore di N in un BST: casi.
R: Se N.right esiste: Tree-Min(N.right). Altrimenti si risale con i parent fino al primo avo A tale che N sia in A.left (while P!=nil e N=P.right: N:=P; P:=N.parent).

D: Come funziona l'inserimento in un BST e qual è il difetto di Rec-Tree-Insert?
R: Si aggiunge sempre una nuova foglia dove la ricerca terminerebbe con nil. Rec-Tree-Insert non imposta N.parent: serve Rec-Tree-Insert-Aux.

D: Cancellazione di Z in un BST: i 3 casi.
R: 1) foglia: nil nel padre; 2) un solo figlio: il figlio prende il posto; 3) due figli: copia la chiave del successore in Z e cancella il successore.

D: Perché nel caso 3 la cancellazione ricorre una sola volta?
R: Il successore è il minimo del sottoalbero destro, quindi non ha figlio sinistro e ricade nei casi 1 o 2.

D: Due metodi per cancellare un nodo con due figli?
R: Fusione e copia; le slide mostrano entrambi, lo pseudocodice usa la copia.

D: Come l'ordine di inserimento cambia la forma del BST?
R: 5,3,1,2,8,9,10 -> altezza 3, abbastanza bilanciato; 1,2,3,5,8,9,10 -> albero degenere (lista) di altezza n-1=6, operazioni O(n). Caso migliore: albero completo.

D: Perché l'in-order di un BST dà le chiavi ordinate?
R: Induzione: la lista L del sottoalbero sinistro è ordinata con chiavi < a, quella R del destro è ordinata con chiavi > a: L, a, R è ordinata.

D: Tree-Inorder con Append vs Tree-Inorder(T,L): costi?
R: Append(L,Cons(key,R)) costa O(|L|): sul degenere sinistro 1+2+..+(n-1) = O(n^2). Costruendo all'indietro (prima destro, poi radice in testa, poi sinistro) è O(n).

D: Perché il pre-order serve a serializzare un BST?
R: Reinserendo in un albero vuoto gli elementi in pre-ordine si ottiene un albero isomorfo all'originale. [DA VERIFICARE: post-order non descritto nel doc]

## 07 - Alberi rosso-neri

D: Le 3 proprietà di un albero rosso-nero.
R: 1) radice e foglie (sentinelle NIL) nere; 2) un nodo rosso ha entrambi i figli neri; 3) per ogni x tutti i cammini semplici da x alle foglie hanno lo stesso numero di nodi neri.

D: Definisci altezza nera bh(x).
R: Numero di nodi neri su un cammino da x a una foglia, escluso x.

D: Enuncia e dimostra a grandi linee h <= 2 log2(n+1).
R: Lemma a (induzione sull'altezza): sottoalbero di x ha >= 2^bh(x) - 1 nodi interni (bh(y_i) >= bh(x)-1). Lemma b: per la regola del rosso bh(T) >= h/2. Quindi n >= 2^(h/2) - 1 => h <= 2 log2(n+1). Search/insert/delete O(log n) nel caso peggiore.

D: Cosa preserva una rotazione e quanto costa?
R: O(1); preserva la proprietà BST e l'ordine in-order; cambia solo forma locale (e i colori li cambia il fix-up).

D: Left-Rotate(T,x): effetto sui puntatori.
R: Richiede x.right=y non nullo. y diventa radice del sottoalbero, x suo figlio sinistro, il vecchio y.left (β) diventa figlio destro di x; si aggiornano anche i parent. Right-Rotate è speculare.

D: Perché si inserisce un nodo rosso?
R: Non altera le altezze nere: si può violare al più la regola del rosso (padre rosso), la più semplice da riparare. Se x è radice basta colorarla di nero.

D: Fix-up di inserimento: i 3 casi (padre p figlio sinistro).
R: 1) zio rosso: p e u neri, g rosso, il problema sale a g. 2) zio nero, x figlio sinistro: p nero, g rosso, Right-Rotate(g); fine. 3) zio nero, x figlio destro: Left-Rotate(p), si riconduce al caso 2. Casi con p destro speculari.

D: Cancellazione R-N: casi 1 e 2 e idea generale.
R: Si elimina un nodo u con al più un figlio vero; v il sostituto. Caso 1: u rosso, nulla è violato. Caso 2: u nero e v rosso: v diventa nero. Togliere un nero lascia un "deficit di nero" sui cammini per u.

D: Cancellazione R-N, caso 3 (u e v neri): i 4 sottocasi (fratello s di v, v figlio sinistro).
R: 3.1 s rosso: p rosso, s nero, ruota su p, poi 3.2/3.3/3.4. 3.2 s nero con figli neri: s rosso, deficit sale a p. 3.3 s nero, figlio interno rosso e esterno nero: s rosso, figlio nero, Right-Rotate(s) -> 3.4. 3.4 s nero, figlio esterno rosso: s prende colore di p, p e figlio neri, Left-Rotate(p); fine.

D: Numero massimo di rotazioni per insert/delete R-N?
R: [DA VERIFICARE] Non quantificato nel doc.

D: BST vs R-N?
R: BST: altezza fino a n-1, operazioni O(n) nel degenere. R-N: altezza <= 2 log2(n+1), operazioni O(log n) garantite, al prezzo di colori e fix-up.

## 08 - Heap e code di priorità

D: Le due proprietà di uno heap.
R: Strutturale: albero completo tranne al più l'ultimo livello riempito da sinistra (altezza logaritmica). Ordinamento: Max-Heap key(nodo) >= key(figli) (Min-Heap <=). Più debole di un BST: solo padre-figlio.

D: Indici nell'array H[1..n]: padre, figli, foglie.
R: Left(i)=2i, Right(i)=2i+1, Parent(i)=⌊i/2⌋. Foglie: H[⌊n/2⌋+1..n] (per n>1, i è foglia sse n<2i).

D: Insert in un max-heap: algoritmo e costo.
R: HeapSize++, x in ultima posizione, poi scambio col padre finché H[Parent(i)] < H[i]. O(log n). Maximum è H[1], O(1).

D: ExtractMaximum e Heapify: algoritmo e costo.
R: Salva H[1], H[1]:=H[HeapSize], HeapSize--, Heapify(H,1). Heapify(i) (pre: sottoalberi dei figli sono heap) scambia H[i] col figlio maggiore e ripete. O(log n).

D: BuildHeap: algoritmo, perché da ⌊n/2⌋ e costo.
R: for i=⌊n/2⌋ downto 1: Heapify(i). Le foglie sono già heap; si procede dal basso così i sottoalberi sono heap. Limite grezzo O(n log n), analisi raffinata O(n). [DA VERIFICARE: il doc enuncia O(n) senza dimostrarlo]

D: Heapsort: algoritmo, invariante, costo.
R: BuildHeap; for i=n downto 2: scambia V[1] con V[i], HeapSize--, Heapify(V,1). Inv: V[1..i] heap, V[i+1..n] ordinato e >= . O(n)+log2(n!) = O(n log n) nel caso peggiore, ottimo per confronti.

D: Heapsort vs Selection sort?
R: Stessa idea (estrarre il massimo), ma l'estrazione costa O(log n) invece di O(n).

D: Costi delle operazioni di una coda di priorità su heap.
R: Insert O(log n), ExtractMax O(log n), Max O(1).

## 09 - Grafi e visite

D: Grafo orientato vs non orientato.
R: Orientato: G=(V,E), E⊆V×V, ammessi cappi, adiacenza non simmetrica. Non orientato: E⊆{{u,v}|u≠v}, niente cappi.

D: Matrice vs liste di adiacenza.
R: Matrice: spazio Θ(|V|^2), arco in O(1), vicini Θ(|V|); simmetrica con diagonale 0 se non orientato. Liste: Θ(|V|+|E|), meglio per grafi sparsi, vicini proporzionali al grado, esistenza arco scorre Adj[u].

D: BFS: struttura dati, cosa calcola, costo.
R: Coda FIFO, visita per livelli; trova i cammini minimi in numero di archi δ(s,v) (grafo non pesato). O(|V|+|E|): ogni vertice e arco considerato un numero costante di volte. Colori bianco/grigio/nero.

D: DFS temporizzata: cosa sono d, f, π e cosa produce?
R: u.d = istante di scoperta (grigio), u.f = fine esplorazione (nero), π predecessore, time contatore globale. Il driver lancia DFS su ogni vertice bianco: foresta DFS.

D: Teorema delle parentesi.
R: Per ogni u,v vale esattamente una: intervalli [u.d,u.f] e [v.d,v.f] disgiunti, oppure uno contenuto nell'altro (discendente). Mai sovrapposizioni parziali.

D: Classifica gli archi (u,v) in DFS in base al colore di v.
R: Albero (v bianco); all'indietro (v grigio, antenato di u: v.d<=u.d<u.f<=v.f, indica un ciclo); in avanti (v nero, discendente: u.d<v.d<v.f<u.f); trasversale (v nero, altrove: v.d<v.f<u.d<u.f).

D: Teorema del cammino bianco e corollario.
R: v è discendente di u sse al tempo u.d esiste un cammino tutto bianco da u a v. Corollario delle parentesi: v discendente di u sse u.d < v.d < v.f < u.f.

D: Lemma di aciclicità.
R: G è aciclico sse una DFS non genera archi all'indietro. (⇐) per assurdo: se C ciclo e (u,v) l'arco con v.d minimo, per cammino bianco v.d<u.d<u.f<v.f: (u,v) è all'indietro.

D: Ordinamento topologico: definizione, esistenza, algoritmo, costo.
R: Linearizzazione in cui ogni arco (u,v) ha u prima di v. Esiste sse G è un DAG. DFS che inserisce ogni vertice in testa a una lista quando diventa nero. Θ(|V|+|E|). Ne possono esistere più d'uno.

D: Dimostra la correttezza dell'ordinamento topologico.
R: Basta v.f < u.f per ogni arco (u,v). Albero, in avanti, trasversale: v.f<u.f dai tempi. All'indietro darebbe u.f<v.f ma implica un ciclo, impossibile in un DAG. (Caso u.f<v.d impossibile: v sarebbe stato visitato da u.)

D: Cos'è una componente fortemente connessa e come si calcola in Θ(V+E) (Kosaraju)?
R: Insieme massimale C con u⤳v e v⤳u per ogni coppia. 1) DFS(G) calcolando f; 2) G^T (archi invertiti); 3) DFS(G^T) scegliendo i vertici in ordine decrescente di f; 4) ogni albero della foresta di G^T è una cfc. Naive: DFS(G,u)+DFS(G^T,u) per ogni u, O(|V|(|V|+|E|)); C(u)=D(u)∩A(u).

D: Perché Kosaraju funziona (a grandi linee)?
R: Lemma 2: arco (u,v) tra cfc distinte C->C' implica C.f > C'.f. Quindi in G^T gli archi uscenti dalla cfc con f massimo non escono dalla cfc: l'albero radicato nel vertice di f massimo è esattamente C; induzione sul numero di alberi.

D: BFS vs DFS: struttura dati e applicazioni.
R: BFS coda, distanze minime in archi; DFS pila/ricorsione, backtracking, rilevazione cicli, ordinamento topologico, cfc. Non dà distanze minime.

## 10 - Greedy, MST, cammini minimi

D: Cos'è un MST e quante soluzioni?
R: Albero di copertura (connesso, aciclico, copre V) di peso w(T)=Σw minimo; non necessariamente unico.

D: Arco sicuro, taglio, arco leggero.
R: Sicuro per A: esiste un MST T con A∪{(u,v)}⊆T. Taglio (S,V\S); un arco lo attraversa se ha un estremo per parte; rispetta A se nessun arco di A lo attraversa; leggero = peso minimo tra quelli che lo attraversano.

D: Enuncia e dimostra il teorema del taglio.
R: Taglio che rispetta A: ogni arco leggero che lo attraversa è sicuro. Dim.: T MST con A⊆T, (u,v) leggero non in T; T+(u,v) ha un ciclo che attraversa il taglio con un altro arco (x,y). T' = T-(x,y)+(u,v) ha w(T')=w(T)-w(x,y)+w(u,v) <= w(T), quindi è MST e contiene A∪{(u,v)}.

D: Corollario del teorema del taglio usato da Kruskal e Prim?
R: Se C è una componente (albero) della foresta G_A=(V,A) e (u,v) è leggero per (V_C, V\V_C), allora (u,v) è sicuro.

D: Kruskal: idea, strutture dati, costo.
R: Foresta di singoli vertici; scorre gli archi in ordine di peso non decrescente; se Find(u)≠Find(w) aggiunge l'arco e fa Union, altrimenti lo scarta (ciclo). Union-Find con unione per rango e compressione. Ordinamento O(m log m) + MakeSet O(n) + Find/Union O(m log n) ammortizzato = O(m log n).

D: Invariante di Kruskal (4 punti).
R: 1) ∃ MST T con A⊆T; 2) gli archi di A collegano vertici nella stessa parte; 3) ogni parte U con A[U] è un albero di G_A; 4) gli archi scartati non sono in T\A.

D: Union-Find: ADT e implementazione.
R: MakeSet(U), Find(x,P) (rappresentante), Union(x,y,P). Foresta di alberi pozzo (vettore dei padri), radice = rappresentante. Unione per rango (albero più basso figlio dell'altro) + compressione del cammino. [DA VERIFICARE: implementazione e pseudocodice completo non nel doc]

D: Prim: idea, struttura dati, costo.
R: Cresce un solo albero da un vertice arbitrario, aggiungendo l'arco più leggero tra albero e resto. Min-coda con v.key = peso del più leggero arco verso l'albero (∞ se nessuno); Extract-Min e Decrease-Key. n Extract-Min O(n log n) + al più m Decrease-Key O(m log n) = O(m log n).

D: Invariante di Prim e significato dei colori?
R: (1) ∃ MST T con A⊆T; (2) V[A] = vertici neri o grigi; (3) se v∈Q e key<∞, key=w(u,v) per qualche u∈V[A]\Q. Bianchi key=∞, grigi frontiera, neri già nell'albero.

D: Kruskal vs Prim.
R: Entrambi O(m log n) e giustificati dal teorema del taglio. Kruskal: visione globale sugli archi (ordina tutto + Union-Find). Prim: visione locale sui vertici (frontiera con coda di priorità).

D: Quando il greedy non è ottimo? Esempio del resto.
R: Servono scelta greedy valida e sottostruttura ottima. Monete 50,10,1: 72 = 50+10+10+1+1 ottimo. Con moneta da 11: per 15 il greedy dà 11+1+1+1+1 (5 monete), non ottimo. [DA VERIFICARE: soluzione migliore esatta]

D: Problema dei cammini minimi da sorgente singola: dati e output.
R: G orientato, w:E->R, sorgente s; output albero dei cammini minimi G_π radicato in s, con v.d (stima) e v.π. δ(u,v) = minimo peso dei cammini, ∞ se irraggiungibile. Ben definito senza cicli negativi; v.d >= δ(s,v) sempre.

D: Lemma dei sottocammini, disuguaglianza triangolare, convergenza.
R: Sottocammini di cammini minimi sono minimi (per assurdo: se ne esistesse uno migliore lo si sostituirebbe). δ(u,v)<=δ(u,z)+δ(z,v). Convergenza: se s->u->v è minimo e u.d=δ(s,u), dopo Relax(u,v,w) vale v.d=δ(s,v).

D: Operazione Relax.
R: Relax(u,v,w): if v.d > u.d + w(u,v) then v.d <- u.d + w(u,v); v.π <- u.

D: Dijkstra: algoritmo.
R: d=∞, π=nil, s.d=0; Q=coda di priorità su V; while Q≠∅: u=Extract-Min(Q), S=S∪{u}; per ogni v in Adj[u], rilassa (u,v) con Decrease-Key. Inv: Q=V\S ∧ ∀v∈S v.d=δ(s,v). Richiede w>=0.

D: Dimostra la correttezza di Dijkstra.
R: Per assurdo, u primo vertice inserito in S con u.d>δ(s,u). Sul cammino minimo a u c'è un arco (x,y), x∈S, y∉S primo fuori. x.d=δ(s,x) per minimalità di u; per convergenza y.d=δ(s,y). Pesi >=0: δ(s,y)<=δ(s,u)<u.d, quindi y.d<u.d e Extract-Min avrebbe scelto y: contraddizione.

D: Controesempio di Dijkstra con pesi negativi.
R: s->u (3), s->v (5), v->u (-4): u estratto con 3 e dichiarato definitivo; ma via v si arriva a 5-4=1. Risultato 3 anziché 1. Serve Bellman-Ford.

D: Costi di Dijkstra e di Bellman-Ford.
R: Dijkstra con heap binario: |V| Extract-Min + al più |E| Decrease-Key = O(E log V) per grafo connesso. Bellman-Ford (pesi negativi, senza cicli negativi): O(|V||E|). Pape-D'Esopo: superpolinomiale nel peggiore, quasi lineare su grafi stradali. [DA VERIFICARE: Dijkstra con array O(V^2) non menzionato]

## 11 - Laboratorio

D: Git: tre aree e ciclo di lavoro.
R: Working directory, staging area (git add), repository (git commit). Ciclo: pull, modifica, add, commit, push (sempre git pull prima di cominciare).

D: TDD e proprietà degli unit test.
R: Test automatici, focalizzati, indipendenti; bottom-up. TDD: Rosso (test che fallisce), Verde (codice minimo), Refactor; niente codice senza un test che lo richiede. [DA VERIFICARE se l'orale include il lab]

D: Makefile: variabili automatiche principali.
R: Regola di compilazione $(BUILD_DIR)/%.o: $(SRC_DIR)/%.c con $(CC) $(CFLAGS) -c $< -o $@; nel linking $^ = tutti i prerequisiti, $@ = target. Target all (predefinito) e clean.

D: HybridSort: idea e perché la soglia k va trovata sperimentalmente?
R: QuickSort se la partizione ha n>=k, SelectionSort se n<k (overhead minimo su array piccoli). k dipende da CPU, cache, compilatore, dati: troppo bassa = nessun beneficio, troppo alta = tende a O(n^2).

D: PARTITION di Lomuto?
R: x=A[r]; i=p-1; for j=p..r-1: se A[j]<=x {i++; swap A[i],A[j]}; swap A[i+1],A[r]; return i+1. Ottimizzazioni: pivot casuale o mediana di tre, partizionamento a tre vie per i duplicati.

D: Lab 05: complessità richiesta per la hash table generica e perché void*?
R: put/get/remove O(1) in media (altrimenti consegna invalida), concatenamento, void* con funzioni di confronto e hash passate a create.

D: Lab 07: perché una hash table ausiliaria nell'heap ternario?
R: Per mappare ogni elemento alla sua posizione nell'array: senza, contains e remove costerebbero O(n); servono operazioni sub-lineari. Heap ternario: nodo con fino a 3 figli, node(i) >= figli.

D: Lab 09: rappresentazione e costi dei grafi sparsi.
R: Liste di adiacenza indicizzate da una hash table, spazio O(|V|+|E|). add_node, contains_node, add_edge, contains_edge, remove_edge, get_label O(1); remove_node, get_nodes, get_edges, num_edges O(n); get_neighbours O(1) assumendo grado circa costante.
