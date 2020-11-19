var rodada = "X", jogador = "X", c = 0, vencedor = "", jx = 0, jo = 0, e = 0, iter = 0;
var tabuleiro = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var VsMaquina = false, inverter = false, p=0;

document.getElementById("x").classList.add("sombra-espessa");

document.querySelectorAll('.quadrado').forEach(item => {
    item.addEventListener('click', event => {
        
        var VsMaquina = document.getElementById("Jogador-Vs-Maquina").getAttribute("Jogador-Vs-Maquina");      
        
        if (VsMaquina == "true") {
            console.log("Jogador Vs Maquina");

            //Faz a jogada
            if (tabuleiro[item.id] != "X" && tabuleiro[item.id] != "O") {
                console.log(c);

                if (p > 0) {
                    trocaRodada();
                    p=0;
                }

                c++;
                tabuleiro[item.id] = jogador;
                document.getElementById(item.id).innerHTML = rodada;

                console.log("jogador " + rodada);
                console.log(tabuleiro);

                if (venceu(tabuleiro, rodada)) {

                   // inverter = true;
                    funcVencedor();
                    return;
                } else if (c > 8) {
                    empate();
                    return;
                } else {
                    trocaRodada();
                    c++;
                               
                    var index = minimax(tabuleiro, rodada).index;         
                    document.getElementById(index).innerHTML = rodada;
                    tabuleiro[index] = rodada;
                   // console.log(tabuleiro);
                   // console.log(index);
                    console.log("funcionou");
                    if (venceu(tabuleiro, rodada)) {
                       
                       // inverter = true;
                        funcVencedor();
                        trocaRodada();
                        return;
                    } else if (c > 8) {
                        empate();
                        return;
                    }
                    trocaRodada();
                }
            }
        } else {
            console.log("Jogador Vs Jogador");

            //Jogador Vs Jogador
            if (tabuleiro[item.id] != "X" && tabuleiro[item.id] != "O") {

                c++;
                tabuleiro[item.id] = jogador;
                document.getElementById(item.id).innerHTML = rodada;

                console.log("jogador " + rodada);
                console.log(tabuleiro);

                if (venceu(tabuleiro, rodada)) {
                    funcVencedor();
                    return;
                } else if (c > 8) {
                    empate();
                    return;
                } else {
                    trocaRodada();
                }
            }
        }
    })
})

function funcVencedor() {

    var fim = document.getElementById("vencedor");
    var reiniciar = document.getElementById("reiniciar");

    if (rodada == "O") {
        fim.classList.add("vencedorvermelho");
        reiniciar.classList.add("reiniciarvermelho");
    }

    document.getElementById("vencedorTexto").innerHTML = "'" + rodada + "' Venceu";
    document.getElementById("reiniciar").innerHTML = "Jogar Novamente";

    fim.classList.add("vencedor");
    reiniciar.classList.add("reiniciar");
    if (reiniciar.onclick(reiniciar()));
}

function reiniciar() {
    document.querySelectorAll('.quadrado').forEach(item => {
        item.innerHTML = "";
    })

    var fim = document.getElementById("vencedor");
    var reiniciar = document.getElementById("reiniciar");
    console.log("venceu(tabuleiro, rodada)");
    
   // if (VsMaquina == "true") {rodada = rodada == "X" ? "O" : "X";}
    console.log(rodada);
    console.log(tabuleiro);
    console.log(venceu(tabuleiro, rodada));
    if (rodada == "O" && venceu(tabuleiro, rodada)) {
        fim.classList.remove("vencedorvermelho");
        reiniciar.classList.remove("reiniciarvermelho");
        jo++;
        document.getElementById("placar-o-numero").innerHTML = jo;
    } else if (rodada == "X" && venceu(tabuleiro, rodada)) {
        fim.classList.remove("vencedor");
        jx++;
        document.getElementById("placar-x-numero").innerHTML = jx;
    }

    fim.classList.remove("vencedor");
    reiniciar.classList.remove("reiniciar");
    fim.classList.remove("vencedorpreto");
    reiniciar.classList.remove("reiniciarpreto");

    document.getElementById("vencedorTexto").innerHTML = "";
    document.getElementById("reiniciar").innerHTML = "";
    c = 0;
    tabuleiro = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    p++;
}

function empate() {
    var fim = document.getElementById("vencedor");
    var reiniciar = document.getElementById("reiniciar");

    document.getElementById("vencedorTexto").innerHTML = "Empate";
    document.getElementById("reiniciar").innerHTML = "Jogar Novamente";

    fim.classList.add("vencedor");
    reiniciar.classList.add("reiniciar");

    reiniciar.classList.add("reiniciarpreto");
    fim.classList.add("vencedorpreto");

    e++;
    document.getElementById("placar-empate-numero").innerHTML = e;
    if (reiniciar.onclick(reiniciar()));
}

//Troca de quem começa
var O = document.getElementById('o');
O.addEventListener('click', event => {
    if (c == 0) {
        rodada = "X";
        trocaRodada();
    }
})

var X = document.getElementById('x');
X.addEventListener('click', event => {
    if (c == 0) {
        rodada = "O";
        trocaRodada();
    }
})

