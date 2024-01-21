const state = {
    score:{
        playerScore:0,
        computerScore:0,
        scoreBox:document.getElementById("score_point")
    },
    cardSprites:{
        avatar:document.getElementById("card_image"),
        name:document.getElementById("card_name"),
        type:document.getElementById("card_type")
    },
    fielCards:{
        player:document.getElementById("player_field_card"),
        commputer:document.getElementById("computer_field_card")
    },
    playerSide:{
        player1:"player_cards",
        player1Box:document.querySelector("#player_cards"),
        commputer:"computer_cards",
        commputerBox:document.querySelector("#computer_cards")
    },
    button:document.getElementById("next_duel")
};

// criando enumeraao para dar sentido ao carta, listar e conseguir retilar faciomente

const pathImg = "./src/assets/icons/"

const cardDate = [ 
    {
        id:0,
        name:"Blue eyes white dragon",
        tupe:"Paper",
        Image:`${pathImg}dragon.png`,
        WinOf:[1],
        LoseOf:[2]
    },
    {
        id:1,
        name:"Dark Magiciann",
        tupe:"Rock",
        Image:`${pathImg}magician.png`,
        WinOf:[2],
        LoseOf:[0]
    },
    {
        id:2,
        name:"Exodia",
        tupe:"Scisers",
        Image:`${pathImg}exodia.png`,
        WinOf:[0],
        LoseOf:[1]
    }
];

// seerve um id aleatorio de 0 a 2
async function getRandomCardId(){
    const randomIndex =Math.floor( Math.random()*cardDate.length)//limite do numero gerado, o floor serve para nao deixar quebrar o numero
    return cardDate[randomIndex].id;
}

async function drawCards(cardNumber,fieldSide){
    for(let i = 0; i < cardNumber; i++){
        const randomIdCard = await getRandomCardId();
        const cardImg = await createCardImage(randomIdCard,fieldSide);
        console.log(fieldSide);
        document.getElementById(fieldSide).appendChild(cardImg);

        
    }
}

async function createCardImage(IdCard, fieldSide){
    const cardImage = document.createElement("img"); // criando tag img
    cardImage.setAttribute("height","100px");
    cardImage.setAttribute("src",`${pathImg}card-back.png`)
    cardImage.setAttribute("data-id",IdCard);
    cardImage.classList.add("card");

    if(fieldSide === state.playerSide.player1){
        cardImage.addEventListener("click",()=>{
            setCardsField(cardImage.getAttribute("data-id"));
        });

        cardImage.addEventListener("mouseover", ()=>{
            drawSelectCard(IdCard)
        });
    }

    

    return cardImage;
}

async function drawSelectCard(index){
    state.cardSprites.avatar.src = cardDate[index].Image;
    state.cardSprites.name.innerText = cardDate[index].name;
    state.cardSprites.type.innerText = "Attibute :"+cardDate[index].tupe;
}

async function setCardsField(cardId){
    // remove todo carta
    await removeAllCardsImage();

    let computerCardId = await getRandomCardId();
    
    await showHiddenCardFildsImages(true);

    await hiddnCardDetails();

    state.fielCards.player.src = cardDate[cardId].Image;
    state.fielCards.commputer.src = cardDate[computerCardId].Image;

    let duelResult = await checkDuelResult(cardId,computerCardId);

    await drawButton(duelResult);
    await updateScore();
    
}

async function removeAllCardsImage(){
    let {commputerBox,player1Box} = state.playerSide;
    let imageElements = commputerBox.querySelectorAll("img");
    imageElements.forEach((img) => img.remove());

    imageElements = player1Box.querySelectorAll("img");
    imageElements.forEach((img) => img.remove());
}

async function checkDuelResult(playerCardId,computerCardId){
    let duelResult = "Drow";

    let playerCard = cardDate[playerCardId];

    if(playerCard.WinOf.includes(computerCardId)){
        duelResult = "Win";
        state.score.playerScore++;
    }

    if(playerCard.LoseOf.includes(computerCardId)){
        duelResult = "lose";
        state.score.computerScore++;
    }

    try {
        await playSound(duelResult);
    } catch (error) {
        
    }

    return duelResult;
}

async function drawButton(text){
    state.button.innerText = text.toUpperCase();
    state.button.style.display = "block"
}

async function updateScore(){
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose ${state.score.computerScore}`
}

async function resetDuel(){
    state.cardSprites.avatar.src = "";
    state.button.style.display = "none";

    showHiddenCardFildsImages(false);

    init();
}

async function playSound(status){
    const sound = new Audio(`./src/assets/audios/${status}.wav`);
    sound.play();
}

async function hiddnCardDetails(){
    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
}

async function showHiddenCardFildsImages(value){

    if(value === true){
        state.fielCards.player.style.display = "block";
        state.fielCards.commputer.style.display = "block";
    }else{
        state.fielCards.player.style.display = "none";
        state.fielCards.commputer.style.display = "none";
    }
}


function init(){

    showHiddenCardFildsImages(false);


    // funcao que da cartas para usuario
    drawCards(5, state.playerSide.player1);
    drawCards(5, state.playerSide.commputer);

    const bgm = document.getElementById("bgm");
    bgm.play();""
}

init();