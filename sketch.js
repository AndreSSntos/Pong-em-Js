let xBolinha = 300;
let yBolinha = 200;
let diametro = 28;
let raio = diametro / 2;
let VelocidadexBolinha = 10;
let VelocidadeyBolinha = 6;

let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

let xRaqueteOponente = 585;
let yRaqueteOponente = 160;
let velocidadeYOponente;


let colidiu = false;

let meusPontos = 0;
let pontosDoOponente = 0;

let raquetada;
let ponto;
let trilha;


function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}


function setup() {
    createCanvas(600, 400);
    trilha.loop();
}

function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    verificaColisao();
    mostraRaquete(xRaquete, yRaquete);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaMinhaRaquete();
    verificaColisaoRaquete(xRaquete, yRaquete);
    movimentaRaqueteOponenente();
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    incluiPlacar();
    marcaPonto();

}


function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
    xBolinha += VelocidadexBolinha;
    yBolinha += VelocidadeyBolinha;
}

function verificaColisao() {

    if (xBolinha + raio > width ||
        xBolinha - raio < 0) {
        VelocidadexBolinha *= -1;
    }

    if (yBolinha + raio > height || yBolinha - raio < 0) {
        VelocidadeyBolinha *= -1;
    }
}

function mostraRaquete(x, y) {
    rect(x, y, raqueteComprimento, raqueteAltura)
}


function movimentaMinhaRaquete() {
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }
}


function movimentaRaqueteOponenente() {
    velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
    yRaqueteOponente += velocidadeYOponente;

}

function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu) {
        VelocidadexBolinha *= -1;
        raquetada.play();
    }

}

function incluiPlacar() {
    stroke(255)
    textAlign(CENTER)
    textSize(16);
    fill(255, 140, 0)
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(255, 140, 0)
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 470, 26);

}

function marcaPonto() {
    if (xBolinha > 588) {
        meusPontos += 1;
        ponto.play()
    }
    if (xBolinha < 12) {
        pontosDoOponente += 1;
        ponto.play();
    }
}