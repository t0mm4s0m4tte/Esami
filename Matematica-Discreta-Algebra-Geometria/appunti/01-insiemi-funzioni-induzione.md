# 01 - Insiemi, funzioni, induzione (Matematica Discreta)

**Fonte**: A. Mori, *Lezioni di Matematica Discreta* (Drive, cartella Algebra e Geometria), capp. 1-2 (letti per intero dal PDF). Gli esercizi 1.x e 2.x del libro sono citati come riferimento per allenarsi.
**Parte del corso**: Matematica Discreta (esame unico MDAG, 12 CFU).

## Mappa degli argomenti
- Insiemi: definizione, appartenenza, quantificatori e loro negazione, insieme vuoto, cardinalità
- Sottoinsiemi, insieme delle parti P(A), doppia inclusione
- N e assiomi di Peano, principio di induzione (esempi)
- Operazioni: intersezione, unione, differenza, complementare, De Morgan, distributività
- Ricoprimenti, partizioni, insieme quoziente, problema della buona definizione
- Prodotto cartesiano
- Funzioni: dominio/codominio/grafico, immagine, controimmagine, iniettiva/suriettiva/biettiva
- Composizione, funzione inversa, operazioni binarie, elemento neutro, invertibili, potenze

---

## 1. Insiemi: definizioni base

