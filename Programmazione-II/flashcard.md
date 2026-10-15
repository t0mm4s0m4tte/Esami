# Flashcard - Programmazione II (C)

Fonte: appunti 01-08. Le carte marcate [DA VERIFICARE] riguardano refusi o punti incerti delle slide.

## 01 - Organizzazione del software e compilazione

D: Copia-incolla di una funzione e riuso: che differenza c'è?
R: Il copia-incolla è duplicazione (ogni correzione va ripetuta in tutte le copie). Il riuso è una sola definizione con tanti usi: un solo punto da verificare e modificare.

D: Cosa contiene un file .h e cosa un .c?
R: Il .h "esporta" prototipi (tipi dei parametri senza nome), tipi e #define. Il .c contiene le definizioni delle funzioni. Un solo .c del programma ha il main.

D: Cosa succede se si usa una funzione senza includere il suo prototipo?
R: Il compilatore dà il warning "implicit declaration"; poi il linker dà l'errore "undefined reference" se non trova la funzione.

D: Quando si ottiene "multiple definition of main"?
R: Quando si compilano insieme due o più file .c che contengono entrambi un main.

D: Se cambio solo il corpo di una funzione (non il prototipo), cosa devo fare ai file che la usano?
R: Solo ricompilarli, non modificarli: il prototipo è il contratto (modularità).

D: Differenza tra #include <lib.h> e #include "file.h"?
R: Le angolari indicano una libreria di sistema; le virgolette (anche con path, es. "../include/file.h") una ricerca locale nel file system.

