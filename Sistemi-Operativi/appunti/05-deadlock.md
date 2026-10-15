# 05 - Deadlock (Cap 8)

**Fonte**: Doc "Sistemi Operativi - Appunti", Teoria Cap 08 (esempi numerici dalla fonte e verificati da me).

## Mappa
Il capitolo definisce il deadlock a partire dal modello di sistema, elenca le 4 condizioni necessarie e il grafo di allocazione, poi passa in rassegna le strategie di gestione: prevenzione, evitamento (stato sicuro, algoritmo del Banchiere), rilevamento, ripristino, oppure ignorare il problema.

## Concetti
Il **modello** di sistema prevede tipi di risorsa R1..Rm, ciascuno con Wi istanze; un processo usa una risorsa in tre passi: request, use, release. Un deadlock si verifica quando un insieme di processi attende all'infinito risorse tenute da altri dello stesso insieme. Condizione necessaria è che valgano **simultaneamente** quattro condizioni:
1. mutua esclusione;
2. hold and wait;
3. no preemption;
4. attesa circolare.

Per visualizzare la situazione si usa il **grafo di allocazione delle risorse**, con vertici P e R, un arco di richiesta Pi->Rj e un arco di assegnazione Rj->Pi:
- se non ci sono cicli non c'è deadlock;
- se c'è un ciclo e ogni tipo ha una sola istanza c'è **deadlock**;
- se c'è un ciclo ma con più istanze il ciclo è **necessario ma non sufficiente**.

Davanti al problema le strade sono tre:
- prevenire o evitare il deadlock;
- lasciarlo accadere e poi rilevarlo e ripristinare;
- **ignorarlo**, come fanno UNIX e la maggior parte dei SO commerciali, dove i deadlock sono rari e la responsabilità passa agli sviluppatori.

## Prevenzione (negare una condizione)
Prevenire significa fare in modo che almeno una delle quattro condizioni non possa mai verificarsi:
- **mutua esclusione**: non è negabile per le risorse non condivisibili;
- **hold and wait**: si può chiedere tutto all'inizio oppure chiedere solo quando non si possiede nulla, al prezzo di bassa utilizzazione e rischio di starvation;
- **no preemption**: se una richiesta non è soddisfatta il processo rilascia tutto e ricomincia;
- **attesa circolare**: si impone un ordine totale sui tipi di risorsa e le richieste si fanno in ordine crescente.

## Evitamento
L'evitamento è meno restrittivo ma richiede che ogni processo dichiari a priori il **massimo** fabbisogno. Uno **stato sicuro** è uno stato in cui esiste una sequenza `<P1..Pn>` tale che il fabbisogno di ogni Pi sia soddisfatto dalle risorse disponibili più quelle dei Pj precedenti. Stato sicuro implica nessun deadlock; stato non sicuro significa che un deadlock è possibile (non certo). Con **istanze singole** basta il grafo con *arco di pretesa* (claim edge tratteggiato): si concede una richiesta solo se la conversione in arco di assegnazione **non crea ciclo**.

Per istanze multiple serve l'**algoritmo del Banchiere** (n processi, m risorse), che usa `Available[m]`, `Max[n][m]`, `Allocation[n][m]` e `Need = Max - Allocation`. Ha due componenti:
- **Safety**: `Work=Available`, `Finish[i]=false`; trova `i` con `Finish[i]=false` e `Need_i <= Work`; `Work += Allocation_i`, `Finish[i]=true`; ripeti. Lo stato è sicuro se alla fine tutti i Finish sono true.
- **Resource-Request**: controlla `Request_i <= Need_i` e `<= Available`; simula (Available-=Request, Allocation_i+=Request, Need_i-=Request); se lo stato risultante è sicuro concede, altrimenti Pi attende.

**Esempio della fonte** (A=10, B=5, C=7; Available=(3,3,2)):
| | Alloc | Max | Need |
|---|---|---|---|
| P0 | 010 | 753 | 743 |
| P1 | 200 | 322 | 122 |
| P2 | 302 | 902 | 600 |
| P3 | 211 | 222 | 011 |
| P4 | 002 | 433 | 431 |
Sequenza sicura `<P1,P3,P4,P2,P0>` (verificata: Work 332 -> 532 -> 743 -> 745 -> 1047 -> 1057).

## Rilevamento
Se non si previene né si evita, bisogna rilevare. Con **istanze singole** si costruisce il *wait-for graph* (solo processi, Pi->Pj se Pi attende una risorsa di Pj): c'è deadlock se e solo se c'è un ciclo. Con **istanze multiple** si usa un algoritmo simile a Safety ma con `Request` al posto di Need e senza informazioni sul massimo: `Finish[i]=true` se `Allocation_i` è nulla, e alla fine `Finish[i]=false` indica che Pi è in deadlock.

**Esempio della fonte** (A=7,B=2,C=6; Available=0,0,0): Alloc/Request P0 010/000, P1 200/202, P2 303/000, P3 211/100, P4 002/002 portano alla sequenza `<P0,P2,P3,P1,P4>`, quindi nessun deadlock. Se P2 richiede un'altra C, nessuna richiesta di P1,P2,P3,P4 è soddisfacibile e si ha **deadlock tra P1,P2,P3,P4**. La frequenza con cui invocare l'algoritmo è un compromesso tra probabilità di deadlock e costo dell'algoritmo.

## Ripristino
Per uscire da un deadlock si può usare la **terminazione** di tutti i processi coinvolti oppure di uno alla volta (criteri di scelta: priorità, tempo già eseguito, risorse usate); oppure la **prelazione di risorse**, che richiede di scegliere una vittima, fare **rollback** ed evitare la **starvation** contando i rollback nel costo.

## Confronto
| Approccio | Pro | Contro |
|---|---|---|
| Prevenzione | statica, garantita | restrizioni, bassa utilizzazione, starvation |
| Evitamento | più flessibile | serve max a priori, overhead a ogni richiesta |
| Rilevamento+ripristino | massima utilizzazione | overhead rilevamento, costo del ripristino |

## Cose da saper fare all'esame
- Elencare le 4 condizioni e dire quale nega ciascuna tecnica di prevenzione.
- Disegnare/leggere un grafo di allocazione e stabilire se c'è deadlock (attenzione a istanze multiple).
- **Eseguire il Safety Algorithm** (calcolare Need, trovare la sequenza sicura, scrivere i passaggi di Work).
- Verificare se una richiesta (es. P1 chiede (1,0,2)) può essere concessa (Resource-Request).
- Eseguire l'algoritmo di rilevamento e dire quali processi sono in deadlock.
- Distinguere stato sicuro / non sicuro / deadlock.

## Dubbi
- Nessuno rilevante; [DA VERIFICARE] se all'esame esce il grafo con claim edges (poco sviluppato nelle fonti).
