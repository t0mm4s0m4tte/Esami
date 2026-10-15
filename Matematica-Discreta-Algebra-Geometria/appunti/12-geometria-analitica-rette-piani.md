# 12 - Geometria analitica: isometrie, prodotto vettoriale, rette e piani (Algebra e Geometria)

**Fonte**: Buzano-Radeschi, Lezioni 22-24 (`Lezioni_22-24.pdf`: Lo Spazio Euclideo I-II-III), quiz dei compiti 2023-06 e 2023-07. Sempre prodotto scalare euclideo su Rⁿ. Il testo estratto ha segni e entrate persi in alcuni esempi: dove ho ricostruito è scritto "ricostruito"; i calcoli miei sono marcati [INT] e verificati al computer.

## Mappa
- Isometrie e matrici ortogonali; rotazioni e riflessioni del piano (22)
- Prodotto vettoriale in R³: definizione, proprietà, area (22-23)
- Forma cartesiana e parametrica; sottospazi affini, giacitura (23)
- Intersezioni e posizioni reciproche di rette e piani (23, [INT])
- Angoli e distanze: nel file 13

---

## 1. Isometrie e matrici ortogonali

Il capitolo sullo spazio euclideo comincia chiedendosi quali trasformazioni lineari conservano la geometria, cioè lunghezze e angoli. Una **isometria** è un isomorfismo T: V→W fra spazi con prodotto scalare tale che ⟨v,w⟩=⟨T(v),T(w)⟩ per ogni v,w (Def 22.5); basta controllarlo sui vettori di una base (Prop 22.6, perché per bilinearità i prodotti ⟨v,w⟩ dipendono solo dai ⟨v_i,v_j⟩). Se i prodotti sono definiti positivi, essere isometria equivale a conservare la norma e anche a conservare la distanza (Prop 22.7). In termini di matrici, se S e S' sono le matrici dei prodotti e A=[T], allora T è isometria ⇔ **S=ᵗA S' A** (Prop 22.8): è la stessa formula di congruenza vista nel file 11, perché la colonna i di A contiene le coordinate di T(v_i).

