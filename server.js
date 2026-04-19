const net = require("net");
const path = require("path");
const httpServer = require("./httpServer");
const fileCommands = require("./fileCommands");

const HOST = "127.0.0.1";
const PORT = 3000;
const MAX_CLIENT = 5;
const TIMEOUT = 30000;

let clients = [];
let messagesLog = [];

httpServer(clients, messagesLog);

const server = net.createServer((socket) => {
    if(clients.length >= MAX_CLIENT){
        socket.write("Server full\n");
        socket.end();
        return;
    }

    socket.setTimeout(TIMEOUT);
    socket.id = socket.remoteAddress + ":" + socket.remotePort;

    socket.role = clients.length === 0 ? "admin" : "user";

    clients.push(socket);
    console.log("Connected:", socket.id, socket.role);

    socket.on("data", (data) => {
        const msg = data.toString().trim();

        messagesLog.push({
            client: socket.id,
            role: socket.role,
            message: msg,
            time: new Date()
        });

        const [cmd, ...args] = msg.split(" ");

        if(socket.role !== "admin"){
            if(!["/list", "/read"].includes(cmd)){
                socket.write("No permission\n");
                return;
            }
        }

        switch(cmd){
            case "/list":
                socket.write(fileCommands.list());
                break;

                case "/read":
                    socket.write(fileCommands.read(args[0]));
                    break;

                 case "/upload":
                        socket.write("Send content:\n");
                        socket.once("data",(fileData) =>{
                            socket.write(fileCommands.upload(args[0], fileData.toString()));

                        });
                break;

                 case "/download":
                  socket.write(fileCommands.download(args[0]));
                 break;

                 case "/delete":
                    socket.write(fileCommands.remove(args[0]));
                   break;

                  case "/search":
                      socket.write(fileCommands.search(args[0]));
                 break;

                 case "/info":
                     socket.write(fileCommands.info(args[0]));
                   break;

                   default:
                 socket.write("Unknown command\n");

        }

        if(socket.role !== "admin"){
            setTimeout(() => {}, 1000);
        }
    });

    socket.on("timeout", () => {
        socket.write("Timeout\n");
        socket.end();
    });

    socket.on("end", () => {
        clients = clients.filter(c => c !== socket);
    });
});

server.listen(PORT, HOST, () => {
    console.log(`TCP Server running on ${HOST}:${PORT}`);
});