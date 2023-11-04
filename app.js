//DECLARAÇÃO DE VARIÁVEIS
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


//CHAMADAS DE FUNÇÕES
exibirMensagensIniciais();

//FUNÇÕES
///FUNÇÃO PARA SELECIONAR A TAG E QUAL CAMPO ALTERAR A MENSAGEM
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate:1.1} );
}

///FUNÇÃO PARA ALTERAR AS PRINCIPAIS MENSAGENS DO JOGO
function exibirMensagensIniciais() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');

}

///FUNÇÃO PARA CHUTAR, VALIDAR O CHUTE E DAR DICA DO CHUTE
function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}`;
        document.getElementById('reiniciar').removeAttribute('disabled');

        exibirTextoNaTela('p', mensagemTentativas);
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O numero secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O numero secreto é maior');
        }

    }
    tentativas++;
    limparCampo();
}

///FUNÇÃO PARA GERAR NUMERO ALEATÓRIO
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    ///ZERA A LISTA CASO TODOS OS ITENS TENHAM SIDO SORTEADOS
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    ///Valida se numero sorteado já está na lista, se não ele adiciona
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio;
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }

}

///FUNÇÃO PARA EXCLUIR NUMERO DIGITADO APÓS CHUTAR
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

///FUNÇÃO PARA REINICIAR O GAME
function reiniciar() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    exibirMensagensIniciais();
    document.getElementById('reiniciar').setAttribute('disebled', true);
}

