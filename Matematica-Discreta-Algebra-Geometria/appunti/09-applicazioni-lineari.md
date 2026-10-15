# 09 - Applicazioni lineari (Algebra e Geometria)

**Fonte**: Buzano-Radeschi, Lezioni 14-16 (`Lezioni_14-16.pdf`), con esercizi 14.15, 15.14, 16.3 e esempi 15.8-16.10. Alcuni segni persi nell'estrazione sono stati ricostruiti controllando i risultati (indicato dove).

## Mappa
- Definizione, esempi e non esempi, L_A
- Nucleo e immagine, iniettività/suriettività, **teorema della dimensione**
- Isomorfismi
- Matrice associata, cambiamento di base, composizione, endomorfismi, similitudine

---

## 1. Definizione

Un'applicazione lineare è una funzione fra spazi vettoriali che rispetta la struttura, cioè somma e prodotto per scalare. Formalmente f: V→W (con V, W sullo stesso campo K) è **lineare** se (i) f(v+w)=f(v)+f(w) e (ii) f(λv)=λf(v). Ne seguono subito f(0)=0 (quindi se T(0)≠0 la mappa non è lineare) e f(Σλ_iv_i)=Σλ_if(v_i): una lineare è completamente determinata dai valori che assume su una base, ed è questo che permette di descriverla con una matrice.

Fra gli **esempi di lineari** ci sono:
- T(a,b)=(2a+b, a+3b), che è L_A con A=[[2,1],[1,3]];
- l'applicazione nulla e l'identità;
- la mappa **L_A: Kⁿ→Kᵐ, x↦Ax** per A di taglia m×n;
- la traccia Tr: M(n,K)→K;
- la derivata D: R_n[x]→R_{n-1}[x];
- la valutazione p↦(p(2),p(-2)).

Non sono lineari T(a,b)=(a+2, b-1) (perché T(0)≠0) e T(a,b)=(a², a+b): con v=(2,1), w=(2,0) si ha T(v+w)=(16,5) ≠ T(v)+T(w)=(8,5). Il test rapido: se le componenti sono **polinomi omogenei di grado 1** nelle variabili la mappa è lineare; termini noti, quadrati o prodotti la rendono non lineare.

## 2. Nucleo e immagine

Due sottoinsiemi misurano quanto una lineare perde e quanto raggiunge: il **nucleo Ker f** = {v∈V | f(v)=0} ⊆ V e l'**immagine Im f** = {f(v)} ⊆ W. Entrambi sono sottospazi (Prop 14.11). Il loro legame con iniettività e suriettività è diretto: **f è iniettiva ⇔ Ker f={0}**, e f è suriettiva ⇔ Im f=W (Prop 14.12); per il primo punto basta osservare che f(v)=f(v') equivale a v-v'∈Ker. Inoltre, se v1..vn generano V allora f(v1)..f(vn) generano Im f. Per L_A questo si traduce in **Im L_A = Span(colonne di A)**, quindi dim Im L_A = rk A, e in **Ker L_A = {x | Ax=0} = S₀**, lo spazio delle soluzioni del sistema omogeneo (file 08).

Il risultato centrale è il **teorema della dimensione** (14.13): se dim V = n è finita, allora **dim Ker f + dim Im f = n**. Intuitivamente, ciò che il nucleo "schiaccia" e ciò che l'immagine "conserva" si spartiscono le n dimensioni di partenza. Applicato a L_A dà dim S₀ = n - rk A, cioè proprio il contenuto di Rouché-Capelli. Il Cor 14.14 ne trae le conseguenze:
- dim Im f ≤ dim V;
- f è iniettiva ⇔ dim Im f = dim V;
- f è suriettiva ⇔ dim Im f = dim W.

Perciò se dim V > dim W la mappa non è mai iniettiva (per esempio f: R⁸→R⁴ ha dim Ker ≥ 4, e f: R⁶→R³ ha dim Ker ≥ 3 e non è isomorfismo), se dim V < dim W non è mai suriettiva, e se dim V = dim W le tre condizioni iniettiva, suriettiva, isomorfismo sono equivalenti.

