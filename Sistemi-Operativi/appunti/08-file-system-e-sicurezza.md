# 08 - File system e sicurezza (Cap 13, 14, 16)

**Fonte**: Doc "Sistemi Operativi - Appunti", Teoria Cap 13, 14, 16. `[INT]` = calcolo/integrazione mia. Il doc copre solo **protezione file** (Cap 13) e **metodi di allocazione** (Cap 14); mancano directory, mount, free-space management, journaling (vedi Dubbi). Cap 15 (Protezione) non è nel programma.

## Mappa
Il capitolo ha tre blocchi. Il primo riguarda la protezione dei file: tipi di accesso, UID/GID, modello Unix (rwx) e ACL di Windows. Il secondo i metodi di allocazione: contigua (extent), collegata (FAT) e indicizzata (inode UFS). Il terzo la sicurezza: violazioni, minacce ai programmi e a sistemi/reti, crittografia, difese e il caso Windows.

## Protezione dei file
Il proprietario di un file controlla *cosa* si può fare e *da chi*. I tipi di accesso sono read, write, execute, append, delete e list, e le identità sono **UID** (utente) e **GID** (gruppo). Il modello **Unix** distingue 3 classi (owner, group, others/public) e 3 permessi (r=4, w=2, x=1), da cui la notazione ottale. Per esempio `chmod 761 game` assegna all'owner 7 = rwx, al gruppo 6 = rw-, agli altri 1 = --x. Il primo carattere di `ls -l` indica il tipo (`-` file, `d` directory, `p` FIFO); i comandi sono `chmod`, `chgrp`, `chown`. Il modello è semplice e prevedibile, ma poco flessibile: non c'è un deny esplicito per un singolo utente di un gruppo.

Le **ACL di Windows** sono più flessibili: una lista di voci (utente/gruppo -> permessi) con colonne **Allow** e **Deny** esplicite e permessi granulari (Full control, Modify, Read & execute, Read, Write).

## Allocazione dei file
Il problema dell'allocazione è dove mettere sul disco i blocchi di un file. L'allocazione **contigua** dà ottime prestazioni ma soffre di frammentazione esterna; quella **collegata** elimina la frammentazione esterna ma rende lento l'accesso casuale; quella **indicizzata** dà un buon accesso casuale al costo di un blocco indice per file. La tabella mette a confronto i tre metodi.

| Criterio | Contigua | Collegata (FAT) | Indicizzata |
|---|---|---|---|
| Directory contiene | blocco iniziale + lunghezza | puntatore al primo blocco | puntatore al blocco indice |
| Sequenziale | ottima | buona (seek se non adiacenti) | buona (+ lettura indice) |
| Casuale | ottima: `fisico = start + LA/512` | scadente: percorre la lista (Q-1 puntatori) | buona (2 letture: indice + dato) |
| Frammentazione | esterna (-> compattazione) | nessuna esterna; interna con clustering | nessuna esterna |
| Overhead spazio | minimo | un puntatore per blocco | un blocco indice per file (anche piccolo) |
| Affidabilità | - | puntatore perso = coda del file persa | - |

Un **extent** è un blocco contiguo di dischi; un file è una sequenza di extent e cresce aggiungendone altri. La **FAT** sposta i puntatori in una tabella centralizzata a inizio volume (una voce per blocco), tenuta in cache in RAM, il che la rende molto più veloce della lista collegata pura; la fine del file è marcata con -1. Nell'allocazione indicizzata i file grandi richiedono blocchi indice collegati (`Q1 = LA/(512*511)`) oppure un indice a più livelli (`Q1 = LA/(512*512)`, con blocchi da 512 B).

Il **UFS** (inode) combina i vantaggi usando puntatori **diretti** (per i file piccoli), **indiretto singolo**, **doppio** e **triplo**: ottimizza i file piccoli e consente file enormi. In pratica contigua/extent si sceglie per le alte prestazioni (video editing, DB), collegata/FAT per sistemi semplici e indicizzata/UFS per uso generale. [INT, esercizio tipo] Il file più grande raggiungibile con un inode è `n_dirette*B + (B/p)*B + (B/p)^2*B + (B/p)^3*B`, con B = dimensione del blocco e p = dimensione del puntatore (parametri non nelle fonti). Per gli ordini di grandezza: HDD ~250 IOPS (630 M istr. per I/O), SSD ~60.000 IOPS (2,65 M istr.).

## Sicurezza (Cap 16)
La sicurezza assoluta è irraggiungibile, quindi si ragiona in termini di gestione del rischio. Una **threat** è una potenziale violazione, un **attack** un tentativo concreto, un **cracker** chi lo conduce. È più facile difendersi da errori accidentali che da attacchi mirati. Le **violazioni** si classificano in:
- riservatezza (lettura non autorizzata);
- integrità (modifica);
- disponibilità (distruzione);
- furto di servizi;
- **DoS**.

Tra i **metodi** ci sono masquerading, replay attack, man-in-the-middle, session hijacking e privilege escalation. La difesa va costruita su **4 livelli**: fisico, SO, applicazione, rete; a cui si aggiunge il fattore umano (phishing, social engineering).

