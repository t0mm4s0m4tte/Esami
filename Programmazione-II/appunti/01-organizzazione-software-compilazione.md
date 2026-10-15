# 01 - Organizzazione del software, file multipli, compilazione

Fonte: Drive > Programmazione II > "PDF " > `0_Introduzione.pdf`, `1_Organizzazione_del_software.pdf` (slide prof. C. Baroglio, a.a. 2024-25).

## Mappa
Il file parte dalle regole del gioco (come funziona l'esame), poi spiega perché conviene scrivere software riusabile, come si spezza un programma C in più file `.c` / `.h`, che cosa fa il compilatore quando lo trasforma in un eseguibile e come si organizza un progetto su disco con il comando `gcc` corrispondente.

## Modalità d'esame (dal corso a.a. 2024-25 - [DA VERIFICARE] per a.a. 2026-27)
L'esame si compone di due parti indipendenti. La parte di **laboratorio** vale da 0 a 3, viene corretta subito davanti al candidato ed è superata con almeno 1; il risultato resta valido per i 5 appelli consecutivi successivi (compreso quello della prova). Per accedervi bisogna aver consegnato su Moodle tutti gli esercizi di laboratorio, con i test automatici superati e l'approvazione del docente di lab. La parte di **teoria** vale da 0 a 30, si supera con almeno 17 e ci si può accedere solo dopo aver superato il lab. Il voto finale è la somma di teoria (>= 17) e lab (>= 1); se arriva a 31 o più diventa 30 e lode.

Il docente consiglia di preparare l'esame "come se ci fosse un orale", cioè ripetendo ad alta voce, e di esercitarsi **prima su carta, poi al computer**. Le date note sono esonero 2027-02-08 e scritto 2027-02-09 (dato dall'utente). Il doc "Argomenti dei Corsi" elenca solo 16 date di lezione (21/02 ... 16/05) senza titoli, quindi il mapping date -> argomenti non è deducibile e questi appunti sono organizzati per slide. I macro-argomenti dichiarati dalla docente sono:

- correttezza e verifica, tipi composti, strutture dati dinamiche;
- funzioni ricorsive, ADT, metodologia di programmazione;
- programmi su più file e riuso.

Modalità d'esame 2026-27 identiche a 2024-25? [DA VERIFICARE]

## Proprietà del buon software
Il punto di partenza del corso è che un programma "che funziona" non è per ciò stesso un buon programma. Le qualità che si cercano sono correttezza, affidabilità, usabilità, sicurezza, comprensibilità, efficienza e manutenibilità; la correttezza da sola non basta, come mostra l'esempio di un programma C offuscato che è corretto ma incomprensibile e quindi impossibile da mantenere. Da questa premessa discende l'interesse per il **riuso**: un componente è riusabile in funzione della sua adattabilità, consistenza, correttezza, estensibilità, modularità, ortogonalità, del suo essere parametrico, della bassa complessità e della stabilità.

Va chiarita una confusione frequente: il **copia-incolla è duplicazione, non riuso**. Riusare significa avere una funzione con una sola definizione e tanti usi, così che ci sia un solo punto da verificare e da modificare; con il copia-incolla invece ogni correzione va ripetuta in tutte le copie, e prima o poi se ne dimentica una.

## Codice su più file
Un programma C è fatto da uno o più file `.c`, ma **uno solo** di essi contiene il `main`; gli altri raccolgono definizioni di funzioni, tipi e macro. Per ogni `.c` senza main si scrive un `.h` che contiene ciò che si "esporta" verso l'esterno: i **prototipi** (nome della funzione, tipo dei parametri senza nome, tipo di ritorno o void), i tipi e le costanti `#define`. L'intuizione è questa: le funzioni sono strumenti, i file sono cassette degli attrezzi (raggruppate con criteri di **coerenza** tematica e di **ortogonalità**), i programmi sono gli equipaggiamenti che si compongono prendendo le cassette giuste. Una "cassetta" è codice a tutti gli effetti ma non ha il main.

