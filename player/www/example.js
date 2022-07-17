function salvarContato(){
    nome = document.getElementById("nome").value;
    telefone = document.getElementById("telefone").value;
    novoContato = `<li id="contatos">${nome} - ${telefone}</li>`;
    listadecontatos = document.getElementById("lista-contatos").innerHTML += novoContato;

    localStorage.listaContatos = listadecontatos;
}


btSalvar = document.getElementById("salvar");
btSalvar.addEventListener("click", function(){
    salvarContato();
    nome = document.getElementById("nome").value = '';
    telefone = document.getElementById("telefone").value = '';
})

if(localStorage.listaContatos){
document.getElementById("lista-contatos").innerHTML = localStorage.listaContatos;
}


apagar = document.getElementById("apagar");
apagar.addEventListener("click", function(){
    localStorage.clear();
    document.getElementById("contatos").remove();
})