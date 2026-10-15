# 04 - Liste linkate e ricorsione su liste

Fonte: Drive > "PDF " > `4_Strutture_dati_ricorsive.pdf`, `4_Modificare_lista_linkata.pdf`, `5_Funzioni_ricorsive_su_liste.pdf`, `6_Ricorsione_su_liste_complessa.pdf`.

## Mappa
Il capitolo parte dalla definizione ricorsiva di lista e dal suo tipo C, con gli errori tipici di accesso (NULL, nodo fantasma); affronta poi la modifica della testa, per valore (v1) o per riferimento (v2); passa alla ricorsione (somma, rimozione dell'intera lista, ricorsione in testa vs in coda); e termina con le liste ordinate (inserzione ordinata, conteggio) e i tipi di liste. È il cuore del corso: stack, queue, set e alberi riusano gli stessi pattern.

## Definizione e tipo
Una lista è o **vuota** (NULL) oppure **un elemento seguito da una lista**. La definizione è ricorsiva perché si ripete lo stesso *tipo*, non lo stesso elemento: dentro ogni nodo c'è una lista più corta. In C una variabile lista contiene un riferimento a un nodo oppure NULL, e **NULL termina la lista ed è fondamentale**: è il segnale che non c'è altro da percorrere.

```c
typedef struct nodo* lista;
struct nodo { tipo-dato campo1; /*...*/ lista next; };
lista vrb = NULL;                                   /* lista vuota */
vrb = (lista) malloc(sizeof(struct nodo));          /* un nodo */
vrb->campo1 = ...;  vrb->next = NULL;

lista crea_nodo(...dati) {
  lista nuovo = (lista) malloc(sizeof(struct nodo));
  nuovo->... = ...;  nuovo->next = NULL;  return nuovo;
}
```

L'accesso ai nodi si fa concatenando le frecce: `vrb->campo1`, `vrb->next->campo1`, `vrb->next->next->next == NULL`. Se si va oltre la fine, per esempio `vrb->next->next->next->campo1` su una lista di 3 nodi, il nodo non esiste e si ha un segmentation fault. L'errore opposto è dimenticare `next = NULL` alla creazione di un nodo: si ottiene un "nodo fantasma", dove bit casuali vengono interpretati come un indirizzo.

## Modificare la testa
Il passaggio di una lista per valore copia il puntatore, quindi `L = L->next` dentro una funzione modifica solo la copia locale e il chiamante non se ne accorge. Questo è il problema di fondo che spiega perché ogni funzione che può cambiare la testa esiste in due versioni:
- **v1, per valore**: restituisce la nuova testa, e il chiamante deve assegnare il risultato;
- **v2, per riferimento**: riceve l'indirizzo della variabile lista e modifica direttamente `*L`.

### Cancellazione dalla testa
L'errore classico è scrivere `vrb = vrb->next;` da solo: il nodo vecchio resta nello heap ma non è più raggiungibile da nessuno, ed è un **memory leak** (errore grave). Il modo corretto è conservare il nodo in una variabile temporanea, far avanzare la testa e solo allora fare `free`.

```c
/* v1: per valore, il chiamante deve assegnare: ML = cancella_testa(ML); */
lista cancella_testa(lista L) { lista tmp = L->next; free(L); return tmp; }

/* v2: per riferimento: cancella_testa2(&ML); */
void cancella_testa2(lista *L) { lista tmp = *L; *L = (*L)->next; free(tmp); }
```
Un'analogia che aiuta è `x = sottrai_uno(x)` contro `sottrai_uno(&x)`. Nella v2 si modifica `*L`, non `L`, perché `L` è un parametro locale (un puntatore a lista). Nelle slide mancano i controlli su lista vuota (`if (L && *L)`).

### Inserzione in testa
Qui conta l'**ordine delle assegnazioni**: prima `nuovo->next = vrb;` e poi `vrb = nuovo;`, perché invertendole si perde il resto della lista.
```c
lista aggiungi_in_testa(lista L, lista nuovo) { nuovo->next = L; return nuovo; }   /* ML = aggiungi_in_testa(ML,new); */
void aggiungi_in_testa2(lista *L, lista nuovo) { nuovo->next = *L; *L = nuovo; }   /* aggiungi_in_testa2(&ML,new); */
```
Altre funzioni da saper fare, anche **ricorsivamente nelle due versioni** (valore e riferimento), sono l'inserzione e la cancellazione in coda e in posizione generica, il percorrimento (conteggi, stampa) e l'accesso misto (per esempio cancellare gli elementi in posizione pari). Oltre alla lista semplice esistono altri tipi di liste: circolare, ordinata o a priorità, double ended, doppiamente linkata (nelle slide sono solo nominati).

## Ricorsione su liste
La ricorsione sulle liste è un'applicazione diretta della definizione: il caso base è la lista vuota (`L == NULL`), il passo combina l'elemento corrente con il risultato della ricorsione su `L->next`. Il caso base restituisce l'elemento neutro dell'operazione (0 per la somma). Accanto alla versione ricorsiva si può scrivere quella iterativa, dove `L` fa da cursore (è solo una copia, quindi la lista del chiamante non cambia).
```c
int somma_nodi(lista L) {
  if (L == NULL) return 0;                 /* elemento neutro */
  else return L->dato + somma_nodi(L->next);
}
int somma_iter(lista L) { int ris = 0; while (L) { ris += L->dato; L = L->next; } return ris; }  /* L = cursore (copia) */
```

### Rimozione (dealloc) dell'intera lista
Per liberare tutta la lista si scende fino in fondo e si libera risalendo, dall'ultimo al primo: è una ricorsione "in testa" nel senso della docente (vedi sotto), perché il lavoro vero (`free`) viene dopo il richiamo. Per riferimento:
```c
void elimina_lista(lista *L) {
  if (L)                         /* parametro definito */
    if (*L) {                    /* lista non vuota */
      elimina_lista(&((*L)->next));
      free(*L);
      *L = NULL;
    }
}
```
Qui `&((*L)->next)` è l'indirizzo del campo next, e permette di modificarlo. Per valore il chiamante DEVE assegnare il risultato (`ML = elimina_lista2(ML);`), altrimenti ML punta a un nodo fantasma:
```c
lista elimina_lista2(lista L) {
  if (L) { L->next = elimina_lista2(L->next); free(L); return NULL; }
  else return NULL;
}
```

### Ricorsione in testa vs in coda
Nelle funzioni ricorsive la posizione del richiamo rispetto al lavoro cambia l'ordine di elaborazione. Se si elabora il nodo corrente e poi si richiama (ricorsione **in coda**, tail) si procede nell'ordine della lista; se si richiama prima e si elabora dopo (ricorsione **in testa**, head) si procede in ordine inverso, perché il lavoro avviene nella risalita. Lo si vede nelle due stampe: `stampa` produce 1 3 8 10 25 30, `stampainv` produce 30 25 10 8 3 1. Attenzione a non confondere questa terminologia della docente (posizione del richiamo) con testa e coda della lista.
```c
void stampa(lista L)    { if (L) { printf(" %d,", L->dato); stampa(L->next); }    else printf(" /\n"); }
void stampainv(lista L) { if (L) { stampainv(L->next); printf(" %d,", L->dato); } else printf(" /\n"); }
```

### Liste ordinate
In una lista ordinata ogni nodo è seguito da valori maggiori o uguali, e ogni modifica deve preservare questa proprietà. L'ordinamento permette anche di fermarsi prima: nell'esempio di logistica, che conta i pacchi con peso minore di una soglia S, appena si incontra un peso >= S si sa che nessuno dei successivi può contare, quindi si interrompe la ricorsione (caso (2)). Sono mostrate due varianti, con richiamo in coda e in testa.
```c
int conta(lista L, int S) {                /* richiamo "in coda" */
  if (!L) return 0;                        /* (1) lista vuota */
  else if (L->peso >= S) return 0;         /* (2) niente più da contare (lista ordinata!) */
  else return 1 + conta(L->next, S);
}
int conta2(lista L, int S) {               /* richiamo "in testa" */
  if (!L) return 0; else if (L->peso >= S) return 0;
  else { int temp = conta2(L->next, S); return 1 + temp; }
}
```

### Inserzione ordinata (4 casi)
Inserire un nodo in una lista ordinata richiede di distinguere quattro casi:
1. in testa;
2. in coda (L non ha successore);
3. fra L e L->next;
4. altrimenti si prosegue con la ricorsione.

Nella versione per valore, che restituisce la testa:
```c
lista ins_ord(lista L, lista nodo) {
  if (L)
    if (nodo->dato <= L->dato) { nodo->next = L; return nodo; }         /* in prima posizione */
    else if (!L->next) { L->next = nodo; nodo->next = NULL; return L; } /* diventa ultimo */
    else if (nodo->dato < L->next->dato) {                             /* fra L e L->next */
      nodo->next = L->next; L->next = nodo; return L; }
    else { L->next = ins_ord(L->next, nodo); return L; }              /* ricorsione */
  else return nodo;                                                    /* lista vuota */
}
/* uso: ML = ins_ord(ML, crea_nodo(...)); */
```
Per riferimento serve il doppio controllo `if (L) if (*L)`:
```c
void ins_ord2(lista *L, lista nodo) {
  if (L)
    if (*L)
      if (nodo->dato <= (*L)->dato) { nodo->next = *L; *L = nodo; }
      else if (!((*L)->next)) { (*L)->next = nodo; nodo->next = NULL; }
      else if (nodo->dato < (*L)->next->dato) { nodo->next = (*L)->next; (*L)->next = nodo; }
      else ins_ord2(&(*L)->next, nodo);
    else *L = nodo;                 /* era vuota */
}
/* uso: ins_ord2(&ML, crea_nodo(...)); */
```

### Errori tipici (elenco della docente)
- per valore: dimenticare il controllo `L == NULL`;
- per riferimento: dimenticare la doppia verifica `if (L) if (*L)`;
- saltare un caso;
- dimenticare `NULL` nel `next` dell'ultimo elemento inserito in coda;
- assegnare `NULL` al `next` di un nodo da inserire **fra due nodi**.

## Cose da saper fare all'esame
- Scrivere (sia per valore sia per riferimento, sia iterativo sia ricorsivo): inserzione/cancellazione in testa/coda/posizione generica, ricerca, conteggio, somma, stampa/inversa, rimozione di tutti gli elementi con una proprietà, dealloc totale.
- Simulare a mano stack/heap con i box (L, ML, tmp) per capire cosa viene modificato.
- Esercizio consigliato docente: programma su liste ordinate con (a) funzione test "x è multiplo di y", (b) rimozione di tutti gli elementi che soddisfano il test, (c) visualizzazione dei nodi con valore tra due numeri dati; elencare i casi di prova.
- Ricordare sempre `free` + riallineare i puntatori.

## Dubbi
Le funzioni di inserzione e cancellazione in coda e in posizione generica non sono scritte nelle slide ("fare da soli"): vanno implementate seguendo i pattern sopra. [DA VERIFICARE] le soluzioni con la docente/tutor.
