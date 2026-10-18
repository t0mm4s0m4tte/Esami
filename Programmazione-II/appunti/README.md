# Programmazione II - Appunti d'esame (6 CFU, UniTO Informatica)

Esonero 2027-02-08, scritto 2027-02-09. Docente di teoria: C. Baroglio. Linguaggio: **C**.
Fonti: cartella Drive "Programmazione II" > sottocartella "PDF " (19 PDF di slide, a.a. 2023-24/2024-25) + doc "Argomenti dei Corsi - I Anno" (contiene solo le date di lezione, nessun titolo).

Gli appunti sono scritti in prosa discorsiva, come una dispensa: ogni sezione spiega prima il concetto, il perché e i collegamenti con gli altri argomenti, e poi riporta codice, tabelle ed esempi svolti. Gli elenchi puntati compaiono solo per vere enumerazioni (casi, passi, checklist d'esame).

## Indice
| File | Slide di origine | Contenuto |
|---|---|---|
| [01-organizzazione-software-compilazione.md](01-organizzazione-software-compilazione.md) | 0, 1 | Modalità d'esame, riuso, .c/.h, #include, fasi gcc, cartelle e pathname |
| [02-correttezza-e-algoritmi-su-array.md](02-correttezza-e-algoritmi-su-array.md) | 2 | P_IN/P_OUT, correttezza parziale, terminazione, ricerca binaria, insertion sort |
| [03-struct-puntatori-union.md](03-struct-puntatori-union.md) | 3, 10 | struct, padding, malloc di struct, passaggio parametri, union, tagged union |
| [04-liste-linkate-e-ricorsione.md](04-liste-linkate-e-ricorsione.md) | 4 (x2), 5, 6 | liste, testa per valore/riferimento, ricorsione testa/coda, liste ordinate |
| [05-adt-stack-queue-set.md](05-adt-stack-queue-set.md) | 7 (pt1-3) | ADT, stack, queue (array circolare + lista), set/multiset, variadiche |
| [06-alberi-binari.md](06-alberi-binari.md) | 8 (pt1-3) | terminologia, BST, add/add_ord, rimozione, DFS pre/in/post, BFS |
| [07-puntatori-a-funzione-e-nodi-generici.md](07-puntatori-a-funzione-e-nodi-generici.md) | 9, 8 pt3 | puntatori a funzione, array di handler, nodi void* generici |
| [08-lettura-scrittura-file.md](08-lettura-scrittura-file.md) | 11 | fopen/fscanf/fprintf/feof/fclose |
| [09-esercizi-ed-esami-svolti.md](09-esercizi-ed-esami-svolti.md) | Moodle Prog2-B e Prog2-LAB | debug e gdb, laboratorio sugli alberi (con gli errori di `removeTree`), `list-rec`, tipo opaco, set ordinato, canile completato, esempi di lezione |

## Ordine di studio consigliato
Si consiglia di procedere da 01 a 08 nell'ordine. Le liste (04) sono il cuore del corso: stack, queue, set e alberi riusano gli stessi pattern di puntatori e ricorsione, quindi conviene padroneggiarle prima di passare agli ADT (05) e agli alberi (06); i puntatori a funzione (07) estendono poi l'idea di riuso agli stessi alberi, e i file (08) chiudono il quadro.

## Checklist rapida "so scrivere a mano"
- [ ] Prototipi/header e riga `gcc` per progetto multi-file
- [ ] P_IN / P_OUT + terminazione + invariante di una funzione
- [ ] Ricerca binaria, insertion sort
- [ ] Lista: crea_nodo, ins/del in testa (valore e riferimento), ins_ord, somma, stampa/stampainv, elimina_lista
- [ ] Stack e queue (array e lista), queue circolare con %, set senza duplicati
- [ ] Albero: add_ord, stampe pre/in/post, rimuovi_tutto, BFS con coda, DFS con stack
- [ ] Puntatore a funzione + nodo generico void*
- [ ] File: guscio fopen/fclose, lettura/scrittura formattata

## Lacune e avvertenze
Il materiale è composto solo da **slide** (testo estratto da PDF, a volte frammentato, con figure perse): niente libro, niente esercizi d'esame passati, niente soluzioni di laboratorio. Nessuna ricerca web è stata usata: tutto proviene dalle slide, tranne le poche integrazioni marcate esplicitamente (ricerca_bin implementata dallo pseudocodice, `insertion`, `va_end`, `free` in togli_elem). Il doc "Argomenti dei Corsi" per Programmazione II elenca solo date (21/02 ... 16/05): non permette di sapere cosa è stato fatto in quali lezioni, e il programma 2026-27 potrebbe differire dalle slide 2023-25 [DA VERIFICARE].

Alcune cose sono invece sistematicamente assenti o inaffidabili:
- Argomenti **annunciati ma assenti** nelle slide: bubble/selection sort, insertion sort `insertion()` completo, cancellazione/inserzione in coda e in posizione generica (lasciate come esercizio), liste circolari/doppiamente linkate (solo nominate), rimozione di un nodo singolo da BST, fine della simulazione BFS.
- Le slide contengono diversi refusi nel codice (segnalati nei file con [DA VERIFICARE]): queue circolare (init/succ), dequeue su lista (num, tail), DFS con stack (condizioni incrociate), typedef struct mancanti, `pop` con use-after-free potenziale.
- Parte di **laboratorio**: dal Moodle (Prog2-B e Prog2-LAB) sono stati integrati nel file 09 il codice dei laboratori su alberi e liste, i quattro programmi di debug con gdb, le slide sul tipo opaco, il canile e gli esempi di lezione, con soluzioni e correzioni verificate con gcc. **Non ci sono esami passati con data e appello** (né simulazioni): il file 09 raccoglie esercizi plausibili ma non si può dire quali siano usciti davvero. Restano fuori i quiz Moodle (non scaricati), i testi e i test dei dieci progetti di laboratorio (c'è solo lo scheletro del progetto 5, senza header) e le 12 trascrizioni di lezione, scorse solo per le informazioni sull'esame e non lette per intero.
