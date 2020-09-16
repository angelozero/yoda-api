const net = require('net')

const handleConnection = socket => {
  console.log('usuario conectado')
}

const server = net.createServer(handleConnection)
server.listen(4000, 'localhost')