Il caso che interessa è Rⁿ euclideo con S=S'=I: L_A è un'isometria ⇔ **ᵗA·A=I** (Cor 22.9), cioè A è una **matrice ortogonale** (Def 22.10). Dire ᵗAA=I vuol dire che le colonne di A formano una base ortonormale, e che A⁻¹=ᵗA (un'inversa gratis, che ritroveremo nel teorema spettrale, file 14). Dalla relazione segue (ᵗAA=I e Binet) det A=±1.

Nel piano le matrici ortogonali 2×2 si classificano subito (Prop 22.11): la prima colonna è un vettore unitario (cosθ, sinθ) e la seconda deve essere ortogonale e unitaria, quindi può essere solo ±(−sinθ, cosθ). Si ottengono due famiglie:
- le **rotazioni** Rot_θ=[[cosθ, −sinθ],[sinθ, cosθ]]: rotazione antioraria di angolo θ attorno all'origine, det=+1;
- le **riflessioni** Rif_θ=[[cosθ, sinθ],[sinθ, −cosθ]]: riflessione ortogonale rispetto alla retta per l'origine che forma l'angolo θ/2 con l'asse x, det=−1.

I segni delle matrici nell'estrazione sono persi: la forma qui riportata è quella standard, coerente con le proposizioni 22.2 e 22.4 [ricostruito]. La dimostrazione che Rot_θ ruota davvero passa per le coordinate polari: (ρcosφ, ρsinφ) va in (ρcos(θ+φ), ρsin(θ+φ)) grazie alle formule di addizione. Corollario 22.12: **le isometrie di R² sono rotazioni e riflessioni**. Una riflessione si legge bene in una base adattata: se v1∈r e v2⊥r, nella base (v1,v2) la matrice è diag(1,−1).

In R³ (Teo 22.13, senza dimostrazione) ogni isometria è una rotazione attorno a un asse r oppure un'antirotazione, cioè una rotazione composta con la riflessione rispetto al piano r^⊥.

## 2. Prodotto vettoriale in R³

Per capire perché serve, pensate a come trovare un vettore ortogonale a due vettori dati: si può risolvere un sistema, ma il prodotto vettoriale dà la risposta in forma chiusa. Per v=(v1,v2,v3) e w=(w1,w2,w3) si pone

**v×w = (v2w3−v3w2, v3w1−v1w3, v1w2−v2w1)**

(Def 22.14). Per ricordarlo si usa il determinante formale con la prima colonna v, la seconda w e la terza e1,e2,e3: v×w = det[[v1,w1,e1],[v2,w2,e2],[v3,w3,e3]] (regola mnemonica, non è davvero una matrice) = det[[v2,w2],[v3,w3]]e1 − det[[v1,w1],[v3,w3]]e2 + det[[v1,w1],[v2,w2]]e3. Le tre componenti sono i minori 2×2 della matrice [v|w] (a meno del segno alterno sulla seconda).

Le proprietà da sapere, con la dimostrazione che il docente può chiedere:
- **v×w è ortogonale sia a v che a w** (Prop 22.15). Basta calcolare ⟨v×w,v⟩ = sviluppo di Laplace sull'ultima colonna del determinante con due colonne uguali (v,w,v) = 0; analogamente per w.
- **v×w=0 ⇔ v e w sono dipendenti** (Prop 22.16): il vettore è nullo ⇔ i tre minori 2×2 sono nulli ⇔ rk[v|w]≤1. Se v,w sono indipendenti, la terna (v,w,v×w) è una base di R³ (Cor 22.17).
- **‖v×w‖²+⟨v,w⟩² = ‖v‖²‖w‖²** (identità di Lagrange, Prop 23.1, si prova sviluppando i quadrati in coordinate). Da qui, con ⟨v,w⟩=‖v‖‖w‖cosθ, si ottiene **‖v×w‖ = ‖v‖‖w‖ sinθ = area del parallelogramma di lati v,w** (Cor 23.3 e Prop 23.2, base per altezza).
- La terna (v,w,v×w) è una **base positiva**: det[v|w|v×w] = d1²+d2²+d3² > 0 (Prop 23.4, sviluppo sull'ultima colonna). È la "regola della mano destra". Quindi v×w si può definire geometricamente come l'unico vettore ortogonale a v e w, di lunghezza pari all'area del parallelogramma e orientato positivamente.
- Il prodotto è **antisimmetrico** (v×w = −w×v) e **bilineare**, ma **non associativo**: (e1×e2)×e2 = e3×e2 = −e1 mentre e1×(e2×e2)=0. Nel testo estratto il segno è perso: con la definizione si ha e3×e2=−e1 [ricostruito].

**Esempio [INT]**: v=(1,2,−1), w=(2,0,3): v×w = (2·3−(−1)·0, (−1)·2−1·3, 1·0−2·2) = **(6,−5,−4)**. Controlli: ⟨v×w,v⟩=6−10+4=0 ✓, ⟨v×w,w⟩=12−12=0 ✓; ‖v×w‖²=77 e ‖v‖²‖w‖²−⟨v,w⟩²=6·13−1=77 ✓ (Lagrange); l'area del parallelogramma è √77.

## 3. Forma cartesiana e forma parametrica

Un sottospazio di Rⁿ può essere descritto in due modi, complementari come il "dove sono" e il "come lo costruisco". In **forma cartesiana** (implicita) è il luogo degli zeri di un sistema lineare omogeneo; in **forma parametrica** (esplicita) è generato da alcuni vettori. Per esempio il piano z=0 in R³ è cartesiano con l'equazione z=0 e parametrico come Span(e1,e2)={(t,s,0)}. La forma parametrica mostra subito com'è fatto un punto del sottospazio; la cartesiana permette di verificare con una sostituzione se un punto vi appartiene.

Lo stesso discorso vale per i sottospazi **affini**, che sono ciò che incontriamo in geometria (rette e piani non passanti per l'origine). Un sottospazio affine è S = x + W = {x+v | v∈W}, con W sottospazio vettoriale detto **giacitura** giac(S) e x un punto qualsiasi di S; dim S = dim W. Le soluzioni di un sistema lineare Ax=b sono vuote oppure un sottospazio affine, con giacitura il nucleo di A e, per Rouché-Capelli, dim = n−rk A quando rk A=rk(A|b). Due scritture x+W e x'+W' descrivono lo stesso insieme ⇔ W=W' e x−x'∈W (Prop 23.5): per esempio (1,0)+Span(1,1) e (0,−1)+Span(1,1) sono la stessa retta y=x−1 (Esempio 23.6).

In R³ i sottospazi affini sono punti, rette, piani e tutto lo spazio. Un **piano** è dato da un'equazione ax+by+cz=d oppure da P0+t v1+s v2 con v1,v2 indipendenti; una **retta** da un sistema di due equazioni indipendenti oppure da P0+t v. Si passa dalla cartesiana alla parametrica risolvendo il sistema con Gauss-Jordan (le incognite libere diventano i parametri). Per i piani il passaggio inverso è immediato grazie al prodotto vettoriale: se π=P0+t v1+s v2, il vettore **n=v1×v2=(a,b,c)** è ortogonale alla giacitura, quindi π ha equazione ax+by+cz=d, con d fissato imponendo P0∈π. Per una retta data da due piani a1x+b1y+c1z=d1, a2x+b2y+c2z=d2 la direzione è il prodotto vettoriale delle due normali.

**Esempio (23.8, ricostruito)**: π = (1,2,−3) + t(1,0,1) + s(2,−1,0). Si ha (1,0,1)×(2,−1,0)=(1,2,−1), quindi π: x+2y−z=d; da P0=(1,2,−3) si ottiene d=1+4+3=**8**, cioè π: x+2y−z=8.

**Esempio [INT]**: piano per A=(1,0,0), B=(0,1,0), C=(0,0,1). Giacitura generata da B−A=(−1,1,0) e C−A=(−1,0,1); (−1,1,0)×(−1,0,1)=(1,1,1); d=1 da A: **x+y+z=1**.

## 4. Intersezioni

I sottospazi vettoriali si intersecano sempre almeno nell'origine, quelli affini possono non incontrarsi. Se S∩S'≠∅ (e si dicono **incidenti**) e x è un punto comune, allora S∩S' = x+(W∩W'): l'intersezione, quando non è vuota, è ancora un sottospazio affine, con giacitura l'intersezione delle giaciture. Per calcolarla il metodo dipende dalle forme:
- entrambi cartesiani: si mettono insieme le equazioni in un unico sistema (Esempio 23.9: i piani x+y=1 e x−y+z=3 danno una retta);
- uno cartesiano e uno parametrico: si sostituisce il punto generico del parametrico nelle equazioni del cartesiano e si risolve nei parametri;
- entrambi parametrici: si uguaglia il punto generico di uno a quello dell'altro e si risolve il sistema nei parametri (è il procedimento più laborioso).

Un criterio sufficiente (Prop 23.10): se **giac(S)+giac(S')=Rⁿ**, allora S e S' sono incidenti, perché P−Q (differenza di due punti) si scrive come combinazione dei generatori delle due giaciture e questa combinazione dà una soluzione. Per esempio due piani non paralleli in R³ (giaciture di dim 2 distinte, somma R³) si intersecano sempre in una retta.

## 5. Posizioni reciproche di rette e piani in R³ [INT, metodo standard]

Le fonti danno le formule per intersezioni e distanze; il quadro delle posizioni reciproche, che compare nei quiz dei compiti, si ricava con gli stessi strumenti (rango, determinante, prodotto vettoriale). Il ragionamento è sempre lo stesso: confrontare le giaciture e poi dire se i sottospazi hanno un punto in comune.

**Retta r=P+t v e retta s=Q+u w.**
- se v×w=0 (direzioni dipendenti) le rette sono **parallele**: coincidenti se Q−P∈Span(v), altrimenti parallele distinte;
- se v×w≠0 le direzioni sono indipendenti; guardando il determinante det[v|w|Q−P]: se è nullo i tre vettori sono complanari e le rette si **incontrano in un punto** (incidenti); se è non nullo le rette sono **sghembe**, cioè non parallele e non incidenti, e distano |det[v|w|Q−P]|/‖v×w‖ (file 13).
- Rette ortogonali: ⟨v,w⟩=0 (due rette sghembe possono essere ortogonali).

**Retta r=P+t v e piano π: ax+by+cz=d** (n=(a,b,c)). Si calcola ⟨v,n⟩: se è ≠0 la retta incontra π in un punto; se è =0 la retta è parallela a π, e vi è contenuta se un suo punto soddisfa l'equazione. Retta ortogonale al piano ⇔ v∥n.

**Piano π1 e piano π2** con normali n1,n2: se n1×n2≠0 si incontrano in una retta di direzione n1×n2; se n1×n2=0 sono paralleli, coincidenti se le equazioni sono proporzionali (compreso il termine noto).

**Esempi dai quiz (verificati [INT]).**
- Compito 14/07/2023, Q1: r: x−y=2, y+z=0; s: (t,−t,−t). La direzione di r è (1,−1,0)×(0,1,1)=(−1,−1,1), quella di s è (1,−1,−1): non parallele (il prodotto vettoriale è (2,0,2)≠0) e non ortogonali (⟨v,w⟩=−1). Un punto di r è (2,0,0) e dell'origine su s: det[v|w|Q−P] con Q−P=(−2,0,0) vale −4≠0 ⇒ **sghembe**. Risposta (c), che nel PDF risulta anche segnata corretta.
- Compito 28/06/2023, Q1: r: x−z=0, x−y+4=0; s: (t,−t+2,2t+1). La direzione di r è (1,0,−1)×(1,−1,0)=(−1,−1,−1); s ha direzione (1,−1,2): non parallele, non ortogonali (⟨v,w⟩=−2); il determinante con P=(0,4,0) su r e Q=(0,2,1) su s vale 0 ⇒ **si intersecano in un punto**: uguagliando si trova t=1 per r e u=−1 per s, punto (−1,3,−1). Risposta (d) fra quelle elencate; la chiave del compito non è nel testo estratto.

---

## Cose da saper fare all'esame
- Riconoscere se una matrice è ortogonale (ᵗAA=I), scrivere rotazioni e riflessioni di R², dire che le isometrie di R² sono rotazioni e riflessioni (det=±1).
- Calcolare v×w, usarlo per un vettore ortogonale a due vettori, per l'area di parallelogrammi e triangoli (metà dell'area), per l'equazione del piano per tre punti.
- Passare da cartesiana a parametrica (Gauss) e da parametrica a cartesiana (v1×v2 per i piani).
- Determinare intersezioni e posizione reciproca di rette e piani (parallele, incidenti, sghembe, retta parallela o contenuta in un piano).
- Dimostrare: v×w⊥v,w; v×w=0⇔dipendenti; identità di Lagrange; area = ‖v×w‖; Prop 22.6 e 22.8; il criterio giac+giac'=Rⁿ ⇒ incidenti.

## Dubbi
- Convenzioni di segno di Rif_θ e Rot_θ ricostruite (le matrici nell'estrazione hanno i segni persi).
- Le posizioni reciproche (sez. 5) non sono trattate esplicitamente nelle lezioni: metodo [INT] coerente con le Prop 23.10 e 24.14; confrontare con quello usato dal docente.
- Esempio 23.9 (retta e piano) e 24.15 (rette sghembe) hanno numeri illeggibili: usare i miei esempi del file 13.
