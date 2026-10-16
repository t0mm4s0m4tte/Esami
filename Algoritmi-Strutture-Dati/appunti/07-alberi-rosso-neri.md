# 07 - Alberi rosso-neri (R-N)

Fonte: doc Drive "Appunti" (Alberi rosso neri).

## Mappa

Si definiscono le proprietà e l'altezza nera, si dimostra il bound logaritmico sull'altezza, si introducono le rotazioni e poi si vedono i due fix-up: inserimento (3 casi) e cancellazione (casi 1-3 con sottocasi 3.1-3.4).

- [Definizione](#definizione)
- [Altezza](#altezza)
- [Rotazioni](#rotazioni)
- [Inserimento](#inserimento)
- [Cancellazione](#cancellazione)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## Definizione

Il problema dei BST (vedi 06) è che l'altezza può degenerare fino a n-1 e con essa il costo delle operazioni. Un albero rosso-nero è un BST aumentato con un colore per nodo, con regole che costringono l'albero a restare approssimativamente bilanciato senza richiedere un bilanciamento perfetto: si accetta un po' di sbilanciamento in cambio di una manutenzione economica. Le proprietà sono tre.
1. **Nero**: la radice e tutte le foglie (sentinelle NIL) sono nere.
2. **Rosso**: un nodo rosso ha entrambi i figli neri, quindi non possono esserci due rossi consecutivi.
3. **Cammino**: per ogni nodo x, tutti i cammini semplici da x alle foglie discendenti hanno lo stesso numero di nodi neri.

Da qui si definisce l'**altezza nera** bh(x), il numero di nodi neri su un cammino da x a una foglia, **escluso x**.

## Altezza

L'intuizione è che la regola 3 impone che l'albero sia "pieno" quanto a nodi neri, mentre la regola 2 impedisce che i nodi rossi facciano allungare un cammino più del doppio degli altri. La proposizione è che un albero R-N con n nodi interni ha altezza massima **2·log2(n+1)**, e di conseguenza search, insert e delete costano **O(log n)** nel caso peggiore.

La dimostrazione ha due passi. Primo (lemma a): il sottoalbero di radice x contiene almeno **2^bh(x) - 1** nodi interni. Secondo (lemma b): per la regola del rosso almeno metà dei nodi su un cammino è nera, quindi **h ≤ 2·bh(T)**. Dal primo passo, n ≥ 2^bh - 1 implica bh ≤ log2(n+1), e dal secondo h ≤ 2 log2(n+1).

### Dimostrazione dei due lemmi (slide 14)
Il lemma a si prova per induzione sull'altezza k di T_x. Nel caso base k=0, x è una foglia con bh=0 e 2^0 - 1 = 0. Nel passo, x è un nodo interno con figli y1 e y2; vale **bh(y_i) ≥ bh(x) - 1**, con uguaglianza a bh(x)-1 se y_i è nero e a bh(x) se è rosso. I nodi interni di T_x sono allora almeno (2^{bh(y1)} - 1) + (2^{bh(y2)} - 1) + 1 ≥ 2·(2^{bh(x)-1} - 1) + 1 = 2^{bh(x)} - 1.

Il lemma b dice che per la regola del rosso bh(T) ≥ h/2. Allora n ≥ 2^{h/2} - 1, cioè n+1 ≥ 2^{h/2}, e quindi h ≤ 2 log2(n+1). In sintesi bh(T) ≤ h ≤ 2 bh(T).

## Rotazioni

Le rotazioni sono lo strumento con cui si ripara l'albero senza distruggere l'ordine dei BST: costano O(1), preservano la proprietà BST e l'ordine in-order, e cambiano solo i colori e la forma locale. La **Left-Rotate(T,x)**, applicabile se x ha un figlio destro y non nullo, fa diventare y radice del sottoalbero e x suo figlio sinistro, mentre il vecchio figlio sinistro di y (β) diventa figlio destro di x. La **Right-Rotate(T,y)** è speculare: x, figlio sinistro di y, diventa radice, y diventa figlio destro di x, e il vecchio figlio destro di x diventa figlio sinistro di y.

Il codice dalle slide della Left-Rotate(T,x) procede così:
1. y:=x.right;
2. x.right:=y.left; se y.left≠nil, y.left.parent:=x;
3. y.parent:=x.parent, e si aggiorna T / x.parent.left / x.parent.right a y;
4. y.left:=x; x.parent:=y.

## Inserimento

L'inserimento parte come in un BST, aggiungendo il nuovo nodo x come foglia, e lo colora di **rosso**. La scelta è motivata: un nodo rosso non altera le altezze nere, quindi si può violare al massimo la regola del rosso (se il padre p è rosso), che è la violazione più semplice da riparare. Se x è la radice basta colorarla di nero. Quando il padre p è rosso si guarda lo **zio u** e si distinguono tre casi (descritti per p figlio sinistro; i casi con p figlio destro sono speculari, e il doc descrive solo la versione "sinistra").

1. **Caso 1, zio rosso**: p e u diventano neri, il nonno g diventa rosso e il problema sale a g, dove si ripete; se la radice diventa rossa, la si colora di nero.
2. **Caso 2, zio nero, x figlio sinistro**: p diventa nero, g rosso e si fa **Right-Rotate(g)**; fine.
3. **Caso 3, zio nero, x figlio destro**: **Left-Rotate(p)**, con x che diventa genitore di p, e ci si riconduce al caso 2.

## Cancellazione

La cancellazione è la parte più laboriosa. Si usa la cancellazione BST standard (per copia, vedi 06), per cui si elimina sempre un nodo **u** con al più un figlio "vero" (non NIL); sia **v** il figlio che lo sostituisce. L'idea è che se si toglie un nodo rosso nulla si rompe, mentre togliere un nodo nero toglie un nero da tutti i cammini che passavano per u: la violazione da riparare è questo "deficit" di nero (segnato V+ nelle slide), per cui bh(p) diminuisce di 1. Strumento di verifica visuale citato: cs.usfca.edu/~galles/visualization/RedBlack.html. I casi sono:

- **Caso 1**: u rosso. Nessuna proprietà è violata, fine.
- **Caso 2**: u nero e v rosso. Si colora v di nero e si ha finito.
- **Caso 3**: u e v neri (v può essere una foglia NIL), quindi c'è un deficit di un nero sui cammini per v. Il fix-up guarda il **fratello s** di v, con p suo padre, e distingue quattro sottocasi (descritti con v figlio sinistro e s figlio destro; l'altra versione è speculare).
  - **3.1, s rosso** (quindi p nero): p diventa rosso, s nero, si ruota su p; il nuovo fratello di v è nero e si passa a 3.2, 3.3 o 3.4.
  - **3.2, s nero con entrambi i figli neri**: s diventa rosso; il deficit sale a p e il fix-up si ripete su p.
  - **3.3, s nero, figlio "interno" (sx) rosso e figlio destro nero**: s diventa rosso, il figlio sinistro nl diventa nero, si fa **Right-Rotate(s)** e ci si riconduce al 3.4. Nelle slide è il "caso interno": s nero con un figlio rosso.
  - **3.4, s nero, figlio "esterno" (dx) rosso nr**: s prende il colore di p, p e nr diventano neri, si fa **Left-Rotate(p)**; fine, il deficit è risolto. Nelle slide è il caso esterno: s nero con un figlio nero e uno rosso.

## Cose da saper fare all'esame
**Scritto**
- Inserire una sequenza di chiavi in un R-N mostrando colori, rotazioni e casi del fix-up; idem per una cancellazione.
- Verificare se un albero dato è R-N valido (calcolare bh).
- Dimostrare h ≤ 2 log2(n+1) (i due lemmi).

**Orale**
- Perché si inserisce rosso; perché la rotazione preserva il BST; numero massimo di rotazioni (inserimento: al più 2; cancellazione: al più 3); complessità O(log n).

## Dubbi
- Numero massimo di rotazioni: insert ≤ 2, delete ≤ 3 (CLRS); integrazione non presente nel doc.
- Cancellazione: gestione esatta di v = NIL (sentinella) non esplicitata nel doc.
