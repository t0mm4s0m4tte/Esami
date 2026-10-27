# 13 - Angoli e distanze fra rette, piani e punti (Algebra e Geometria)

**Fonte**: Buzano-Radeschi, Lezione 24 (`Lezioni_22-24.pdf`: Lo Spazio Euclideo III). Esempi 24.3, 24.8, 24.12, 24.18 dal testo (ricostruiti dove segnato); gli esempi marcati [INT] sono miei, verificati al computer.

## Mappa

---

- [1. Angoli fra sottospazi incidenti](#1-angoli-fra-sottospazi-incidenti)
- [2. Distanze fra sottospazi disgiunti](#2-distanze-fra-sottospazi-disgiunti)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## 1. Angoli fra sottospazi incidenti

Se due sottospazi affini si incontrano ha senso chiedersi con che inclinazione si incontrano; se non si incontrano ha senso chiedere quanto distano (sezione 2). Il filo conduttore è che ogni nozione si riduce al prodotto scalare di vettori opportuni: le direzioni delle rette o le normali dei piani.

**Angolo fra due rette** $r=P+\text{Span}(v)$ e $r'=P+\text{Span}(v')$ incidenti in $P$ (Def 24.1): è l'angolo $\theta$ fra $v$ e $v'$, $\boldsymbol{\cos\theta = \dfrac{\langle v,v'\rangle}{\lVert v\rVert\lVert v'\rVert}}$. Cambiare il verso di un generatore sostituisce $\theta$ con $\pi-\theta$, quindi per convenzione si prende l'angolo acuto o retto (se $\theta$ è ottuso si usa $\pi-\theta$), cioè in pratica si usa il valore assoluto $\lvert\langle v,v'\rangle\rvert$.

**Angolo fra retta e piano** (Def 24.2): se $r=P+\text{Span}(v)$ incontra $\pi$ in $P$, si trasla l'origine in $P$ in modo che $\pi$ sia un sottospazio vettoriale; se $v\perp\pi$ l'angolo è $\pi/2$, altrimenti si proietta ortogonalmente $v$ su $\pi$ ottenendo $v'=p_\pi(v)\ne 0$ e l'angolo è quello fra $v$ e $v'$ (acuto). Per calcolare la proiezione si usa una base ortogonale $(v_1,v_2)$ di $\pi$ (Gram-Schmidt, file 11): $p_\pi(v)=\dfrac{\langle v,v_1\rangle}{\langle v_1,v_1\rangle}v_1+\dfrac{\langle v,v_2\rangle}{\langle v_2,v_2\rangle}v_2$. Esiste una scorciatoia importantissima (Prop 24.4): **l'angolo fra $v$ e il piano $\pi$ e l'angolo fra $v$ e la normale $n$ a $\pi$ si sommano a $\pi/2$**, cioè, se $\alpha$ è l'angolo fra $v$ e $n$, $\theta=\pi/2-\alpha$, ovvero $\boldsymbol{\sin\theta = \dfrac{\lvert\langle v,n\rangle\rvert}{\lVert v\rVert\lVert n\rVert}}$. Questa è la formula da usare nei problemi.

**Esempio (24.3 e 24.5)**: $\pi: x+y-z=0$ e il vettore $e_3$. Una base ortogonale di $\pi$ è $v_1=(1,1,2)$, $v_2=(1,-1,0)$. La proiezione di $e_3$ è $\dfrac{\langle e_3,v_1\rangle}{6}v_1=\tfrac13(1,1,2)$, di norma $\sqrt6/3$. L'angolo è $\theta=\arccos(\sqrt6/3)\approx 0.615$ rad $\approx 35.3°$. Con la scorciatoia: $n=(1,1,-1)$, $\cos\alpha=\lvert\langle e_3,n\rangle\rvert/(1\cdot\sqrt3)=1/\sqrt3$ e $\theta=\pi/2-\arccos(1/\sqrt3)=1.5708-0.9553=0.615$ ✓. Si osservi inoltre che la matrice della proiezione ortogonale su $\pi$ nella base canonica è $\tfrac13\begin{pmatrix}2&-1&1\\-1&2&1\\1&1&2\end{pmatrix}$ (dal testo, segni ricostruiti dalla proiezione di $e_3$).

**Angolo fra due piani** $\pi_1: a_1x+b_1y+c_1z=d_1$, $\pi_2: a_2x+b_2y+c_2z=d_2$ che si incontrano in una retta (Def 24.6, angolo diedrale): è l'angolo fra due rette $s_1\subset\pi_1$, $s_2\subset\pi_2$ incidenti e ortogonali alla retta d'intersezione. Prop 24.7: **è uguale all'angolo fra le normali** $n_1=(a_1,b_1,c_1)$ e $n_2=(a_2,b_2,c_2)$, quindi basta $\cos\theta=\dfrac{\lvert\langle n_1,n_2\rangle\rvert}{\lVert n_1\rVert\lVert n_2\rVert}$. **Esempio (24.8)**: $\pi_1: x+y-z=3$, $\pi_2: x-y-z=9$ hanno $n_1=(1,1,-1)$, $n_2=(1,-1,-1)$ (segni ricostruiti dal risultato): $\langle n_1,n_2\rangle=1-1+1=1$, $\lVert n_i\rVert=\sqrt3$, $\cos\theta=1/3$ e $\theta=\arccos(1/3)\approx 1.231$ rad $\approx 70.5°$ ✓.

**Esempio [INT]**: angolo fra la retta $r$ con direzione $v=(1,1,0)$ e il piano $x+y+z=0$ (normale $(1,1,1)$): $\sin\theta=\dfrac{\lvert\langle v,n\rangle\rvert}{\lVert v\rVert\lVert n\rVert}=\dfrac{2}{\sqrt2\cdot\sqrt3}=\dfrac{2}{\sqrt6}$, quindi $\theta\approx 54.7°$.

## 2. Distanze fra sottospazi disgiunti

La distanza fra due sottospazi affini è zero se sono incidenti. Se sono disgiunti, è la lunghezza del più corto segmento che li congiunge, che è sempre un segmento **ortogonale** a entrambi. Ogni formula nasce da un confronto fra due modi di calcolare un'area o un volume, oppure da un'ortogonalità.

**Distanza fra punti**: $d(P,Q)=\lVert PQ\rVert=\lVert Q-P\rVert$ (Def 24.9).

**Distanza punto-retta** (Def 24.10, Prop 24.11): sia $r=P_0+\text{Span}(v_0)$ e $v_1=P-P_0$. Il parallelogramma di lati $v_0$ e $v_1$ ha area $\lVert v_0\times v_1\rVert$ (prodotto vettoriale), ma anche base$\cdot$altezza $=\lVert v_0\rVert\cdot d(P,r)$. Quindi $\boldsymbol{d(P,r) = \dfrac{\lVert v_0\times v_1\rVert}{\lVert v_0\rVert}}$.

**Esempio (24.12, ricostruito dal risultato)**: $v_0=(3,2,1)$, $v_1=(2,-2,2)$: $v_0\times v_1=(6,-4,-10)$, norma $\sqrt{152}$, $\lVert v_0\rVert=\sqrt{14}$, quindi $d=\sqrt{152/14}=\sqrt{76/7}=\boldsymbol{2\sqrt{133}/7}$ ✓ (coincide con il risultato del testo).
**Esempio [INT]**: $P=(1,2,3)$, $r=\text{Span}(1,1,0)$ per l'origine: $v_0\times P=(3,-3,1)$, norma $\sqrt{19}$, $\lVert v_0\rVert=\sqrt2$, $d=\sqrt{19}/\sqrt2=\sqrt{38}/2$.

**Distanza fra due rette** (Def 24.13): sono parallele o sghembe; la distanza è la lunghezza del segmento $PP'$ ortogonale a entrambe. Se sono **parallele**, $d(r,r')=d(P_0,r')$ con $P_0\in r$, e si applica la formula precedente. Se sono **sghembe**, $r=P_0+\text{Span}(v)$, $r'=P_0'+\text{Span}(v')$ e $v''=P_0'-P_0$, il parallelepipedo di lati $v,v',v''$ ha volume $\lvert\det(v\mid v'\mid v'')\rvert$, ma anche area di base $\lVert v\times v'\rVert$ per altezza $d(r,r')$. Perciò (Prop 24.14)

$$
d(r,r') = \frac{\lvert\det(v\mid v'\mid v'')\rvert}{\lVert v\times v'\rVert}
$$

(Esempio 24.15 del testo: i numeri sono illeggibili nell'estrazione.) **Esempio [INT]**: $r=\text{Span}(1,1,0)$ per l'origine, $r'=(1,0,1)+u(0,1,1)$. $v\times v'=(1,-1,1)$, norma $\sqrt3$; $v''=(1,0,1)$; $\det(v\mid v'\mid v'')=2$ (matrice con colonne $(1,1,0),(0,1,1),(1,0,1)$). Poiché il determinante è $\ne 0$ le rette sono sghembe e $d=2/\sqrt3=2\sqrt3/3$.

**Distanza punto-piano** (Def 24.16, Prop 24.17): per $\pi: ax+by+cz=d$ e $P_0=(x_0,y_0,z_0)$, si traccia la perpendicolare a $\pi$ per $P_0$ e si misura fino al piede $Q$. La formula è

$$
d(P_0,\pi) = \frac{\lvert ax_0+by_0+cz_0-d\rvert}{\sqrt{a^2+b^2+c^2}}
$$

Il numeratore misura quanto $P_0$ non soddisfa l'equazione, il denominatore normalizza la normale. **Esempio (24.18)**: $\pi: 2x-y+z=4$, $P_0=(2,1,-2)$: $\lvert 4-1-2-4\rvert/\sqrt6=3/\sqrt6=\boldsymbol{\sqrt6/2}$ (coordinate di $P_0$ ricostruite dal risultato). Un caso utile [INT]: la distanza fra due piani paralleli $ax+by+cz=d_1$ e $ax+by+cz=d_2$ è $\dfrac{\lvert d_1-d_2\rvert}{\sqrt{a^2+b^2+c^2}}$; per $2x-y+2z=3$ e $2x-y+2z=-6$ è $9/3=3$.

**Distanza retta-piano**: se la retta incontra il piano è 0; se è parallela è la distanza di un suo punto dal piano (formula precedente) [INT].

**Aree e volumi con il prodotto vettoriale [INT]**: il triangolo di vertici $A,B,C$ ha area $\lVert(B-A)\times(C-A)\rVert/2$; per $A=(1,0,0)$, $B=(0,2,0)$, $C=(0,0,3)$ si ha $(-1,2,0)\times(-1,0,3)=(6,3,2)$, norma 7, area $\mathbf{7/2}$. Il parallelepipedo di spigoli $u,v,w$ ha volume $\lvert\det(u\mid v\mid w)\rvert$.

---

## Esercizi svolti collegati

Angolo retta-piano, distanza tra rette sghembe e distanza piano-punto con numeri veri in Esempio 3 e Esempio 4 di [17-esami-ag-2024-2025.md](17-esami-ag-2024-2025.md).

## Cose da saper fare all'esame
- Calcolare angoli retta-retta, retta-piano (via la normale, $\sin\theta$) e piano-piano (angolo fra normali), scegliendo l'angolo acuto.
- Calcolare distanze punto-retta (prodotto vettoriale), punto-piano (formula), rette parallele e sghembe (determinante / prodotto vettoriale).
- Proiettare un vettore o un punto su un piano (base ortogonale oppure sottrazione della componente lungo la normale) e scrivere la matrice della proiezione.
- Dimostrare le formule di $d(P,r)$ e $d(r,r')$ (confronto di aree e volumi) e l'identità angolo retta-piano + angolo con la normale $=\pi/2$.

## Dubbi
- Il testo estratto non fornisce la dimostrazione della formula di Prop 24.17 (distanza punto-piano); si ottiene come lunghezza della proiezione di $P_0-Q_0$ ($Q_0\in\pi$) lungo la normale $n$: $\lvert\langle P_0-Q_0,n\rangle\rvert/\lVert n\rVert$ [INT].
- Distanza retta-piano e piani paralleli, aree e volumi: ricavati con gli stessi strumenti [INT], non presenti come enunciati nelle lezioni.