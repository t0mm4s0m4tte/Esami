# 08 - Lettura e scrittura su file

Fonte: Drive > "PDF " > `11_Lettura_Scrittura_File.pdf`.

## Mappa

Il file presenta il file come risorsa persistente il cui formato va condiviso fra i programmi, le funzioni `fopen`, `fclose`, `feof`, `fscanf` e `fprintf`, e un caso di studio con termometro e cruscotto.

- [Concetti](#concetti)
- [Codice essenziale](#codice-essenziale)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## Concetti
Un file è una risorsa e si usa con il solito ciclo in tre tempi:
1. si **ottiene l'accesso** (`fopen`);
2. si **usa**;
3. si **rilascia** (`fclose`).

La chiusura è obbligatoria, perché non chiudere il file può lasciarlo in uno stato inconsistente. Poiché un file è anche il mezzo con cui programmi diversi si scambiano dati, essi devono condividere il **formato** (per esempio interi separati da spazi). Serve `#include <stdio.h>`.

```c
FILE *fopen(const char *pathname, const char *mode);
int  feof(FILE *stream);
int  fscanf(FILE *stream, const char *format, ...);
int  fprintf(FILE *stream, const char *format, ...);
int  fclose(FILE *stream);
```

Il secondo argomento di `fopen` è il modo di apertura, e determina la direzione del flusso `FILE*`: con `"w"` per esempio non si può leggere. I modi sono:
- `"r"`: lettura, posizione sul primo byte, lettura sequenziale (il cursore avanza da solo); se il file non esiste restituisce `NULL`;
- `"w"`: scrittura; se il file esiste i contenuti precedenti sono **cancellati**, se non esiste viene creato; in caso di errore restituisce `NULL`;
- `"a"` (extra): append, si scrive in fondo ai contenuti esistenti.

`feof` restituisce un valore diverso da 0 una volta raggiunta la fine del file. Il formato di `fscanf` funziona come in `scanf`, con una particolarità: una parte di testo "letterale" nel formato (es. `"nome: %s id: %d\n"`) deve corrispondere a quanto scritto nel file e non viene memorizzata.

## Codice essenziale
Il cruscotto legge le temperature e calcola minimo, massimo e media; il termometro fa l'operazione inversa e scrive sette temperature. In entrambi lo schema è sempre lo stesso: apri, controlla `NULL`, usa, chiudi.

```c
/* cruscotto: legge temperature, calcola min, max, media */
#include <stdio.h>
#define MAXN 1000
int main() {
  FILE *fp; int temp, min = MAXN, max = -MAXN, cont = 0, sum = 0;
  fp = fopen("dati.txt", "r");
  if (fp != NULL) {
    while (!feof(fp)) {
      fscanf(fp, "%d", &temp);
      if (temp < min) min = temp;
      if (temp > max) max = temp;
      cont++; sum += temp;
    }
    fclose(fp);
    printf("min=%d, max=%d, avg=%d", min, max, sum/cont);
  } else printf("Errore: file inesistente");
}

/* termometro: scrive 7 temperature */
FILE *fp = fopen("dati.txt", "w");      /* [slide: manca il controllo fp != NULL] */
for (i = 0; i < 7; i++) { printf("%d, temp? ", i); scanf("%d", &temp); fprintf(fp, "%d ", temp); }
fclose(fp);
```
Un'osservazione mia, non presente sulle slide [DA VERIFICARE con la docente]: con `fprintf(fp,"%d ",...)` c'è uno spazio finale, quindi `while(!feof(fp))` può fare una lettura in più (ultimo `temp` ripetuto, `cont` sbagliato). Più robusto è `while (fscanf(fp,"%d",&temp) == 1)`.

Il terzo esempio lascia scegliere all'utente se leggere o scrivere, e mostra l'uso del testo letterale nel formato di `fscanf`:
```c
/* lettura/scrittura a scelta dell'utente */
if (scrivi) { fp = fopen("dati.txt","w"); if (fp) { fprintf(fp,"nome: Anna id: 123\n"); fclose(fp); } }
else        { fp = fopen("dati.txt","r"); if (fp) { fscanf(fp,"nome: %s id: %d\n", datiS, &datiN);
                                                     printf("Ho letto:%s %d\n", datiS, datiN); fclose(fp); } }
```

## Cose da saper fare all'esame
- Scrivere il "guscio": fopen -> controllo NULL -> uso -> fclose -> ramo errore.
- Esercizio svolto in aula (a coppie): leggere da un file cifre 0-9 scritte come numeri e scrivere un secondo file con le cifre in parole (zero, uno, ... nove): array di stringhe indicizzato dalla cifra.
- Spiegare quando fallisce fopen in scrittura (es. percorso inesistente o permessi) e cosa succede se i dati non rispettano il formato di fscanf.
- Generalizzare il termometro a un numero variabile di temperature (es. scrivere prima il conteggio o leggere fino a fine file); il cruscotto va modificato?

## Dubbi
Cosa succede se i dati non corrispondono al pattern di `fscanf`: la docente lo lascia come prova sperimentale. [DA VERIFICARE]