### Minacce ai programmi
Le minacce principali sono:
- il **trojan horse**, codice apparentemente benigno che abusa dei privilegi (da qui spyware e covert channel);
- la **trap door**, un accesso nascosto, ad esempio inserito in un compilatore;
- lo **spyware**, che raccoglie informazioni;
- il **ransomware**, che cifra i dati e chiede un riscatto.

Obiettivo comune è un **RAT**. Il **principio del minimo privilegio** (Saltzer, 1974) è la difesa concettuale.

La **code injection / buffer overflow** nasce da codice come `strcpy(buffer, argv[1])` con `buffer[256]` e nessun controllo sulla lunghezza: l'input sovrascrive lo stack e l'**indirizzo di ritorno**. Gli esiti possibili sono tre:
- nessun effetto visibile;
- logica sovvertita o crash (DoS);
- esecuzione di **shellcode** con i privilegi dell'applicazione.

La tecnica del **NOP sled** ("trampoline") serve ad aumentare la tolleranza sull'indirizzo di salto.

I **virus** richiedono un ospite e si classificano in: file/parasitic, boot/memory, macro, source code, polymorphic, encrypted, stealth, tunneling, multipartite, armored.

### Minacce a sistemi e reti
Il **worm** è autonomo e si replica in rete. L'Internet Worm del 1988 sfruttava `rsh` (trust), bug in `finger` e `sendmail` e il password guessing; il "grappling hook" di 99 righe C scaricava il corpo del worm, e reinfettava una macchina 1 volta su 7. Il **port scanning** (`nmap`, `nessus`) viene spesso condotto da sistemi *zombie*. I **DoS/DDoS** sfruttano botnet; il **SYN flood** abusa dell'handshake TCP inviando molti SYN senza l'ACK finale, lasciando connessioni semi-aperte.

### Crittografia
La crittografia **simmetrica** usa la stessa chiave: DES (insicuro), 3DES, AES (128/192/256), RC4 (stream, vulnerabile). È veloce ma pone il problema della distribuzione della chiave. Quella **asimmetrica** usa una coppia chiave pubblica/privata; l'algoritmo è **RSA**, la cui sicurezza si basa sulla difficoltà di fattorizzare, e si usa per scambiare chiavi simmetriche.

**Esempio della fonte (verificato)**: p=7, q=13, N=91, (p-1)(q-1)=72, ke=5, kd=29 (5*29=145=2*72+1). Si cifra m=69: `69^5 mod 91 = 62`; si decifra: `62^29 mod 91 = 69`.

Gli altri strumenti crittografici sono:
- le **funzioni hash** (MD5, SHA-1; resistenza alle collisioni), che producono un digest;
- il **MAC**, H(msg + chiave segreta), che dà integrità e autenticità;
- la **firma digitale**, l'hash cifrato con la chiave **privata**, verificabile con quella pubblica, che fornisce anche **non ripudio**;
- i **certificati digitali** firmati da una **CA**, che legano un'identità a una chiave pubblica e difendono dal man-in-the-middle (il browser contiene le chiavi pubbliche delle CA).

### Difese
L'**autenticazione** si basa su password (hash + **salt** contro le rainbow table), one-time password, biometria e **MFA** (qualcosa che sai / hai / sei). La **defense in depth** combina security policy, vulnerability assessment e **IDS**: signature-based (solo attacchi noti) oppure anomaly-based (anche zero-day, ma con falsi positivi). I **firewall** possono essere network, personal, application proxy, system-call, e una **DMZ** separa la rete interna da Internet.

Checklist: educare gli utenti, sicurezza fisica, minimizzare servizi e porte, patch, antivirus, password robuste, log/audit, IDS+firewall, cifrare lo storage, security policy.

In **Windows**:
- ogni utente, gruppo e computer ha un **SID**;
- un **Security Access Token** (SID utente + gruppi + privilegi) è ereditato dai processi;
- ogni oggetto ha un **Security Descriptor** con una **DACL**;
- la **Mandatory Integrity Control** introduce livelli di integrità (Basso/Medio/Alto) per cui un processo scrive su un oggetto solo se la sua integrità è >=.

Le criticità sono i default storicamente deboli e l'ampia superficie di attacco.

## Cose da saper fare all'esame
- Decodificare permessi `rwxr-x--x` <-> ottale; usare `chmod` simbolico/assoluto.
- Confrontare i 3 metodi di allocazione (prestazioni, frammentazione, overhead) e descrivere FAT e inode UFS (diretti/indiretti).
- Calcolare blocco fisico in allocazione contigua; numero di accessi disco in collegata/indicizzata.
- Spiegare buffer overflow -> code injection; worm vs virus; simmetrica vs asimmetrica; MAC vs firma digitale; ruolo della CA.
- Eseguire un RSA con numeri piccoli.

## Dubbi
- [DA VERIFICARE] Mancano nel doc: directory (single/two-level/tree/grafo aciclico), mount, free-space management (bitmap, free list), journaling/log-structured, VFS, link hard/soft, open-file tables. Controllare le slide (Cap 13-14 del libro).
- Il doc dice che per il modello ACL "non sono evidenziati svantaggi": è un limite della fonte, non una proprietà.
