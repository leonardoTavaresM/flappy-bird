console.log('Leozinho Flappy Bird');

const som_HIT = new Audio()
som_HIT.src = './efeitos/hit.wav'

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    width: 275,
    height: 204,
    x: 0,
    y: canvas.height - 204,

    desenha: function(){
        contexto.fillStyle='#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites, 
            planoDeFundo.spriteX, planoDeFundo.spriteY, //Sprite X, Sprite Y 
            planoDeFundo.width, planoDeFundo.height, // tamanho do recorte em X(comprimento) e Y(altura)
            planoDeFundo.x, planoDeFundo.y, 
            planoDeFundo.width, planoDeFundo.height,
        );

        contexto.drawImage(
            sprites, 
            planoDeFundo.spriteX, planoDeFundo.spriteY, //Sprite X, Sprite Y 
            planoDeFundo.width, planoDeFundo.height, // tamanho do recorte em X(comprimento) e Y(altura)
            (planoDeFundo.x + planoDeFundo.width), planoDeFundo.y, 
            planoDeFundo.width, planoDeFundo.height,
        );
    }
}



const chao = {
    spriteX:0,
    spriteY:610,
    width:224,
    height:112,
    x: 0,
    y: canvas.height - 112,

    desenha: function(){
        contexto.drawImage(
            sprites, 
            chao.spriteX, chao.spriteY, //Sprite X, Sprite Y 
            chao.width, chao.height, // tamanho do recorte em X(comprimento) e Y(altura)
            chao.x, chao.y, 
            chao.width, chao.height,
        );

        contexto.drawImage(
            sprites, 
            chao.spriteX, chao.spriteY, //Sprite X, Sprite Y 
            chao.width, chao.height, // tamanho do recorte em X(comprimento) e Y(altura)
            (chao.x + chao.width), chao.y, 
            chao.width, chao.height,
        );
    }
}

function fazColisao(flappyBird, chao){
    const flappyBirdY = flappyBird.y + flappyBird.height;
    const chaoY = chao.y;

    if(flappyBirdY >= chaoY){
        return true;
    }else{
        return false;
    }
}


function criaFlappyBird(){
    const flappyBird = {
        spriteX:0,
        spriteY:0,
        width:33,
        height:24,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula(){
            flappyBird.velocidade = - flappyBird.pulo;
        },
        gravidade:0.25,
        velocidade:0,
    
        atualiza(){
            if(fazColisao(flappyBird, chao)){
                console.log('fez colisão');
                som_HIT.play();

                setTimeout(()=>{
                    mudaParaTela(Telas.INICIO);
                },500);
                
                return;
            }
    
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
           // console.log(flappyBird.velocidade);
            flappyBird.y += flappyBird.velocidade;
        },
    
        desenha: function(){
            contexto.drawImage(
                sprites, 
                flappyBird.spriteX, flappyBird.spriteY, //Sprite X, Sprite Y 
                flappyBird.width, flappyBird.height, // tamanho do recorte em X(comprimento) e Y(altura)
                flappyBird.x, flappyBird.y, 
                flappyBird.width, flappyBird.height,
                
            );
        }
    }
    return flappyBird;
};

const flappyBird = {
    spriteX:0,
    spriteY:0,
    width:33,
    height:24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula(){
        flappyBird.velocidade = - flappyBird.pulo;
    },
    gravidade:0.25,
    velocidade:0,

    atualiza(){
        if(fazColisao(flappyBird, chao)){
            console.log('fez colisão');
            mudaParaTela(Telas.INICIO);
            return;
        }

        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
       // console.log(flappyBird.velocidade);
        flappyBird.y += flappyBird.velocidade;
    },

    desenha: function(){
        contexto.drawImage(
            sprites, 
            flappyBird.spriteX, flappyBird.spriteY, //Sprite X, Sprite Y 
            flappyBird.width, flappyBird.height, // tamanho do recorte em X(comprimento) e Y(altura)
            flappyBird.x, flappyBird.y, 
            flappyBird.width, flappyBird.height,
            
        );
    }
}

/// [mensagem ready]
const mensagemGetReady = {
    spriteX: 134,
    spriteY:0,
    width:174,
    height:152,
    x: (canvas.width /2) - 174 / 2,
    y: 50,

    desenha: function(){
        contexto.drawImage(
            sprites, 
            mensagemGetReady.spriteX, mensagemGetReady.spriteY, //Sprite X, Sprite Y 
            mensagemGetReady.width, mensagemGetReady.height, // tamanho do recorte em X(comprimento) e Y(altura)
            mensagemGetReady.x, mensagemGetReady.y, 
            mensagemGetReady.width, mensagemGetReady.height,
        );
    }
}

//
//[telas]
//

const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela){
    telaAtiva = novaTela;

    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
};


const Telas ={
    INICIO:{
        inicializa(){
            globais.flappyBird = criaFlappyBird();
        },
        desenha(){
            planoDeFundo.desenha();
            chao.desenha();
            globais.flappyBird.desenha();
            mensagemGetReady.desenha();
        },
        click(){
            mudaParaTela(Telas.JOGO);
        },

        atualiza(){

        },
    },
};


Telas.JOGO = {
    desenha(){
        planoDeFundo.desenha();
        chao.desenha();
        globais.flappyBird.desenha();
    },

    click(){
        globais.flappyBird.pula();

        
    },
    atualiza(){
        globais.flappyBird.atualiza();
    }
};


function loop(){
   
   telaAtiva.desenha();
   telaAtiva.atualiza();
   
   requestAnimationFrame(loop);

}

window.addEventListener('click', function(){
    if(telaAtiva.click){
        telaAtiva.click();
    };
});


mudaParaTela(Telas.INICIO);
loop();