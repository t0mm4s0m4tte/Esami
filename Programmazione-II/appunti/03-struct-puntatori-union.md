# 03 - Struct, padding, puntatori a struct, union

Fonte: Drive > "PDF " > `3_Strutture_in_memoria_e_padding.pdf`, `10_Union.pdf`.

## Mappa
Il file tratta i tipi composti del C: le struct con typedef, l'accesso ai campi e gli array di struct; come la memoria le dispone (padding e `sizeof`); la loro allocazione dinamica con `->`, `free` e NULL; il passaggio a funzione per valore o per puntatore; infine le union, le tagged union e la differenza di dominio fra unione e prodotto cartesiano.

## struct e typedef
Una struct raggruppa sotto un unico nome dati di tipo diverso, e con `typedef` le si dà un nome di tipo comodo da usare. I campi vengono allocati **nell'ordine di dichiarazione**, anche quando hanno dimensioni diverse. Fra variabili dello stesso tipo struct l'assegnazione è lecita e copia campo per campo, mentre il confronto con `==` non è consentito: se serve, va scritto a mano campo per campo.

```c
typedef struct {
  char titolo[MAXT]; int pagine; char autore[MAXN]; float prezzo;
} libro;                                  /* nuovo tipo "libro" */

libro L1, L2;
libro L = {"Manuale C", 100, "C. Rossi", 9.90};   /* inizializzazione */
L1 = L2;                  /* assegnazione struct = struct: OK (copia campo per campo) */
if (L1 == L2) ...         /* NON SI PUO' FARE: niente == fra struct */
libro s[MAX];             /* array di libri */
L.pagine = 200;           /* accesso a campo */
s[2].autore               /* campo autore del terzo libro */
libro *s1 = (libro*) malloc(sizeof(libro)*N);   /* array dinamico */
```

## Padding
Il sistema operativo alloca la memoria a gruppi di 4, 8 o 16 byte, e perciò una struct può occupare più dello stretto necessario: il compilatore inserisce byte di riempimento (padding) per allineare i campi. Il risultato è che la dimensione di una struct non è la somma delle dimensioni dei campi; la conseguenza pratica è usare sempre `sizeof(tipo)` e mai la somma dei campi.

```c
struct prova { char x; char y; int z; };
sizeof(struct prova) = 8     /* ma sizeof(char)*2 + sizeof(int) = 6 */
```

## Allocazione dinamica e accesso
Una struct può essere creata nello heap con `malloc` e raggiunta tramite un puntatore. Per accedere ai campi si può deferenziare e poi usare il punto, `(*L).pagine`, ma la forma abbreviata `L->pagine` è equivalente ed è quella che si usa normalmente. Quando si libera la memoria servono entrambe le operazioni `free(L)` e `L = NULL`, per mantenere la consistenza ed evitare di usare in seguito un puntatore pendente.

```c
libro *L = (libro*) malloc(sizeof(libro));
(*L).pagine = 200;     /* equivale a */   L->pagine = 200;
free(L);  L = NULL;    /* entrambe necessarie per mantenere la consistenza */
```

Un buon modo per esercitare la distinzione fra oggetto e puntatore è il **quiz sui tipi**. Dato `libro L; libro *P=(libro*)malloc(sizeof(libro));`:
- `P = L;` NO (P puntatore, L libro); `P = &L;` SI; `*P = &L;` NO (*P è libro, &L puntatore);
- `P->titolo = L->titolo;` NO: gli array non si assegnano così (e `L->` su non-puntatore);
- tipo di `L.titolo[3]` = `char`; di `L.titolo` = array di char; di `&(L.pagine)` = `int *`.

## Passaggio di struct a funzione
A differenza degli array, **le struct si passano per valore**: la funzione riceve una copia e non può modificare l'originale. Per modificarla bisogna passare un puntatore. Il punto delicato sta nel distinguere una variabile statica da una dinamica: la prima va passata per valore così com'è oppure con `&` per modificarla, mentre la seconda è già un indirizzo, quindi va deferenziata se la funzione vuole il valore e passata direttamente se vuole il puntatore.

```c
struct prova { int x, y; };
void stampa(struct prova p) { printf("x=%d y=%d\n", p.x, p.y); }   /* per valore */
void init(struct prova *p) { p->x = 15; p->y = 25; }               /* per puntatore: modifica */

struct prova statica;
struct prova *dinamica = malloc(sizeof(struct prova));
stampa(statica);   stampa(*dinamica);     /* per valore: dinamica va deferenziata */
init(&statica);    init(dinamica);        /* per modificare: &statica; dinamica è già un indirizzo */
```

## union
Una union ha l'aspetto di una struct, ma i suoi campi sono in **mutua esclusione**: la variabile "indossa una veste alla volta" e occupa lo spazio del campo più grande. Scrivere in un campo sostituisce quindi il contenuto di quello precedente, perché tutti i campi sono sovrapposti nella stessa area di memoria, mentre in una struct stanno uno dopo l'altro (con padding).

```c
union myunion { char cval; int ival; float fval; } u, *ptru;
u.cval = 'h';
u.ival = 0xDE4D7E91;   /* sostituisce cval! */
ptru = &u; ptru->fval = 3.14;   /* sostituisce ival */
```

Questa differenza si legge bene in termini di dominio: la union è l'**unione** dei domini dei campi, mentre struct e array sono un **prodotto cartesiano** (nell'array i domini componenti sono tutti uguali, nella struct sono in generale diversi).

Il rischio della union è che il linguaggio non ricorda quale campo sia valido: ne è responsabile il programmatore. Per questo si usa il pattern della **tagged union**, cioè una struct che affianca alla union un campo etichetta (di solito un `enum`) che dice quale veste è attiva.

```c
enum nazione { ITA, USA };
typedef struct {
  enum nazione paese;                     /* etichetta */
  union { nomeITA NI; nomeUSA NU; } n;
} nome;
nome n1; n1.paese = ITA;
strcpy(n1.n.NI.nome, "Rosa"); strcpy(n1.n.NI.cognome, "Rossi");
```
(`nomeITA`: nome+cognome; `nomeUSA`: first+middle+last.)

Un esempio da esame-tipo sull'accesso ai campi annidati: data `union u1 { struct s1 { int i; float f; } svar; double d; } uvar;`, l'istruzione `uvar.svar.i=1` è corretta, `uvar.d.i=1` no (d è un double) e `uvar.f=0.5` nemmeno (serve `uvar.svar.f`).

## Cose da saper fare all'esame
- Definire un tipo struct con typedef, array statico/dinamico, inizializzare, stampare (esercizio: tipo `canzone`, `#define MAX`, malloc di MAX elementi, ciclo di input, stampa, free).
- Dire se un'espressione di assegnazione è corretta per tipi (quiz).
- Distinguere `statica`/`dinamica` nelle chiamate (`stampa(*dinamica)`, `init(&statica)`).
- Calcolare/spiegare `sizeof` di una struct con padding.
- Usare e riconoscere errori su union / tagged union; spiegare unione vs prodotto cartesiano.

## Dubbi
Le regole esatte di allineamento per il padding non sono nelle slide (c'è solo l'esempio con char, char, int = 8): [DA VERIFICARE]. Nell'esempio della slide `nome2.paese = USA` ma poi si scrive su `nome1.n.NU`: probabile refuso della slide.
