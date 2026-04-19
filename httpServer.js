const http = require("http");

module.exports = function (clients, messagesLog) {

    http.createServer((req, res) => {

        if (req.url === "/stats") {
            res.writeHead(200, { "Content-Type": "application/json" });

            res.end(JSON.stringify({
                activeClients: clients.length,
                ips: clients.map(c => c.id),
                messages: messagesLog
            }, null, 2));

        } else {
            res.end("Server running");
        }

    }).listen(8000, () => {
        console.log("HTTP Server running on port 8000");
    });
};