function venceu(tabuleiro, jogador) {
    if (
        (tabuleiro[0] == jogador && tabuleiro[1] == jogador && tabuleiro[2] == jogador) ||
        (tabuleiro[3] == jogador && tabuleiro[4] == jogador && tabuleiro[5] == jogador) ||
        (tabuleiro[6] == jogador && tabuleiro[7] == jogador && tabuleiro[8] == jogador) ||
        (tabuleiro[0] == jogador && tabuleiro[3] == jogador && tabuleiro[6] == jogador) ||
        (tabuleiro[1] == jogador && tabuleiro[4] == jogador && tabuleiro[7] == jogador) ||
        (tabuleiro[2] == jogador && tabuleiro[5] == jogador && tabuleiro[8] == jogador) ||
        (tabuleiro[0] == jogador && tabuleiro[4] == jogador && tabuleiro[8] == jogador) ||
        (tabuleiro[2] == jogador && tabuleiro[4] == jogador && tabuleiro[6] == jogador)
    ) {
        return true;
    } else {
        return false;
    }
}

function trocaRodada() {
    if (rodada == "X") {
        rodada = "O";
        document.getElementById("x").classList.remove("sombra-espessa");
        document.getElementById("x").classList.add("sombra-normal");
        document.getElementById("o").classList.add("sombra-espessa");
        document.getElementById("o").classList.remove("sombra-normal");
        jogador = "O";
    } else {
        rodada = "X";
        document.getElementById("o").classList.remove("sombra-espessa");
        document.getElementById("o").classList.add("sombra-normal");
        document.getElementById("x").classList.add("sombra-espessa");
        document.getElementById("x").classList.remove("sombra-normal");
        jogador = "X";
    }
}

function trocaRodadaMaquina() {
    if (rodada == "X") {
        document.getElementById("x").classList.remove("sombra-espessa");
        document.getElementById("x").classList.add("sombra-normal");
        document.getElementById("o").classList.add("sombra-espessa");
        document.getElementById("o").classList.remove("sombra-normal");
    } else {
 document.getElementById("o").classList.remove("sombra-espessa");
        document.getElementById("o").classList.add("sombra-normal");
        document.getElementById("x").classList.add("sombra-espessa");
        document.getElementById("x").classList.remove("sombra-normal");
    }
}

//efeito de opacidade no final do jogo
function mostrador1() {
    document.getElementById("vencedor").style.opacity = "0.5";
}
function mostrador2() {
    document.getElementById("vencedor").style.opacity = "1";
}

//interface de troca de modo
document.getElementById("botao-modos-de-jogo").addEventListener("click", event => {
    document.getElementById("modos-de-jogo-interface").style.visibility = "visible";
    document.getElementById("Jogador-Vs-Jogador").style.visibility = "visible";
    document.getElementById("Jogador-Vs-Maquina").style.visibility = "visible";
})
document.getElementById("Jogador-Vs-Jogador").addEventListener("click", event => {
    document.getElementById("Jogador-Vs-Jogador").style.visibility = "hidden";
    document.getElementById("Jogador-Vs-Maquina").style.visibility = "hidden";
    setTimeout(() => { document.getElementById("modos-de-jogo-interface").style.visibility = "hidden"; }, 300);
    document.getElementById("Jogador-Vs-Maquina").setAttribute("Jogador-Vs-Maquina", false);
    limpaPlacar();
    reiniciar();
})
document.getElementById("Jogador-Vs-Maquina").addEventListener("click", event => {
    document.getElementById("Jogador-Vs-Jogador").style.visibility = "hidden";
    document.getElementById("Jogador-Vs-Maquina").style.visibility = "hidden";
    setTimeout(() => { document.getElementById("modos-de-jogo-interface").style.visibility = "hidden"; }, 300);
    document.getElementById("Jogador-Vs-Maquina").setAttribute("Jogador-Vs-Maquina", true);
    limpaPlacar();
    reiniciar();
})

function limpaPlacar() {
    jo = 0;
    jx = 0;
    e = 0;
    document.getElementById("placar-x-numero").innerHTML = jx;
    document.getElementById("placar-empate-numero").innerHTML = e;
    document.getElementById("placar-o-numero").innerHTML = jo;
}

//Maquina
function minimax(tabuleiro, player) {
    var player1 = rodada == "X" ? "O" : "X";
    iter++;
    let array = avail(tabuleiro);
    if (venceu(tabuleiro, player1)) {
        return {
            score: -10
        };
    } else if (venceu(tabuleiro, rodada)) {
        return {
            score: 10
        };
    } else if (array.length == 0) {
        return {
            score: 0
        };
    }

    var moves = [];
    for (var i = 0; i < array.length; i++) {
        var move = {};
        move.index = tabuleiro[array[i]];
        tabuleiro[array[i]] = player;

        if (player == rodada) {
            var g = minimax(tabuleiro, player1);
            move.score = g.score;
        } else {
            var g = minimax(tabuleiro, rodada);
            move.score = g.score;
        }
        tabuleiro[array[i]] = move.index;
        moves.push(move);
    }

    var bestMove;
    if (player === rodada) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}

function avail(tabuleiro) {
    return tabuleiro.filter(s => s != "X" && s != "O");
}