D: Quali sono le 4 fasi di gcc e i relativi comandi?
R: Preprocessing (gcc -E: sostituisce le direttive #), compilazione (gcc -S: C -> assembly .s), assembling (gcc -c: -> oggetto .o), linking (gcc *.c: -> eseguibile a.out).

D: Scrivi la riga di compilazione per src/file1.c e src/main.c con eseguibile in bin/a.out, e l'include in main.c.
R: gcc src/file1.c src/main.c -o bin/a.out ; in main.c: #include "../include/file1.h".

D: Esame di Programmazione II (a.a. 2024-25): come si compone il voto?
R: Lab 0-3 (superato con almeno 1) + teoria 0-30 (almeno 17), accesso alla teoria solo dopo il lab; somma >= 31 diventa 30 e lode. [DA VERIFICARE] per a.a. 2026-27.

## 02 - Correttezza e algoritmi su array

D: Che cosa sono P_IN e P_OUT?
R: P_IN(x1..xn) descrive l'input e deve valere prima dell'esecuzione; P_OUT(x1..xn, y) lega input e output e deve valere dopo.

D: Definisci correttezza parziale, terminazione e correttezza.
R: Parziale: se P_IN vale e l'esecuzione termina con y, allora P_OUT(x,y) vale. Terminazione: per ogni input con P_IN vera l'esecuzione finisce. Corretta = parzialmente corretta + terminante.

D: Cosa significano a'[j] e (*py)' nelle specifiche?
R: Il valore iniziale (prima dell'esecuzione) di a[j] e di *py.

D: Cos'è l'invariante di ciclo? Esempio per il minimo di un array.
R: Condizione vera a ogni iterazione. Per MINIMO: temp = min di a[0..i-1].

D: Come si dimostra la terminazione di un ciclo?
R: Mostrando sul codice effettivo che a ogni iterazione ci si avvicina alla condizione di uscita. Es. for(i=0;i<N;) senza incremento non termina.

D: Quali sono i 4 passi del metodo di progettazione?
R: (1) assunzioni sui dati, (2) casi da trattare con un esempio per caso, (3) condizione vera a ogni iterazione (invariante), (4) condizione finale. Si scrivono prima i commenti e poi il codice.

D: Scrivi P_IN e P_OUT di MINIMO(int a[], int N).
R: P_IN: N>0. P_OUT: il risultato è un elemento di a ed è il più piccolo.

D: Scrivi P_IN e P_OUT di cerca(arr, el), che restituisce un indice o -1.
R: P_IN: N>0. P_OUT: se ris>=0 allora arr[ris]==el, altrimenti arr[i]!=el per ogni i in 0..N-1. Restituisce l'indice di UNA cella (el può comparire più volte).

D: Scrivi scambia_p(int *px, int *py) con specifica.
R: P_IN: true. P_OUT: *px==(*py)' e *py==(*px)'. Corpo: int t=*px; *px=*py; *py=t;

D: Scrivi la ricerca binaria su array ordinato crescente.
R: sn=0, dx=n-1; while(sn<=dx){ middle=(sn+dx)/2; if(el<arr[middle]) dx=middle-1; else if(arr[middle]<el) sn=middle+1; else return middle; } return -1;

D: Ricerca binaria su A B C E G H I M cercando H: quali middle si visitano?
R: middle=3 (E<H, sn=4), poi middle=(4+7)/2=5: trovato H.

D: Perché la ricerca binaria termina?
R: La porzione [sn..dx] si restringe strettamente a ogni iterazione.

D: Specifica e invariante dell'insertion sort.
R: P_IN: n>=0. P_OUT: arr[0..n-1] ordinato con gli stessi elementi di arr'. Invariante: a[0..i-1] ordinato.

D: Scrivi insertionSort usando scambia.
R: for(i=1;i<n;i++) insertion(arr,i); con insertion: while(i>0 && arr[i-1]>arr[i]){ scambia(arr,i-1,i); i--; } [DA VERIFICARE] forma esatta di insertion usata dalla docente (non è nelle slide).

D: Quali sono i tipi di errore nel codice per gravità?
R: Logica (gravissimi), casi saltati (es. stringa vuota), condizioni di uscita sbagliate; la sintassi è poco grave perché la segnala il compilatore.

## 03 - Struct, padding, puntatori a struct, union

D: Si possono confrontare due struct con ==? E assegnarle con =?
R: == no (va scritto campo per campo); = sì, copia campo per campo.

D: Quanto vale sizeof(struct prova) con struct prova { char x; char y; int z; }?
R: 8 (padding), non 6. Usare sempre sizeof(tipo), mai la somma dei campi.

D: Perché la dimensione di una struct non è la somma dei campi?
R: Il compilatore inserisce byte di padding per allineare i campi (memoria allocata a gruppi di 4, 8 o 16 byte). Regole esatte: [DA VERIFICARE], nelle slide c'è solo l'esempio char,char,int = 8.

D: In che ordine sono allocati i campi di una struct?
R: Nell'ordine di dichiarazione.

D: (*L).pagine e L->pagine: differenza?
R: Nessuna, sono equivalenti; si usa la forma ->.

D: Come si libera una struct dinamica L?
R: free(L); L = NULL; entrambe, per evitare un puntatore pendente.

D: Dato libro L; libro *P = malloc(sizeof(libro)); quali sono corrette: P = L; P = &L; *P = &L;?
R: P = L no; P = &L sì; *P = &L no (*P è un libro, &L un puntatore).

D: Dato libro L con campo char titolo[], quali sono i tipi di L.titolo[3], L.titolo, &(L.pagine)?
R: char; array di char; int *.

D: Le struct si passano per valore o per riferimento?
R: Per valore (copia): la funzione non modifica l'originale. Per modificarla serve un puntatore.

D: Con struct prova statica; struct prova *dinamica = malloc(...); come si chiamano stampa(struct prova) e init(struct prova *)?
R: stampa(statica); stampa(*dinamica); init(&statica); init(dinamica); (la dinamica è già un indirizzo).

D: Cosa stampa? union u { char c; int i; } x; x.i = 65; printf("%d", x.i); x.c = 'a'; printf("%d", x.i);
R: Il primo 65. Il secondo dipende dall'implementazione: scrivere in c sovrappone i byte di i (non è garantito 97).

D: Differenza di memoria tra struct e union?
R: Nella struct i campi sono uno dopo l'altro (con padding); nella union sono sovrapposti e lo spazio è quello del campo più grande, un campo valido alla volta.

D: Unione vs prodotto cartesiano dei domini?
R: La union è l'unione dei domini dei campi; struct e array sono un prodotto cartesiano (array: domini tutti uguali, struct: in generale diversi).

D: Cos'è una tagged union e perché serve?
R: Una struct con un campo etichetta (di solito enum) più una union: il linguaggio non ricorda quale campo è valido, l'etichetta lo dice.

D: Data union u1 { struct s1 { int i; float f; } svar; double d; } uvar; quali sono corrette: uvar.svar.i=1; uvar.d.i=1; uvar.f=0.5;?
R: Solo la prima. uvar.d.i è errata (d è double); uvar.f=0.5 è errata (serve uvar.svar.f).

D: Scrivi la dichiarazione di un array dinamico di N libri.
R: libro *s1 = (libro*) malloc(sizeof(libro)*N);

## 04 - Liste linkate e ricorsione

D: Definizione ricorsiva di lista e tipo C.
R: Lista = vuota (NULL) oppure un elemento seguito da una lista. typedef struct nodo* lista; struct nodo { tipo dato; lista next; };

D: Cosa succede con vrb->next->next->next->campo1 su una lista di 3 nodi?
R: Il nodo non esiste (next del 3o è NULL): segmentation fault.

D: Cos'è un "nodo fantasma"?
R: Un nodo creato senza next = NULL: bit casuali interpretati come indirizzo.

D: Scrivi crea_nodo per una lista di int.
R: lista nuovo=(lista)malloc(sizeof(struct nodo)); nuovo->dato=el; nuovo->next=NULL; return nuovo;

D: Perché L = L->next dentro una funzione non modifica la lista del chiamante?
R: Il puntatore è passato per valore: si modifica la copia locale. Servono due versioni: v1 restituisce la nuova testa, v2 riceve lista* e modifica *L.

D: Scrivi cancella_testa nelle versioni v1 e v2.
R: v1: lista tmp=L->next; free(L); return tmp; (uso: ML = cancella_testa(ML);). v2: lista tmp=*L; *L=(*L)->next; free(tmp); (uso: cancella_testa2(&ML);).

D: Perché scrivere solo vrb = vrb->next; per cancellare la testa è sbagliato?
R: Il vecchio nodo resta nello heap irraggiungibile: memory leak. Va salvato in tmp e poi free.

D: Scrivi aggiungi_in_testa (v1 e v2) e l'ordine corretto delle assegnazioni.
R: v1: nuovo->next=L; return nuovo;. v2: nuovo->next=*L; *L=nuovo;. Prima si aggancia il resto, poi si sposta la testa; invertendo si perde la lista.

D: Scrivi somma_nodi ricorsiva e la versione iterativa.
R: Ric.: if(L==NULL) return 0; else return L->dato + somma_nodi(L->next);. Iter.: ris=0; while(L){ris+=L->dato; L=L->next;} return ris; (L è un cursore, copia).

D: Qual è il caso base della ricorsione su liste e cosa restituisce?
R: L == NULL; restituisce l'elemento neutro dell'operazione (0 per la somma).

D: Scrivi elimina_lista per riferimento.
R: if(L) if(*L){ elimina_lista(&((*L)->next)); free(*L); *L=NULL; }

D: Scrivi elimina_lista2 per valore e come si usa.
R: if(L){ L->next=elimina_lista2(L->next); free(L); return NULL;} else return NULL; Uso: ML = elimina_lista2(ML); altrimenti ML punta a un nodo fantasma.

D: Cosa significa "ricorsione in testa" vs "in coda" per la docente?
R: In coda: si elabora il nodo e poi si richiama (ordine della lista). In testa: si richiama e poi si elabora (ordine inverso). Riguarda la posizione del richiamo, non testa/coda della lista.

D: Cosa stampano stampa e stampainv su 1,3,8,10,25,30 (stampa: printf poi richiamo; stampainv: richiamo poi printf)?
R: stampa: 1 3 8 10 25 30 ; stampainv: 30 25 10 8 3 1 (poi il caso base stampa "/").

D: Su lista ordinata, conta(L,S) conta i pesi < S: scrivi la funzione.
R: if(!L) return 0; else if(L->peso>=S) return 0; else return 1+conta(L->next,S); (si ferma al primo peso >= S perché la lista è ordinata).

D: Quali sono i 4 casi di ins_ord (lista ordinata, per valore)?
R: Lista vuota -> restituisce nodo; nodo <= L->dato -> in testa; L->next NULL -> in coda; nodo < L->next->dato -> fra L e L->next; altrimenti ricorsione L->next = ins_ord(L->next,nodo).

D: Qual è la differenza di controlli tra versione per valore e per riferimento?
R: Per valore basta il controllo L==NULL; per riferimento serve il doppio if (L) if (*L).

D: Elenca gli errori tipici su liste secondo la docente.
R: Dimenticare L==NULL (valore); dimenticare if(L) if(*L) (riferimento); saltare un caso; dimenticare NULL nel next dell'ultimo inserito in coda; mettere NULL nel next di un nodo inserito fra due nodi.

D: Cosa stampa? lista di 1,2,3; void f(lista L){ if(L){ f(L->next); printf("%d", L->dato); f(L->next);} }
R: 3 2 3 1 3 2 3. F([3])="3"; F([2,3])=F([3]) 2 F([3])="323"; F([1,2,3])="323" 1 "323". Tracciare a mano con i box di stack/heap.

## 05 - ADT: stack, queue, set

D: Cos'è un ADT?
R: Un tipo definito indipendentemente dall'implementazione: dominio (stato) più operazioni (interfaccia). Si può cambiare implementazione senza cambiare l'interfaccia né il codice che lo usa.

D: Interfaccia dello stack.
R: void push(tipo el, stack *s); tipo pop(stack *s); int empty(stack s); int full(stack s); tipo peek(stack s). LIFO.

D: Stack con lista: come si realizzano push, pop, empty, full?
R: Cima = testa; push = inserzione in testa; pop = cancellazione dalla testa; empty = (lista NULL); full sempre 0.

D: Perché pop restituisce NOVALUE?
R: Per segnalare "nulla da togliere" con una costante fuori dal range significativo; il chiamante controlla result != NOVALUE.

D: Nello stack con lista, pop usa top->dato dopo del_testa: che problema c'è? [DA VERIFICARE]
R: Se del_testa fa free del nodo, top->dato è un use-after-free. Salvare il dato prima di liberare.

D: Stack con array: struttura, empty e full.
R: struct { int top; int dato[MAX]; }; top = prossima cella libera. empty: top==0; full: top==MAX.

D: Scrivi push e pop dello stack con array.
R: push: if(s) if(!full(*s)){ s->dato[s->top]=el; s->top++; }. pop: result=NOVALUE; if(s) if(!empty(*s)){ result=s->dato[s->top-1]; s->top--; } return result;

D: Cosa stampa? stack vuoto (MAX 5); push(1); push(2); push(3); printf("%d", pop()); printf("%d", pop()); push(4); printf("%d", pop());
R: 3 2 4 (LIFO).

D: Quali sono le applicazioni dello stack?
R: Stack di esecuzione, inversione di stringhe, valutazione di espressioni (prefissa/postfissa), tasto back del browser, LRU nei SO, DFS di un albero.

D: Interfaccia e ordine della queue.
R: init, enqueue (in fondo, tail), dequeue (dalla testa, head), empty, full, peek. FIFO. Usi: buffer produttore-consumatore, scheduling CPU, BFS.

D: Perché serve un array circolare e come si calcola il successore?
R: Per riusare le celle liberate in testa: succ(i) = (i+1) % MAX.

D: Perché la queue circolare ha il campo num?
R: Con head == tail piena e vuota sarebbero ambigue; num conta gli elementi (empty: num==0, full: num==MAX).

D: Scrivi enqueue e dequeue della coda circolare (slide).
R: enqueue: if(!full(*Q)){ Q->tail=succ(Q->tail); Q->dato[Q->tail]=el; Q->num++; }. dequeue: if(!empty(*Q)){ result=Q->dato[Q->head]; Q->head=succ(Q->head); Q->num--; }

D: Coda circolare: init con head=tail=0 ed enqueue che incrementa tail prima di scrivere: è coerente? [DA VERIFICARE]
R: No: la prima cella scritta sarebbe la 1 e head=0 punterebbe a una cella vuota. Coerente: tail = MAX-1 in init, oppure enqueue scrive in tail e poi incrementa. Le slide hanno anche succ(Q->tail, MAX) con 2 argomenti: refuso.

D: Coda con lista: perché si tengono head e tail?
R: head per togliere e tail per aggiungere in O(1) senza scorrere la lista. Vuota quando head==NULL, mai piena.

D: Enqueue con lista: qual è l'ordine corretto?
R: Q->tail->next = nuovo; poi Q->tail = nuovo; (prima aggancia, poi sposta tail). Se la coda è vuota: head = tail = nuovo.

D: Dequeue con lista: cosa manca nelle slide? [DA VERIFICARE]
R: Q->num-- e il reset di tail a NULL quando la coda diventa vuota (altrimenti tail punta a un nodo liberato). Il free del nodo c'è.

D: Differenza tra set e multiset?
R: Nel multiset un elemento può comparire più volte ({0,1,0,3}); nel set al più una volta. Cambia solo aggiungi: nel set inserisce solo se assente.

D: Operazioni del set.
R: elem, vuoto, init, cardinality, costruisci, crea_max, aggiungi, togli (prima occorrenza), togli_tutti.

D: Set come lista vs come array?
R: Lista: illimitato, aggiungi = inserzione in testa. Array: limitato, serve ricordare il numero di elementi. Con metadati (struct { lista dati; int numero; }) cardinality e vuoto sono O(1).

D: Scrivi togli_elem ricorsiva per riferimento (esito 1/0/-1) e il suo difetto.
R: if(L) if(*L) if((*L)->dato==el){ *L=(*L)->next; return 1;} else return togli_elem(&(*L)->next,el); else return 0; else return -1; Difetto: manca il free (t=*L; *L=t->next; free(t);).

D: Cosa serve per una funzione variadica in C?
R: #include <stdarg.h>, almeno un parametro fisso (es. num), va_list, va_start(ptr,num), va_arg(ptr,tipo), va_end(ptr).

D: Vantaggio e svantaggio del set come lista ordinata?
R: Vantaggio: la ricerca può fermarsi prima. Svantaggio: la lista va tenuta ordinata, quindi niente inserzione in testa e inserzione più lenta. Conviene con molti doppioni.

## 06 - Alberi binari

D: Differenza tra struttura lineare e albero.
R: Nelle lineari ogni nodo ha al più un successore e un predecessore; nell'albero molti successori ma al più un predecessore. Binario: al più 2 figli.

D: Definisci radice, foglia, frontiera, nodo interno.
R: Radice: unico nodo senza predecessore. Foglia: senza figli (insieme delle foglie = frontiera). Interno: almeno un figlio.

D: Profondità di un nodo, dell'albero e grado.
R: Profondità nodo = distanza dalla radice (radice 0). Profondità albero = massima dei nodi (0 con la sola radice, -1 se vuoto). Grado = numero di figli del nodo.

D: Cos'è un albero degenere?
R: Tutti i nodi hanno al più un figlio: si riduce a una lista.

D: Definizione ricorsiva di albero binario e tipo C.
R: Vuoto oppure un nodo con (al più) due sottoalberi. typedef struct nodo* tree; struct nodo { tree left; tree right; int dato; };

D: Cos'è un BST?
R: Albero ordinato: per ogni nodo, valori del sottoalbero sinistro < valore < valori del sottoalbero destro.

D: Scrivi add_ord per un BST senza duplicati.
R: if(T) if(*T) if(el<(*T)->dato) add_ord(&((*T)->left),el); else if(el>(*T)->dato) add_ord(&((*T)->right),el); else printf("gia' presente"); else *T=crea_nodo(el);

D: In add con percorso ("ssd"), cosa succede se il percorso finisce su un nodo già presente?
R: Errore "posto occupato": non si assegna, altrimenti si perderebbe il nodo. Si crea il nodo solo se il percorso finisce su un NULL.

D: Preorder, inorder e postorder: ordine di visita?
R: Pre: nodo, sn, dx. In: sn, nodo, dx. Post: sn, dx, nodo.

D: Albero A(B(D(G),E),C(F(H))): dai pre-, in- e post-order.
R: Pre: A B D G E C F H. In: D G B E A C H F. Post: G D E B H F C A.

D: Cosa stampa la visita inorder di un BST?
R: I valori in ordine crescente.

D: Cosa stampa stampaIN(T) con else printf("-") su T = nodo 2 con figlio sinistro 1 e destro 3?
R: "-1-" poi " 2 " poi "-3-": cioè - 1 - 2 - 3 - (un trattino per ogni sottoalbero vuoto).

D: Perché rimuovi_tutto va in postorder?
R: Si liberano i sottoalberi prima della radice; liberando prima la radice i figli diventerebbero irraggiungibili (leak). Aggiungere *T = NULL.

D: Scrivi rimuovi_tutto.
R: if(T) if(*T){ rimuovi_tutto(&(*T)->left); rimuovi_tutto(&(*T)->right); free(*T); *T=NULL; }

D: DFS con stack esplicito: ordine di push dei figli e perché.
R: while(!empty(s)){ cur=pop(s); visita; if(cur->right) push(right); if(cur->left) push(left); } Prima il destro, così il sinistro esce per primo (preorder). Le slide hanno condizioni e push incrociati: [DA VERIFICARE] refuso.

D: BFS: struttura dati e ordine sull'albero d'esempio.
R: Coda FIFO: enqueue(radice); while(!empty){ n=dequeue; visita; enqueue left; enqueue right; } Ordine per livelli: A B C D E F G H. [DA VERIFICARE] il PDF si interrompe prima della fine della simulazione (ordine dedotto dall'algoritmo).

D: Scrivi conta_nodi e altezza (profondità, vuoto = -1) di un albero.
R: conta: if(!T) return 0; return 1+conta(T->left)+conta(T->right). Altezza: if(!T) return -1; return 1+max(h(left),h(right)).

D: Scrivi il conteggio delle foglie.
R: if(!T) return 0; if(!T->left && !T->right) return 1; return foglie(T->left)+foglie(T->right);

D: Come si trova il minimo e il massimo in un BST?
R: Minimo: scendere sempre a sinistra. Massimo: sempre a destra.

D: Come si cerca un valore in un BST?
R: if(!T) return 0; if(el==T->dato) return 1; return el<T->dato ? cerca(T->left,el) : cerca(T->right,el);

## 07 - Puntatori a funzione e nodi generici

D: Dichiara un puntatore a funzione che prende (int,int) e restituisce int. Perché servono le tonde?
R: int (*p)(int,int); Senza tonde, int *p(int,int) dichiara una funzione che restituisce int*.

D: Come si assegna e si invoca un puntatore a funzione?
R: p = somma; (assegna l'indirizzo) ; r = (*p)(2,3);

D: Dichiara un array di 4 puntatori a funzione int -> int.
R: int (*handler[4])(int); (la cardinalità dopo il nome).

D: Cosa stampa? handler[1]=raddoppia; handler[0]=print (stampa "L'evento e' x"); chiamo (*handler[0])(0) e (*handler[1])(5) con scelta=1 inizializzata.
R: Per scelta==1: handler[0]=print stampa "L'evento e' 0"; handler[1]=raddoppia(5) restituisce 10 (ma niente stampa, il valore ritornato è ignorato).

D: Qual è l'idea del vettore delle interruzioni?
R: L'evento è l'indice, la cella contiene la funzione da eseguire: accesso diretto alla funzione giusta.

D: Vantaggio e svantaggio dei puntatori a funzione.
R: Vantaggio: il codice diventa dato passabile, programmi compatti e riusabili. Svantaggio: maggiore astrazione, meno intuitiva.

D: Scrivi una funzione che applica f a ogni elemento di un array di int.
R: void applica(int a[], int n, int (*f)(int)){ int i; for(i=0;i<n;i++) a[i]=(*f)(a[i]); }

D: Perché un nodo generico usa void *dato?
R: Le operazioni sull'ADT dipendono dalla struttura e non dal tipo del dato: il nodo punta a un'area malloc(sizeof(TIPO)) e le operazioni dipendenti dal tipo sono affidate a puntatori a funzione.

D: Quali campi funzione ha il nodo generico e che firma?
R: opcread creadato (void* (*)()), opstampa stampa (void (*)(void*)), opconfronta confronta (int (*)(void*,void*): <0, 0, >0).

D: Come si stampa un intero memorizzato in un void *d?
R: printf("%d", *(int*)d); cast a int* PRIMA della deferenziazione.

D: Scrivi conf per interi e per stringhe nelle due implementazioni di funzioni.h.
R: Interi: restituisce -1 se *(int*)x < *(int*)y, 0 se uguali, 1 altrimenti. Stringhe: return strcmp((char*)x,(char*)y); (<string.h>).

D: Cosa permette di riusare lo stesso funzioni.h con due implementazioni?
R: main e codice dell'albero restano invariati: si compila con funzioni.c per interi o per stringhe (gcc main.c funzioni.c). I nomi crea/stampa/conf sono il collegamento.

D: Qual è la firma corretta di crea in funzioni.h? [DA VERIFICARE]
R: void *crea(); (la slide ha anche void crea(), refuso). Il free del dato generico oltre al nodo non è esplicitato nelle slide.

## 08 - Lettura e scrittura su file

D: Qual è il ciclo di uso di un file?
R: fopen (accesso), uso, fclose (rilascio, obbligatorio). Includere <stdio.h>; controllare sempre fopen != NULL.

D: Differenza tra modi "r", "w" e "a" di fopen.
R: "r" lettura dal primo byte (NULL se il file non esiste); "w" scrittura che cancella il contenuto o crea il file (NULL in caso di errore); "a" append in fondo.

D: Cosa restituisce feof?
R: Un valore diverso da 0 una volta raggiunta la fine del file.

D: Come funziona il testo letterale nel formato di fscanf?
R: Es. "nome: %s id: %d\n": il testo letterale deve corrispondere a quanto scritto nel file e non viene memorizzato.

D: Scrivi il guscio per leggere interi da dati.txt e sommarli.
R: fp=fopen("dati.txt","r"); if(fp!=NULL){ while(fscanf(fp,"%d",&x)==1) sum+=x; fclose(fp);} else printf("Errore: file inesistente");

D: Perché while(!feof(fp)) con fscanf può dare una lettura in più? [DA VERIFICARE]
R: Se il file termina con uno spazio finale (fprintf "%d "), feof non è ancora vera dopo l'ultimo numero: l'ultima fscanf fallisce e temp resta ripetuto, cont sbagliato. Più robusto: while(fscanf(fp,"%d",&temp)==1).

D: Cosa succede a un file aperto con "w" se esisteva già?
R: Il contenuto precedente è cancellato.

D: Scrivi il termometro: scrive 7 temperature in dati.txt separate da spazio.
R: fp=fopen("dati.txt","w"); if(fp){ for(i=0;i<7;i++){ scanf("%d",&t); fprintf(fp,"%d ",t);} fclose(fp);}

D: Esercizio d'aula: file con cifre 0-9 da riscrivere in parole. Idea?
R: Array di stringhe indicizzato dalla cifra: char *p[]={"zero","uno",...,"nove"}; leggere con fscanf e scrivere p[cifra] con fprintf su un secondo file.

D: Quando può fallire fopen in scrittura?
R: Percorso inesistente o permessi insufficienti: restituisce NULL.
