// Declarando pares de emojis para os cards
const emojis = [
    "🦕",
    "🦕",
    "🐇",
    "🐇",
    "🦔",
    "🦔",
    "🐀",
    "🐀",
    "🐿",
    "🐿",
    "🐊",
    "🐊",
    "🐢",
    "🐢",
    "🐋",
    "🐋",
];
// variavel para guardar os cards que estão virados
let openCards = [];
// Botão de resetar game
const botaoReset = document.getElementById("botao-reset");
// Local que ficara os cards
const game = document.getElementById("game");
// Local que exibe o record no painel
const exibirRecorde = document.getElementById("record");
// Variavel que pega a chave que armazena o recorde atual no navegador
const recordeSalvo = localStorage.getItem("recorde");

// variavel auxiliar para impedir que o usuario abra 3 cartas se clicar rapido de mais
let bloqueio = false;

// Cria os cards com emojis
criarCards();

// Exibe o recorde
atualizarRecordeNaTela();

function criarCards() {
  const game = document.querySelector(".game");
  game.innerHTML = ""; // limpa os cards antigos
  
    // Embaralha o array emojis aleatoriamente
    const shuffleEmojis = emojis.sort(() => (Math.random() > 0.5? 2 : -1));

  shuffleEmojis.forEach((emoji) => {
    const box = document.createElement("div");
    box.className = "item";
    box.innerHTML = emoji;
    box.onclick = handleClick;
    game.appendChild(box);
  });
}
// Function para virar os cards quandos clicados
function handleClick(){
    // Se o jogo estiver bloqueado OU se esse card já estiver aberto, return e não executa nenhuma ação.
    if (bloqueio || this.classList.contains("boxOpen") || this.classList.contains("boxMatch")) return;
    // Adiciona a classe "boxOpen" para virar o card
    this.classList.add("boxOpen");
    // Adiciona na variavel openCards 
    openCards.push(this);
    
    // Verifica se tem exatamente dois card abertos
    if(openCards.length === 2){
            bloqueio = true;

        // Chama a função checkMatch para verificar se são iguais
        setTimeout(checkMatch, 500);
    }
 }

// Verifica se os dois emojis dos cards são iguais
function checkMatch() {
    // Verifica se o item da pocisão 0 do vetor é igual ao item da pocisão 1
    if(openCards[0].innerHTML === openCards[1].innerHTML){
        // Adicina a classe "boxMatch" nos dois para manter virados
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        // Remove a classe "boxOpen" para virar novamente os cards
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }
    // Limpa a variavel de cards abertos
    openCards = [];
    bloqueio = false;

    // Verifica se todos os cards com a classe ".boxMatch" são da mesma quantidade que o valor total de cards
    if(document.querySelectorAll(".boxMatch").length === emojis.length){
        // Exibe a mensagem que o usuario ganhou, e o tempo conseguido
        alert("Parabéns! Seu tempo foi = " + tempo + " segundos");

        // Pausa o timer
        pararTimer();

        // Não permite o jogador clicar novamente e reiniciar o timer
        bloqueio = true;
        // Salva o recorde
        salvarRecorde(tempo);
        // Reexibe o botão de resetar game removendo a classe "ocultarBotao"
        botaoReset.classList.remove("ocultarBotao");
    }
}

// Variavel que vai armazenar o tempo de jogo
let tempo = 0;

// Variavel auxiliar para a função iniciarTimer()
let intervalo = null;
// Função para inciar o timer

function iniciarTimer() {
// evita múltiplos timers
  if (intervalo !== null) return; 

// local que gera o timer
  intervalo = setInterval(() => {
    // Sempre adiciona 1 no tempo
    tempo++;
    // Adiciona o Texto "Tempo: " + tempo + " segundos", concatenando o tempo atual
    timer.textContent = "Tempo: " + tempo + " segundos";
  }, 1000);
}

// Função para pausar o timer
function pararTimer() {
  clearInterval(intervalo);
  intervalo = null;
}

// Quando tem algum clique na area dos cards, o timer inica automaticamente
game.addEventListener("click", iniciarTimer);

// Quando o botão de restar game for clicado, chama a função reset game
botaoReset.addEventListener("click", resetGame);

// Verifica se o jogador venceu
function resetGame() {
        // Pausa o timer
        pararTimer();

        // Reseta variáveis de jogo
        tempo = 0;
        openCards = [];
        bloqueio = false;

        // Atualiza o painel
        timer.textContent = "Tempo: 0 segundos";

        // Esconde o botão novamente
        botaoReset.classList.add("ocultarBotao");

        // Recria os cards
        criarCards();
}

// Salva o recorde na memoria do navegador
function salvarRecorde(tempo) {
  const recordeAtual = localStorage.getItem("recorde");
//   Verifica se o recorde salvo é diferente ou menor menor que o numero do recorde salvo atual
  if (!recordeAtual || tempo < Number(recordeAtual)) {
      // Seta o novo tempo para o recorde atual
    localStorage.setItem("recorde", tempo);
  }
    atualizarRecordeNaTela();
}

function atualizarRecordeNaTela() {
  const recordeAtual = localStorage.getItem("recorde");
  // Exibe o recorde atual no painel do jogador
  if (recordeAtual) {
    exibirRecorde.textContent = "Seu Recorde atual é: " + recordeAtual + " segundos";
  } else {
    exibirRecorde.textContent = "Seu Recorde atual é: --";
  }
}