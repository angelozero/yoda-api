const express = require('express')
const app = express()
const server = require('http').createServer(app)
const WebSocket = require('ws')

const wss = new WebSocket.Server({ server: server })

// Conexao de um novo client
wss.on('connection', function connection(ws) {
  console.log('um novo cliente esta conectado')
  
  // Metodo que escuta todos os eventos enviado para 'message'
  ws.on('message', function incoming(message) {
    console.log('received: %s', message)
   
    // Troca de mensagens entre clients que sejam difernte do client do servidor
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    })
  });
})


app.get('/', (req, res) => res.send('Ola'))

server.listen(3000, () => console.log(`Server running in 3000 port`))
