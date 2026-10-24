# 15 - Esercizi risolti: endomorfismi, diagonalizzazione, misti (Algebra e Geometria)

**Fonte**: compiti scritti 2022 (`CompitoScritto_2022_06.pdf` esercizio sui polinomi, `CompitoScritto_2022_02.pdf` famiglia $A_k$) per i testi; svolgimenti miei [INT], tutti verificati al computer (sympy). I compiti $2022_{07}$ e $2022_{09}$ hanno i coefficienti rovinati dall'estrazione (es. "13a+13c"): non li ho risolti per non inventare i testi [DA VERIFICARE sul PDF originale]. Per la teoria: file 09 (matrice associata, Ker, Im), 10 (autovalori), 14 (spettrale).

## Mappa

---

- [Lo schema da applicare sempre](#lo-schema-da-applicare-sempre)
- [Esercizio 1 (29/06/2022, primo testo)](#esercizio-1-29062022-primo-testo)
- [Esercizio 2 (29/06/2022, quarto testo)](#esercizio-2-29062022-quarto-testo)
- [Esercizio 3 (Febbraio 2022): famiglia A_k](#esercizio-3-febbraio-2022-famiglia-a_k)
- [Esercizio 4: endomorfismo simmetrico di R³ [INT]](#esercizio-4-endomorfismo-simmetrico-di-r³-int)
- [Esercizio 5: trasposizione in R^{2,2} [INT]](#esercizio-5-trasposizione-in-r22-int)
- [Esercizio 6: A_k=[[1,1],[k,1]] [INT]](#esercizio-6-a_k11k1-int)
- [Esercizi misti](#esercizi-misti)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## Lo schema da applicare sempre

Gli esercizi sugli endomorfismi dei compiti 2022 hanno quasi sempre la stessa struttura in tre domande:
1. scrivere la matrice rappresentativa in una base data;
2. trovare una base di Ker(f) e di Im(f);
3. trovare autovalori e autospazi e dire se f è diagonalizzabile.

La matrice è la chiave di tutto, perché poi ogni altra domanda si risolve su di essa. Si costruisce calcolando le immagini dei vettori della base e mettendo le loro **coordinate in colonna**; attenzione all'ordine della base (per esempio nel compito di settembre 2022 la base è ($x^{2}$,x,1), non (1,x,$x^{2}$), e questo riordina righe e colonne). Kernel e immagine si ricavano con Gauss: i vettori del nucleo risolvono Ax=0, e una base dell'immagine è formata dalle colonne di A corrispondenti ai pivot. Gli autovalori sono le radici di det(A−tI); per ciascun autovalore con molteplicità algebrica ≥2 si confronta $m_g$=n−rk(A−λI) con $m_a$. Un'osservazione utile come controllo: se rk A=2 su 3, allora 0 è autovalore con autospazio Ker A di dimensione 1, e dim Ker + dim Im = 3 (teorema della dimensione). Ricordate infine che un autovettore di $R_{2}$[x] è un **polinomio**: dopo aver trovato le coordinate bisogna riscriverlo come polinomio.

## Esercizio 1 (29/06/2022, primo testo)

Sia $R_{2}$[x] lo spazio dei polinomi di grado ≤2 e f: a+bx+cx^{2} ↦ a·p1+b·p2+c·p3 con p1=−2+x−3x^{2}, p2=−1+x−$x^{2}$, p3=2−x+3x^{2}.

*Matrice nella base B=(1,x,$x^{2}$).* Poiché f(1)=p1, f(x)=p2 e f($x^{2}$)=p3, le colonne sono le coordinate di p1,p2,p3:
A = [[−2, −1, 2],[1, 1, −1],[−3, −1, 3]].

*Ker e Im.* Riducendo A si trova rk A=2. Le colonne 1 e 2 sono indipendenti, mentre la somma delle colonne 1 e 3 è nulla: p1+p3=0. Quindi **Ker f = Span(1+$x^{2}$)** (coordinate (1,0,1)), dim Ker=1, dim Im=2, e una base di Im è **{p1,p2}={−2+x−3x^{2}, −1+x−$x^{2}$}**. Verifica: f(1+$x^{2}$)=p1+p3=(−2+2)+(1−1)x+(−3+3)$x^{2}$=0 ✓.

*Autovalori.* Il polinomio caratteristico è $p_A$(t)=t(t−1)^{2} (traccia −2+1+3=2 = 0+1+1 ✓; det=0). Gli autovalori sono 0 ($m_a$=1) e 1 ($m_a$=2).
- $V_0$=Ker f=Span(1+$x^{2}$).
- λ=1: A−I=[[−3,−1,2],[1,0,−1],[−3,−1,2]] ha rango 2 (le righe 1 e 3 coincidono ma le prime due sono indipendenti), quindi $m_g$(1)=3−2=1≠2=$m_a$(1). L'autovettore è (1,−1,1), cioè il polinomio **1−x+$x^{2}*$*; si verifica f(1−x+$x^{2}$)=p1−p2+p3=1−x+$x^{2}$ ✓.

*Conclusione.* $m_g$(1)=1<$m_a$(1)=2 ⇒ **f non è diagonalizzabile**. La somma delle dimensioni degli autospazi è 1+1=2<3.

## Esercizio 2 (29/06/2022, quarto testo)

Stesso schema con p1=−4−4x^{2}, p2=−2−x−3x^{2}, p3=2−x+$x^{2}$. La matrice nella base (1,x,$x^{2}$) è A=[[−4,−2,2],[0,−1,−1],[−4,−3,1]]. Si vede che p1−p2+p3=0, quindi **Ker f=Span(1−x+$x^{2}$)** (coordinate (1,−1,1)), rk A=2, base di Im: {p1,p2}. Il polinomio caratteristico è t(t+2)^{2}: $V_0$=Ker f e, per λ=−2, A+2I=[[−2,−2,2],[0,1,−1],[−4,−3,3]] ha rango 2 ⇒ $m_g$(−2)=1<2 ⇒ **non diagonalizzabile**; autovettore (0,1,1), cioè x+$x^{2}$. Verificato.

*Osservazione sulla struttura.* Provando anche gli altri due testi del 29/06/2022 si trova lo stesso schema: p=t(t−c)^{2} con c=2 per p1=−3+x−5x^{2}, p2=−2+2x−2x^{2}, p3=3−x+5x^{2} e c=3 per p1=6−x+5x^{2}, p2=3+x+4x^{2}, p3=−3+2x−$x^{2}$; in entrambi $m_g$(c)=1 e f non è diagonalizzabile. Il compito è disegnato in modo che l'autovalore doppio non abbia abbastanza autovettori [INT]. In generale, se f ha un autovalore doppio e uno semplice (0), basta calcolare il rango di A−cI per decidere.

## Esercizio 3 (Febbraio 2022): famiglia A_k

Si consideri al variare di k∈R la matrice $A_k$=[[1,0,0],[k,2,0],[2,k−3,1]] (lettura della matrice dal PDF: l'estrazione è confusa, gli elementi potrebbero essere diversi [DA VERIFICARE]). Si chiede:
- (a) per quali k $A_k$ non è invertibile e una base del nucleo in quei casi;
- (b) la diagonalizzabilità al variare di k;
- (c) per k=3 esiste N invertibile con N^{-1}A_{3}N diagonale?

*(a)* La matrice è triangolare inferiore: det $A_k$=1·2·1=2≠0 per ogni k. Quindi **$A_k$ è sempre invertibile** e non c'è nessun nucleo da descrivere. Questo risultato è insolito per la domanda posta: se la matrice letta fosse corretta la domanda (a) avrebbe risposta "mai" [DA VERIFICARE sul PDF originale].

*(b)* Gli autovalori di una triangolare sono gli elementi diagonali: 1 ($m_a$=2) e 2 ($m_a$=1, quindi $m_g$=1). Basta studiare λ=1: $A_k$−I=[[0,0,0],[k,1,0],[2,k−3,0]]. Il rango è 2 se le righe (k,1,0) e (2,k−3,0) sono indipendenti, cioè se il determinante k(k−3)−2=$k^{2}$−3k−2≠0; è 1 se $k^{2}$−3k−2=0, cioè k=(3±√17)/2. Dunque $m_g$(1)=3−rk($A_k$−I) vale 1 per k≠(3±√17)/2 e vale 2 per k=(3±√17)/2. Conclusione: **$A_k$ è diagonalizzabile ⇔ k=(3±√17)/2**.

*(c)* Per k=3: $k^{2}$−3k−2=−2≠0 ⇒ rk($A_{3}$−I)=2, $m_g$(1)=1<2 ⇒ **non diagonalizzabile**: non esiste alcuna N invertibile con N^{-1}A_{3}N diagonale. (Gli autospazi sono $V_1$=Span(0,0,1), $V_2$=Span(0,1,0); verificato.)

## Esercizio 4: endomorfismo simmetrico di R³ [INT]

Sia f(x,y,z)=(x+2y, 2x+y, 3z). La matrice nella base canonica è A=[[1,2,0],[2,1,0],[0,0,3]], simmetrica. Il determinante è (1−4)·3=−9≠0, quindi **Ker f={0}** e **Im f=$R^{3}*$* (f iniettivo e suriettivo). Il polinomio caratteristico è ((1−t)^{2}−4)(3−t)=(t+1)(t−3)^{2}, autovalori −1 ($m_a$=1) e 3 ($m_a$=2). Per λ=3: A−3I=[[−2,2,0],[2,−2,0],[0,0,0]] ha rango 1 ⇒ $m_g$=2 ✓. Gli autospazi sono $V_{−1}$=Span(−1,1,0) e $V_3$=Span((1,1,0),(0,0,1)); i tre vettori sono a due a due ortogonali (gli autospazi sono ortogonali fra loro, e i due di $V_3$ lo sono per costruzione). **f è diagonalizzabile** e, essendo A simmetrica, la base può essere resa ortonormale (file 14): M=[ (−1,1,0)/√2 | (1,1,0)/√2 | (0,0,1) ], ᵗMAM=diag(−1,3,3). Verificato.

## Esercizio 5: trasposizione in R^{2,2} [INT]

Sia f: $R^{2,2}$→$R^{2,2}$, f(X)=ᵗX. Nella base (E11,E12,E21,E22) la matrice è [[1,0,0,0],[0,0,1,0],[0,1,0,0],[0,0,0,1]], cioè f scambia E12 con E21 e fissa gli altri. È un'involuzione ($f^{2}$=id), quindi gli unici autovalori possibili sono ±1. L'autospazio di 1 è formato dalle matrici simmetriche (dim 3), quello di −1 dalle antisimmetriche (dim 1): $m_g$(1)=3=$m_a$ e $m_g$(−1)=1=$m_a$, quindi **f è diagonalizzabile**, con p=(t−1)^{3}(t+1). Ker f={0}. Il determinante è −1.

## Esercizio 6: A_k=[[1,1],[k,1]] [INT]

Il polinomio caratteristico è (1−t)^{2}−k, con radici t=1±√k.
- **k>0**: due radici reali distinte ⇒ diagonalizzabile su R.
- **k=0**: l'unico autovalore 1 è doppio e A−I=[[0,1],[0,0]] ha rango 1 ⇒ $m_g$=1<2 ⇒ non diagonalizzabile.
- **k<0**: nessuna radice reale ⇒ non diagonalizzabile su R, ma lo è su C (due radici complesse distinte 1±i√|k|).

Conclusione: diagonalizzabile su R ⇔ k>0; su C ⇔ k≠0.

---

## Esercizi misti

**M1 (geometria analitica).** Si trovi il piano π per l'origine che contiene la retta r: (1,0,2)+t(1,1,−1), e la distanza dal punto P=(1,1,1) [INT]. Il piano contiene la direzione v=(1,1,−1) e il vettore (1,0,2) (il punto di r congiunto con l'origine). La normale è n=v×(1,0,2)=(1·2−(−1)·0, (−1)·1−1·2, 1·0−1·1)=(2,−3,−1), quindi **π: 2x−3y−z=0**. Controlli: (1,0,2) soddisfa 2−0−2=0 ✓ e ⟨v,n⟩=2−3+1=0 ✓. Distanza: |2−3−1|/√14=**2/√14=√14/7**.

**M2 (spettrale e forme quadratiche).** Sia q(x,y,z)=2x^{2}+2y^{2}+2z^{2}+2xy+2xz+2yz [INT]. La matrice è A=[[2,1,1],[1,2,1],[1,1,2]], con autovalori 1 (doppio) e 4 (autovettore (1,1,1)); il sottospazio $V_1$ è il piano x+y+z=0, con base ortogonale (−1,1,0), (−1,−1,2). Dunque una base ortonormale di autovettori è {(−1,1,0)/√2, (−1,−1,2)/√6, (1,1,1)/√3}, la forma canonica è **$Y1^{2}$+$Y2^{2}$+4Y3^{2}** e q è **definita positiva** (anche con Sylvester: Δ=2,3,4>0 [DA VERIFICARE se in programma]). Su ‖x‖=1 il minimo di q è 1 e il massimo 4 [INT]: negli assi principali q=$Y1^{2}$+$Y2^{2}$+4Y3^{2} con $Y1^{2}$+$Y2^{2}$+$Y3^{2}$=1. Il vettore (1,1,1) è anche quello di massimo allungamento per f(x)=Ax.

**M3 (sistema, kernel, rango).** Per $A_k$ come nell'Esercizio 6, si risolva $A_k$ x = 0 al variare di k: det $A_k$=1−k. Se k≠1 l'unica soluzione è x=0; se k=1 la matrice [[1,1],[1,1]] ha rango 1 e il nucleo è Span(1,−1). Di conseguenza $A_1$ ha 0 come autovalore (autovalori 0 e 2), in accordo con 1±√k=1±1 [INT].

---

## Cose da saper fare all'esame
- Scrivere la matrice di un endomorfismo di $R^{m,n}$, $R_n$[x] o $R^{n}$ in una base assegnata (attenzione all'ordine della base e alle colonne).
- Ricavare basi di Ker e Im, verificando dim Ker + dim Im = dim V.
- Calcolare $p_A$, autovalori, $m_a$, $m_g$, autospazi (riscritti come polinomi o matrici nel caso di $R_n$[x] / $R^{m,n}$).
- Decidere diagonalizzabilità su R e su C, e al variare di un parametro (casi critici: autovalori coincidenti), con calcolo di rk(A−λI).
- Costruire M e D con M^{-1}AM=D; per le simmetriche, M ortogonale con ᵗMAM=D.
- Collegare geometria e algebra: normale al piano, distanza, forma quadratica con carattere e forma canonica.

## Dubbi
- Esercizio 3: la matrice $A_k$ è letta dall'estrazione e potrebbe non coincidere con l'originale (la domanda "per quali k non è invertibile" suggerisce che il determinante dipenda da k) [DA VERIFICARE].
- Compiti $2022_{07}$ ($R^{2,2}$) e $2022_{09}$ ($R_{2}$[x] con base ($x^{2}$,x,1)): testi con coefficienti illeggibili; non risolti per non inventare [DA VERIFICARE sui PDF originali].
- I compiti 2019, 2020, 2023 contengono quiz di geometria (rette, piani) di cui ho usato solo i due più leggibili (file 12); non ho letto i quiz di tutti gli appelli.
