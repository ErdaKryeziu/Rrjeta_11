# Rrjeta_11

Projekt ne `Node.js` qe implementon nje server `TCP` per komunikim me kliente dhe nje server `HTTP` per monitorim te statistikave.

## Funksionalitetet

- serveri punon ne `127.0.0.1:3000`
- HTTP serveri punon ne portin `8000`
- pranohen maksimumi `5` kliente
- klienti i pare eshte `admin`, klientet tjere jane `user`
- mesazhet ruhen per monitorim
- nese klienti nuk dergon mesazh per `30` sekonda, lidhja mbyllet
- klienti tenton rilidhje automatike pas nderprerjes

## Struktura

- `server.js` - serveri kryesor TCP
- `client.js` - klienti qe lidhet me serverin
- `fileCommands.js` - komandat per file-at
- `httpServer.js` - serveri HTTP per `/stats`
- `files/` - folderi ku ruhen file-at

## Ekzekutimi

Hap terminalin ne folderin e projektit:



Nise serverin:

```powershell
node server.js
```

Nise klientin ne nje terminal tjeter:

```powershell
node client.js
```

## Komandat e adminit

```text
/list
/read <filename>
/upload <filename>
/download <filename>
/delete <filename>
/search <keyword>
/info <filename>
```

Klientet `user` kane vetem:

```text
/list
/read <filename>
```

## Monitorimi

HTTP endpoint:

- [http://127.0.0.1:8000/stats](http://127.0.0.1:8000/stats)

Ky endpoint kthen ne `JSON`:

- lidhjet aktive
- IP/ID e klienteve
- mesazhet e derguara

## Perputhja me kerkesat

- jane percaktuar IP adresa dhe portet
- serveri pranon dhe menaxhon klientet sipas roleve
- admini ka qasje te plote ne file-at e serverit
- user ka vetem qasje leximi
- mesazhet ruhen per monitorim
- ekziston HTTP server paralel me `GET /stats`
- klienti rilidhet automatikisht pas shkeputjes

