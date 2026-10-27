# 14 - Teorema spettrale, forme quadratiche, Cartesio, Sylvester, coniche (Algebra e Geometria)

**Fonte**: Buzano-Radeschi, Lezioni 25-26 (`Lezioni_25-26.pdf`: prodotti hermitiani, autoaggiunti, teorema spettrale), slide manoscritte di Manno `Lezione32_Alg.pdf` (forme quadratiche, forma canonica, carattere) e `Lezione33_Alg.pdf` (regola di Cartesio, coniche; OCR molto rumoroso). Il **criterio di Sylvester non compare in nessuna fonte** che ho letto: è riportato come teorema standard, marcato [DA VERIFICARE se in programma]. Calcoli miei: [INT], verificati al computer.

## Mappa

---

- [1. Prodotti hermitiani e matrici hermitiane](#1-prodotti-hermitiani-e-matrici-hermitiane)
- [2. Endomorfismi autoaggiunti](#2-endomorfismi-autoaggiunti)
- [3. Il teorema spettrale](#3-il-teorema-spettrale)
- [4. Forme quadratiche: forma canonica e carattere](#4-forme-quadratiche-forma-canonica-e-carattere)
- [5. Regola di Cartesio: segno delle radici senza risolvere](#5-regola-di-cartesio-segno-delle-radici-senza-risolvere)
- [6. Criterio di Sylvester [DA VERIFICARE se in programma]](#6-criterio-di-sylvester-da-verificare-se-in-programma)
- [7. Cenni alle coniche (Manno 33)](#7-cenni-alle-coniche-manno-33)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## 1. Prodotti hermitiani e matrici hermitiane

Nei file precedenti il campo era sempre $\mathbb{R}$ perché servivano positività e radici. Per avere un'analoga nozione di lunghezza sui complessi bisogna però modificare l'assioma di simmetria: un **prodotto hermitiano** su uno spazio complesso $V$ è una funzione $\langle\cdot,\cdot\rangle: V\times V\to\mathbb{C}$ lineare nel primo argomento e con $\langle v,w\rangle = \overline{\langle w,v\rangle}$ (Def 25.1). Il coniugio non è un capriccio: serve a garantire che $\boldsymbol{\langle v,v\rangle}$ **sia un numero reale**, perché $\langle v,v\rangle$ è uguale al proprio coniugato, e solo così ha senso chiedere $\langle v,v\rangle\gt 0$. Conseguenza: il prodotto è **sesquilineare**, lineare a sinistra e antilineare a destra, $\langle v,\lambda w\rangle=\bar\lambda\langle v,w\rangle$. Se è definito positivo si definiscono come nel caso reale norma, ortogonalità, basi ortonormali, Gram-Schmidt. Il prototipo è il prodotto hermitiano euclideo su $\mathbb{C}^n$: $\boldsymbol{\langle x,y\rangle={}^tx\cdot\bar y}$, definito positivo perché $\langle x,x\rangle=\lvert x_1\rvert^2+\dots+\lvert x_n\rvert^2$.

Il ruolo delle matrici simmetriche passa alle **matrici hermitiane**, quelle con ${}^tH = \bar H$, cioè $H_{ij}=\overline{H_{ji}}$; la diagonale è quindi reale e una matrice reale è hermitiana $\iff$ è simmetrica. Esempio: $\begin{pmatrix}2&1+i\\1-i&1\end{pmatrix}$. Ogni $H$ hermitiana definisce $g_H(x,y)={}^txH\bar y$ e la matrice associata a un prodotto in una base è $H_{ij}=\langle v_i,v_j\rangle$.

## 2. Endomorfismi autoaggiunti

Un endomorfismo $T: V\to V$ ($V$ reale con prodotto scalare definito positivo, o complesso con prodotto hermitiano definito positivo) è **autoaggiunto** se $\langle T(v),w\rangle=\langle v,T(w)\rangle$ per ogni $v,w$ (Def 25.5). Somiglia alla definizione di isometria, ma qui $T$ non viene applicato ad entrambi i lati: lo si sposta da un lato all'altro. In una **base ortonormale** $B$ vale la traduzione concreta: **$T$ è autoaggiunto $\iff$ la matrice $A=[T]_B^B$ è hermitiana** (reale: simmetrica; Prop 25.6). Attenzione: la condizione "ortonormale" è essenziale. L'esempio 25.8 mostra che $A=\begin{pmatrix}2&1\\1&1\end{pmatrix}$ (simmetrica nella base canonica) resta simmetrica in un'altra base ortonormale ma, scritta in una base non ortonormale, può diventare non simmetrica (si ottiene $\begin{pmatrix}0&1\\-1&3\end{pmatrix}$). Per $\mathbb{C}^n$ e $\mathbb{R}^n$ con prodotto euclideo e base canonica (che è ortonormale) si ha: $L_A$ autoaggiunto $\iff A$ hermitiana (o simmetrica se reale) (Cor 25.7).

Un sottospazio $U$ è **$T$-invariante** se $T(U)\subseteq U$. Per $T$ autoaggiunto vale (Prop 25.10): se $U$ è $T$-invariante allora lo è anche $U^\perp$. Dim: per $v\in U^\perp$ e $u\in U$, $\langle T(v),u\rangle=\langle v,T(u)\rangle=0$ perché $T(u)\in U$. Questa proposizione è il motore dell'induzione nel teorema spettrale.

## 3. Il teorema spettrale

Abbiamo visto (file 10) che gli endomorfismi più semplici sono quelli diagonalizzabili, cioè con una base di autovettori. Il problema naturale è: quando la base di autovettori può essere scelta anche **ortonormale**? Il teorema spettrale risponde in modo completo.

**Teorema 26.1.** Un endomorfismo $T: V\to V$ è autoaggiunto $\iff$ ha una base ortonormale di autovettori e tutti i suoi autovalori sono reali.

Dimostrazione (da saper esporre). ($\Leftarrow$) In una base ortonormale di autovettori la matrice è diagonale con elementi reali, quindi hermitiana, e si conclude con la Prop 25.6. ($\Rightarrow$) Caso complesso: gli autovalori sono reali perché, se $T(v)=\lambda v$ con $v\ne 0$, $\lambda\langle v,v\rangle=\langle T(v),v\rangle=\langle v,T(v)\rangle=\bar\lambda\langle v,v\rangle$ e $\langle v,v\rangle\gt 0$ dà $\lambda=\bar\lambda$. La base ortonormale si costruisce per induzione sulla dimensione: per $n=1$ è banale; per $n\gt 1$ esiste un autovettore $v$ (teorema fondamentale dell'algebra), $\text{Span}(v)$ è $T$-invariante e quindi anche $U=\text{Span}(v)^\perp$ (Prop 25.10); $T\vert_U$ è autoaggiunto in dimensione $n-1$, per ipotesi induttiva ha una base ortonormale di autovettori, e aggiungendo $v$ normalizzato si ha la base di $V$. Una matrice reale simmetrica $S$ ha quindi sempre autovalori reali ($L_S$ su $\mathbb{C}^n$ è autoaggiunto). Caso reale: l'argomento è identico una volta che si è provato che gli autovalori sono reali, e questo segue dal caso precedente applicato alla matrice simmetrica (che è anche hermitiana).

**Corollario 26.2 (versione matriciale).** Per $A\in M(n,\mathbb{R})$ sono equivalenti:
1. $A$ è simmetrica;
2. $L_A$ ha una base ortonormale di autovettori;
3. esiste $M$ **ortogonale** con $\boldsymbol{{}^tMAM = M^{-1}AM = D}$ diagonale.

Qui la comodità: $M^{-1}={}^tM$, nessuna inversione.

Operativamente, per diagonalizzare una simmetrica $A$:
1. polinomio caratteristico e autovalori (tutti reali);
2. per ogni autovalore una base dell'autospazio, ortogonalizzata con Gram-Schmidt se la dimensione è $\ge 2$ (autospazi di autovalori diversi sono già ortogonali);
3. normalizzare e mettere i vettori in colonna in $M$.

**Esempio (26.3).** $A=\begin{pmatrix}3&1\\1&1\end{pmatrix}$ simmetrica ha $p=\lambda^2-4\lambda+2$, autovalori $2\pm\sqrt2$ e autovettori $(1,\ -1\pm\sqrt2)$, ortogonali fra loro ($1+(\sqrt2-1)(-\sqrt2-1)=0$ [INT, i simboli nell'estrazione sono rovinati]). $B=\begin{pmatrix}3&1\\0&1\end{pmatrix}$ non è simmetrica: gli autovettori $(1,0)$ ($\lambda=3$) e $(-1,2)$ ($\lambda=1$) hanno $\langle v_1,v_2\rangle=-1\ne 0$, e poiché ogni autovettore è multiplo di uno dei due non è possibile ottenere una base ortonormale di autovettori.

**Esempio (26.4).** $A=\begin{pmatrix}1&0&1\\0&2&0\\1&0&1\end{pmatrix}$, $p_A=\lambda(\lambda-2)^2$: $V_0=\text{Span}(1,0,-1)$, $V_2=\text{Span}((1,0,1),(0,1,0))$ (già ortogonali). Normalizzando: $w_1=(1/\sqrt2,0,-1/\sqrt2)$, $w_2=(1/\sqrt2,0,1/\sqrt2)$, $w_3=(0,1,0)$ è una base ortonormale di autovettori; $M=(w_1\mid w_2\mid w_3)$ è ortogonale e ${}^tMAM=\text{diag}(0,2,2)$. Verificato al computer.

**Esempio (26.5, caso hermitiano).** $A=\begin{pmatrix}2&i&i\\-i&1&0\\-i&0&1\end{pmatrix}$ è hermitiana, autovalori $0,1,3$ (tutti semplici), autovettori $(1,i,i)$, $(0,1,-1)$, $(2i,1,1)$ già ortogonali: basta normalizzarli per avere $W$ unitaria con $W^{-1}={}^t\bar W$. Verificato.

## 4. Forme quadratiche: forma canonica e carattere

Il file 11 ha introdotto la forma quadratica $q(x)={}^txSx$ con $S$ simmetrica (i coefficienti dei termini misti si dividono a metà). La questione di questo file è: **che segno ha $q$?** (cioè se $q(x)\gt 0$ per ogni $x\ne 0$, ecc.) La risposta passa per il teorema spettrale. Se si cambiano le coordinate con $x=PX$ ($P$ invertibile) la matrice diventa ${}^tPAP$ (stessa legge di congruenza di prima), ancora simmetrica. Poiché $A$ è simmetrica, esiste $P$ **ortogonale** con ${}^tPAP=\text{diag}(\lambda_1,\dots,\lambda_n)$, dove $\lambda_i$ sono gli autovalori di $A$ (tutti reali): in queste coordinate la forma si legge $\boldsymbol{q = \lambda_1X_1^2 + \lambda_2X_2^2 + \dots + \lambda_nX_n^2}$, detta **forma canonica**. Il segno di $q$ è allora governato dai segni dei $\lambda_i$.

Si dice che $q$ (o la matrice $A$) è:
- **definita positiva** se tutti gli autovalori sono $\gt 0$ (equivalente a $q(x)\gt 0$ per ogni $x\ne 0$);
- **semidefinita positiva** se sono tutti $\ge 0$ e almeno uno è $=0$ ($q(x)\ge 0$, e $q$ si annulla su un sottospazio: il nucleo di $A$);
- **definita negativa** se tutti $\lt 0$; **semidefinita negativa** se tutti $\le 0$ con almeno uno $=0$;
- **indefinita** se esistono due autovalori di segno opposto ($q$ assume valori sia positivi che negativi, e si annulla su infiniti vettori non nulli).

La dimostrazione del legame con $q(x)$ è immediata dalla forma canonica: poiché $P$ è invertibile, $x\ne 0\iff X\ne 0$ e $q(x)=\sum\lambda_iX_i^2$. Nel semidefinito, un autovettore $v$ relativo all'autovalore 0 soddisfa $q(v)={}^tvAv=0$, quindi $q$ si annulla su tutto $\text{Ker}\,A$.

**Esempi (Manno 32, verificati).**
- $5x^2+14y^2+4yz+11z^2$: matrice $\begin{pmatrix}5&0&0\\0&14&2\\0&2&11\end{pmatrix}$, autovalori $5,10,15$, forma canonica $5X^2+10Y^2+15Z^2$: **definita positiva**.
- $2xy+2xz+2yz$: matrice con zeri sulla diagonale e 1 altrove, autovalori $2,-1,-1$: **indefinita**, forma canonica $2X^2-Y^2-Z^2$.
- $x^2-2xy+y^2$: matrice $\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$, autovalori $0,2$: **semidefinita positiva**, forma $2Y^2$ (in effetti $q=(x-y)^2$).
- $x^2+4xy-2xz+4yz+z^2$: matrice $\begin{pmatrix}1&2&-1\\2&0&2\\-1&2&1\end{pmatrix}$, $p=t^3-2t^2-8t+16$ con radici $2,\ \pm2\sqrt2$: **indefinita**, quindi esiste $(a,b,c)\ne 0$ con $q=0$.

Due applicazioni tipiche dei quiz: "è vero che $q(x,y,z)=0\iff(x,y,z)=(0,0,0)$?" si risolve con definita (positiva o negativa) sì, semidefinita o indefinita no; "$q(x,y,x-y)\ge 0$ per ogni $x,y$?" richiede di sostituire il vincolo e studiare la forma ristretta in due variabili (restrizione a un sottospazio).

## 5. Regola di Cartesio: segno delle radici senza risolvere

Per classificare $q$ non occorre calcolare gli autovalori, basta sapere **quanti sono positivi, negativi e nulli**. Poiché il polinomio caratteristico di una matrice simmetrica ha tutte le radici reali (teorema spettrale), si può usare la regola di Cartesio di Manno 33, valida per polinomi a coefficienti reali con **tutte le radici reali**:
1. se il termine noto è 0 si estrae $t^k$ (ogni fattore $t$ è una radice nulla) e si lavora sul quoziente;
2. si ordinano i monomi da grado più alto a più basso, riempiendo con 0 quelli mancanti; se il coefficiente direttore è negativo si cambia segno al polinomio;
3. si scrive la riga dei segni ($+$ per coefficienti $\ge 0$, $-$ per coefficienti $\lt 0$, quelli nulli contano come $+$);
4. ogni coppia di segni **concordi** attigui dà una radice **negativa**; ogni coppia **discorde** attigua dà una radice **positiva**.

**Esempio (Manno 33).** $p(t)=-t^4+11t^2-18t+8$: si passa a $t^4-11t^2+18t-8$, riga $+\ +\ -\ +\ -$: una coppia concorde e tre discordi $\Rightarrow$ 1 radice negativa e 3 positive (con molteplicità). Infatti $p=-(t-1)^2(t-2)(t+4)$: radici $1$ (doppia), $2$, $-4$ ✓. **Esempio.** $t^5-13t^3-12t^2 = t^2(t^3-13t-12)$: si estrae $t^2$ (due radici nulle), poi $t^3+0t^2-13t-12$ ha riga $+\ +\ -\ -$: le coppie sono $(+,+)$ concorde, $(+,-)$ discorde, $(-,-)$ concorde $\Rightarrow$ 2 radici negative e 1 positiva, come dice il testo ✓ [verificato: $t^3-13t-12=(t+1)(t+3)(t-4)$]. Il polinomio di partenza ha quindi radici $0$ (doppia), $-1$, $-3$, $4$.

Esempi di uso: $p(t)=-t^3+7t^2-9t+3$ ha segni (cambiando segno) $+\ -\ +\ -$, tre discordanze $\Rightarrow$ 3 radici positive $\Rightarrow$ $q$ definita positiva (Manno 32, es. 21). Per $p=-t^3+4t^2-3t = -t(t^2-4t+3)$: una radice nulla e, da $t^2-4t+3$ ($+\ -\ +$), due positive $\Rightarrow$ semidefinita positiva; il nucleo è $\text{Span}(-1,1,1)$ e $q(-k,k,k)=0$.

## 6. Criterio di Sylvester [DA VERIFICARE se in programma]

Questa sezione non deriva dalle fonti Buzano/Manno che ho letto, ma è un teorema standard che spesso sostituisce il calcolo degli autovalori per le matrici piccole: lo riporto come utile e lo segno come da verificare. Sia $A$ simmetrica e $\Delta_k$ il determinante del minore principale in alto a sinistra $k\times k$ ($\Delta_1=a_{11}$, $\Delta_2=\det$ delle prime due righe/colonne, ..., $\Delta_n=\det A$).
- **$A$ definita positiva $\iff \Delta_k\gt 0$ per ogni $k=1..n$.**
- **$A$ definita negativa $\iff$ i $\Delta_k$ alternano il segno partendo da negativo**: $\Delta_1\lt 0$, $\Delta_2\gt 0$, $\Delta_3\lt 0$, ... cioè $(-1)^k\Delta_k\gt 0$.
- Se qualche $\Delta_k=0$ il criterio **non è conclusivo** per la semidefinitezza (per i semidefiniti servono *tutti* i minori principali, non solo quelli in alto a sinistra). Se invece $\det A\ne 0$ e i segni dei $\Delta_k$ non sono né tutti positivi né alternati, la forma è indefinita.

Perché funziona, intuitivamente: se $q$ è definita positiva, la sua restrizione ai primi $k$ vettori della base è ancora definita positiva e quindi il suo determinante è $\gt 0$ (prodotto di autovalori positivi). Il viceversa si prova per induzione completando i quadrati.

**Esempi [INT].**
1. $A=\begin{pmatrix}2&1\\1&3\end{pmatrix}$: $\Delta_1=2\gt 0$, $\Delta_2=5\gt 0$ $\Rightarrow$ definita positiva (autovalori $(5\pm\sqrt5)/2\gt 0$).
2. $A=\begin{pmatrix}1&2\\2&1\end{pmatrix}$: $\Delta_2=-3\lt 0$ $\Rightarrow$ non definita, di fatto indefinita (autovalori $3,-1$).
3. $A=\begin{pmatrix}2&-1&0\\-1&2&-1\\0&-1&2\end{pmatrix}$: $\Delta=2,3,4\gt 0$ $\Rightarrow$ definita positiva (autovalori $2,\ 2\pm\sqrt2$).
4. $A=\begin{pmatrix}-2&1\\1&-3\end{pmatrix}$: $\Delta_1=-2\lt 0$, $\Delta_2=5\gt 0$ $\Rightarrow$ definita negativa.
5. Con parametro: $A_k=\begin{pmatrix}1&0&1\\0&2&0\\1&0&k\end{pmatrix}$ ha $\Delta=1,2,2k-2$: definita positiva $\iff k\gt 1$; per $k=1$ è semidefinita positiva (autovalori $0,2,2$); per $k\lt 1$ è indefinita ($\Delta_1,\Delta_2\gt 0$ ma $\det\lt 0$).

Per le forme con parametro (tipico dei compiti) si usa Sylvester o l'analisi dei segni di $\det$ e traccia: in dimensione 2, $A$ è definita positiva $\iff \det\gt 0$ e traccia $\gt 0$ (equivalente a $\Delta_1\gt 0$ e $\Delta_2\gt 0$).

## 7. Cenni alle coniche (Manno 33)

Una **conica** è il luogo in $\mathbb{R}^2$ di un'equazione $a x^2+b xy+c y^2+d x+e y+f=0$. La parte quadratica $ax^2+bxy+cy^2$ è proprio una forma quadratica, di matrice $A_{33}=\begin{pmatrix}a&b/2\\b/2&c\end{pmatrix}$. Il metodo per riconoscerla è:
1. cercare il **centro**, cioè il punto $(u,v)$ che risolve il sistema $2au+bv+d=0$, $bu+2cv+e=0$ (le derivate parziali nulle); la conica è centrale se il sistema è compatibile;
2. traslare l'origine nel centro: $x=X+u$, $y=Y+v$ elimina i termini lineari e dà $aX^2+bXY+cY^2=-F(u,v)$;
3. ruotare con una $P$ ortogonale (con $\det P=1$, scambiando eventualmente le colonne) che diagonalizza $A_{33}$: nelle nuove coordinate l'equazione è $\boldsymbol{\lambda_1\tilde X^2+\lambda_2\tilde Y^2=-F(u,v)}$.

Gli **assi** sono le rette per il centro con direzione gli autospazi di $A_{33}$ (ortogonali fra loro per il teorema spettrale) e i **vertici** sono le intersezioni degli assi con la conica. Segni di $\lambda_1,\lambda_2$ e di $-F(u,v)$ dicono il tipo:
- **ellisse**: $\lambda_1,\lambda_2$ concordi e concordi a $-F$;
- **iperbole**: $\lambda$ discordi;
- **caso degenere**: $-F(u,v)=0$.

**Esempio [INT].** $3x^2+2xy+3y^2-8x-8y+4=0$: il centro risolve $6u+2v-8=0$, $2u+6v-8=0$ $\Rightarrow$ $(1,1)$; $F(1,1)=-4$; $A_{33}=\begin{pmatrix}3&1\\1&3\end{pmatrix}$ ha autovalori 2 (autovettore $(-1,1)$) e 4 (autovettore $(1,1)$); nelle coordinate ruotate $2\tilde X^2+4\tilde Y^2=4$, cioè $\tilde X^2/2+\tilde Y^2=1$: **ellisse** di centro $(1,1)$, assi lungo $(1,1)$ e $(-1,1)$. Verificato.

---

## Esercizi svolti collegati

Il riconoscimento di un prodotto hermitiano dalla matrice (diagonale reale, $a_{ij}=\overline{a_{ji}}$) e la domanda su quale operatore è autoaggiunto sono nel quiz: [17-esami-ag-2024-2025.md](17-esami-ag-2024-2025.md#quiz-le-domande-che-tornano). Il teorema spettrale compare nella base ortonormale di un autospazio (Esempio 1).

## Cose da saper fare all'esame
- Riconoscere matrici hermitiane e simmetriche; stabilire se un endomorfismo è autoaggiunto (base ortonormale!).
- Enunciare e dimostrare il teorema spettrale (anche solo lo schema per induzione con $U^\perp$ invariante) e il Cor 26.2.
- Trovare una base ortonormale di autovettori e la matrice ortogonale $M$ con ${}^tMAM=D$; verificare ${}^tMM=I$.
- Dato un polinomio omogeneo di grado 2: matrice simmetrica, forma canonica, carattere (definita/semi/indefinita) con autovalori o con Cartesio o con Sylvester [DA VERIFICARE].
- Discutere il carattere di $q$ al variare di un parametro (Sylvester o det/traccia).
- Applicare la regola di Cartesio al polinomio caratteristico di una simmetrica (sempre radici reali).
- Rispondere a "$q=0\iff$ vettore nullo?" e al segno di $q$ ristretta a un sottospazio.
- Riconoscere una conica: centro, traslazione, rotazione, tipo, assi.

## Dubbi
- **Criterio di Sylvester**: nessuna fonte fra quelle consultate lo cita; da confermare se il docente lo usa o si limita ad autovalori / Cartesio. [DA VERIFICARE]
- **Coniche**: nelle slide Manno compaiono dopo le forme quadratiche; non sono in Buzano. Verificare se sono in programma (README: programma non confermato).
- L'OCR delle slide Manno (Lezione32_Alg, Lezione33_Alg) è molto rumoroso: gli esempi riportati sono stati ricontrollati calcolando; la dimostrazione dettagliata sugli assi della conica (Lezione33, pag. 12) non è stata ricostruita.
- Esempio 26.3: i simboli degli autovettori sono rovinati nell'estrazione; la matrice $A=\begin{pmatrix}3&1\\1&1\end{pmatrix}$ compare direttamente nel testo (fonte: Buzano, Lezioni_25-26.pdf, Esercizio 26.3), con autovalori $2\pm\sqrt2$ (calcolo verificato: traccia 4, det 2).