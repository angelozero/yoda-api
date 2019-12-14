# Sobre Node JS

- Orientado a eventos
    - Uma forma do JavasScript de implementar nativamente o desing pattern Observer, que diz que um objeto(Subject) contém uma lista de dependências (Observers) e os notifica automaticamente quando alguma mudança de estado ocorre.

- Orientado a objetos
    - A herança no JavaScript é baseada em prototype, e os objetos podem tanto ser feitos a partir de uma funcção construtora quanto a partir de um JSON.

- Programação funcional
    - Closures: Mebros privados
    - Callback: Uma função passada como parâmetro para outra função.
    - Curryign: Técnica que transforma uma função com n argumentos em outra com menos ou mais simples.

- Setando a variavel de ambiente no terminal do Node
    - No terminal digite
        -  NODE_ENV=development
        -  echo $NODE_ENV --- deve exibir development

- Executando docker
    docker pull mongo
    docker images
    docker run --name mongo-js -p 27017:27017 -d mongo


    // para acessar o mongo
    docker exec -it mongo-js mongo admin

