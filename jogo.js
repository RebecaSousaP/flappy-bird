// Aqui teremos a programação do Flappy Bird :D
const jogo = {};
const sprites = new Image();
sprites.src = ' ./sprites.png';
var par = 0

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');


function criaFlappyBird(){
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 35,
        altura: 25,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula(){
            flappyBird.velocidade = -flappyBird.pulo;
        },
            desenha(){
            contexto.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY,
                flappyBird.largura, flappyBird.altura,
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,
            );
        },
        fazColisao(){
            if(flappyBird.y>=345){
                som_punch.play();
                telaAtiva = TelaInicio;
                flappyBird.y = 50;
                flappyBird.velocidade = 0
                canos.pares = []
                return true
            }
        },
        gravidade: 0.25,
        velocidade: 0,
        movimentos: [
            { spriteX: 0, spriteY: 0, }, //asa pra cima
            { spriteX: 0, spriteY: 26, }, //asa no meio
            { spriteX: 0, spriteY: 52, }, //asa pra baixo
            { spriteX: 0, spriteY: 26, }, //asa no meio
        ],
        atualiza(){
            if(flappyBird.fazColisao()){
                som_punch.play();
                telaAtiva = TelaGameOVer;
                return;
            }           
            flappyBird.velocidade += flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
            flappyBird.atualizaFrame();
        },
        frameAtual: 0,
        atualizaFrame(){
            if ((animation_frame % 10) === 0 ){
                flappyBird.frameAtual = flappyBird.frameAtual + 1;
                flappyBird.frameAtual = flappyBird.frameAtual % flappyBird.movimentos.length;
                flappyBird.spriteX = flappyBird.movimentos[flappyBird.frameAtual].spriteX;
                flappyBird.spriteY = flappyBird.movimentos[flappyBird.frameAtual].spriteY;
    
            }
        },
    }
    return flappyBird;
}



function criaChao(){
    const chao = {
        spriteX: 0,
        spriteY: 611,
        largura: 224,
        altura: 112,
        x: 0,
        y: 370,
    
        desenha(){
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura,
            );
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x + chao.largura, chao.y,
                chao.largura, chao.altura,
            );
        },
        atualiza(){
            chao.x = chao.x - 1;
            chao.x = chao.x % (chao.largura / 2);
        }
    }
    return chao;
}


function criaPlanoDeFundo(){
    const fundo = {
        spriteX: 390,
        spriteY: 0,
        largura: 276,
        altura: 204,
        x: 0,
        y: 270,
            desenha(){
            contexto.drawImage(
                sprites,
                fundo.spriteX, fundo.spriteY,
                fundo.largura, fundo.altura,
                fundo.x, fundo.y,
                fundo.largura, fundo.altura,
            );
            contexto.drawImage(
                sprites,
                fundo.spriteX, fundo.spriteY,
                fundo.largura, fundo.altura,
                fundo.x + fundo.largura, fundo.y,
                fundo.largura, fundo.altura,
            );
            contexto.drawImage(
                sprites,
                fundo.spriteX, fundo.spriteY,
                fundo.largura, fundo.altura,
                fundo.x + 2 * fundo.largura, fundo.y,
                fundo.largura, fundo.altura,
            );
        },
        atualiza(){
            fundo.x = fundo.x - 0.3;
            fundo.x = fundo.x % (fundo.largura);
        }
    }
    return fundo;
}


function criaCanos(){
    const canos = {
        largura: 52,
        altura: 400,
        ceu: {
            spriteX: 52,
            spriteY: 169,
            x: 120,
            y: -150
        },
        chao: {
            spriteX: 0,
            spriteY: 169
        },
        pares: [],
        espacoEntreCanos: 120,
        desenha(){
            for(i=0;i<canos.pares.length;i++){
                canos.ceu.x = canos.pares[i].x;
                canos.ceu.y = canos.pares[i].y;
                
            const espacoEntreCanos  = 80;
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canos.ceu.x, canos.ceu.y,
                    canos.largura, canos.altura,
                );
                
                const canoChaoX = canos.ceu.x;
                const canoChaoY = canos.altura + espacoEntreCanos + canos.ceu.y;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )
            }
        },
        atualiza(par){
                const passou100Frames = (animation_frame % 100 === 0);
                for(i=0;i<canos.pares.length;i++){
                    par = canos.pares[i]
                    par.x -= 2
                    if(fazColisaoObstaculo(par)){
                        som_punch.play();
                        telaAtiva = TelaGameOVer;
                        flappyBird.y = 50;
                        flappyBird.velocidade = 0
                        canos.pares = []
                        return
                    }
                }
                if(passou100Frames){
                    const novoPar = {
                        x: canvas.width,
                        y: -150 * (Math.random() + 1),
                        }
                    canos.pares.push(novoPar);
                    }
                
                if(par.x + canos.largura <= 0){
                    canos.pares.shift();
                }   
        
            }
    }
    return canos;
}


