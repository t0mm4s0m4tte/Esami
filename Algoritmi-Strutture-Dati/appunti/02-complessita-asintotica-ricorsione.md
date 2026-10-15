# 02 - Complessità asintotica, ricorrenze, divide et impera, ricorsione

Fonte: doc Drive "Appunti" (sezioni: Complessità asintotica, Tempo di calcolo, Relazioni di O, Dispensa, Relazioni di ricorrenza, Ricorsione). La sezione sul Master theorem è **[INT]**: integrazione mia, non presente nelle fonti dell'utente.

## Mappa

Si parte da come si misura il costo di un algoritmo (funzione T(n), casi migliore/peggiore/medio) e dalle notazioni O, Ω, Θ, o con le loro proprietà; si vedono le regole per analizzare pseudocodice (con PARTITION come caso istruttivo), la nozione di ottimalità, poi il divide et impera con Merge sort e Quick sort e le relative ricorrenze (inclusa la sezione [INT] sul Master theorem), e infine la ricorsione nelle sue forme (lineare, di coda, ad albero) confrontata con l'iterazione.

- [Costo e casi](#costo-e-casi)
- [Notazioni (definizioni)](#notazioni-definizioni)
- [Regole per pseudocodice](#regole-per-pseudocodice)
- [Complessità del problema e ottimalità](#complessità-del-problema-e-ottimalità)
- [Divide et impera](#divide-et-impera)
- [Il Master theorem [INT]](#il-master-theorem-int)
- [Ricorsione](#ricorsione)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## Costo e casi

Per confrontare algoritmi non si misurano secondi ma **operazioni elementari**, espresse come funzione T(n) della dimensione dell'input. Poiché a parità di dimensione input diversi possono costare molto diversamente, si distinguono tre misure:
- caso migliore: Tcm(n)=min_{|x|=n} T'(x);
- caso peggiore: **Tcp(n)=max_{|x|=n} T'(x)** (la più usata, perché dà una garanzia);
- caso medio: Tmedio(n)=Σ T'(x)·p_x.

Il minimo di un vettore, per esempio, ha T(n)=an+b: lineare.

Ignorare le costanti moltiplicative è una scelta ragionevole, e lo si capisce da qualche conto. Con T=2^n, un hardware 1000 volte più veloce permette di risolvere istanze solo di poco più grandi: 2^D'/1000=2^D implica D'=D+log2(1000)≈D+10 (e solo +2 con un hardware 4 volte più veloce). Un algoritmo da 100n batte uno da 2n^2 per n>50; T1=n^2/100 contro T2=2n+300 si incrociano a n=300 (con n^2/200 a n>=517). Conta l'ordine di crescita, non la macchina.

## Notazioni (definizioni)

Le notazioni asintotiche formalizzano proprio questa idea di "ordine di crescita". Le definizioni sono:
- **f∈O(g)** ⇔ ∃c>0, ∃n0 ∀n>n0: f(n) <= c·g(n) (g è un limite superiore).
- **f∈Ω(g)** ⇔ ∃c>0, ∃n0 ∀n>n0: c·g(n) <= f(n) (limite inferiore).
- **f∈Θ(g)** ⇔ ∃c1,c2>0, ∃n0: c1·g <= f <= c2·g, cioè **Θ(f)=O(f)∩Ω(f)**.
- **f∈o(g)** ⇔ lim f/g = 0; allora f∈O(g) ∧ g∉O(f) (crescita strettamente inferiore).

Quando i limiti esistono sono la via più rapida: se lim f/g = a, allora 0<=a<∞ dà O, 0<a<=∞ dà Ω e 0<a<∞ dà Θ. Le notazioni hanno una struttura ordinata. O e Ω sono **duali**: f∈O(g) ⇔ g∈Ω(f), perché da f<=c·g segue (1/c)·f<=g. **O è un pre-ordine** (riflessiva e transitiva: f<=c·g<=c·d·h), mentre **Θ è una relazione di equivalenza** (riflessiva, simmetrica, transitiva): è proprio per questo che si parla di "classi" di complessità.

Le proprietà operative più usate sono:
- una costante non conta: c·f=O(f);
- la somma è dominata dal termine maggiore: f+g=O(max{f,g});
- il prodotto si comporta bene: O(f)·O(g)=O(f·g);
- un polinomio di grado k è in Θ(n^k).

Due esempi svolti: 3n^2+7n+8 ∈ O(n^2) con c=4 e n0=8 (basta che 7n+8<=n^2 per n>=8); 4n^2+4n-1 ∈ Θ(n^2) per somma e riflessività. Sul fattoriale si ha 2^n <= n! <= n^n quasi ovunque e soprattutto **log2(n!) ∈ Θ(n log n)**, fatto che tornerà nel limite inferiore dell'ordinamento. L'ordine delle classi più comuni (la **gerarchia**) è:

1 < log n < n^(1/2) < n < n log n < n^2 < n^p < 2^n

Per darne un'idea, con n=64 si ha n^2=4096 ma 2^64≈1.8·10^19.

## Regole per pseudocodice

Per analizzare un frammento di pseudocodice si compongono i costi con poche regole:
- **sequenza**: i costi si sommano, quindi O(f)+O(g)=O(max);
- **selezione**: si paga il test più il ramo più costoso;
- **for** con m iterazioni: costa m·O(f(n));
- **while**: è il caso difficile, perché serve un limite superiore sul numero di iterazioni, che non è immediato.

Due esempi mostrano come procedere. IND-MIN (minimo in B di m elementi) è Θ(m); SELECT-SORT è (n-1)·O(n) = Θ(n^2). Più interessante è **PARTITION(A[i..j],m)**, che ha tre while apparentemente annidati e quindi una stima ingenua di O(n^2). In realtà gli indici i e j si muovono ciascuno in un solo verso (i cresce, j decresce) e il totale dei movimenti è <= n, quindi il costo è **Θ(n)**: la lezione è che conviene contare i movimenti totali anziché moltiplicare i costi dei cicli. Questo si vede chiaramente nella riscrittura con un solo while (se A[i]<=m: i++; altrimenti se A[j]>m: j--; altrimenti scambia e i++, j--), dove ogni iterazione costa O(1) e j-i cala di almeno 1. Un ultimo esempio banale: inizializzare la matrice identità n×n è un doppio ciclo O(n^2) più un ciclo sulla diagonale O(n), in totale O(n^2).

## Complessità del problema e ottimalità

Finora si è parlato di costo di un algoritmo; si può parlare anche di complessità di un *problema*. Il limite **inferiore** del problema (Ω) vale per ogni algoritmo nel caso peggiore, mentre il limite **superiore** (O) è il costo del miglior algoritmo noto. Un algoritmo è **ottimo** quando il suo O coincide con l'Ω del problema.

L'esempio del doc è "somma 17": trovare due elementi di un vettore la cui somma sia 17. L'algoritmo ingenuo prova le coppie ed è O(n^2); ma ogni elemento va visto almeno una volta, quindi il problema è Ω(n). Si può raggiungere quel limite con un vettore di presenza c[0..17] (c[x]=1 se x è presente e x<=17) riempito in una passata, per poi controllare c[i]&&c[17-i] per i=0..8, che è O(1): in totale **O(n), ottimo**.

## Divide et impera

Il divide et impera risolve un problema di taglia grande spezzandolo: se n<=k lo si risolve direttamente; altrimenti lo si divide in sottoproblemi P1..Ph, li si risolve ricorsivamente e se ne combinano i risultati. Il costo segue la ricorrenza **T(n)=D(n)+C(n)+ΣT(ni)**, dove D e C sono i costi di divisione e combinazione.

Il **Merge sort** è il caso da manuale: B=MS(A[1..k]), C=MS(A[k+1..n]), return MERGE(B,C), con k=⌊n/2⌋. La ricorrenza è **T(n)=2T(⌊n/2⌋)+n**. Nell'albero di ricorsione ci sono log2 n livelli e su ciascuno si lavora per n in tutto, quindi il costo è **Θ(n log n)** in tutti i casi; per sostituzione si ottiene lo stesso risultato: T=2^k·T(n/2^k)+kn, con k=log2 n, da cui n·T(1)+n·log2 n. Il prezzo è lo spazio ausiliario O(n).

Il **Quick sort** sposta il lavoro dalla fase di combinazione a quella di divisione: PARTITION (lineare) più due chiamate ricorsive, nessuna combinazione e ordinamento in-place. Nel caso peggiore le partizioni sono sbilanciate (n-1 e 0, per esempio su input già ordinato con pivot primo) e si ha **T(n)=T(n-1)+n-1 ⇒ Θ(n^2)**. Nel caso medio, con posizioni del pivot equiprobabili, vale T(n)<=2(n+1)·Σ_{k=3}^{n+1}1/k e quindi **O(n log n)**. Lo spazio è O(log n) in media e O(n) nel caso peggiore.

Il confronto fra i due va letto così: Merge garantisce O(n log n) ma richiede O(n) di memoria; Quick è migliore in pratica (costanti piccole, in-place) ma rischia Θ(n^2) su input ordinati o quasi ordinati.

## Il Master theorem [INT]

> Sezione **[INT]**: non presente nelle fonti dell'utente (il doc risolve le ricorrenze solo con albero di ricorsione e sostituzione). Integrata come strumento di verifica rapida; Karatsuba e Strassen sono qui solo come esempi applicativi e non risultano nel programma [DA VERIFICARE se servono per l'esame].

Le ricorrenze dei divide et impera hanno quasi sempre la forma **T(n) = a·T(n/b) + f(n)**, con a >= 1 sottoproblemi, ciascuno di taglia n/b con b > 1, e f(n) il costo di divisione e combinazione. Il Master theorem le risolve confrontando f(n) con la quantità **n^(log_b a)**. L'intuizione sta nell'albero di ricorsione: al livello i ci sono a^i nodi, ciascuno di taglia n/b^i, quindi il costo del livello i è a^i·f(n/b^i). L'albero ha log_b n livelli e le foglie sono a^(log_b n) = n^(log_b a). La domanda è dove si concentra il lavoro: se i costi per livello crescono verso il basso domina il lavoro alle foglie (caso 1), se sono costanti ogni livello pesa uguale (caso 2), se decrescono domina la radice (caso 3). Il teorema ha tre casi:

1. **Caso 1**: se f(n) ∈ O(n^(log_b a - ε)) per qualche ε>0, cioè f cresce polinomialmente *meno* di n^(log_b a), allora **T(n) ∈ Θ(n^(log_b a))**. Domina il lavoro alle foglie.
2. **Caso 2**: se f(n) ∈ Θ(n^(log_b a)), allora **T(n) ∈ Θ(n^(log_b a)·log n)**. Ogni livello contribuisce quanto gli altri e si moltiplica per il numero di livelli. (Versione generale: se f ∈ Θ(n^(log_b a)·log^k n) con k>=0, allora T ∈ Θ(n^(log_b a)·log^(k+1) n).)
3. **Caso 3**: se f(n) ∈ Ω(n^(log_b a + ε)) per qualche ε>0 **e** vale la condizione di regolarità a·f(n/b) <= c·f(n) per qualche c<1 (e n grande), allora **T(n) ∈ Θ(f(n))**. Domina il lavoro alla radice.

Esempi svolti, tutti coerenti con quanto già ricavato a mano nel doc:

| Algoritmo | Ricorrenza | a, b, n^(log_b a), f | Caso | Risultato |
|---|---|---|---|---|
| Merge sort | T(n)=2T(n/2)+n | 2, 2, n, n | 2 | Θ(n log n) |
| Ricerca binaria | T(n)=T(n/2)+1 | 1, 2, n^0=1, 1 | 2 | Θ(log n) |
| fastExp (vedi 03) | T(n)=T(n/2)+1 | 1, 2, 1, 1 | 2 | Θ(log n) |
| slowExp (vedi 03) | T(n)=2T(n/2)+1 | 2, 2, n, 1 | 1 | Θ(n) |
| Karatsuba (moltiplicazione di interi) | T(n)=3T(n/2)+n | 3, 2, n^(log2 3)≈n^1.585, n | 1 | Θ(n^1.585) |
| Moltiplicazione di matrici ingenua | T(n)=8T(n/2)+n^2 | 8, 2, n^3, n^2 | 1 | Θ(n^3) |
| Strassen (matrici) | T(n)=7T(n/2)+n^2 | 7, 2, n^(log2 7)≈n^2.807, n^2 | 1 | Θ(n^2.807) |
| Esempio di caso 3 | T(n)=T(n/2)+n | 1, 2, 1, n | 3 | Θ(n) |

Per il caso 3 dell'ultimo esempio la regolarità si verifica con 1·(n/2) <= (1/2)·n, quindi c=1/2<1. Per la ricerca binaria il conto è lo stesso di fastExp: dimezza il problema e fa lavoro costante, e il caso 2 dà Θ(log n).

Il teorema **non** copre tutto, e questi limiti sono domande da orale. Non si applica a ricorrenze con sottoproblemi di taglia n-1 come Quick sort nel caso peggiore, T(n)=T(n-1)+n-1, né a Fibonacci T(n)=T(n-1)+T(n-2)+1 (qui vale l'albero o la sostituzione, come nel doc). Non si applica nemmeno quando f cade nelle "lacune" tra i casi, ad esempio T(n)=2T(n/2)+n/log n: f è più piccola di n ma non polinomialmente più piccola, e il caso 1 non vale. Infine la condizione di regolarità del caso 3 va sempre verificata. Come regola pratica: si applica il Master theorem per ottenere subito la risposta e si controlla, quando è possibile, con l'albero di ricorsione.

## Ricorsione

La ricorsione si presenta in tre forme, in ordine crescente di efficienza.

La ricorsione **lineare** ha una sola chiamata ricorsiva: fact(n)=n·fact(n-1), con caso base n=0. Si ha una fase di espansione (le chiamate si accumulano nello stack) seguita da una di contrazione (i prodotti vengono calcolati al ritorno); tempo e spazio sono O(n), con rischio di stack overflow. La ricorsione **di coda** fa sì che la chiamata ricorsiva sia l'ultima operazione e che lo stato viaggi negli accumulatori, quindi non c'è nulla da fare al ritorno: `fact_tail_helper(prod,counter,n)`: if counter==n return prod; else helper(prod*(counter+1), counter+1, n). Lo spazio scende a O(1) e la funzione è equivalente al ciclo `while(counter!=n){prod*=counter+1; counter++;}` con invariante prod=counter!.

La ricorsione **ad albero** ha più chiamate per livello ed è insidiosa se i sottoproblemi si sovrappongono. Fib(n)=Fib(n-2)+Fib(n-1) (base n<2 -> 1) è esponenziale, O(φ^n) con φ≈1.618: Fib(5) calcola Fib(3) 2 volte, Fib(2) 3 volte, Fib(1) 5 volte. Lo stesso accade per il coefficiente binomiale C(n,k)=C(n-1,k-1)+C(n-1,k). La versione iterativa Fib_iter usa a=0, b=1 e un ciclo di n iterazioni `temp=b; b=a+b; a=temp` con invariante a=Fib(c-1), b=Fib(c), ed è **O(n) in tempo e O(1) in spazio**. La stessa idea, generalizzata, è la programmazione dinamica (vedi 03).

Ricorsione e iterazione sono comunque **equivalenti**: ogni ricorsione si simula con un'iterazione più una **pila esplicita** (per fact(3): push di 3*?, 2*?, 1*?, poi i pop che completano i prodotti). Questo suggerisce un percorso di ottimizzazione che va dalla ricorsione generica a quella lineare, poi di coda e infine al ciclo. Un caso in cui la ricorsione è decisamente più chiara dell'iterazione sono le **Torri di Hanoi**: si spostano n-1 dischi da sorgente ad ausiliario, poi il disco n, poi n-1 da ausiliario a destinazione, per un totale di **2^n - 1** mosse.

Il **progetto ricorsivo induttivo** segue quattro passi:
1. scomporre il problema;
2. assumere l'IH sui sottoproblemi;
3. combinare i risultati;
4. trattare i casi base.

Come per l'iterazione, richiede come per l'iterazione, una dimostrazione di terminazione: gli argomenti devono decrescere in un ordine ben fondato (g(n)=g(n) non termina; Collatz non è dimostrato). Come sintesi: la ricorsione è più leggibile ma rischia stack e ridondanze; l'iterazione ha spazio O(1) e si debugga più facilmente.

## Cose da saper fare all'esame

**Scritto**
- Dimostrare f∈O/Ω/Θ(g) trovando c e n0 (anche col limite).
- Calcolare la complessità di pseudocodice con cicli annidati (attenzione a PARTITION-like: contare i movimenti totali).
- Scrivere e risolvere la ricorrenza di un divide et impera (albero/sostituzione, e verifica col Master theorem [INT]).
- Ordinare funzioni per crescita; usare log(n!)∈Θ(n log n).
- Trasformare ricorsione lineare -> di coda -> ciclo con invariante.

**Orale**
- Differenza algoritmo/problema, limite inferiore/superiore, algoritmo ottimo; Merge vs Quick (casi, spazio); perché Fibonacci ricorsivo è esponenziale; Θ è relazione di equivalenza, O pre-ordine; enunciato dei tre casi del Master theorem e quando non si applica [INT].

## Dubbi
- Il doc non enuncia il Master Theorem: risolve ricorrenze solo con albero/sostituzione. La sezione sopra è integrazione **[INT]**; [DA VERIFICARE se serve per l'esame] e se Karatsuba/Strassen fanno parte del programma.
- Nel doc la gerarchia ha un refuso ("O(n^2)" ripetuto per cubica): qui riportato n^p.
