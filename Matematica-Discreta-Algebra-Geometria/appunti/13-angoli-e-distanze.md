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

**Angolo fra due rette** r=P+Span(v) e r'=P+Span(v') incidenti in P (Def 24.1): è l'angolo θ fra v e v', **cosθ = ⟨v,v'⟩/(‖v‖‖v'‖)**. Cambiare il verso di un generatore sostituisce θ con π−θ, quindi per convenzione si prende l'angolo acuto o retto (se θ è ottuso si usa π−θ), cioè in pratica si usa il valore assoluto |⟨v,v'⟩|.

**Angolo fra retta e piano** (Def 24.2): se r=P+Span(v) incontra π in P, si trasla l'origine in P in modo che π sia un sottospazio vettoriale; se v⊥π l'angolo è π/2, altrimenti si proietta ortogonalmente v su π ottenendo v'=p_π(v)≠0 e l'angolo è quello fra v e v' (acuto). Per calcolare la proiezione si usa una base ortogonale (v1,v2) di π (Gram-Schmidt, file 11): p_π(v)=(⟨v,v1⟩/⟨v1,v1⟩)v1+(⟨v,v2⟩/⟨v2,v2⟩)v2. Esiste una scorciatoia importantissima (Prop 24.4): **l'angolo fra v e il piano π e l'angolo fra v e la normale n a π si sommano a π/2**, cioè, se α è l'angolo fra v e n, θ=π/2−α, ovvero **sinθ = |⟨v,n⟩|/(‖v‖‖n‖)**. Questa è la formula da usare nei problemi.

**Esempio (24.3 e 24.5)**: π: x+y−z=0 e il vettore e3. Una base ortogonale di π è v1=(1,1,2), v2=(1,−1,0). La proiezione di e3 è (⟨e3,v1⟩/6)v1=(1/3)(1,1,2), di norma √6/3. L'angolo è θ=arccos(√6/3)≈0.615 rad ≈35.3°. Con la scorciatoia: n=(1,1,−1), cosα=|⟨e3,n⟩|/(1·√3)=1/√3 e θ=π/2−arccos(1/√3)=1.5708−0.9553=0.615 ✓. Si osservi inoltre che la matrice della proiezione ortogonale su π nella base canonica è (1/3)[[2,−1,1],[−1,2,1],[1,1,2]] (dal testo, segni ricostruiti dalla proiezione di e3).

**Angolo fra due piani** π1: a1x+b1y+c1z=d1, π2: a2x+b2y+c2z=d2 che si incontrano in una retta (Def 24.6, angolo diedrale): è l'angolo fra due rette s1⊂π1, s2⊂π2 incidenti e ortogonali alla retta d'intersezione. Prop 24.7: **è uguale all'angolo fra le normali** n1=(a1,b1,c1) e n2=(a2,b2,c2), quindi basta cosθ=|⟨n1,n2⟩|/(‖n1‖‖n2‖). **Esempio (24.8)**: π1: x+y−z=3, π2: x−y−z=9 hanno n1=(1,1,−1), n2=(1,−1,−1) (segni ricostruiti dal risultato): ⟨n1,n2⟩=1−1+1=1, ‖n_i‖=√3, cosθ=1/3 e θ=arccos(1/3)≈1.231 rad ≈70.5° ✓.

**Esempio [INT]**: angolo fra la retta r con direzione v=(1,1,0) e il piano x+y+z=0 (normale (1,1,1)): sinθ=|⟨v,n⟩|/(‖v‖‖n‖)=2/(√2·√3)=2/√6, quindi θ≈54.7°.

## 2. Distanze fra sottospazi disgiunti

La distanza fra due sottospazi affini è zero se sono incidenti. Se sono disgiunti, è la lunghezza del più corto segmento che li congiunge, che è sempre un segmento **ortogonale** a entrambi. Ogni formula nasce da un confronto fra due modi di calcolare un'area o un volume, oppure da un'ortogonalità.

**Distanza fra punti**: d(P,Q)=‖PQ‖=‖Q−P‖ (Def 24.9).

**Distanza punto-retta** (Def 24.10, Prop 24.11): sia r=P0+Span(v0) e v1=P−P0. Il parallelogramma di lati v0 e v1 ha area ‖v0×v1‖ (prodotto vettoriale), ma anche base·altezza=‖v0‖·d(P,r). Quindi **d(P,r) = ‖v0×v1‖/‖v0‖**.