function fazColisaoObstaculo(par){
    console.log(par)
    if(flappyBird.x >= par.x && flappyBird.x <= par.x + canos.largura ||
        flappyBird.x + flappyBird.largura >= par.x && flappyBird.x + flappyBird.largura <= par.x + canos.largura){
        const alturaCabecaFlappy = flappyBird.y;
        const alturaPeFlappy = flappyBird.y + flappyBird.altura;
        const bocaCanoCeuY = par.y + canos.altura;
        const bocaCanoChaoY = par.y + canos.altura + canos.espacoEntreCanos;
        if(alturaCabecaFlappy <= bocaCanoCeuY){
            return true;
        }
        if(alturaPeFlappy >= bocaCanoChaoY){
            return true;
        }
    }
    return false;    
}


const inicio = {
    spriteX: 130,
    spriteY: 0,
    largura: 180,
    altura: 152,
    x: 70,
    y: 70,
        desenha(){
        contexto.drawImage(
            sprites,
            inicio.spriteX, inicio.spriteY,
            inicio.largura, inicio.altura,
            inicio.x, inicio.y,
            inicio.largura, inicio.altura,
        );
    }
}

function criaPlacar(){
    const placar = {
        pontos: 0,
        desenha(){
            contexto.font = '35px "VT323"';
            contexto.textAlign = 'right';
            contexto.fillStyle = 'white';
            contexto.fillText("Pontuação:  " + placar.pontos, 35, 35);
        },
        atualiza(){
            const intervaloDeFrames = 20;
            const PassouIntervalo = animation_frame % intervaloDeFrames === 0 ;
    
            if(PassouIntervalo){
                placar.pontos = placar.pontos + 1;
            }
        }
    }
    return placar;
}


const gamerOver = {
    spriteX: 134,
    spriteY: 153,
    largura: 226,
    altura: 200,
    x: 50,
    y: 70,
    desenha(){
        contexto.drawImage(
            sprites,
            gamerOver.spriteX, gamerOver.spriteY,
            gamerOver.largura, gamerOver.altura,
            gamerOver.x, gamerOver.y,
            gamerOver.largura, gamerOver.altura
        );
    }
}


const TelaGameOVer = {
    desenha(){
        gamerOver.desenha();
    },
    click(){
        telaAtiva = TelaInicio
    }
}

const TelaInicio = {
    desenha(){
        ceu();
        fundo = criaPlanoDeFundo()
        canos = criaCanos()
        chao = criaChao()
        flappyBird = criaFlappyBird()
        placar = criaPlacar()
        fundo.desenha();
        canos.desenha();
        chao.desenha();
        flappyBird.desenha();
        inicio.desenha();
    },
    click(){
        telaAtiva = TelaJogo;
    }
}

const TelaJogo = {
    desenha(){
        ceu();
        fundo.atualiza();
        fundo.desenha();
        canos.atualiza(par);
        canos.desenha(par);
        chao.atualiza();
        chao.desenha();
        flappyBird.atualiza();
        flappyBird.desenha();
        placar.atualiza();
        placar.desenha();
    },
    click(){
        flappyBird.pula();
    }
}

function ceu(){
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)
}


function inicializa(){
    jogo.flappyBird = criaFlappyBird();
    jogo.fundo = criaPlanoDeFundo();
    jogo.chao = criaChao();
    jogo.canos = criaCanos();
    jogo.placar = criaPlacar();
}


const som_punch = new Audio();
som_punch.src = './punch.wav';

let animation_frame = 0;

var telaAtiva = TelaInicio
function mudaTelaAtiva(){
    telaAtiva.click();
}
window.addEventListener("click", mudaTelaAtiva);


function loop(){
    telaAtiva.desenha()
    animation_frame = animation_frame + 1;
    requestAnimationFrame(loop);
}

loop(); 