let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// funções com parametro para escrever texto na tela
function exibirNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

// Função para exibir texto na tela
function exibirMsgInicial() {
    exibirNaTela("h1", "Jogo do número secreto");
    exibirNaTela("p", `Escolha um número entre 1 e ${numeroLimite}` );
}

exibirMsgInicial()

// criar uma fução para compara ser o nuemro são iguais
function verificarChute() {

    // validando o numero no input
    let chute = document.querySelector("input").value;

    // criar condiçoes para ver se numero é igual ao numero secreto
    if (chute == numeroSecreto) {

        exibirNaTela("h1", "Acertou!");
        let palavra = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavra}`;
        exibirNaTela("p", mensagemTentativas);
        // desativa atributo do input (reiniar o jogo)
        document.getElementById("reiniciar").removeAttribute('disabled');

    } else {
        // dar dicas para descobrir o número secreto
        if (chute > numeroSecreto) {

            exibirNaTela("p", "O número secreto é o menor");

        } else {

            exibirNaTela("p", "O número secreto é o maior");

        }

        // adicionar os numeros de tentativa no programar 
        tentativas++

        // limpar o campo para colocar outro numero
        limparCampo();
    }
}

// função com retorno para criar um numero aleatorio
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeelementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeelementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    // adicionar numero na lista de array
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

// função para limpar o input assim que digite um numero para ver se é o numero secreto
function limparCampo() {
    chute = document.querySelector('input')
    chute.value = " ";
}

// Função para reiniciar o jogo
function novoJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMsgInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}