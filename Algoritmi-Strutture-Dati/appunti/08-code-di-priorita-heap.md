# 08 - Code di priorità, heap, heapsort

Fonte: doc Drive "Appunti" (Code di priorità) + Lab 07 (heap ternario, vedi 11-laboratorio.md).

## Mappa

Si definiscono heap max e min, la loro rappresentazione su array e la posizione delle foglie; poi le operazioni Insert, ExtractMaximum, Heapify, BuildHeap e infine Heapsort, con il codice delle slide.

- [Heap](#heap)
- [Operazioni](#operazioni)
- [Heapsort](#heapsort)
- [Codice (slide 15)](#codice-slide-15)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## Heap

Una coda di priorità è una struttura che deve fornire velocemente l'elemento di priorità massima; l'ADT prevede EmptyQueue, Insert, ExtractMaximum e Maximum, con elementi che sono coppie ⟨elemento, priorità⟩ e chiave uguale alla priorità. L'heap ne è l'implementazione efficiente: un albero binario con due proprietà:
- **strutturale**: l'albero è completo tranne al più l'ultimo livello, riempito da sinistra, e di qui discende l'altezza logaritmica;
- **di ordinamento**: in un Max-Heap `key(nodo) >= key(figli)` (Min-Heap con <=), per cui il massimo sta sempre nella radice.

Nota che l'ordine richiesto è molto più debole di quello dei BST: serve solo il confronto padre-figlio, non una relazione tra fratelli, ed è proprio questa debolezza a rendere le operazioni semplici.

Poiché l'albero è completo, non servono puntatori: lo si memorizza in un **array H[1..n]**. La radice è H[1], il figlio sinistro di i è in 2i, il destro in 2i+1 e **Parent(i)=⌊i/2⌋**. Per comodità Left(i) vale 2i se 2i<=HeapSize e altrimenti i, e Right(i) vale 2i+1 se <=HeapSize altrimenti i. Le **foglie** sono H[⌊n/2⌋+1 .. n], e per questo BuildHeap parte da ⌊n/2⌋. Dimostrazione: se n>1, H[i] è una foglia se e solo se i<=n e n<2i, cioè i > ⌊n/2⌋ (n<2i implica ⌊n/2⌋ < i).

## Operazioni

Le operazioni sfruttano tutte lo stesso schema: si rompe localmente una proprietà e la si ripristina percorrendo un cammino fra radice e foglia, che ha lunghezza logaritmica.

L'**Insert(x)** incrementa HeapSize, mette x nell'ultima posizione (la struttura resta completa) e poi lo **fa risalire**, scambiandolo col padre finché la sua chiave è <= quella del padre o si arriva alla radice. Costo **O(log n)**. Il **Maximum** è H[1] e costa **O(1)**.

L'**ExtractMaximum** prende H[1], sposta H[HeapSize] in H[1] (di nuovo per mantenere la struttura completa), decrementa HeapSize e chiama **Heapify(H,1)**, che fa scendere la nuova radice. Costo **O(log n)**. La **Heapify(H,i)** assume che i sottoalberi dei due figli siano già heap; confronta H[i] coi figli, lo scambia con il maggiore e ripete sul sottoalbero modificato. Segue un percorso radice-foglia, quindi **O(log n)**.

La **BuildHeap** trasforma un array qualsiasi in heap chiamando Heapify per i da ⌊n/2⌋ a 1: le foglie sono già heap banali e si procede dal basso verso l'alto, in modo che quando si chiama Heapify(i) i due sottoalberi siano già heap. Il limite grezzo è O(n log n) (n/2 chiamate da O(log n)), ma un'analisi più raffinata dà **O(n)**; il doc enuncia questo risultato senza dimostrarlo. La slide 15 (livello 1) conferma che la stima grossolana O(n log n) "si può raffinare sino a mostrare che BuildHeap è lineare", ma non riporta la dimostrazione. Idea della dimostrazione: il numero di nodi di altezza h è al più circa n/2^h e Heapify su uno di essi costa O(h), quindi il costo totale è O(n·Σ h/2^h) = O(n), perché la serie converge (fonte: Wikipedia, "Binary heap", https://en.wikipedia.org/wiki/Binary_heap; il valore 2 della somma è un calcolo mio).

## Heapsort

L'idea di Heapsort è quella del SelectSort, con la differenza che il massimo si estrae in O(log n) invece che in O(n). Si costruisce un heap e poi si sposta ripetutamente la radice, cioè il massimo, in fondo alla parte non ancora ordinata.

```
HeapSort(V): BuildHeap(V)
  for i := n downto 2: scambia V[1] con V[i]; HeapSize--; Heapify(V,1)
```

L'invariante è che V[1..i] è un heap, V[i+1..n] è ordinato e ∀x∈V[1..i], y∈V[i+1..n]: x ≤ y. Il costo è BuildHeap O(n) più (n-1)·O(log k), cioè la somma log2 n + log2(n-1) + ... + log2 2 = log2(n!) ∈ O(n log n): quindi **O(n log n) nel caso peggiore**, e l'algoritmo è **ottimo** tra gli ordinamenti per confronti (bound Ω(n log n), vedi 03). Con l'heap, la coda di priorità ha Insert O(log n), ExtractMax O(log n) e Max O(1).

## Codice (slide 15)
```
Insert(H,x): HeapSize++; i:=HeapSize; H[i]:=x
   while i>1 and H[Parent(i)] < H[i]: exchange(H[i],H[Parent(i)]); i:=Parent(i)
ExtractMaximum(H): H[1]:=H[HeapSize]; HeapSize--; Heapify(H,1)       // salva prima H[1] se va restituito
Heapify(H,i): // pre: i<=HeapSize, i sottoalberi di Left(i),Right(i) sono heap; post: albero in i è heap
   largest := indice del max{H[i],H[Left(i)],H[Right(i)]}
   if largest != i: scambia H[i],H[largest]; Heapify(H,largest)
BuildHeap(V): for i:=⌊length(V)/2⌋ downto 1: Heapify(V,i)
```
Esempio dalle slide: dato l'heap [16 9 14 7 4 8 10 3 2 1], l'inserimento di 15 lo fa risalire fino a sotto la radice 16 (scambi con 4... e 9); nell'estrazione, la radice è sostituita dall'ultimo elemento e scende scegliendo sempre il figlio massimo.

## Cose da saper fare all'esame
**Scritto**
- Costruire un heap da una sequenza (per inserimenti e con BuildHeap) e disegnare array+albero; eseguire estrazioni; simulare Heapsort passo passo.
- Scrivere Heapify, Insert, ExtractMax; calcolare indici figli/padre.

**Orale**
- Perché le foglie sono da ⌊n/2⌋+1; perché BuildHeap è O(n) (somma Σ h·n/2^h, che converge; vedi sopra); Heapsort vs Quicksort/Mergesort; confronto con coda di priorità su lista ordinata.

## Dubbi
- Dimostrazione dell'O(n) di BuildHeap e codice di Heapify/Insert non riportati nel doc (solo descrizione).
