const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 }, () => {
  console.log("🚀 Servidor WebSocket rodando na porta 3000");
});

let clients = [];

wss.on('connection', (ws) => {
  clients.push(ws);
  console.log("🔌 Novo usuário conectado.");

  ws.on('message', (message) => {
    console.log("📨 Mensagem recebida:", message);

    // Enviar para todos os clientes conectados
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log("❌ Usuário desconectado.");
    clients = clients.filter(client => client !== ws);
  });
});
