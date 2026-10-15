# 14 - Teorema spettrale, forme quadratiche, Cartesio, Sylvester, coniche (Algebra e Geometria)

**Fonte**: Buzano-Radeschi, Lezioni 25-26 (`Lezioni_25-26.pdf`: prodotti hermitiani, autoaggiunti, teorema spettrale), slide manoscritte di Manno `Lezione32_Alg.pdf` (forme quadratiche, forma canonica, carattere) e `Lezione33_Alg.pdf` (regola di Cartesio, coniche; OCR molto rumoroso). Il **criterio di Sylvester non compare in nessuna fonte** che ho letto: è riportato come teorema standard, marcato [DA VERIFICARE se in programma]. Calcoli miei: [INT], verificati al computer.

## Mappa
- Prodotti hermitiani, matrici hermitiane, endomorfismi autoaggiunti (25)
- Teorema spettrale e sua versione per matrici simmetriche (26)
- Forme quadratiche: forma canonica, carattere (definita, semidefinita, indefinita) (Manno 32)
- Regola di Cartesio per i segni degli autovalori (Manno 33)
- Criterio di Sylvester [DA VERIFICARE]
- Cenni alle coniche (Manno 33)

---

## 1. Prodotti hermitiani e matrici hermitiane

Nei file precedenti il campo era sempre R perché servivano positività e radici. Per avere un'analoga nozione di lunghezza sui complessi bisogna però modificare l'assioma di simmetria: un **prodotto hermitiano** su uno spazio complesso V è una funzione ⟨·,·⟩: V×V→C lineare nel primo argomento e con ⟨v,w⟩ = conj(⟨w,v⟩) (Def 25.1). Il coniugio non è un capriccio: serve a garantire che **⟨v,v⟩ sia un numero reale**, perché ⟨v,v⟩ è uguale al proprio coniugato, e solo così ha senso chiedere ⟨v,v⟩>0. Conseguenza: il prodotto è **sesquilineare**, lineare a sinistra e antilineare a destra, ⟨v,λw⟩=conj(λ)⟨v,w⟩. Se è definito positivo si definiscono come nel caso reale norma, ortogonalità, basi ortonormali, Gram-Schmidt. Il prototipo è il prodotto hermitiano euclideo su Cⁿ: **⟨x,y⟩=ᵗx·conj(y)**, definito positivo perché ⟨x,x⟩=|x1|²+...+|xn|².

Il ruolo delle matrici simmetriche passa alle **matrici hermitiane**, quelle con ᵗH = conj(H), cioè H_ij=conj(H_ji); la diagonale è quindi reale e una matrice reale è hermitiana ⇔ è simmetrica. Esempio: [[2, 1+i],[1−i, 1]]. Ogni H hermitiana definisce g_H(x,y)=ᵗx H conj(y) e la matrice associata a un prodotto in una base è H_ij=⟨v_i,v_j⟩.

## 2. Endomorfismi autoaggiunti

Un endomorfismo T: V→V (V reale con prodotto scalare definito positivo, o complesso con prodotto hermitiano definito positivo) è **autoaggiunto** se ⟨T(v),w⟩=⟨v,T(w)⟩ per ogni v,w (Def 25.5). Somiglia alla definizione di isometria, ma qui T non viene applicato ad entrambi i lati: lo si sposta da un lato all'altro. In una **base ortonormale** B vale la traduzione concreta: **T è autoaggiunto ⇔ la matrice A=[T]_B^B è hermitiana** (reale: simmetrica; Prop 25.6). Attenzione: la condizione "ortonormale" è essenziale. L'esempio 25.8 mostra che A=[[2,1],[1,1]] (simmetrica nella base canonica) resta simmetrica in un'altra base ortonormale ma, scritta in una base non ortonormale, può diventare non simmetrica (si ottiene [[0,1],[−1,3]]). Per Cn e Rⁿ con prodotto euclideo e base canonica (che è ortonormale) si ha: L_A autoaggiunto ⇔ A hermitiana (o simmetrica se reale) (Cor 25.7).

