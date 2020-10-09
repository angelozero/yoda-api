let bookTable = document.querySelector('#books');
bookTable.addEventListener('click', (event) => {
    let elementoClicado = event.target;

    if (elementoClicado.dataset.type == 'remove') {
        let bookId = elementoClicado.dataset.ref;
        fetch(`http://localhost:3000/books/${bookId}`, { method: 'DELETE' })
            .then(resposta => {

                let tr = elementoClicado.closest(`#book_${bookId}`);
                tr.remove();
            })
            .catch(erro => console.log(erro));
    }
});