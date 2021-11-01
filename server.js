const WebSocket = require('ws');
const PORT = 8088;
const wsServer = new WebSocket.Server({
    port: process.env.PORT || PORT
});
const totalws = new Map();
wsServer.on('connection', function (socket) {
    totalws.set(socket, socket)
    // totalws.set(ws,ws)
    setTimeout(() => {
        socket.send(`Socket Handler : ✅`);
    }, 950)
    setInterval(() => {
    socket.send(`123456789`)
    },9500)
    socket.on('message', text => {
        let fok = new Uint8Array(text);
        let msg = Buffer.from(fok).toString();
        const prefix = "!"
        const args = msg.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        switch (cmd) {
            case "kick":
                sendall(cmd, args[0])
                break;
            case "say":
                sendall(cmd, args[0])
                break;
            case "check":
                sendall(cmd)
                break;
            case "blacklist":
                sendall(cmd, args[0])
                break;
            case "admin":
                sendall(cmd, args[0])
                break;
            case "kicked":
                sendall(cmd, args[0])
            break;
            case "position":
                console.log(cmd, args[0], args[1], args[2])
            break;
        }
    })
    socket.on('disconnect', () => {
        totalws.delete(socket)
        console.log("An Socket Leaved : ❌")
    });
});
function sendall(cmd, msg) {
    totalws.forEach(ws => {
        ws.send(cmd + " " + msg)
    })
}
console.log("**********************************************\n*         Moomoo.io Peanut Mod Socket        *\n**********************************************")

console.log("PeanutMod Socket Online ✅")