La procedura di calcolo, da usare sempre, è la seguente.
1. Scrivere la matrice A di f rispetto a basi (di solito canoniche): la colonna j è l'immagine del j-esimo vettore di base.
2. **Ker f**: risolvere Ax=0 (Gauss-Jordan); una base del nucleo ha un vettore per ogni parametro libero.
3. **Im f**: prendere le colonne di A corrispondenti ai **pivot** (colonne indipendenti): sono le coordinate di una base di Im f.
4. Controllo: dim Ker + dim Im = n.

**Esempi svolti (Es. 14.15)**, correggendo il testo estratto (f1: R³→R², f1(x,y,z)=(x+y+z, 2x+3y+4z)):
- f1: A=[[1,1,1],[2,3,4]]; Ker: x+y+z=0, y+2z=0 ⇒ (z,-2z,z) ⇒ base (1,-2,1), dim 1; Im: rk 2 ⇒ Im=R² (suriettiva); 1+2=3 ✓.
- f2: R_2[x]→R, f2(p)=p(1)+p(-1): su a+bx+cx² vale 2a+2c ⇒ Ker={a=-c}: base {x, 1-x²}, dim 2; Im=R (dim 1); 2+1=3 ✓.
- f3: M₂(R)→M₂(R), f3(A)=A-ᵗA: Ker = matrici simmetriche (dim 3), Im = antisimmetriche (dim 1, generata da [[0,1],[-1,0]]); 3+1=4 ✓.

## 3. Isomorfismi

Un **isomorfismo** è una lineare biettiva, e la sua inversa è automaticamente lineare (Prop 15.2): due spazi isomorfi sono "lo stesso spazio con nomi diversi". Per le Prop 15.3-15.4, f iniettiva implica dim V≤dim W e f suriettiva implica dim V≥dim W, da cui **V≅W ⇔ dim V=dim W**. Il Cor 15.5 dice che ogni spazio di dimensione n su K è isomorfo a Kⁿ tramite l'applicazione delle **coordinate** (che però dipende dalla scelta della base): è la giustificazione teorica del fatto che in dimensione finita si può sempre lavorare con colonne di numeri.

## 4. Matrice associata

Fissate una base B={v1..vn} di V e una base C={w1..wm} di W, ogni lineare f si codifica in una matrice. Se f(v_j)=Σ_i a_ij w_i, la **matrice associata** è A=[f]_B^C=(a_ij) (m×n): **la colonna j contiene le coordinate di f(v_j) rispetto a C** (B, la base di partenza, in alto; C, la base di arrivo, in basso). La **Prop 15.10** dice che **[f(v)]_C = [f]_B^C · [v]_B**: in coordinate, f diventa semplicemente L_A. Rispetto alle basi canoniche [L_A] è A stessa, [id]_B^B = I_n, e le applicazioni lineari V→W formano uno spazio vettoriale isomorfo a M(m,n) (Teo 15.13).

**Esempio svolto** (15.8): f: R_2[x]→R², f(p)=(p(2),p(-2)), basi B=(1,x,x²), C canonica: f(1)=(1,1), f(x)=(2,-2), f(x²)=(4,4) ⇒ **[f]=[[1,2,4],[1,-2,4]]**. Immagine di p=3x²+5x+1 (coordinate (1,5,3)): [[1,2,4],[1,-2,4]]·(1,5,3) = (1+10+12, 1-10+12) = **(23,3)** = (p(2),p(-2)) ✓.
Con base di arrivo C'={(1,-1),(0,1)} (segni ricostruiti dal risultato): f(1)=(1,1)=1(1,-1)+2(0,1), f(x)=(2,-2)=2(1,-1)+0(0,1), f(x²)=(4,4)=4(1,-1)+8(0,1) ⇒ [f]_B^{C'}=[[1,2,4],[2,0,8]].

## 5. Cambiamento di base

Cambiare base significa riscrivere le stesse coordinate in un altro sistema di riferimento, e lo si fa con una matrice. La **matrice di cambiamento di base** da B a C è M=[id]_B^C, la cui colonna j contiene le coordinate del vettore v_j della vecchia base B rispetto a C; essa soddisfa [v]_C = M [v]_B, e l'inversa M⁻¹=[id]_C^B ha per colonne le coordinate dei vettori di C rispetto a B.

