const net = require('net')
const readline = require('readline')

const client = new net.Socket()

client.connect(4000, 'localhost', () => {
  console.log('conectado')
})