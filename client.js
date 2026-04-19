const net = require("net");
const readline = require("readline");

const HOST = "127.0.0.1";
const PORT = 3000;

let client;

function connect() {
    client = net.createConnection({ host: HOST, port: PORT }, () => {
        console.log("Connected to server");
    });

    client.on("data", (data) => {
        console.log("Server:", data.toString());
    });

    client.on("end", () => {
        console.log("Disconnected. Reconnecting...");
        setTimeout(connect, 2000);
    });

    client.on("error", () => {
        setTimeout(connect, 2000);
    });
}

connect();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on("line", (input) => {
    client.write(input);
});  