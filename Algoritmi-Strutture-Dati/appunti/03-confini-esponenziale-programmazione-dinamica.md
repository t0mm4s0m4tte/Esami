# 03 - Confini inferiori, esercizi tipo (Jack), esponenziale veloce, programmazione dinamica

Fonte: doc Drive "Appunti" (Confini inferiori, Problema inverso, Esponenziale veloce, Programmazione dinamica).

## Mappa

Il file parte dai confini superiori e inferiori di un problema (con Gemelli, Somma17 e il limite Ω(n log n) per l'ordinamento tramite alberi di decisione, più Counting sort come eccezione apparente), prosegue con un esercizio tipo di miglioramento di complessità (Jack vs Fast-Jack) e con l'esponenziale veloce (slowExp, fastExp ricorsivo e iterativo), e si chiude con la programmazione dinamica su Fibonacci e LCS. Per risolvere le ricorrenze qui incontrate vale anche il Master theorem [INT] del file 02.

- [Confini](#confini)
- [Jack / Fast-Jack (lunghezza massima di una sequenza consecutiva di dispari in V[0..n-1])](#jack--fast-jack-lunghezza-massima-di-una-sequenza-consecutiva-di-dispari-in-v0n-1)
- [Esponenziale veloce (x^n, n naturale)](#esponenziale-veloce-xn-n-naturale)
- [Programmazione dinamica (DP)](#programmazione-dinamica-dp)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## Confini

Per un problema si può dire qualcosa sia sul costo di un algoritmo che lo risolve, sia su ciò che *nessun* algoritmo può fare meglio. Il **confine superiore** è il costo (nel caso peggiore) di un qualunque algoritmo che risolve il problema; il **confine inferiore** vale invece per *ogni* algoritmo. La distanza tra i due è il **gap**, e un algoritmo è **asintoticamente ottimo** quando T_A(n)=O(f(n)) e il problema è Ω(f(n)).

I limiti inferiori più semplici da ottenere sono quelli "banali": si deve almeno leggere tutti i dati (Ω(n)), oppure bisogna contare eventi necessari (trovare il massimo di n elementi richiede almeno n-1 confronti). Con questi strumenti si possono già studiare due problemi tipo.

Nel problema dei **Gemelli** (esistono duplicati in A[1..n]?) l'approccio diretto TWINS confronta tutte le coppie in n^2 passi; la variante TWINS' evita le ripetizioni e fa n(n-1)/2 confronti, ma resta O(n^2) perché le costanti non contano; con TWINS'' si ordina prima (O(n log n)) e poi si cercano duplicati fra elementi adiacenti (O(n)), ottenendo **O(n log n)** contro un lower bound banale Ω(n).

Il problema **Somma17** (due elementi la cui somma è 17) è più fortunato: la forza bruta è O(n^2), il lower bound è Ω(n), e **SUM17'** lo raggiunge con un vettore caratteristico C[0..17]:
1. si inizializza C a false (O(1));
2. lo si riempie ponendo C[A[i]]=true per ogni A[i]<=17 (O(n));
3. lo si percorre con due indici convergenti i=0, j=17 finché C[i]&&C[j] (al più 9 iterazioni, O(1)).

In totale **O(n), ottimo**.

Il risultato più importante è sull'**ordinamento per confronti**. L'upper bound è O(n log n) (Merge sort) e il lower bound banale Ω(n): il gap è chiuso con un argomento strutturale. Ogni algoritmo basato su confronti si rappresenta con un **albero di decisione**, in cui i nodi interni sono i confronti, i rami gli esiti e le foglie gli output possibili. Per essere corretto l'albero deve avere almeno una foglia per ogni permutazione dell'input, quindi almeno **n!** foglie. Un albero binario con s foglie ha altezza almeno log2 s, perciò h >= log2(n!) ∈ **Ω(n log n)** (per Stirling, ovvero per il fatto già visto che log(n!)∈Θ(n log n)). Ne segue che **Merge sort e Heapsort sono ottimi**.

L'eccezione apparente è il **Counting sort**, che ordina in O(n+k) se i valori sono interi in [0,k]. Non contraddice il lower bound perché **non usa confronti**: usa il valore stesso come indice di un array. Il vantaggio svanisce se k è molto più grande di n (per k=n^2 non è più lineare in n).

## Jack / Fast-Jack (lunghezza massima di una sequenza consecutiva di dispari in V[0..n-1])

Questo esercizio tipo mostra come un'osservazione sull'invariante elimini un ciclo annidato. Jack riparte da ogni i e conta quanti dispari consecutivi seguono; Fast-Jack scorre una sola volta mantenendo il contatore p della sequenza corrente e il massimo m già visto, e il max finale gestisce l'ultima sequenza.

```
Jack(V)                         Fast-Jack(V)
 m:=0                            m:=0; p:=0
 for i:=0 to n-1                 for i:=0 to n-1
   j:=i                            if V[i] mod 2 = 1 then p:=p+1
   while j<n and V[j] mod 2=1      else m:=max(m,p); p:=0
        j:=j+1                   return max(m,p)    // il max finale gestisce l'ultima sequenza
   m:=max(m,j-i)
 return m
```

Nel caso peggiore (tutti dispari) Jack costa T(n)=Σ_{i=0}^{n-1}(n-i)=n(n+1)/2, quindi **O(n^2)**; Fast-Jack ha un solo ciclo ed è **O(n)**. Per n=10^6 si passa da circa 10^12 a circa 10^6 operazioni.

## Esponenziale veloce (x^n, n naturale)

Calcolare x^n è un caso esemplare di come la struttura della ricorsione, non solo la sua forma, determini il costo. Una prima versione, **slowExp**, usa n=0 -> 1 e due chiamate indipendenti slowExp(x,⌊n/2⌋)*slowExp(x,⌊n/2⌋) (moltiplicando per x se n è dispari). Sembra divide et impera, ma ricalcola due volte lo stesso valore: T(n)=2T(n/2)+1, da cui 2^k·T(n/2^k)+(2^k-1) con k=log2 n, cioè **2n-1 = O(n)**, esattamente come l'approccio ingenuo che fa n-1 moltiplicazioni.

La versione **fastExp** osserva che le due chiamate sono identiche e ne fa una sola: `y <- fastExp(x,⌊n/2⌋); if n pari return y*y else return y*y*x`, perché per n pari x^(2k)=(x^k)^2 e per n dispari x^(2k+1)=x·(x^k)^2. La ricorrenza diventa **T(n)=T(n/2)+1 ⇒ O(log n)** (per n=10^6 circa 20 moltiplicazioni).

La versione iterativa si progetta, in stile invariant-first, a partire dall'invariante **x^n = y^k · z**: y è la potenza corrente, k l'esponente residuo e z l'accumulatore della parte già "raccolta". Quando k è dispari si sposta un fattore y in z; poi si eleva y al quadrato e si dimezza k. All'uscita (k=0) l'invariante dà x^n = y^0·z = z. Sono O(log n) iterazioni. L'uso tipico è la crittografia (RSA, esponenziazione modulare).

```
alg1(x,n): y:=x; k:=n; z:=1
  while k>0 do        // inv: x^n = y^k * z
     if k mod 2 = 1 then z:=z*y
     y:=y*y; k:=⌊k/2⌋
  return z            // k=0 => x^n = y^0 * z = z
```

## Programmazione dinamica (DP)

Lo slowExp ha insegnato che dividere un problema non basta se i sottoproblemi si ripetono. Il **divide et impera** è efficiente quando i sottoproblemi sono **indipendenti**; la **programmazione dinamica** serve quando sono **sovrapposti** (altrimenti la ricorsione è esponenziale), e richiede due ingredienti: **sottostruttura ottimale** (una soluzione ottima si compone di soluzioni ottime dei sottoproblemi) e **sottoproblemi ripetuti**. Il metodo si sviluppa in quattro fasi:
1. caratterizzare la struttura della soluzione ottima;
2. definire ricorsivamente il valore della soluzione;
3. eliminare le ripetizioni con la **memoization** (top-down, si ricordano i risultati già calcolati);
4. passare alla versione **bottom-up** iterativa, che riempie la tabella dai sottoproblemi piccoli ai grandi.

Il caso più semplice è **Fibonacci**, f_n=f_{n-1}+f_{n-2} con f1=f2=1. La versione ricorsiva FIB soddisfa T_n=T_{n-1}+T_{n-2}+1 ed è Θ(Φ^n), con Φ≈1.618 (Fib(n) ≈ Φ^n/√5). Tre versioni la rendono lineare:
- la **memoization** salva ogni valore al primo calcolo;
- la versione **bottom-up** riempie un vettore in ordine;
- la versione **iterativa** si accorge che servono solo gli ultimi due valori e porta lo spazio a O(1).

```
FIB-MEMOIZATION(n,memo): if memo[n]!=nil return memo[n]
   if n<=2 f:=1 else f:=FIB-MEMOIZATION(n-1,memo)+FIB-MEMOIZATION(n-2,memo)
   memo[n]:=f; return f                            // Θ(n)
FIB-BOTTOMUP: FIB[1]=FIB[2]=1; for i=3..n FIB[i]=FIB[i-1]+FIB[i-2]   // Θ(n) tempo, Θ(n) spazio
FIB-ITER: FIBA=FIBB=1; for i=3..n { tmp=FIBA+FIBB; FIBB=FIBA; FIBA=tmp }  // O(1) spazio; return FIBA
```

L'esempio più ricco è la **LCS** (massima sottosequenza comune di due stringhe). Una sottosequenza Z di X si ottiene cancellando zero o più elementi di X, e X_i indica il prefisso di lunghezza i. Il problema ha sottostruttura ottima, espressa da due lemmi:
- **Lemma 1**: se x_m=y_n, allora LCS(X,Y) = LCS(X_{m-1},Y_{n-1}) seguita da x_m;
- **Lemma 2**: se x_m≠y_n, la LCS è la più lunga tra LCS(X_{m-1},Y) e LCS(X,Y_{n-1}).

Tradotta direttamente in ricorsione, produce T(n)=2T(n-1)+1, cioè Θ(2^n), perché gli stessi sottoproblemi (prefissi) vengono ricalcolati moltissime volte. Poiché i sottoproblemi distinti sono solo (m+1)(n+1) coppie di prefissi, si tabula la **lunghezza** c[i,j] con la ricorrenza

**c[i,j] = 0 se i=0 o j=0; c[i-1,j-1]+1 se x_i=y_j; max(c[i,j-1], c[i-1,j]) altrimenti.**

Accanto a c si tiene una tabella b[1..m,1..n] di frecce (↖ match, ↑ proviene da (i-1,j), ← proviene da (i,j-1)) che permette di ricostruire una LCS risalendo dalla cella finale.

```
LCS-BOTTOM-UP(X,Y): m=|X|, n=|Y|; c[i,0]=0, c[0,j]=0
 for i=1..m for j=1..n
   if x_i=y_j: c[i,j]=c[i-1,j-1]+1; b[i,j]=↖
   else if c[i-1,j]>=c[i,j-1]: c[i,j]=c[i-1,j]; b[i,j]=↑
   else c[i,j]=c[i,j-1]; b[i,j]=←
```

Il costo è **Θ(mn)** in tempo. [DA VERIFICARE: la procedura di stampa PRINT-LCS e l'ottimizzazione di spazio non sono nel doc.] Anche Kadane (vedi 01) è un esempio di DP lineare.

## Cose da saper fare all'esame

**Scritto**
- Dato un problema, dare upper bound (algoritmo), lower bound (banale o decisionale) e dire se l'algoritmo è ottimo.
- Dimostrare Ω(n log n) per l'ordinamento con alberi di decisione (n! foglie, altezza >= log2 n!).
- Risolvere T(n)=2T(n/2)+1 e T(n)=T(n/2)+1 (anche con Master theorem [INT], file 02); invariante di fastExp iterativo.
- Compilare la tabella c (e le frecce b) per LCS di due stringhe date; ricostruire una LCS.
- Spiegare/scrivere memoization e bottom-up per un problema con ricorrenza data.

**Orale**
- Perché Counting sort "batte" n log n; differenza D&I vs DP; sottostruttura ottimale e sottoproblemi ripetuti; perché slowExp è O(n).

## Dubbi
- Rapporto precisamente tra Fib(n) del cap. Ricorsione (base n<2 -> 1, indice shiftato) e f_n della DP (f1=f2=1): stessa successione con indice diverso.
