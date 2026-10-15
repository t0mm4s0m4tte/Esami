# 11 - Prodotti scalari, norma, ortogonalità (Algebra e Geometria)

**Fonte**: Buzano-Radeschi, Lezioni 19-21 (`Lezioni_19-21.pdf`). In questo blocco il campo è sempre K=R (servono positività e radici quadrate). Esempi 19.4-21.8 verificati.

## Mappa

---

- [1. Definizioni](#1-definizioni)
- [2. Matrici simmetriche](#2-matrici-simmetriche)
- [3. Forme quadratiche](#3-forme-quadratiche)
- [4. Norma, disuguaglianze, distanza, angolo (g definito positivo)](#4-norma-disuguaglianze-distanza-angolo-g-definito-positivo)
- [5. Ortogonalità e proiezioni](#5-ortogonalità-e-proiezioni)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## 1. Definizioni

Finora gli spazi vettoriali avevano solo somma e scalari: non c'era modo di parlare di lunghezze o angoli. Il prodotto scalare aggiunge esattamente questa struttura. Su uno spazio V reale è una funzione ⟨·,·⟩: V×V→R che soddisfa:
1. ⟨v+v',w⟩=⟨v,w⟩+⟨v',w⟩;
2. ⟨λv,w⟩=λ⟨v,w⟩;
3. ⟨v,w⟩=⟨w,v⟩ (simmetria).

La simmetria trasferisce al secondo fattore la linearità del primo, quindi il prodotto è bilineare, e in particolare ⟨v,0⟩=0.

Due proprietà descrivono quanto il prodotto è "buono":
- è **degenere** se esiste v≠0 con ⟨v,w⟩=0 per ogni w;
- è **definito positivo** se ⟨v,v⟩>0 per ogni v≠0.

Un prodotto definito positivo è sempre non degenere (Prop 19.3: se v fosse degenere si avrebbe ⟨v,v⟩=0). Il prototipo è il prodotto **euclideo su Rⁿ**, ⟨x,y⟩ = ᵗx·y = x1y1+...+xnyn, definito positivo perché ⟨x,x⟩=Σx_i²>0 se x≠0.

**Esempi (19.4)** su R_2[x]:
- ⟨p,q⟩=p(0)q(0)+p(1)q(1)+p(2)q(2) è definito positivo: ⟨p,p⟩=0 forza p ad avere 3 radici, ma ha grado ≤2, quindi p=0.
- ⟨p,q⟩=p(0)q(0)+p(1)q(1) è degenere: p=x(1-x) è ortogonale a tutti.
- ⟨p,q⟩=p(0)q(0)+p(1)q(1)-p(2)q(2) è non degenere ma non definito positivo: per p=x-1 si ha ⟨p,p⟩=1+0-1=0.

## 2. Matrici simmetriche

Nel caso di Rⁿ i prodotti scalari sono tutti descritti da matrici simmetriche. Se S∈M(n,R) è simmetrica (ᵗS=S), allora **g_S(x,y)=ᵗx S y** è un prodotto scalare: la simmetria discende dal fatto che ᵗxSy è un numero, dunque uguale alla sua trasposta ᵗy ᵗS x = ᵗySx. Esplicitamente g_S(x,y)=Σ_{ij} x_i S_ij y_j e **S_ij=g_S(e_i,e_j)**; con S=I si ritrova il prodotto euclideo. Per esempio S=[[2,1],[1,1]] dà g_S(x,y)=2x1y1+x1y2+x2y1+x2y2, che è definito positivo (det=1>0 e S_11>0).

Viceversa, dato un prodotto g e una base B={v1..vn}, la **matrice associata** è S=[g]_B con **S_ij=g(v_i,v_j)**, e per ogni v,w vale **g(v,w)=ᵗ[v]_B · S · [w]_B**. Per l'euclideo di R² e la base {(1,0),(1,1)} si ottiene S=[[1,1],[1,2]].

Cambiando base la matrice si trasforma in modo diverso da quello degli endomorfismi (file 09). Se B' è la nuova base e M è la matrice che ha per colonne le coordinate dei vettori di B' rispetto a B (cioè [id]_{B'}^{B}), allora **S'=ᵗM S M**. Per esempio con M=[[1,1],[0,1]] e S=I si ha S'=ᵗM M=[[1,1],[1,2]] ✓.

Questa relazione si chiama **congruenza**: S e S' simmetriche sono congruenti se S'=ᵗM S M con M invertibile; è una relazione di equivalenza ma **non** va confusa con la similitudine, dove al posto di ᵗM compare M⁻¹. La congruenza non conserva il determinante (diag(1,1) e diag(2,1) sono congruenti tramite M=diag(√2,1) ma non sono simili), però ne conserva il **segno** (Prop 20.5: detS'=(detM)²detS).

## 3. Forme quadratiche

Una **forma quadratica** è un polinomio omogeneo di grado 2 in x1..xn, e ogni forma quadratica si scrive come **q(x)=g_S(x,x)=ᵗxSx** per un'unica matrice simmetrica S. La costruzione è semplice: i termini quadratici x_i² stanno sulla diagonale, mentre il coefficiente di x_ix_j (i<j) si divide a metà fra le due posizioni, S_ij=S_ji=(coeff)/2. Per esempio x1²+4x1x2-x2²+4x3² corrisponde a S=[[1,2,0],[2,-1,0],[0,0,4]]. Il prodotto g_S è definito positivo ⇔ q_S(x)>0 per ogni x≠0. Il segno di q e la classificazione tramite autovalori di S e criterio di Sylvester sono rinviati al file 14.

## 4. Norma, disuguaglianze, distanza, angolo (g definito positivo)

Quando il prodotto è definito positivo si può misurare la lunghezza: la **norma** è ‖v‖=√⟨v,v⟩. Nel caso euclideo è ‖x‖=√(x1²+...+xn²), mentre per S=[[2,1],[1,1]] è ‖x‖=√(2x1²+x2²+2x1x2).

La **Prop 20.10** raccoglie le proprietà fondamentali:
1. ‖v‖>0 se v≠0 e ‖0‖=0;
2. ‖λv‖=|λ|‖v‖;
3. **|⟨v,w⟩| ≤ ‖v‖‖w‖** (Cauchy-Schwarz);
4. **‖v+w‖ ≤ ‖v‖+‖w‖** (disuguaglianza triangolare).

Per dimostrare (3) si parte dal fatto che per ogni a,b vale 0≤‖av+bw‖²=a²‖v‖²+b²‖w‖²+2ab⟨v,w⟩; scegliendo a=‖w‖² e b=-⟨v,w⟩ si ottiene 0≤‖w‖⁴‖v‖²-⟨v,w⟩²‖w‖², e dividendo per ‖w‖² si ha ⟨v,w⟩²≤‖v‖²‖w‖². La (4) segue da ‖v+w‖²=‖v‖²+‖w‖²+2⟨v,w⟩≤(‖v‖+‖w‖)² per la (3).

La **distanza** fra punti è d(P,Q)=‖PQ‖=‖Q-P‖ (il vettore PQ è Q-P): è positiva se P≠Q, simmetrica, e soddisfa la **disuguaglianza triangolare** d(P,R)≤d(P,Q)+d(Q,R). L'**angolo** fra v,w≠0 è il θ∈[0,π] con **cosθ=⟨v,w⟩/(‖v‖‖w‖)**, ben definito proprio grazie a Cauchy-Schwarz (che garantisce che il rapporto stia in [-1,1]); l'angolo è acuto, retto o ottuso a seconda che ⟨v,w⟩ sia >0, =0 o <0.

## 5. Ortogonalità e proiezioni

Due vettori sono **ortogonali** (v⊥w) se ⟨v,w⟩=0; nel prodotto euclideo e_i⊥e_j per i≠j, e i vettori ortogonali ad (a,b)≠0 in R² sono Span(-b,a). Il **complemento ortogonale** di un sottospazio W è W^⊥={v | ⟨v,w⟩=0 ∀w∈W}, anch'esso un sottospazio (Prop 21.5); con un prodotto definito positivo si ha V=W⊕W^⊥, quindi dim W + dim W^⊥ = dim V.

L'operazione geometrica fondamentale è la **proiezione ortogonale** su una direzione. Dato w≠0, lo spazio si spezza come V=Span(w)⊕Span(w)^⊥ e la componente di v lungo w si trova imponendo ⟨v-kw,w⟩=0, da cui **p_w(v) = (⟨v,w⟩/⟨w,w⟩) w = (⟨v,w⟩/‖w‖²) w**. Il coefficiente k=⟨v,w⟩/⟨w,w⟩ si chiama **coefficiente di Fourier**. Esempi da quiz: la proiezione di v=(-1,3,4) lungo w=(1,2,0) ha ⟨v,w⟩=5 e ‖w‖²=5, quindi p=1·w=w; lungo w=(2,4,0) si ha ⟨v,w⟩=10, ‖w‖²=20 e dunque (1/2)w=(1,2,0). La proiezione di (1,-1,1) sul piano x+y+z=0 si ottiene togliendo la componente lungo la normale n=(1,1,1): v-(⟨v,n⟩/‖n‖²)n = (1,-1,1)-(1/3)(1,1,1)=(2/3,-4/3,2/3).

Le basi migliori sono quelle ortogonali. Se {v1..vn} è una **base ortogonale** (⟨v_i,v_j⟩=0 per i≠j), ogni vettore è somma delle sue proiezioni, **v=Σ ⟨v,v_i⟩/⟨v_i,v_i⟩ · v_i**: le coordinate sono i coefficienti di Fourier, e si ottengono facendo il prodotto scalare con v_i. Una base ortonormale è ortogonale con tutte le norme uguali a 1.

Per ottenere una base ortogonale da una qualsiasi serve il procedimento di **Gram-Schmidt**: da v1..vk indipendenti si costruiscono w1..wk ortogonali ponendo w1=v1 e **w_i = v_i - Σ_{j<i} (⟨v_i,w_j⟩/⟨w_j,w_j⟩) w_j**, cioè togliendo a ogni vettore le proiezioni sui precedenti. Dividendo ciascun w_i per la sua norma si ha una base ortonormale, e inoltre Span(w1..wi)=Span(v1..vi) per ogni i.

**Esempio svolto** (21.8): v1=(1,1,0), v2=(0,1,1), v3=(1,0,1) in R³ euclideo.
w1=(1,1,0). w2=v2-(⟨v2,w1⟩/⟨w1,w1⟩)w1=(0,1,1)-(1/2)(1,1,0)=(-1/2,1/2,1). w3=v3-(1/2)w1-(⟨v3,w2⟩/⟨w2,w2⟩)w2, con ⟨v3,w2⟩=1/2, ⟨w2,w2⟩=3/2 ⇒ coefficiente 1/3: w3=(1,0,1)-(1/2,1/2,0)-(1/3)(-1/2,1/2,1)=**(2/3,-2/3,2/3)**. Controllo: w1·w2=-1/2+1/2=0; w1·w3=2/3-2/3=0; w2·w3=-1/3-1/3+2/3=0 ✓.

---

## Cose da saper fare all'esame
- Verificare gli assiomi di prodotto scalare (bilinearità, simmetria), decidere degenere / definito positivo (da ⟨v,v⟩, da matrice: pivot positivi, autovalori > 0).
- Scrivere la matrice di un prodotto scalare in una base e cambiarla (ᵗMSM); scrivere la forma quadratica da S e viceversa.
- Calcolare norma, distanza, angolo, proiezione ortogonale, W^⊥ (risolvendo ⟨v,w_i⟩=0), coordinate in base ortogonale.
- Applicare Gram-Schmidt e normalizzare; trovare base ortonormale di un piano.
- Dimostrare: Cauchy-Schwarz, triangolare, W^⊥ sottospazio, formula della proiezione, formula di Fourier, definito positivo ⇒ non degenere, det delle matrici congruenti ha stesso segno.

## Dubbi
- La classificazione delle forme quadratiche (definita/semidefinita/indefinita) tramite autovalori o minori: nelle lezioni Buzano non c'è un criterio esplicito (solo definizione); è nel materiale Manno (Cartesio sugli autovalori): file 14 [DA VERIFICARE se in programma].
- Per la dimensione dim W + dim W^⊥ = dim V non c'è dimostrazione nelle lezioni estratte: è citata solo la decomposizione V=U⊕U^⊥ per U=Span(w).