Tutta la matematica del corso poggia sul linguaggio degli insiemi, quindi conviene fissarlo con precisione. Un **insieme** è una collezione *ben definita* di oggetti distinti: non contano le ripetizioni ({0,0,1} = {0,1}) né l'ordine. Gli elementi possono a loro volta essere insiemi, ma attenzione: se B ∈ A, gli elementi di B non sono in generale elementi di A. Un insieme si definisce per elenco, {a,b,c}, oppure per proprietà, X = {x ∈ U | P(x)}, dove U è l'insieme universale (l'ambiente in cui si lavora).

Quasi ogni dimostrazione successiva richiede di saper **negare un enunciato con quantificatori**. La regola è meccanica: negare "per ogni" significa "ne esiste almeno uno per cui non vale", e negare "esiste" significa "per nessuno vale". In formule:
- ¬(∀x∈A, P(x)) ⇔ ∃x∈A, ¬P(x)
- ¬(∃x∈A, P(x)) ⇔ ∀x∈A, ¬P(x)

L'**insieme vuoto** ∅ = {} non ha elementi, e va distinto da {∅}, che ne ha uno. La cardinalità |A| è il numero di elementi di A.

Un insieme B è **sottoinsieme** di A (B ⊆ A) se ogni elemento di B sta in A; i sottoinsiemi banali sono ∅ e A stesso. L'**insieme delle parti** P(A) = {B | B ⊆ A} raccoglie tutti i sottoinsiemi: ad esempio P(∅) = {∅}, mentre P({a,b,c}) ha 8 elementi (∅, 3 singoletti, 3 coppie, A). Per dimostrare che due insiemi coincidono si usa quasi sempre la **doppia inclusione**: A = B ⇔ A ⊆ B e B ⊆ A.

## 2. Numeri naturali e induzione

I naturali sono caratterizzati dagli assiomi di Peano: (1) 0∈N; (2) ogni n ha un successore s(n); (3) s è iniettiva; (4) 0 ≠ s(n) per ogni n; (5) se U⊆N contiene 0 ed è chiuso per successore allora U = N. L'ultimo assioma è il **principio di induzione**, ed è il motivo per cui si può dimostrare una proprietà di tutti i naturali verificandola solo su un punto di partenza e sul passaggio da n a n+1: la "scala" parte dal primo gradino e ogni gradino sorregge il successivo.

**Teorema (induzione)**: se P(0) è vera e ∀n (P(n) ⇒ P(n+1)), allora P(n) è vera per ogni n. Spesso si parte da n=1 o da un n0 diverso: si dimostra il passo base e poi il passo induttivo, in cui si assume vera P(n) (ipotesi induttiva) per dedurne P(n+1).

**Esempio svolto 1** - Σ_{k=1}^n k² = n(n+1)(2n+1)/6.
Base n=1: 1 = 1·2·3/6 ✓. Passo: Σ_{k=1}^{n+1} k² = n(n+1)(2n+1)/6 + (n+1)² = (n+1)[n(2n+1)+6(n+1)]/6 = (n+1)(2n²+7n+6)/6 = (n+1)(n+2)(2n+3)/6 ✓.

**Esempio svolto 2** - |A| = n ⇒ |P(A)| = 2ⁿ.
Base n=0: P(∅)={∅} ha 1 = 2⁰ elemento. Passo: sia A={a1..a_{n+1}}. I sottoinsiemi che NON contengono a_{n+1} sono i sottoinsiemi di B={a1..an}, quindi 2ⁿ per ipotesi induttiva; quelli che lo contengono sono in corrispondenza biunivoca con i primi (si aggiunge o si toglie a_{n+1}) e danno altri 2ⁿ. Totale 2·2ⁿ = 2ⁿ⁺¹.

Altre formule da saper dimostrare per induzione (Es. 1.19 Mori): 1+2+...+n = n(n+1)/2; 1+3+...+(2n-1) = n²; 1³+...+n³ = n²(n+1)²/4; n² > 2n+1 per n≥3; 2ⁿ > n² per n≥5 (nelle ultime due la base è rispettivamente n=3 e n=5, non n=0).

## 3. Operazioni tra insiemi

Dati due insiemi si possono fabbricare nuovi insiemi con le operazioni booleane: l'intersezione A∩B = {x | x∈A e x∈B} (A e B sono disgiunti se A∩B=∅) e l'unione A∪B = {x | x∈A oppure x∈B}. Le stesse operazioni si estendono a famiglie arbitrarie {A_i}_{i∈I}: l'intersezione è {x | x∈A_i ∀i} e l'unione {x | ∃i: x∈A_i}. Un esempio istruttivo: con A_n=(-1/n,1/n) si ha ∩A_n={0}, mentre con B_n=(-n,n) si ha ∪B_n=R.

La differenza X\A = {x∈X | x∉A} diventa, quando A⊆X, il complementare C_X(A) = X\A, e vale C_X(C_X(A)) = A. Intersezione e unione si distribuiscono l'una sull'altra, e il complementare le scambia (leggi di De Morgan):
- **Distributività**: (A∪B)∩C = (A∩C)∪(B∩C); (A∩B)∪C = (A∪C)∩(B∪C).
- **De Morgan**: C(A∪B) = C(A)∩C(B); C(A∩B) = C(A)∪C(B). Valgono anche per famiglie arbitrarie e per la differenza, X\(A∩B)=(X\A)∪(X\B).

Il metodo tipico per dimostrarle è la doppia inclusione. Esempio: per (A∪B)∩C ⊆ (A∩C)∪(B∩C), sia x nel primo insieme; allora x∈A∪B e x∈C; se x∈A segue x∈A∩C, altrimenti x∈B e quindi x∈B∩C; in ogni caso x sta nel secondo insieme. Il viceversa è analogo.

## 4. Ricoprimenti, partizioni, quozienti

Spezzare un insieme in pezzi è un'operazione ricorrente (lo si userà per costruire Z_n). Un **ricoprimento** di X è una famiglia {A_i} la cui unione è X; è una **partizione** se inoltre i pezzi non sono vuoti (A_i ≠ ∅ ∀i) e a due a due disgiunti (A_i∩A_j = ∅ per i≠j). Z = 2Z ∪ (2Z+1) (pari e dispari) è una partizione; lo è anche {A, C_X(A)} con A non banale; invece R=∪[n,n+1] è un ricoprimento ma NON una partizione, perché gli intervalli si sovrappongono negli estremi.

Una partizione permette di vedere ogni blocco come un unico oggetto: l'**insieme quoziente** Q = {A_i} ha per elementi i blocchi, e un blocco si indica con A=[x] per un suo rappresentante x∈A. La **funzione quoziente** q: X→Q, che manda x nel proprio blocco, è suriettiva.

Qui nasce il problema della **buona definizione** (Nota 2.3): se si definisce una funzione f: Q→B scegliendo un rappresentante [x] e usando x, bisogna controllare che il valore non dipenda dal rappresentante scelto. Funziona f([x]) = (-1)^x sulle classi pari/dispari; NON funziona invece la partizione di N per numero di cifre E_n con f(E_n) = [2x]: E1 contiene 4, con [8]=E1, ma anche 7, con [14]=E2, quindi il risultato cambia a seconda del rappresentante. Questo è il pilastro per Z_n: le operazioni sulle classi resto vanno sempre controllate "ben definite".

## 5. Prodotto cartesiano

Il prodotto cartesiano A×B = {(a,b) | a∈A, b∈B} è l'insieme delle coppie ordinate. Se |A|=m e |B|=n sono finiti, |A×B| = mn; se uno dei due è vuoto, A×B=∅. In generale |A1×...×Ak| = n1·...·nk (Prop. 3.16), formula che regge tutta la combinatorica del file 02. R×R è il piano e R×R×R lo spazio.

## 6. Funzioni

Formalmente una **funzione** è una terna (A, B, Γ) con A,B non vuoti e Γ ⊆ A×B (il **grafico**) tale che per ogni a∈A esista **un unico** b con (a,b)∈Γ: la definizione cattura l'idea di "regola che a ogni input associa un solo output". Due funzioni sono uguali se hanno stesso dominio, codominio e grafico; Mori porta l'esempio di due "leggi" apparentemente diverse che definiscono la stessa funzione {0,1,2}→R perché coincidono sui tre punti [DA VERIFICARE la seconda legge, illeggibile nell'estrazione]. Dominio e codominio contano: 1/x è una funzione R\{0}→R, non R→R. Esempi ricorrenti: identità id_A, funzioni costanti, proiezioni p1 e p2 (suriettive), successioni (funzioni N→B), restrizioni f|_S, funzione quoziente.

Data f: A→B, l'**immagine** di S⊆A è f(S) = {f(s)} e Im f = f(A); f è **suriettiva** se Im f = B. La **controimmagine** di T⊆B è f⁻¹(T) = {a | f(a)∈T}. Attenzione alla differenza fra le due: f(S) è non vuota se S lo è, mentre f⁻¹(T) può essere vuota anche con T≠∅ (con f(x)=x², f⁻¹(-1)=∅). Una funzione è **iniettiva** se a1≠a2 ⇒ f(a1)≠f(a2) e **biettiva** se è iniettiva e suriettiva. Le controimmagini di singoli punti offrono un criterio comodo (Prop 2.11): f è suriettiva ⇔ |f⁻¹(b)| ≥ 1 per ogni b, ed è iniettiva ⇔ |f⁻¹(b)| ≤ 1 per ogni b. Inoltre ci si può sempre ricondurre a una funzione suriettiva restringendo il codominio a Im f, e a una iniettiva restringendo opportunamente il dominio (x² su R≥0).

**Esempio svolto** - f: Z→Z, f(n)=2n+1 è iniettiva (2m+1=2n+1 ⇒ m=n) ma non suriettiva, perché Im f = 2Z+1 ≠ Z. f: R→R, f(x)=x² non è né iniettiva (f(1)=f(-1)) né suriettiva (Im=R≥0); come funzione R≥0→R≥0 è invece biettiva.

## 7. Composizione e inversa

La composizione (g∘f)(a) = g(f(a)) è definita solo se il codominio di f coincide con il dominio di g. È associativa ma NON commutativa (cos(x)+1 è diversa da cos(x+1)), e id è neutra. Il comportamento della composizione rispetto a iniettività e suriettività è:
- Prop 2.16: f,g iniettive ⇒ g∘f iniettiva; f,g suriettive ⇒ g∘f suriettiva; biettive ⇒ biettiva.
- Prop 2.17: g∘f iniettiva ⇒ **f iniettiva**; g∘f suriettiva ⇒ **g suriettiva**. Cor 2.18: g∘f biettiva ⇒ f iniettiva e g suriettiva.

Si dice che f e g sono **inverse** se g∘f=id_A e f∘g=id_B. L'inversa esiste (ed è unica, Teo 2.20) se e solo se f è biettiva, e allora g(b) è l'unico elemento di f⁻¹(b). Si indica con f⁻¹, con una piccola ambiguità rispetto alla controimmagine che si scioglie dal contesto; (f⁻¹)⁻¹ = f. Per la composizione vale **(g∘f)⁻¹ = f⁻¹∘g⁻¹** (Prop 2.24), con l'ordine invertito: per disfare "prima f poi g" bisogna disfare prima g. Vale anche la cancellazione: se f è biettiva e g1∘f = g2∘f allora g1=g2, e f∘h1=f∘h2 ⇒ h1=h2; la cancellazione è falsa in generale se f non è biettiva. Si può avere g∘f=id senza f∘g=id: per s: A→A×B, s(a)=(a,β), si ha p1∘s=id ma s∘p1≠id.

## 8. Operazioni binarie

Un'operazione binaria su un insieme A non vuoto è una funzione *: A×A→A. Le proprietà da controllare sono l'associatività (a*b)*c=a*(b*c), la commutatività e l'esistenza di un elemento neutro e (a*e=e*a=a), che se esiste è **unico**: e=e*e'=e'. Esempi: + e · su N,Z,Q,R (neutri 0 e 1); la sottrazione non è un'operazione su N e inoltre non è commutativa né associativa e non ha neutro; ∩ e ∪ su P(X) (neutri X e ∅); la composizione ∘ su F_X = {f:X→X} (associativa, non commutativa, neutro id_X).

Un elemento a è **invertibile** (rispetto al neutro e) se esiste b con a*b=b*a=e. Se * è associativa l'inverso è **unico** (b=b·e=b(ab')=(ba)b'=b'), e si scrive a⁻¹. Casi concreti: in (Z,·) gli invertibili sono ±1; in (N,+) solo 0; in (F_X,∘) le funzioni biettive; in (P(X),∩) solo X e in (P(X),∪) solo ∅. L'insieme U degli invertibili è chiuso per *, con (a*b)⁻¹ = b⁻¹*a⁻¹.

