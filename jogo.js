console.log('Leozinho Flappy Bird');

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

const flappBird = {
    spriteX:0,
    spriteY:0,
    width:33,
    height:24,
    x: 10,
    y: 50,
    gravidade:0.25,
    velocidade:0,

    atualiza(){
        flappBird.velocidade = flappBird.velocidade + flappBird.gravidade;
       // console.log(flappBird.velocidade);
        flappBird.y += flappBird.velocidade;
    },

    desenha: function(){
        contexto.drawImage(
            sprites, 
            flappBird.spriteX, flappBird.spriteY, //Sprite X, Sprite Y 
            flappBird.width, flappBird.height, // tamanho do recorte em X(comprimento) e Y(altura)
            flappBird.x, flappBird.y, 
            flappBird.width, flappBird.height,
            
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

let telaAtiva = {};
function mudaParaTela(novaTela){
    telaAtiva = novaTela;
};


const Telas ={
    INICIO:{
        desenha(){
            planoDeFundo.desenha();
            chao.desenha();
            flappBird.desenha();
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
        flappBird.desenha();
    },
    atualiza(){
        flappBird.atualiza();
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