# 05 - Logica digitale: circuiti combinatori e ALU

Fonte: Lezione 04 (Circuiti Combinatori), Lab 8 (circuiti logici combinatori, CircuitVerse).

## Mappa

- [Circuiti digitali](#circuiti-digitali)
- [Decoder](#decoder)
- [Multiplexer (selettore)](#multiplexer-selettore)
- [Addizionatori](#addizionatori)
- [ALU a 1 bit (bit slice)](#alu-a-1-bit-bit-slice)
- [Esercizi tipo](#esercizi-tipo)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## Circuiti digitali
Un circuito digitale lavora con due soli valori logici, 0 e 1, rappresentati da intervalli di tensione (per esempio 0-1 V e 2-5 V), e trasforma ingressi x1..xn in uscite z1..zm. Si distinguono i circuiti **combinatori**, in cui l'uscita è funzione soltanto degli ingressi, e i **sequenziali**, in cui dipende anche da uno stato (file 06).

I mattoni di base sono le porte primitive NOT, AND, OR, NAND, NOR, XOR, realizzate con transistor usati come interruttori. Nei disegni, l'incrocio di due linee senza punto significa che non c'è contatto. Le slide descrivono i circuiti anche in Verilog: `assign X = ~A;` `~(A | B)` `A & B` `A ^ B`.

### Algebra di Boole (identità utili)
L'algebra di Boole fornisce le regole per manipolare le espressioni e semplificare i circuiti:
- **Identity**: A·1=A, A+0=A;
- **Null**: A·0=0, A+1=1;
- **Idempotenza**: A·A=A, A+A=A;
- **Inverso**: A·Ā=0, A+Ā=1;
- commutativa, associativa, distributiva (anche A+BC=(A+B)(A+C));
- **assorbimento**: A(A+B)=A, A+AB=A;
- **De Morgan**: ¬(AB)=Ā+B̄, ¬(A+B)=Ā·B̄.

### Forme canoniche e sintesi
Qualunque funzione data da una tabella di verità si può scrivere in due forme duali: la **FND** (somma di prodotti, fatta di mintermini) e la **FNC** (prodotto di somme, fatta di maxtermini). Dalla FND si ricava direttamente un circuito: un AND per ogni riga della tabella con uscita 1, e un OR che le raccoglie tutte. I passi sono:
1. scrivere la tabella di verità;
2. mettere gli invertitori per i complementi;
3. usare una porta AND per ogni riga con uscita 1;
4. collegare gli ingressi;
5. fare l'OR di tutti gli AND.

Un esempio tipico è la funzione di maggioranza a 3 ingressi. Quando un ingresso non influenza l'uscita si parla di **don't care** (X): è un'informazione sfruttata per semplificare, per esempio nel controllo della ALU (file 07).

## Decoder
Il decoder ha n ingressi e 2^n uscite, e per ogni combinazione degli ingressi esattamente una uscita è asserita (a 1). Si usa per abilitare un componente, per selezionare un banco di memoria o per scrivere un solo registro del register file. In Verilog: `assign out[k] = (in == k);`

## Multiplexer (selettore)
Il multiplexer è il complemento del decoder: ha 2^n ingressi dati, n linee di controllo e una sola uscita, che coincide con l'ingresso selezionato. Il mux 2:1 si scrive `C = (~S & A) | (S & B)`, ovvero `C = S ? B : A`. Si può realizzare con un decoder, una porta AND tra ciascun dato e la rispettiva uscita del decoder e un OR finale. Un mux a 32 bit non è altro che 32 mux a 1 bit con la stessa linea di controllo.

## Addizionatori
Il primo componente aritmetico è l'**half adder**, che somma due bit: Sum = a XOR b e Carry = a AND b. Non basta però per sommare numeri a più bit, perché manca l'ingresso del riporto. Il **full adder** (a, b, CarryIn) risolve il problema: Sum = a XOR b XOR CIn e CarryOut = (a·b) + (CIn·(a XOR b)); si realizza con due half adder più un OR dei due carry. Collegando in cascata più full adder, il CarryOut dell'i-esimo bit diventa il CarryIn dell'(i+1)-esimo: è il ripple carry.

## ALU a 1 bit (bit slice)
La ALU si costruisce per "fette" da 1 bit, replicate per quanti bit servono. La fetta base esegue AND, OR e somma: le linee `Operation`, a 2 bit, comandano un mux a 4 ingressi che sceglie tra 00 AND, 01 OR, 10 SUM, 11 LESS (vedi sotto). Gli ingressi sono a, b, CarryIn e le uscite Result e CarryOut.

Nel Lab 8 (ALU_1bit_v1, v2) la ALU è estesa con altre funzioni, ottenute con poche aggiunte hardware. Per la sottrazione, a - b = a + b̄ + 1: un mux sceglie tra b e b̄ (**Binvert**) e il CarryIn del bit 0 va portato a 1. Le due condizioni si comandano con un'unica linea **Bnegate** (Bnegate = Binvert = CarryIn0). Analogamente **Ainvert** sceglie tra a e ā, e permette il NOR: NOR(a,b) = ā AND b̄, quindi Ainvert=1, Binvert=1 (Bnegate=1), Operation=00 (AND).

Per **slt** (set on less than) si osserva che rs1 < rs2 se (a - b) < 0, cioè se il bit di segno della differenza è 1. Il risultato ha tutti i bit a 0 tranne il bit 0, che vale il segno della differenza. Per questo in ogni slice c'è l'ingresso **Less**: vale 0 per i bit 1..31, mentre per il bit 0 prende l'uscita **Set** del bit più significativo (il bit di segno della somma). Si usa Operation=11 e Bnegate=1.

L'**Overflow** (in complemento a 2) si verifica quando la somma di due operandi con segno uguale dà un risultato di segno opposto; equivale a dire che CarryIn e CarryOut del bit MSB sono discordi. Verilog della slide: `overflow = (a_int == b_int) && (sum != a_int)`. L'uscita **Zero** vale 1 se tutti i bit del risultato sono 0 (è un NOR a 32 ingressi) e serve per `beq`, che controlla se a - b == 0.

### Ingressi di controllo ALU (4 bit: Ainvert, Bnegate, Operation[1:0])
| Linee (slide: 4 bit) | Funzione |
|---|---|
| 0000 | AND |
| 0001 | OR |
| 0010 | add |
| 0110 | subtract |
| 0111 | set less than |
| 1100 | NOR |

(Con codifica Ainvert|Bnegate|Op: add = 0 0 10; sub = 0 1 10; slt = 0 1 11; NOR = 1 1 00.)

### Limite di slt (Lab 8, Esercizio 7 "sanity check")
Il metodo dello slt basato sul bit di segno della differenza **sbaglia quando la sottrazione va in overflow** (es. A=3, B=-5 o A=-5, B=5 in aritmetica ristretta). Il lab richiede di correggere il problema usando l'overflow: Set = segno XOR overflow.

## Esercizi tipo
1. Costruire full adder a partire da due half adder.
2. Disegnare/descrivere ALU a 1 bit con AND/OR/ADD e poi con Ainvert/Binvert/Less.
3. ALU a 4 bit in cascata con uscite Zero e Overflow.
4. Dato (A,B) a 4 bit stabilire risultato e flag. Es. slide Lab 1: 0x80000000 + 0xD0000000 = 0x50000000 con overflow (neg+neg=pos); 0x80000000 - 0xD0000000 = 0xB0000000 senza overflow.
5. Ricavare la tabella di verità e la FND di una funzione (es. maggioranza).

## Esercizi svolti collegati

Il progetto CircuitVerse del Moodle ([file 13 §4](13-esercizi-ed-esami-svolti.md#4-il-progetto-circuitverse-dei-lab-8-10)) contiene con i nomi del Lab 8 i circuiti `half_adder`, `full_adder`, `ALU_1bit_v0`, `ALU_1bit_v1`, `ALU_1bit_v2` e `ALU_4bit`. L'elenco è stato letto ma i collegamenti interni non sono stati verificati; non ci sono esercizi con testo e soluzione oltre a quelli del [file 11](11-laboratorio-esercizi-svolti.md).

## Cose da saper fare all'esame
- Disegnare/scrivere decoder, mux, half/full adder, ALU a 1 bit con tutti i segnali di controllo.
- Spiegare come si ottiene sottrazione, NOR, slt, beq (Zero) nella ALU.
- Individuare l'overflow in somma/sottrazione (regola dei segni o carry in/out del MSB).
- Passare tra tabella di verità, espressione booleana (FND/FNC) e circuito; usare De Morgan.

## Dubbi
- Nel Lab 8 i nomi di moduli e porte (case sensitive) sono vincolati dall'autocorrezione Moodle: `half_adder(Carry, Sum, A, B)`, `full_adder(Sum, CarryOut, CarryIn, a, b)`, `ALU_1bit_v0..v2`, `ALU_4bit(Overflow, Result, Zero, ALU_operation, b, a)`.
- Soluzione corretta di slt con overflow: tracciata sopra come Set = segno XOR overflow [mia deduzione dal libro; DA VERIFICARE].