**Esempio 16.3**: A=base canonica di R³, B={w1=(1,2,3), w2=(0,2,1), w3=(0,1,1)} (colonne): [id]_B^A = (w1|w2|w3) = [[1,0,0],[2,2,1],[3,1,1]]; la matrice richiesta [id]_A^B (da canonica a B) è la sua inversa: **[[1,0,0],[1,1,-1],[-4,-1,2]]** (verificata).

Sulla **composizione**, f∘g è lineare, L_A∘L_B = L_{AB} e **[g∘f]_B^D = [g]_C^D [f]_B^C**: il prodotto di matrici riflette esattamente la composizione di funzioni, ed è questa la vera ragione per cui il prodotto riga per colonna ha quella forma. Ne segue che f è un isomorfismo ⇔ [f] è invertibile, e allora [f⁻¹]=[f]⁻¹. Quando si cambiano contemporaneamente le basi di partenza e di arrivo vale il Cor 16.8: [f]_{B2}^{C2} = [id_W]_{C1}^{C2} · [f]_{B1}^{C1} · [id_V]_{B2}^{B1}.

## 6. Endomorfismi e similitudine

Un endomorfismo è una lineare f: V→V; con una sola base B si scrive A=[f]_B^B e vale [f∘g]=[f][g]. Se M=[id]_B^C, allora **[f]_B^B = M⁻¹ [f]_C^C M**. Due matrici A,B ∈M(n) si dicono **simili** (A~B) se esiste M invertibile con A=M⁻¹BM: rappresentano lo stesso endomorfismo in basi diverse. La similitudine è una relazione di equivalenza (riflessiva con M=I, simmetrica, transitiva usando (NM)⁻¹). Se A~B allora **rk A=rk B e det A=det B** (per Binet: det M⁻¹ det B det M), A è invertibile ⇔ B lo è, e hanno lo stesso polinomio caratteristico (file 10). Trovare una base in cui la matrice di f è la più semplice possibile (diagonale) è proprio il problema della diagonalizzazione.

**Esempio 16.10** (segni ricostruiti): f(x,y)=(x+y,-y) su R²; [f]_C^C=[[1,1],[0,-1]]; B={(1,0),(-1,2)}, M=[id]_B^C=[[1,-1],[0,2]], M⁻¹=[[1,1/2],[0,1/2]] ⇒ **[f]_B^B=M⁻¹[f]M=diag(1,-1)**: f fissa il primo vettore e ribalta il secondo (f(-1,2)=(1,-2)=-(−1,2) ✓).

---

## Cose da saper fare all'esame
- Stabilire se una mappa è lineare; scrivere la matrice (basi canoniche o no); trovare base di Ker e di Im; verificare il teorema della dimensione; dire se è iniettiva/suriettiva/isomorfismo.
- Scrivere [f]_B^C con basi qualsiasi (calcolare le coordinate delle immagini con sistemi lineari); calcolare f(v) tramite [f(v)]_C=[f]·[v]_B.
- Calcolare matrici di cambiamento di base e usarle per cambiare la matrice di un endomorfismo.
- Dimostrare: Ker e Im sottospazi; iniettiva ⇔ Ker=0; inversa lineare; composizione ↔ prodotto; similitudine è equivalenza; matrici simili hanno stesso det e rango.
- Quiz tipici: f: R³→R², f(x,y,z)=(x+y,x+y) ⇒ non iniettiva, non suriettiva (Im=retta); (x+4y, x-2y) ⇒ suriettiva (rk 2), Ker generato da (0,0,1).

## Dubbi
- Il teorema della dimensione è enunciato senza dimostrazione nelle lezioni estratte (14.13): idea standard = completare una base di Ker a base di V e mostrare che le immagini dei vettori aggiunti sono base di Im. [DA VERIFICARE se va dimostrato.]
- Es. 15.14: matrice di f: C²→C³ rispetto a basi non canoniche: l'enunciato di f ha segni persi, risultato nel PDF [[1/2,5/2],[3/2,-1/2],[-1/2,-1/2]] non verificato qui.
