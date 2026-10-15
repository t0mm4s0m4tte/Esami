# 02 - Correttezza di funzioni e algoritmi su array

Fonte: Drive > "PDF " > `2_Correttezza.pdf` (a.a. 2023-24, esempi dal prof. F. Damiani). Il PDF si interrompe a metà dell'insertion sort: il resto (bubble/selection, `insertion`) NON è nelle slide.

## Mappa

Si parte dall'idea di specifica di una funzione e dai due predicati P_IN / P_OUT (con la notazione con apice per i valori iniziali), si definiscono correttezza parziale, terminazione e correttezza, si descrive il metodo di progettazione per raffinamenti successivi con test suite, e si applica tutto a esempi (minimo, cerca, scambia, scambia_p) e a due algoritmi classici: ricerca binaria e insertion sort.

- [Concetti](#concetti)
- [Codice essenziale](#codice-essenziale)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## Concetti
Il filo conduttore del capitolo è che una funzione deve fare ciò che dice la **specifica**, e che questo si ottiene progettando il codice, non provando finché il compilatore e il debugger smettono di protestare ("non è un programmatore chi si fa guidare dal compilatore o dal debugger"). Gli errori possibili sono di diversa gravità:
- quelli di **logica** sono i più gravi;
- quelli di **sintassi** sono poco gravi perché li segnala il compilatore;
- i **casi saltati** (per esempio la stringa vuota);
- le **condizioni di uscita** sbagliate.

Per parlare di correttezza in modo preciso servono due predicati. **P_IN(x1..xn)** descrive l'input ed è ciò che deve valere prima dell'esecuzione; **P_OUT(x1..xn, y)** lega input e output ed è ciò che deve valere dopo. Su di essi si definiscono tre nozioni:
- **correttezza parziale**: per ogni n-upla di valori dei tipi dei parametri, se P_IN è vera e l'esecuzione termina restituendo y, allora P_OUT(x, y) è vera;
- **terminazione**: per ogni input con P_IN vera, l'esecuzione si conclude;
- **correttezza**: la funzione è parzialmente corretta e terminante.

Si noti che la correttezza parziale non promette nulla se il programma non finisce: è la terminazione a completare il quadro.

Per dimostrare la terminazione di un ciclo si mostra che a ogni iterazione ci si avvicina alla condizione di uscita, e lo si fa sul **codice effettivo**, non sulle intenzioni: `for(i=0;i<N;)` senza incremento non termina. Per scrivere le specifiche serve inoltre una notazione per riferirsi ai valori di partenza: `a'[j]` indica il valore **iniziale** di `a[j]`, e per i puntatori si scrive `(*py)'`. La stessa funzione può avere specifiche diverse a seconda di che garanzie si chiedono: per la divisione si può porre P_IN "divisore != 0", oppure non dare garanzie e stabilire che se il divisore è 0 si restituisce il dividendo con un messaggio d'errore.

Il metodo di progettazione, che conviene seguire nell'ordine, ha questi passi:
1. fissare le assunzioni sui dati;
2. individuare i casi da trattare, con un esempio per caso;
3. per i cicli, scrivere la condizione che è vera a ogni iterazione (l'**invariante**);
4. scrivere la condizione finale.

Si scrivono prima i **commenti** e poi li si trasforma in codice, per raffinamenti successivi. A corredo si costruisce una test suite: un main con un'invocazione per ogni caso identificato, con il relativo output.

## Codice essenziale
I quattro esempi seguenti mostrano le specifiche in azione. In `MINIMO` l'invariante dice cosa si è già dimostrato a ogni passo del ciclo; in `cerca` il flag `finito` serve a uscire alla prima occorrenza e il risultato è l'indice di *una* cella, perché l'elemento può comparire più volte; `scambia` e `scambia_p` mostrano la differenza fra array (modificati in loco) e puntatori espliciti, con l'apice che distingue il valore prima e dopo.

```c
/* P_IN: N>0   P_OUT: risultato è un elemento di a ed è il più piccolo */
int MINIMO(int a[], int N) {
  int temp = a[0], i;
  /* invariante: temp = min di a[0..i-1] */
  for (i = 1; i < N; i++)
    if (a[i] < temp) temp = a[i];
  return temp;
}

/* P_IN: N>0
   P_OUT: se ris>=0 allora arr[ris]==el, altrimenti arr[0]!=el AND ... AND arr[N-1]!=el */
int cerca(int arr[N], int el) {
  int i, finito = 0, ris = -1;
  for (i = 0; i < N && !finito; i++)
    if (arr[i] == el) { ris = i; finito = 1; }
  return ris;
}
/* restituisce l'indice di UNA cella (el può comparire più volte) */

/* scambia: P_IN: i,j indici validi.  P_OUT: a[i]==a'[j] e a[j]==a'[i] */
void scambia(int arr[], int i, int j) { int t = arr[i]; arr[i] = arr[j]; arr[j] = t; }

/* scambia_p: P_IN: true.  P_OUT: *px==(*py)' e *py==(*px)' */
void scambia_p(int *px, int *py) { int t = *px; *px = *py; *py = t; }
```

### Ricerca binaria (array ordinato crescente)
L'idea è sfruttare l'ordinamento: si confronta l'elemento cercato con quello centrale e si scarta metà dell'array a ogni passo. Lo pseudocodice delle slide usa due indici sn e dx che delimitano arr[sn..dx]; finché la porzione non è vuota:
1. si calcola middle (la metà);
2. se el < arr[middle] si prosegue su arr[sn..middle-1];
3. altrimenti, se arr[middle] < el, su arr[middle+1..dx];
4. altrimenti si restituisce middle.

Se la porzione si svuota si restituisce -1. Esempio svolto su A B C E G H I M cercando H: middle=3 (E<H) -> sn=4; middle=(4+7)/2=5 -> trovato.

Implementazione (ricostruita dallo pseudocodice, l'esercizio era "implementare tu"):
```c
int ricerca_bin(int arr[], int n, int el) {
  int sn = 0, dx = n - 1, middle;
  while (sn <= dx) {
    middle = (sn + dx) / 2;          /* divisione intera */
    if (el < arr[middle]) dx = middle - 1;
    else if (arr[middle] < el) sn = middle + 1;
    else return middle;
  }
  return -1;
}
```
La terminazione si dimostra osservando che la porzione [sn..dx] si restringe strettamente a ogni iterazione.

### Insertion sort
La specifica è: P_IN, n == lunghezza(arr) >= 0; P_OUT, arr[0..n-1] ordinato e con gli stessi elementi di arr'. L'idea è mantenere ordinata la parte sinistra dell'array: per ogni indice i si inserisce arr[i] al posto giusto in arr[0..i-1], scambiandolo con il predecessore finché l'ordine non è rispettato. L'invariante è dunque "a[0..i-1] ordinato". Si noti come l'ordinamento riusi `scambia` vista sopra.

```c
void insertionSort(int arr[], int n) {
  int i;
  for (i = 1; i < n; i++)          /* I.C.: a[0..i-1] ordinato */
    insertion(arr, i);             /* inserisce a[i] al posto giusto in a[0..i-1] */
}
/* insertion NON è nelle slide: versione standard con scambi, come nell'esempio 3 8 5 1 4 12 9 */
void insertion(int arr[], int i) {
  while (i > 0 && arr[i-1] > arr[i]) { scambia(arr, i-1, i); i--; }
}
```
[DA VERIFICARE] la forma esatta di `insertion` usata dalla docente; bubble sort e selection sort sono solo nominati ("insertion, bubble, selection") ma non svolti nelle slide disponibili: per l'esame ripasso dal libro di Programmazione 1.

## Cose da saper fare all'esame
- Scrivere **P_IN e P_OUT** di una funzione data (la docente lo dice esplicitamente: "in alcuni esercizi d'esame vi chiederemo di scrivere P_IN e P_OUT").
- Dimostrare la **terminazione** di un ciclo/ricorsione indicando cosa decresce / si avvicina all'uscita.
- Indicare l'**invariante di ciclo** (es. minimo: temp = min di a[0..i-1]).
- Scrivere il codice per raffinamenti successivi (commenti -> codice) e una **test suite** con i casi (array di un elemento, elemento assente/presente più volte, ecc.).
- Implementare ricerca binaria e insertion sort con P_IN/P_OUT; esercizio consigliato: riscrivere due funzioni su array/matrici di Prog1 col metodo.

## Dubbi
Formalizzare P_OUT per "stessi elementi di arr'" (cioè una permutazione) non è mostrato nelle slide: [DA VERIFICARE] come lo vuole la docente. Bubble e selection sort non sono nelle slide.
