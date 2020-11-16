const jogador1 = "X", jogador2 = "O";
var rodada="X", c=1, vencedor="", jx=0, jo=0, e=0;

document.getElementById("x").classList.add("sombra-espessa");

//Troca de quem começa
document.getElementById('o').addEventListener('click', event => {
    if(c == 1) {
        rodada = "X";
        trocaRodada();
    }
})
document.getElementById('x').addEventListener('click', event => {
    if(c == 1) {
        rodada = "O";
        trocaRodada();
    }
})

document.querySelectorAll('.quadrado').forEach(item => {
    item.addEventListener('click', event => {

        //Faz a jogada
        if(item.getAttribute("jogada") == "") {
            document.getElementById(item.id).innerHTML = rodada;
            item.setAttribute("jogada" , rodada);

            //Troca de rodada
            trocaRodada();
     
            vitoria();

            if(c == 9 && vencedor == "") { empate(); }
            c++;

            if(vencedor != "") {  funcVencedor(); }
        }
    })
})

function vitoria() {
   
    var a1 = document.getElementById("a1").getAttribute("jogada");
    var b1 = document.getElementById("b1").getAttribute("jogada");
    var c1 = document.getElementById("c1").getAttribute("jogada");

    var a2 = document.getElementById("a2").getAttribute("jogada");
    var b2 = document.getElementById("b2").getAttribute("jogada");
    var c2 = document.getElementById("c2").getAttribute("jogada");

    var a3 = document.getElementById("a3").getAttribute("jogada");
    var b3 = document.getElementById("b3").getAttribute("jogada");
    var c3 = document.getElementById("c3").getAttribute("jogada");

    if((a1 == b1 && a1 == c1 && a1 != "") || (a1 == a3 && a1 == a2 && a1 != "")) {
        vencedor = a1;
    }
    
    if((c3 == c2 && c3 == c1 && c3 != "") || (c3 == b3 && c3 == a3 && c3 != "")) {
        vencedor = c3;
    }

    if((b2 == c3 && b2 == a1 && b2 != "") || (b2 == a3 && b2 == c1 && b2 != "") ||
       (b2 == a2 && b2 == c2 && b2 != "") || (b2 == b1 && b2 == b3 && b2 != "")) {
        vencedor = b2;
    }
}

function funcVencedor() {
    
    var fim = document.getElementById("vencedor");
    var reiniciar = document.getElementById("reiniciar");
    
    if(vencedor == "O") {
        fim.classList.add("vencedorvermelho");
        reiniciar.classList.add("reiniciarvermelho");
    }

    document.getElementById("vencedorTexto").innerHTML = "'" + vencedor + "' Venceu";
    document.getElementById("reiniciar").innerHTML = "Jogar Novamente";

    fim.classList.add("vencedor");
    reiniciar.classList.add("reiniciar");
    if(reiniciar.onclick(reiniciar()));
}

function reiniciar() {
    document.querySelectorAll('.quadrado').forEach(item => {
        item.setAttribute("jogada", "");
        item.innerHTML = "";

        var fim = document.getElementById("vencedor");
        var reiniciar = document.getElementById("reiniciar");

        if(vencedor == "O") {
            fim.classList.remove("vencedorvermelho");
            reiniciar.classList.remove("reiniciarvermelho");
            placarVitoriaO();
        } else if(vencedor == "X"){
            fim.classList.remove("vencedor");  
            placarVitoriaX(); 
        }

        fim.classList.remove("vencedor");
        reiniciar.classList.remove("reiniciar"); 
        fim.classList.remove("vencedorpreto");   
        reiniciar.classList.remove("reiniciarpreto");

        document.getElementById("vencedorTexto").innerHTML = "";
        document.getElementById("reiniciar").innerHTML = "";

        vencedor = "";
        c = 1;
    })
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

    placarEmpate();
    if(reiniciar.onclick(reiniciar()));
}

function mostrador1() {
    document.getElementById("vencedor").style.opacity = "0.5";
}

function mostrador01() {
    document.getElementById("vencedor").style.opacity = "1";
}

function mostrador2() {
    document.getElementById("vencedor").style.opacity = "0.5";
}

function mostrador02() {
    document.getElementById("vencedor").style.opacity = "1";
}

function placarVitoriaX() {
    jx++;
    document.getElementById("placar-x-numero").innerHTML = jx;
}

function placarVitoriaO() {
    jo++;
    document.getElementById("placar-o-numero").innerHTML = jo;
}

function placarEmpate() {
    e++;
    document.getElementById("placar-empate-numero").innerHTML = e;
}

function trocaRodada() {
    if(rodada=="X") {
        rodada = "O";
        document.getElementById("x").classList.remove("sombra-espessa");
        document.getElementById("x").classList.add("sombra-normal");
        document.getElementById("o").classList.add("sombra-espessa");
        document.getElementById("o").classList.remove("sombra-normal");
    } else {
        rodada = "X";
        document.getElementById("o").classList.remove("sombra-espessa");
        document.getElementById("o").classList.add("sombra-normal");
        document.getElementById("x").classList.add("sombra-espessa");
        document.getElementById("x").classList.remove("sombra-normal");
    }
}