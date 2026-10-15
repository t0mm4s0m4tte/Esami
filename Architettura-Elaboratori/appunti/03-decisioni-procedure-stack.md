# 03 - Istruzioni di decisione, cicli, procedure, stack, stringhe, ricorsione

Fonte: Lab 3 (decisioni), Lab 5 (jal/jalr, stringhe), Lab 6 (stack, convenzioni, procedure annidate), snippet `fib` nella Lezione 9. Le slide di teoria "ISA parte 3" (salti/procedure) NON sono nel Drive: il materiale deriva dai Lab; dettagli aggiuntivi "[libro]". Lab 7 (Ricorsione) assente dal Drive.

## Mappa

- [Salti e decisioni](#salti-e-decisioni)
- [Procedure](#procedure)
- [Stack e convenzioni di chiamata](#stack-e-convenzioni-di-chiamata)
- [Ricorsione (snippet `fib` dalla Lezione 9)](#ricorsione-snippet-fib-dalla-lezione-9)
- [Stringhe (Lab 5)](#stringhe-lab-5)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## Salti e decisioni
Le decisioni si realizzano con i salti condizionati (branch), che confrontano due registri e saltano a un'etichetta se la condizione è vera. Il formato è SB e le istruzioni sono `beq`, `bne`, `blt`, `bge`, `bltu`, `bgeu`; le pseudoistruzioni come `bgt`, `ble`, `beqz`, `bnez` si ottengono scambiando gli operandi. Per il salto incondizionato c'è la pseudoistruzione `j label`, equivalente a `jal x0, label`.

Il salto usa un indirizzamento PC-relativo: l'indirizzo di destinazione è il PC dell'istruzione di branch più un offset di 12 bit, shiftato a sinistra di 1 bit ed esteso con segno. Il range risultante è [-4096, +4094], in multipli di 2.

Quando si traduce un costrutto del C, la regola pratica è che per `if (cond) A else B` si salta quando la condizione è **falsa**: il codice del ramo "vero" segue subito il branch, mentre il ramo "falso" si raggiunge con il salto. Lo stesso criterio vale per i cicli: un `while` controlla la condizione in testa e salta alla fine se è falsa, un `do-while` esegue il corpo e poi salta all'indietro se la condizione è vera.

Schema while: `loop: B(cond falsa) end; corpo; j loop; end:`. Schema do-while: corpo, poi `B(cond vera) loop`.

### Esempi dal Lab 3 (x -> t0, y -> t1)
```
# x = x - y; if (x < 0) x = 0; y = y - 1
sub  t0, t0, t1
bge  t0, zero, end1     # se NON (x<0) salta
li   t0, 0
end1: addi t1, t1, -1

# x = (x-2)+y; if (x<y) x = x+1; else y = y+1
addi t0, t0, -2
add  t0, t0, t1
bge  t0, t1, else2
addi t0, t0, 1
j    end2
else2: addi t1, t1, 1
end2:
```

## Procedure
Una procedura è l'analogo assembly di una funzione, ed è per sua natura chiamabile da punti diversi del programma. Per chiamarla correttamente occorre seguire sei passi:
1. mettere i parametri in un posto accessibile;
2. trasferire il controllo alla procedura;
3. acquisire le risorse necessarie (stack);
4. eseguire il compito;
5. mettere il risultato in un posto accessibile;
6. tornare al punto di chiamata.

In RISC-V parametri e valori di ritorno passano per `a0-a7` (x10-x17), mentre l'indirizzo di ritorno sta in `ra` (x1). L'istruzione `jal ra, label` (jump and link) salta alla procedura e salva PC+4 in `ra`; `jal label` ne è la forma abbreviata. Il ritorno si fa con `jalr zero, 0(ra)`, che è la pseudoistruzione `jr ra`, a sua volta equivalente a `ret`. Si usa `jr ra` e non un semplice `j` perché la procedura può essere chiamata da punti diversi, anche da altre procedure, e deve sapere dove tornare.

Esempio della slide: `_start: li a0,1; li a1,2; jal sum; add s1,a0,zero ...  sum: add a0,a0,a1; jr ra`. Prima della jal `ra` vale 0; dopo la jal `ra` = PC+4, cioè l'indirizzo dell'istruzione successiva alla jal; dopo `jr` il PC torna a `ra`.

## Stack e convenzioni di chiamata
Gli otto registri argomento e i pochi registri disponibili non bastano sempre: una procedura ha bisogno di uno spazio dove salvare i valori che non può tenere nei registri. Questo spazio è lo **stack**, che sta in memoria ed è puntato da `sp`. Lo stack **cresce verso indirizzi bassi**: il push si fa con `addi sp,sp,-N` seguito da `sw`, il pop con `lw` seguito da `addi sp,sp,N`.

Il trasferimento di variabili dai registri alla memoria si chiama **register spilling**. È costoso, perché i registri sono più veloci della memoria, e si fa solo quando serve. La porzione di stack associata a una procedura è il **frame** (record di attivazione): contiene i registri salvati, le variabili locali e gli argomenti extra. Il registro `fp` (x8) viene inizializzato a `sp` all'ingresso e `sp` è ripristinato a fine procedura; se non ci sono variabili locali il compilatore evita di impostare il frame.

Per evitare spilling inutile esiste una convenzione che divide i registri in **preservati** tra le chiamate (`s0-s11`, `sp`, `ra` ecc. [libro]) e **non preservati** (`t0-t6`, `a0-a7`). L'idea è che chi chiama sa quali valori gli servono dopo, e chi è chiamato sa quali registri userà: ciascuno si fa carico della propria parte. La ripartizione dei compiti è questa:
- **chiamante**: mette sempre i parametri in a0-a7; se gli servono dopo la chiamata, salva sullo stack i registri **t*** e **a*** (non preservati) e `ra`;
- **chiamato**: alloca il frame (con lo stesso numero di byte nell'`addi sp` d'ingresso e d'uscita), salva i registri **s*** che usa (e `ra` se chiama altre procedure) e li ripristina prima di `ret`;
- il valore di ritorno va in a0 (a1).

Esempio della slide `multiply` (acc=s1, i=t0): `addi sp,sp,-4; sw s1,0(sp); ...; lw s1,0(sp); addi sp,sp,4; jr ra`. Il chiamante aveva s1=10 e t0=13: dopo la chiamata s1 è preservato, mentre **t0 è sovrascritto** (=4), come atteso perché è un temporaneo.

Le procedure annidate richiedono un'attenzione in più. Se `multiply` chiama `sum`, il secondo `jal` sovrascrive `ra`: `multiply` deve quindi salvare `ra` sullo stack prima di chiamare `sum` e ripristinarlo prima di `ret`. Lo stesso vale per `a0-a7` se servono dopo la chiamata.

### Template di procedura non foglia
```
f:
  addi sp, sp, -8
  sw   ra, 0(sp)
  sw   s1, 4(sp)       # solo gli s* usati
  ...                  # corpo, con jal g
  lw   s1, 4(sp)
  lw   ra, 0(sp)
  addi sp, sp, 8
  ret
```

## Ricorsione (snippet `fib` dalla Lezione 9)
Una procedura ricorsiva è semplicemente una procedura non foglia che chiama se stessa, per cui non servono regole nuove: ogni chiamata ha il proprio frame, e quel che conta è salvare ciò che servirà dopo il ritorno della chiamata interna.
```
fib:  beq  a0, zero, fib_end     # fib(0) = 0
      addi t0, zero, 1
      beq  a0, t0, fib_end       # fib(1) = 1
      addi sp, sp, -8            # caso generale n>1
      sw   ra, 0(sp)
      sw   a0, 4(sp)             # salva n
      addi a0, a0, -1
      jal  fib                   # fib(n-1)
      lw   t0, 4(sp)             # t0 = n
      sw   a0, 4(sp)             # salva fib(n-1)
      addi a0, t0, -2
      jal  fib                   # fib(n-2)
      lw   t0, 4(sp)             # fib(n-1)
      add  a0, a0, t0
      lw   ra, 0(sp)
      addi sp, sp, 8
fib_end: ret
```
L'idea è che i casi base non toccano lo stack, mentre il caso generale salva `ra` e il dato che servirà dopo la chiamata. Il numero di byte allocati e rilasciati deve coincidere. [Lab 7 non disponibile: eventuali esercizi su fattoriale/fibonacci ricorsivi seguono lo stesso schema.]

## Stringhe (Lab 5)
Le stringhe sono sequenze di caratteri ASCII, un byte per carattere; in C la stringa termina con il byte 0 ('\0'). Per leggere un carattere si usa `lbu` (senza estensione del segno) e per scriverlo `sb`. Nel segmento `.data` si dichiarano con la direttiva `.string "testo"` (o `.asciz`). Gli esercizi del lab (vedi file 11) sono charAt, strlen, digit ('0'-'9' = 48-57), strcmp, strchridx e hash (djb2: `hash = hash*33 + c`, con 5381 iniziale).

## Cose da saper fare all'esame
- Tradurre if/else, while, for, do-while, cicli annidati in RISC-V; contare le istruzioni eseguite (static vs dynamic count).
- Scrivere procedure (foglia e non foglia) rispettando le convenzioni; disegnare lo stack durante una chiamata annidata/ricorsiva.
- Spiegare cosa succede a ra, sp, s*, t* dopo una chiamata e perché serve salvare ra.
- Tradurre `strlen`-like con puntatori e lbu/sb.
- Calcolare l'offset di un branch / l'indirizzo di destinazione.

## Dubbi
- Codifica di jal (formato UJ) e jalr non presente nelle slide estratte [libro]. Dalla Lezione 3: `jal` usa indirizzamento relativo al PC (es. offset 252 = 0x400100-0x400004).
- Lab 7 (Ricorsione): non presente nella cartella; uso lo schema `fib` della Lez. 9 [DA VERIFICARE con le slide originali].
