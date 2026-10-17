# 05 - Socket programming (UDP e TCP)

Fonte: slide Kurose-Ross cap. 2, parte "socket programming" (`unito_Chapter_2_v8.2-V2.pdf`, slide 2-105...2-134 e slide di corredo), e gli esempi di codice del corso (`TCP Client - Server Socket` e `UDP Client - Server Socket`, in Java e Python) dal Moodle. Il materiale è in `_moodle-raw/Reti-Sicurezza-Reti/generale`. Completa [02-livello-applicazione.md](02-livello-applicazione.md). Le slide usano ancora in parte la sintassi Python 2 (`raw_input`, `print` senza parentesi), mentre i file `client.py`/`server.py` del corso sono in Python 3: qui si fa riferimento a questi ultimi.

## Mappa

- [Socket e porte](#socket-e-porte)
- [UDP](#udp)
- [TCP](#tcp)
- [Confronto](#confronto)
- [Cose da saper fare all'esame](#cose-da-saper-fare-allesame)
- [Dubbi](#dubbi)

## Socket e porte

Un socket è la "porta" tra il processo applicativo e il protocollo di trasporto da estremo a estremo: il processo applicativo è sotto il controllo dello sviluppatore, mentre il trasporto e i livelli inferiori sono controllati dal sistema operativo. Un socket è identificato da un indirizzo IP e da un numero di porta. Ogni host ha 65.536 porte; alcune sono riservate a servizi (20 e 21 FTP, 23 Telnet, 80 HTTP; circa 2000 porte riservate, RFC 1700), e quelle sotto 1024 richiedono privilegi. Il server apre una porta specifica e aspetta (è il passive opener), mentre il client riceve una porta effimera, di valore 1024 o superiore, e contatta il server (è l'active opener). I due tipi di socket corrispondono ai due servizi di trasporto: `SOCK_DGRAM` (UDP, datagrammi non affidabili) e `SOCK_STREAM` (TCP, flusso di byte affidabile e ordinato).

L'applicazione di esempio è la stessa per entrambi: il client legge una riga di caratteri dalla tastiera e la manda al server, il server la converte in maiuscolo e la rimanda, il client la mostra.

## UDP

In UDP non c'è connessione né handshake prima dell'invio: il mittente allega esplicitamente a ogni pacchetto l'indirizzo IP e la porta di destinazione, e il ricevente ricava indirizzo e porta del mittente dal pacchetto ricevuto. I dati possono essere persi o arrivare fuori ordine. La sequenza di chiamate è: sul server `socket()`, `bind()`, poi un ciclo `recvfrom()` (bloccante) e `sendto()`; sul client `socket()`, `sendto()`, `recvfrom()`.

Server UDP (porta 12000):

```python
from socket import *
serverPort = 12000
serverSocket = socket(AF_INET, SOCK_DGRAM)
serverSocket.bind(('', serverPort))
print('The server is ready to receive')
while True:
    message, clientAddress = serverSocket.recvfrom(2048)
    modifiedMessage = message.decode().upper()
    serverSocket.sendto(modifiedMessage.encode(), clientAddress)
```

Il client fa `clientSocket = socket(AF_INET, SOCK_DGRAM)`, poi `clientSocket.sendto(message.encode(), (serverName, serverPort))` e `modifiedMessage, serverAddress = clientSocket.recvfrom(2048)`. Il client non fa `bind()`: è il sistema operativo a scegliere la porta effimera. Il server lega il socket a una porta nota, e dal risultato di `recvfrom` ricava l'indirizzo del client a cui rispondere.

## TCP

In TCP il client deve prima contattare il server. Il server deve avere già creato un **socket di benvenuto** (la "porta" che accoglie i contatti iniziali); il client crea un socket TCP specificando IP e porta del server, e quando lo fa TCP stabilisce la connessione. Quando il server viene contattato, **crea un nuovo socket** dedicato a quel client (l'`accept()` restituisce il socket di connessione e l'indirizzo del client), così può parlare con più client; i client si distinguono per il numero di porta sorgente. Il socket di benvenuto resta in ascolto. Dal punto di vista dell'applicazione TCP offre un "tubo" affidabile e ordinato di byte tra client e server. Sequenza lato server: `socket()`, `bind()`, `listen()`, `accept()` (bloccante), `recv()`/`send()`, `close()` del socket di connessione. Lato client: `socket()`, `connect()`, `send()`, `recv()`, `close()`.

Server TCP (porta 12001, come nel file del corso):

```python
from socket import *
serverPort = 12001
serverSocket = socket(AF_INET, SOCK_STREAM)
serverSocket.bind(('', serverPort))
serverSocket.listen(1)
print('The server is ready to receive')
while True:
    connectionSocket, addr = serverSocket.accept()
    sentence = connectionSocket.recv(1024).decode()
    connectionSocket.send(sentence.upper().encode())
    connectionSocket.close()
```

Client TCP: `clientSocket = socket(AF_INET, SOCK_STREAM)`, `clientSocket.connect((serverName, serverPort))`, `clientSocket.send(sentence.encode())`, `modifiedSentence = clientSocket.recv(1024)`, `clientSocket.close()`. Differenza di API rispetto a UDP: non si allega l'indirizzo del server a ogni invio (lo fissa la `connect()`), e `recv()` non restituisce l'indirizzo del mittente. Il server dell'esempio gestisce un client alla volta; `listen(n)` fissa il numero massimo di connessioni in coda.

## Confronto

| | UDP (SOCK_DGRAM) | TCP (SOCK_STREAM) |
|---|---|---|
| Connessione | nessuna, nessun handshake | sì, `connect()`/`accept()` |
| Affidabilità | no: perdite e disordine possibili | sì, consegna ordinata |
| Unità di dati | datagramma (messaggio) | flusso di byte, senza dimensione di blocco predefinita |
| Indirizzo di destinazione | allegato a ogni `sendto()` | fissato una volta con `connect()` |
| Lato server | un solo socket | socket di benvenuto + un nuovo socket per client |

Per IP, che sta sotto entrambi, valgono indirizzi logici a 32 bit senza relazione con l'indirizzamento fisico, consegna a datagrammi senza connessione, best effort e nessuna garanzia di consegna.

## Cose da saper fare all'esame

- Scrivere (in Python o a pseudocodice) client e server UDP e TCP per l'esempio dell'uppercase, indicando le chiamate nell'ordine corretto.
- Spiegare perché il server TCP ha due tipi di socket e quello UDP uno solo.
- Dire cosa succede se un datagramma UDP si perde (l'applicazione deve gestirlo; niente ritrasmissioni a livello di trasporto) e perché con TCP non serve.
- Descrivere la sequenza di chiamate (socket-bind-listen-accept e socket-connect).

## Dubbi

- Le slide mostrano anche il diagramma degli stati TCP e varianti con client che fa `bind()` su una porta specifica: non è chiaro se rientrino nell'esame [DA VERIFICARE].
- I sorgenti Java (`TCPServer.java`, `UDPClient.java` ecc.) non sono stati letti.