Il perché del file `.h` si capisce guardando che cosa succede se lo si omette. Il compilatore non "va a cercare" le definizioni in altri file: senza prototipo emette il warning *implicit declaration*, e poi il linker segnala l'errore *undefined reference* perché non trova la funzione. Se invece si compilano insieme due file che hanno entrambi un `main` si ottiene *multiple definition of main*. Il prototipo è quindi il "contratto" che permette di compilare un file senza vedere l'implementazione. Ne deriva anche la **modularità**: se cambio il corpo di una funzione ma non il suo prototipo, i file che la usano vanno solo **ricompilati**, non modificati.

```c
/* vettori.h */
#define MAX 10
void stampa(int[]);
void inizializza(int[]);

/* vettori.c */
#include <stdio.h>
#include "vettori.h"
void stampa(int v[MAX]) { int i; for (i=0;i<MAX;i++) printf("%d ", v[i]); printf("\n"); }
void inizializza(int v[MAX]) { int i; for (i=0;i<MAX;i++) v[i]=i; }

/* main.c */
#include <stdio.h>
#include "vettori.h"
int main() { int v[MAX]; inizializza(v); stampa(v); }
```

Nella direttiva `#include` le parentesi angolari (`<lib.h>`) indicano una libreria di sistema, mentre le virgolette (`"file.h"` oppure `"PATH/file.h"`) indicano una ricerca locale nel file system.

## Compilatore: 4 fasi
Il comando `gcc` nasconde una piccola catena di montaggio, e ciascun passo può essere fermato e osservato con l'opzione giusta. Il preprocessore lavora sul testo, il compilatore lo traduce in assembly, l'assembler lo porta in codice macchina e il linker mette insieme i pezzi in un unico eseguibile. È il preprocessore a rendere possibili i controlli di cui sopra: esistenza delle definizioni e correttezza delle invocazioni, cioè coerenza con i prototipi.

| Fase | Comando gcc | Input -> Output |
|---|---|---|
| pre-processing | `gcc -E main.c` | sostituisce le direttive `#`: `#include` sostituito dal contenuto del file, `#define` sostituisce la macro (attenzione a `#define`) |
| compilazione stretta | `gcc -S main.c` | C -> assembly (`main.s`, testo) |
| assembling | `gcc -c main.c` | assembly -> file oggetto `.o` (codice macchina, non testo) |
| linking | `gcc *.c` | compone gli `.o` in un eseguibile (`a.out`) caricabile in RAM |

## Organizzazione cartelle
Un progetto ordinato separa sorgenti, header ed eseguibile in cartelle diverse e ha un README che descrive file e cartelle:

```
Prova/
  src/      file1.c main.c
  include/  file1.h
  bin/      a.out
  README    (descrive file e cartelle)
```

Compilando dalla cartella `Prova` si scrive `gcc src/file1.c src/main.c -o bin/a.out`, e in `main.c` si include l'header con un percorso relativo: `#include "../include/file1.h"` (si sale al genitore e si scende in include). Se invece il progetto sta in una sola cartella bastano `gcc file1.c main.c -o a.out` e `#include "file1.h"`. Dietro a questi percorsi c'è la distinzione fra pathname **assoluti** (dalla radice, unici per ogni nodo) e **relativi** (dal punto corrente, dove `..` indica il genitore, per esempio `../C/F`).

## Cose da saper fare all'esame
- Dato un problema (stringhe + array), **distribuire** funzioni in file `.c`/`.h`: scrivere solo i prototipi, elencare i file e dire cosa va dove (esercizio svolto in aula: stringhe: stampa, duplica, i-mo carattere; array: stampa, inizializza, assegna i-mo elemento; + main).
- Scrivere la riga di compilazione con più sorgenti.
- Spiegare gli errori `undefined reference` / `multiple definition of main` / implicit declaration.
- Elencare le 4 fasi del compilatore e cosa produce ciascuna.

## Dubbi
Esistono le direttive `#ifndef/#define` (include guard)? La slide dice "altre direttive al preprocessore: a Sistemi Operativi", quindi non sono trattate; [DA VERIFICARE] se servono. Resta aperta anche la questione delle modalità d'esame 2026-27 (vedi sopra) [DA VERIFICARE].