Le **potenze** a^n si definiscono per ricorsione e soddisfano a^(m+n)=a^m a^n (se a è invertibile la legge vale per ogni m,n∈Z). Infine un sottoinsieme S è **chiuso** per * se s1*s2∈S per ogni s1,s2∈S (i pari sono chiusi per +, i dispari no).

---

## Cose da saper fare all'esame
- Dimostrare per induzione una formula di somma / una disuguaglianza / |P(A)|=2ⁿ (base + passo, scrivendo chiaramente l'ipotesi induttiva).
- Dimostrare uguaglianze fra insiemi con la doppia inclusione; applicare De Morgan e distributività.
- Negare enunciati con quantificatori.
- Dire se una famiglia è ricoprimento / partizione e scrivere l'insieme quoziente; stabilire se una funzione definita sui rappresentanti è ben definita.
- Per una funzione data: determinare iniettività, suriettività, immagine, controimmagini (Es. 2.1-2.3); modificare dominio/codominio per renderla biettiva e scrivere l'inversa (Es. 2.8: f(n)=3n; f(x)=x²+2x -> restringere a x≥-1 con codominio [-1,∞), inversa -1+√(y+1); f(x,y)=(x²,x²+y²)).
- Stabilire associatività/commutatività/neutro/invertibili di una operazione (Es. 2.16: m∗n = m+n+1 su N, a∗b su Z...).
- Dimostrare: unicità di neutro e di inverso; (g∘f)⁻¹ = f⁻¹∘g⁻¹; g∘f iniettiva ⇒ f iniettiva.

## Dubbi
- Il libro tratta relazioni di equivalenza solo tramite partizioni/quozienti; il legame partizione <-> relazione di equivalenza ("a~b se stesso blocco") e le classi di equivalenza compaiono altrove (aritmetica modulare, similitudine di matrici in Algebra Lineare). [DA VERIFICARE se a lezione si introduce esplicitamente "relazione di equivalenza" e "relazione d'ordine": non presenti in Mori cap. 1-2.]
- Cardinalità infinite (numerabilità, Cantor) sono in cap. 3 (vedi file 02).
