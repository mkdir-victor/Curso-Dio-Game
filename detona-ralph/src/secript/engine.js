const state = {

    view:{
        // são os valiavel que usuario vai ver
        squere:document.querySelectorAll(".squere"),//sleciona item que esta escolhido
        enemy:document.querySelector(".enemy"),
        timeLeft:document.querySelector("#time-left"),
        score:document.querySelector("#score")
    },
    value:{
        // variavel que usuario não vaai ver
        timerId:null,
        gameVelocity:1000,
        hitPosition:0,
        result:0,
        currentTime:60,
    },
    action:{// é um variavel que guarda ação
        countDownId:setInterval(countDown,1000)// aqui pode ter função em state, quando o bralser lé já e iniciado
    }
};

// conceito de Listner --> alguen ficar olvindo alguma ação
function addLitnerHitbox(){
    state.view.squere.forEach((squere) => {
        squere.addEventListener("mousedown", ()=>{
            // evendo que acontece quando é criacaod, o addEventoListnner o "mousedown" é quando mouse é cricado, em segundo parametro pode passar o evento quando ser cricado
            if(squere.id === state.value.hitPosition){
                state.value.result++;
                state.view.score.textContent = state.value.result;
                state.value.hitPosition = null;
                playSound('hit');
            }
        })
    });
}


// função que fica trocando por tempo
function moveEnemy(){
    state.value.timerId = setInterval(randomSquere,state.value.gameVelocity); // vai executar o função passado em setInterval com tempo expecificado
}

// conta o tempo e tem condiçao do tempo
function countDown(){
    state.value.currentTime--;
    state.view.timeLeft.textContent = state.value.currentTime;
    
    if(state.value.currentTime <= 0){
        // limpando o intervalo
        clearInterval(state.action.countDownId);
        clearInterval(state.value.timerId);
        alert("Your Point :"+state.value.result);
    }
}

// tocar som
function playSound(audioName){
    let sound = new Audio(`./src/sound/${audioName}.m4a`)
    sound.volume = 0.2;
    sound.play();
}

// função para mudar o class enemy
function randomSquere(){

    state.view.squere.forEach((squere)=>{
        squere.classList.remove("enemy");
    })

    let rundomNumber = Math.floor(Math.random()*9) // sortiando um numero 1 ~ 9
    let randomSquere = state.view.squere[rundomNumber] // escolhendo qual quadrado que vai aparecer o imagem do personagem
    randomSquere.classList.add("enemy")// adicionando o class "enemy" em quadrado que foi sorteado

    state.value.hitPosition = randomSquere.id
}

// ter um função principal para inicializar
function init(){
    moveEnemy();
    addLitnerHitbox();
}

init();