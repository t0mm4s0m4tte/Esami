# 10 - Autovalori, autovettori, diagonalizzazione (Algebra e Geometria)

**Fonte**: Buzano-Radeschi, Lezioni 17-18 (`Lezioni_17-18.pdf`), con le Lezioni 27 e 33 di Manno (slide manoscritte 2024, in OCR) per il criterio e la matrice diagonalizzante. Tutti gli esempi numerici verificati al computer; i segni persi nell'estrazione sono stati ricostruiti (indicato).

## Mappa

---

- [1. Definizioni](#1-definizioni)
- [2. Diagonalizzabilità](#2-diagonalizzabilità)
- [3. Polinomio caratteristico](#3-polinomio-caratteristico)
- [4. Autospazi e molteplicità](#4-autospazi-e-molteplicità)
- [5. Teorema di diagonalizzabilità](#5-teorema-di-diagonalizzabilità)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## 1. Definizioni

Un endomorfismo T: V→V può comportarsi in modo complicato, ma in certe direzioni agisce in modo semplicissimo: si limita ad allungare o accorciare il vettore. Un **autovettore** è un v≠0 con **T(v)=λv**, e lo scalare λ∈K è il corrispondente **autovalore**. Il vettore v non può essere nullo, mentre λ può essere 0. Se v è autovettore con autovalore λ, lo è anche ogni multiplo μv (μ≠0), con lo stesso λ: dunque a ogni autovalore corrisponde tutta una retta Span(v) privata dell'origine.

Rispetto a una base B, con A=[T]_B^B e x=[v]_B, la condizione T(v)=λv diventa Ax=λx, quindi si può studiare direttamente la matrice A (T = L_A).

Esempi: per A=[[3,-4],[0,2]] si ha Ae1=3e1 (autovalore 3) e A(4,1)=(8,2)=2(4,1) (autovalore 2), mentre e2 non è autovettore (Ae2=(-4,2)) [segno ricostruito]. La rotazione Rot_θ di angolo θ≠0,π non ha alcun autovettore reale, perché ruota ogni vettore; per θ=0,π è ±id e tutti i vettori sono autovettori.

## 2. Diagonalizzabilità

L'obiettivo è trovare una base in cui T abbia la forma più semplice possibile. **T è diagonalizzabile** ⇔ V ha una **base di autovettori** B={v1..vn}; in tale base [T]_B^B=diag(λ1,...,λn) (Prop 17.6: la matrice è diagonale ⇔ i vettori della base sono autovettori, e sulla diagonale compaiono gli autovalori). Per le matrici, **A è diagonalizzabile** ⇔ è simile a una diagonale, cioè esiste M invertibile con **D=M⁻¹AM** diagonale. La matrice diagonalizzante **M ha per colonne gli autovettori**, nell'ordine corrispondente agli autovalori su D: infatti AM=MD, scritta colonna per colonna, dice proprio Av_i=λ_iv_i. Un endomorfismo T è diagonalizzabile ⇔ lo è la sua matrice in una qualsiasi base (Prop 17.8).

Il vantaggio è enorme: il determinante di una diagonale è il prodotto degli elementi, i prodotti con una diagonale sono banali e soprattutto le potenze diventano facili, **Aᵏ = M Dᵏ M⁻¹**, con Dᵏ=diag(λ1ᵏ,...,λnᵏ).

**Esempio svolto** (17.11): A=[[3,-4],[0,2]], autovettori v1=(1,0) (λ=3), v2=(4,1) (λ=2): M=[[1,4],[0,1]], M⁻¹=[[1,-4],[0,1]], D=diag(3,2). **A¹⁰⁰ = M D¹⁰⁰ M⁻¹ = [[3¹⁰⁰, -4(3¹⁰⁰-2¹⁰⁰)],[0, 2¹⁰⁰]]** (controllo per k=2: A²=[[9,-20],[0,4]] = formula con 3²=9, -4(9-4)=-20 ✓).

## 3. Polinomio caratteristico

Per trovare gli autovalori non occorre indovinarli: sono le radici di un polinomio. Il **polinomio caratteristico** è **p_A(λ)=det(A-λI_n)** (talvolta si usa det(λI-A), che differisce per (-1)ⁿ), di grado n in λ, e **gli autovalori di T sono le radici di p_A** (Prop 17.13). Il ragionamento è una catena di equivalenze: λ è autovalore ⇔ esiste x≠0 con (A-λI)x=0 ⇔ A-λI non è invertibile ⇔ det(A-λI)=0.

Il polinomio caratteristico è un **invariante per similitudine**: se A~B allora p_A=p_B (si scrive A-λI = M⁻¹(B-λI)M e si usa Binet), perciò p_T è ben definito per un endomorfismo, indipendentemente dalla base. Si usano poi, come controlli, alcuni fatti noti ma non presenti in queste lezioni [DA VERIFICARE]: il coefficiente di λⁿ⁻¹ è ±traccia e il termine noto è det A, quindi:
- la somma degli autovalori è tr A;
- il prodotto è det A;
- A è invertibile ⇔ 0 non è autovalore.

**Esempio** (17.14): A=[[3,-4],[0,2]]: p_A=(3-λ)(2-λ) ⇒ autovalori 3, 2.

## 4. Autospazi e molteplicità

L'**autospazio** relativo a λ è V_λ = {v | T(v)=λv} = ker(T-λ·id) = ker(A-λI): l'insieme di tutti gli autovettori di λ insieme allo 0, quindi un sottospazio. Per calcolarlo si risolve il sistema (A-λI)x=0.

La **Prop 18.1** afferma che autovettori di autovalori **distinti** sono linearmente indipendenti (si procede per induzione su k: si applica T e si sottrae λ_k volte la combinazione). Ne discende il **Cor 18.2**: se p_T ha **n radici distinte in K**, allora T è diagonalizzabile; è una condizione sufficiente ma non necessaria. Più in generale gli autospazi sono in **somma diretta** V_λ1 ⊕ ... ⊕ V_λk (Prop 18.5; per due sottospazi, somma diretta significa V1∩V2={0}), e il **Cor 18.6** dice che T è diagonalizzabile ⇔ V = V_λ1 ⊕...⊕ V_λk, perché unendo le basi degli autospazi si ottiene una base di autovettori.

Per quantificare bisogna distinguere due molteplicità:
- la **molteplicità algebrica** m_a(λ) è la molteplicità di λ come radice di p_T;
- la **molteplicità geometrica** è m_g(λ)=dim V_λ = n - rk(A-λI).

Il **Teo 18.9** garantisce che **1 ≤ m_g(λ) ≤ m_a(λ)**; in particolare se m_a=1 allora m_g=1.

## 5. Teorema di diagonalizzabilità

Il criterio completo è il **Teo 18.10**: T (con dim V=n) è diagonalizzabile ⇔ valgono entrambe le condizioni seguenti.
1. p_T ha **n radici in K contate con molteplicità**, cioè si spezza in fattori di grado 1 su K (su C è sempre vero, su R no);
2. **m_a(λ)=m_g(λ)** per ogni autovalore λ.

La dimostrazione è un semplice conteggio: posto W=Σ V_λi, si ha dim W=Σ m_g ≤ Σ m_a ≤ n; T è diagonalizzabile ⇔ dim W=n ⇔ entrambe le disuguaglianze sono uguaglianze. Operativamente si procede così.
1. Calcolare p_A e le sue radici (in R o C a seconda del campo richiesto!).
2. Per ogni radice con m_a≥2 calcolare m_g=n-rk(A-λI).
3. Se sono tutte uguali ⇒ diagonalizzabile: trovare le basi degli autospazi per costruire M e poi D=M⁻¹AM.

**Esempio 18.8** (non diagonalizzabile): A=[[1,1],[0,1]]: p=(λ-1)², m_a(1)=2; A-I=[[0,1],[0,0]] rk 1 ⇒ m_g=1 ≠ 2 ⇒ **non diagonalizzabile**.

**Esempio 18.11** (segni ricostruiti): A=[[3,0,0],[-4,-1,-8],[0,0,3]]: p=(3-λ)²(-1-λ): λ=3 (m_a=2), λ=-1 (m_a=1 ⇒ m_g=1). A-3I=[[0,0,0],[-4,-4,-8],[0,0,0]] rk 1 ⇒ m_g(3)=3-1=2=m_a ⇒ **diagonalizzabile** (V_3=⟨(-1,1,0),(-2,0,1)⟩, V_{-1}=⟨(0,1,0)⟩, verificato).

**Esempio con parametro 18.12** (segni ricostruiti): A_k=[[3,k+4,1],[-1,-3,-1],[0,0,2]]. Il blocco 2×2 ha traccia 0 e det k-5 ⇒ **p_A=(2-λ)(λ²+k-5)**; radici 2, ±√(5-k). La discussione si fa per casi.
- k>5: λ²=5-k<0, una sola radice reale ⇒ non diagonalizzabile su R (lo sarebbe su C: 3 radici distinte).
- k<5, k≠1: tre radici reali distinte (2, ±√(5-k): coincidono con 2 solo se 5-k=4 ⇔ k=1; ±√ coincidono ⇔ k=5) ⇒ diagonalizzabile.
- k=1: autovalori -2, 2, 2: A-2I=[[1,5,1],[-1,-5,-1],[0,0,0]] rk 1 ⇒ m_g(2)=2=m_a ⇒ diagonalizzabile.
- k=5: autovalori 2, 0, 0: rk(A)=2 ⇒ m_g(0)=1 ≠ 2 ⇒ **non diagonalizzabile**.

Conclusione: **A_k diagonalizzabile su R ⇔ k<5.**

**Quiz dei compiti (ragionamenti rapidi)**. Nei quiz basta spesso ragionare su p_T e sulle molteplicità senza calcolare nulla.
- Matrice triangolare a blocchi con 1,1,2 sulla diagonale e un parametro k sotto la diagonale: la matrice [[1,0,0],[k,1,0],[0,0,2]] ha autovalore 1 doppio con A-I=[[0,0,0],[k,0,0],[0,0,1]]: rk=1 se k=0, rk=2 se k≠0 ⇒ m_g=2 solo per k=0 ⇒ **diagonalizzabile solo per k=0**. Analogamente per [[1,k,k],[0,1,0],[0,0,2]]: diag. solo per k=0 (verificato).
- f: R⁴→R⁴ simmetrico (spettrale) con p=t²(t-3)²: f diagonalizzabile ⇒ dim Ker=m_a(0)=2, due autospazi di dim 2, non suriettivo.
- Endomorfismo con p=t(t-3)³ non simmetrico: dim Ker(f)=m_g(0)=m_a(0)=1, dim Im=3, non suriettivo; non si può dire altro su V_3 (m_g ∈{1,2,3}).
- p(λ) = -λ³+3λ²-2λ = -λ(λ-1)(λ-2): tre radici distinte ⇒ diagonalizzabile; ha autovalore 0 ⇒ non biunivoca; autospazi distinti si intersecano solo in 0.

---

## Cose da saper fare all'esame
- Calcolare p_A, autovalori (con le molteplicità), autospazi con basi, decidere la diagonalizzabilità su R (e su C), trovare M e D (verificando AM=MD), calcolare Aᵏ.
- Discutere la diagonalizzabilità al variare di un parametro (casi critici: autovalori che coincidono ⇒ calcolare m_g).
- Dimostrare: Prop 17.13 (autovalori = radici), invarianza di p_A per similitudine, Prop 18.1 (indipendenza di autovettori con autovalori distinti), Cor 18.2, Teo 18.10, Cor 18.6.
- Usare le informazioni su p_T e sul nucleo per rispondere a quiz (suriettività, dimensione di Ker/Im, autospazi).
- Per endomorfismi f(x,y,z)=... dei compiti: matrice, Ker, Im, autovalori e autospazi, diagonalizzabilità (esercizi risolti nel file 15).

## Dubbi
- Convenzione p_A(λ)=det(A-λI) (Lezioni) vs det(λI-A) (Esercizio 26.4): stesso risultato a meno di segno; controllare quale usa il docente.
- Relazioni traccia/determinante-autovalori e l'uso di Cartesio (file 14) non compaiono nelle lezioni Buzano; sono nel materiale Manno.