**Esempio (24.12, ricostruito dal risultato)**: v0=(3,2,1), v1=(2,−2,2): v0×v1=(6,−4,−10), norma √152, ‖v0‖=√14, quindi d=√(152/14)=√(76/7)=**2√133/7** ✓ (coincide con il risultato del testo).
**Esempio [INT]**: P=(1,2,3), r=Span(1,1,0) per l'origine: v0×P=(3,−3,1), norma √19, ‖v0‖=√2, d=√19/√2=√38/2.

**Distanza fra due rette** (Def 24.13): sono parallele o sghembe; la distanza è la lunghezza del segmento P P' ortogonale a entrambe. Se sono **parallele**, d(r,r')=d(P0,r') con P0∈r, e si applica la formula precedente. Se sono **sghembe**, r=P0+Span(v), r'=P0'+Span(v') e v''=P0'−P0, il parallelepipedo di lati v,v',v'' ha volume |det[v|v'|v'']|, ma anche area di base ‖v×v'‖ per altezza d(r,r'). Perciò (Prop 24.14)

**d(r,r') = |det(v | v' | v'')| / ‖v×v'‖.**

(Esempio 24.15 del testo: i numeri sono illeggibili nell'estrazione.) **Esempio [INT]**: r=Span(1,1,0) per l'origine, r'=(1,0,1)+u(0,1,1). v×v'=(1,−1,1), norma √3; v''=(1,0,1); det[v|v'|v'']=2 (matrice con colonne (1,1,0),(0,1,1),(1,0,1)). Poiché il determinante è ≠0 le rette sono sghembe e d=2/√3=2√3/3.

**Distanza punto-piano** (Def 24.16, Prop 24.17): per π: ax+by+cz=d e P0=(x0,y0,z0), si traccia la perpendicolare a π per P0 e si misura fino al piede Q. La formula è

**d(P0,π) = |ax0+by0+cz0−d| / √(a²+b²+c²).**

Il numeratore misura quanto P0 non soddisfa l'equazione, il denominatore normalizza la normale. **Esempio (24.18)**: π: 2x−y+z=4, P0=(2,1,−2): |4−1−2−4|/√6=3/√6=**√6/2** (coordinate di P0 ricostruite dal risultato). Un caso utile [INT]: la distanza fra due piani paralleli ax+by+cz=d1 e ax+by+cz=d2 è |d1−d2|/√(a²+b²+c²); per 2x−y+2z=3 e 2x−y+2z=−6 è 9/3=3.

**Distanza retta-piano**: se la retta incontra il piano è 0; se è parallela è la distanza di un suo punto dal piano (formula precedente) [INT].

**Aree e volumi con il prodotto vettoriale [INT]**: il triangolo di vertici A,B,C ha area ‖(B−A)×(C−A)‖/2; per A=(1,0,0), B=(0,2,0), C=(0,0,3) si ha (−1,2,0)×(−1,0,3)=(6,3,2), norma 7, area **7/2**. Il parallelepipedo di spigoli u,v,w ha volume |det[u|v|w]|.

---

## Esercizi svolti collegati

Angolo retta-piano, distanza tra rette sghembe e distanza piano-punto con numeri veri in Esempio 3 e Esempio 4 di [17-esami-ag-2024-2025.md](17-esami-ag-2024-2025.md).

## Cose da saper fare all'esame
- Calcolare angoli retta-retta, retta-piano (via la normale, sinθ) e piano-piano (angolo fra normali), scegliendo l'angolo acuto.
- Calcolare distanze punto-retta (prodotto vettoriale), punto-piano (formula), rette parallele e sghembe (determinante / prodotto vettoriale).
- Proiettare un vettore o un punto su un piano (base ortogonale oppure sottrazione della componente lungo la normale) e scrivere la matrice della proiezione.
- Dimostrare le formule di d(P,r) e d(r,r') (confronto di aree e volumi) e l'identità angolo retta-piano + angolo con la normale = π/2.

## Dubbi
- Il testo estratto non fornisce la dimostrazione della formula di Prop 24.17 (distanza punto-piano); si ottiene come lunghezza della proiezione di P0−Q0 (Q0∈π) lungo la normale n: |⟨P0−Q0,n⟩|/‖n‖ [INT].
- Distanza retta-piano e piani paralleli, aree e volumi: ricavati con gli stessi strumenti [INT], non presenti come enunciati nelle lezioni.