Un sottospazio U è **T-invariante** se T(U)⊆U. Per T autoaggiunto vale (Prop 25.10): se U è T-invariante allora lo è anche U^⊥. Dim: per v∈U^⊥ e u∈U, ⟨T(v),u⟩=⟨v,T(u)⟩=0 perché T(u)∈U. Questa proposizione è il motore dell'induzione nel teorema spettrale.

## 3. Il teorema spettrale

Abbiamo visto (file 10) che gli endomorfismi più semplici sono quelli diagonalizzabili, cioè con una base di autovettori. Il problema naturale è: quando la base di autovettori può essere scelta anche **ortonormale**? Il teorema spettrale risponde in modo completo.

**Teorema 26.1.** Un endomorfismo T: V→V è autoaggiunto ⇔ ha una base ortonormale di autovettori e tutti i suoi autovalori sono reali.

Dimostrazione (da saper esporre). (⇐) In una base ortonormale di autovettori la matrice è diagonale con elementi reali, quindi hermitiana, e si conclude con la Prop 25.6. (⇒) Caso complesso: gli autovalori sono reali perché, se T(v)=λv con v≠0, λ⟨v,v⟩=⟨T(v),v⟩=⟨v,T(v)⟩=conj(λ)⟨v,v⟩ e ⟨v,v⟩>0 dà λ=conj(λ). La base ortonormale si costruisce per induzione sulla dimensione: per n=1 è banale; per n>1 esiste un autovettore v (teorema fondamentale dell'algebra), Span(v) è T-invariante e quindi anche U=Span(v)^⊥ (Prop 25.10); T|_U è autoaggiunto in dimensione n−1, per ipotesi induttiva ha una base ortonormale di autovettori, e aggiungendo v normalizzato si ha la base di V. Una matrice reale simmetrica S ha quindi sempre autovalori reali (L_S su Cⁿ è autoaggiunto). Caso reale: l'argomento è identico una volta che si è provato che gli autovalori sono reali, e questo segue dal caso precedente applicato alla matrice simmetrica (che è anche hermitiana).

**Corollario 26.2 (versione matriciale).** Per A∈M(n,R) sono equivalenti:
1. A è simmetrica;
2. L_A ha una base ortonormale di autovettori;
3. esiste M **ortogonale** con **ᵗMAM = M⁻¹AM = D diagonale**.

Qui la comodità: M⁻¹=ᵗM, nessuna inversione.

Operativamente, per diagonalizzare una simmetrica A:
1. polinomio caratteristico e autovalori (tutti reali);
2. per ogni autovalore una base dell'autospazio, ortogonalizzata con Gram-Schmidt se la dimensione è ≥2 (autospazi di autovalori diversi sono già ortogonali);
3. normalizzare e mettere i vettori in colonna in M.

**Esempio (26.3).** A=[[3,1],[1,1]] simmetrica ha p=λ²−4λ+2, autovalori 2±√2 e autovettori (1, −1±√2), ortogonali fra loro (1+(√2−1)(−√2−1)=0 [INT, i simboli nell'estrazione sono rovinati]). B=[[3,1],[0,1]] non è simmetrica: gli autovettori (1,0) (λ=3) e (−1,2) (λ=1) hanno ⟨v1,v2⟩=−1≠0, e poiché ogni autovettore è multiplo di uno dei due non è possibile ottenere una base ortonormale di autovettori.

**Esempio (26.4).** A=[[1,0,1],[0,2,0],[1,0,1]], p_A=λ(λ−2)²: V_0=Span(1,0,−1), V_2=Span((1,0,1),(0,1,0)) (già ortogonali). Normalizzando: w1=(1/√2,0,−1/√2), w2=(1/√2,0,1/√2), w3=(0,1,0) è una base ortonormale di autovettori; M=[w1|w2|w3] è ortogonale e ᵗMAM=diag(0,2,2). Verificato al computer.

**Esempio (26.5, caso hermitiano).** A=[[2,i,i],[−i,1,0],[−i,0,1]] è hermitiana, autovalori 0,1,3 (tutti semplici), autovettori (1,i,i), (0,1,−1), (2i,1,1) già ortogonali: basta normalizzarli per avere W unitaria con W⁻¹=ᵗconj(W). Verificato.

## 4. Forme quadratiche: forma canonica e carattere

Il file 11 ha introdotto la forma quadratica q(x)=ᵗxSx con S simmetrica (i coefficienti dei termini misti si dividono a metà). La questione di questo file è: **che segno ha q?** (cioè se q(x)>0 per ogni x≠0, ecc.) La risposta passa per il teorema spettrale. Se si cambiano le coordinate con x=PX (P invertibile) la matrice diventa ᵗPAP (stessa legge di congruenza di prima), ancora simmetrica. Poiché A è simmetrica, esiste P **ortogonale** con ᵗPAP=diag(λ1,...,λn), dove λ_i sono gli autovalori di A (tutti reali): in queste coordinate la forma si legge **q = λ1X1² + λ2X2² + ... + λnXn²**, detta **forma canonica**. Il segno di q è allora governato dai segni dei λ_i.

Si dice che q (o la matrice A) è:
- **definita positiva** se tutti gli autovalori sono >0 (equivalente a q(x)>0 per ogni x≠0);
- **semidefinita positiva** se sono tutti ≥0 e almeno uno è =0 (q(x)≥0, e q si annulla su un sottospazio: il nucleo di A);
- **definita negativa** se tutti <0; **semidefinita negativa** se tutti ≤0 con almeno uno =0;
- **indefinita** se esistono due autovalori di segno opposto (q assume valori sia positivi che negativi, e si annulla su infiniti vettori non nulli).

La dimostrazione del legame con q(x) è immediata dalla forma canonica: poiché P è invertibile, x≠0 ⇔ X≠0 e q(x)=ΣλiXi². Nel semidefinito, un autovettore v relativo all'autovalore 0 soddisfa q(v)=ᵗvAv=0, quindi q si annulla su tutto Ker A.

**Esempi (Manno 32, verificati).**
- 5x²+14y²+4yz+11z²: matrice [[5,0,0],[0,14,2],[0,2,11]], autovalori 5,10,15, forma canonica 5X²+10Y²+15Z²: **definita positiva**.
- 2xy+2xz+2yz: matrice con zeri sulla diagonale e 1 altrove, autovalori 2,−1,−1: **indefinita**, forma canonica 2X²−Y²−Z².
- x²−2xy+y²: matrice [[1,−1],[−1,1]], autovalori 0,2: **semidefinita positiva**, forma 2Y² (in effetti q=(x−y)²).
- x²+4xy−2xz+4yz+z²: matrice [[1,2,−1],[2,0,2],[−1,2,1]], p=t³−2t²−8t+16 con radici 2, ±2√2: **indefinita**, quindi esiste (a,b,c)≠0 con q=0.

Due applicazioni tipiche dei quiz: "è vero che q(x,y,z)=0 ⇔ (x,y,z)=(0,0,0)?" si risolve con definita (positiva o negativa) sì, semidefinita o indefinita no; "q(x,y,x−y)≥0 per ogni x,y?" richiede di sostituire il vincolo e studiare la forma ristretta in due variabili (restrizione a un sottospazio).

## 5. Regola di Cartesio: segno delle radici senza risolvere

Per classificare q non occorre calcolare gli autovalori, basta sapere **quanti sono positivi, negativi e nulli**. Poiché il polinomio caratteristico di una matrice simmetrica ha tutte le radici reali (teorema spettrale), si può usare la regola di Cartesio di Manno 33, valida per polinomi a coefficienti reali con **tutte le radici reali**:
1. se il termine noto è 0 si estrae t^k (ogni fattore t è una radice nulla) e si lavora sul quoziente;
2. si ordinano i monomi da grado più alto a più basso, riempiendo con 0 quelli mancanti; se il coefficiente direttore è negativo si cambia segno al polinomio;
3. si scrive la riga dei segni (+ per coefficienti ≥0, − per coefficienti <0, quelli nulli contano come +);
4. ogni coppia di segni **concordi** attigui dà una radice **negativa**; ogni coppia **discorde** attigua dà una radice **positiva**.

**Esempio (Manno 33).** p(t)=−t⁴+11t²−18t+8: si passa a t⁴−11t²+18t−8, riga + + − + −: una coppia concorde e tre discordi ⇒ 1 radice negativa e 3 positive (con molteplicità). Infatti p=−(t−1)²(t−2)(t+4): radici 1 (doppia), 2, −4 ✓. **Esempio.** t⁵−13t³−12t² = t²(t³−13t−12): si estrae t² (due radici nulle), poi t³+0t²−13t−12 ha riga + + − −: le coppie sono (+,+) concorde, (+,−) discorde, (−,−) concorde ⇒ 2 radici negative e 1 positiva, come dice il testo ✓ [verificato: t³−13t−12=(t+1)(t+3)(t−4)]. Il polinomio di partenza ha quindi radici 0 (doppia), −1, −3, 4.

Esempi di uso: p(t)=−t³+7t²−9t+3 ha segni (cambiando segno) + − + −, tre discordanze ⇒ 3 radici positive ⇒ q definita positiva (Manno 32, es. 21). Per p=−t³+4t²−3t = −t(t²−4t+3): una radice nulla e, da t²−4t+3 (+ − +), due positive ⇒ semidefinita positiva; il nucleo è Span(−1,1,1) e q(−k,k,k)=0.

## 6. Criterio di Sylvester [DA VERIFICARE se in programma]

Questa sezione non deriva dalle fonti Buzano/Manno che ho letto, ma è un teorema standard che spesso sostituisce il calcolo degli autovalori per le matrici piccole: lo riporto come utile e lo segno come da verificare. Sia A simmetrica e Δ_k il determinante del minore principale in alto a sinistra k×k (Δ_1=a_11, Δ_2=det delle prime due righe/colonne, ..., Δ_n=det A).
- **A definita positiva ⇔ Δ_k>0 per ogni k=1..n.**
- **A definita negativa ⇔ gli Δ_k alternano il segno partendo da negativo**: Δ_1<0, Δ_2>0, Δ_3<0, ... cioè (−1)^kΔ_k>0.
- Se qualche Δ_k=0 il criterio **non è conclusivo** per la semidefinitezza (per i semidefiniti servono *tutti* i minori principali, non solo quelli in alto a sinistra). Se invece det A≠0 e i segni degli Δ_k non sono né tutti positivi né alternati, la forma è indefinita.

Perché funziona, intuitivamente: se q è definita positiva, la sua restrizione ai primi k vettori della base è ancora definita positiva e quindi il suo determinante è >0 (prodotto di autovalori positivi). Il viceversa si prova per induzione completando i quadrati.

**Esempi [INT].**
1. A=[[2,1],[1,3]]: Δ_1=2>0, Δ_2=5>0 ⇒ definita positiva (autovalori (5±√5)/2>0).
2. A=[[1,2],[2,1]]: Δ_2=−3<0 ⇒ non definita, di fatto indefinita (autovalori 3,−1).
3. A=[[2,−1,0],[−1,2,−1],[0,−1,2]]: Δ=2,3,4>0 ⇒ definita positiva (autovalori 2, 2±√2).
4. A=[[-2,1],[1,-3]]: Δ_1=−2<0, Δ_2=5>0 ⇒ definita negativa.
5. Con parametro: A_k=[[1,0,1],[0,2,0],[1,0,k]] ha Δ=1,2,2k−2: definita positiva ⇔ k>1; per k=1 è semidefinita positiva (autovalori 0,2,2); per k<1 è indefinita (Δ_1,Δ_2>0 ma det<0).

Per le forme con parametro (tipico dei compiti) si usa Sylvester o l'analisi dei segni di det e traccia: in dimensione 2, A è definita positiva ⇔ det>0 e traccia>0 (equivalente a Δ_1>0 e Δ_2>0).

## 7. Cenni alle coniche (Manno 33)

Una **conica** è il luogo in R² di un'equazione a x²+b xy+c y²+d x+e y+f=0. La parte quadratica ax²+bxy+cy² è proprio una forma quadratica, di matrice A_33=[[a, b/2],[b/2, c]]. Il metodo per riconoscerla è:
1. cercare il **centro**, cioè il punto (u,v) che risolve il sistema 2au+bv+d=0, bu+2cv+e=0 (le derivate parziali nulle); la conica è centrale se il sistema è compatibile;
2. traslare l'origine nel centro: x=X+u, y=Y+v elimina i termini lineari e dà aX²+bXY+cY²=−F(u,v);
3. ruotare con una P ortogonale (con det P=1, scambiando eventualmente le colonne) che diagonalizza A_33: nelle nuove coordinate l'equazione è **λ1X̃²+λ2Ỹ²=−F(u,v)**.

Gli **assi** sono le rette per il centro con direzione gli autospazi di A_33 (ortogonali fra loro per il teorema spettrale) e i **vertici** sono le intersezioni degli assi con la conica. Segni di λ1,λ2 e di −F(u,v) dicono il tipo:
- **ellisse**: λ1,λ2 concordi e concordi a −F;
- **iperbole**: λ discordi;
- **caso degenere**: −F(u,v)=0.

**Esempio [INT].** 3x²+2xy+3y²−8x−8y+4=0: il centro risolve 6u+2v−8=0, 2u+6v−8=0 ⇒ (1,1); F(1,1)=−4; A_33=[[3,1],[1,3]] ha autovalori 2 (autovettore (−1,1)) e 4 (autovettore (1,1)); nelle coordinate ruotate 2X̃²+4Ỹ²=4, cioè X̃²/2+Ỹ²=1: **ellisse** di centro (1,1), assi lungo (1,1) e (−1,1). Verificato.

---

## Cose da saper fare all'esame
- Riconoscere matrici hermitiane e simmetriche; stabilire se un endomorfismo è autoaggiunto (base ortonormale!).
- Enunciare e dimostrare il teorema spettrale (anche solo lo schema per induzione con U^⊥ invariante) e il Cor 26.2.
- Trovare una base ortonormale di autovettori e la matrice ortogonale M con ᵗMAM=D; verificare ᵗMM=I.
- Dato un polinomio omogeneo di grado 2: matrice simmetrica, forma canonica, carattere (definita/semi/indefinita) con autovalori o con Cartesio o con Sylvester [DA VERIFICARE].
- Discutere il carattere di q al variare di un parametro (Sylvester o det/traccia).
- Applicare la regola di Cartesio al polinomio caratteristico di una simmetrica (sempre radici reali).
- Rispondere a "q=0 ⇔ vettore nullo?" e al segno di q ristretta a un sottospazio.
- Riconoscere una conica: centro, traslazione, rotazione, tipo, assi.

## Dubbi
- **Criterio di Sylvester**: nessuna fonte fra quelle consultate lo cita; da confermare se il docente lo usa o si limita ad autovalori / Cartesio. [DA VERIFICARE]
- **Coniche**: nelle slide Manno compaiono dopo le forme quadratiche; non sono in Buzano. Verificare se sono in programma (README: programma non confermato).
- L'OCR delle slide Manno (Lezione32_Alg, Lezione33_Alg) è molto rumoroso: gli esempi riportati sono stati ricontrollati calcolando; la dimostrazione dettagliata sugli assi della conica (Lezione33, pag. 12) non è stata ricostruita.
- Esempio 26.3: i simboli degli autovettori sono rovinati nell'estrazione; la matrice A=[[3,1],[1,1]] è ricostruita dagli autovalori 2±√2 [DA VERIFICARE].
