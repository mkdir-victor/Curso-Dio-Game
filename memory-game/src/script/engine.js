const emojis = [
    "🤐",
    "🤐",
    "😶‍🌫️",
    "😶‍🌫️",
    "🫥",
    "🫥",
    "😉",
    "😉",
    "😒",
    "😒",
    "😍",
    "😍",
    "😂",
    "😂",
    "😎",
    "😎"
];

let openCard = [];

let shuffleEmojes = emojis.sort(()=>
    Math.random() > 0.5 ? 2:-1
); // cada elemeto selecionado joga o peso de 2 e -1 para deixar mais aleatorio

for(let i = 0; i<emojis.length; i++){
    let box = document.createElement("div");// cria elemento com tag div
    box.className = "item" // atribui o classe item em tag div gerado
    box.innerHTML = shuffleEmojes[i];
    document.querySelector(".game").appendChild(box) // insere o emoji drentro do div

    box.onclick = handleClick;
}

function handleClick(){
    if(openCard.length < 2){
        this.classList.add("boxOpen") // quando o card e cricado adiciona o  class boxOpen
        openCard.push(this);
    }

    if(openCard.length == 2){
        setTimeout(checkMatch,500);
    }
}

function checkMatch(){

    if(openCard[0].innerHTML === openCard[1].innerHTML){
        openCard[0].classList.add("boxMatch");
        openCard[1].classList.add("boxMatch");
    }else{
        openCard[0].classList.remove("boxOpen");
        openCard[1].classList.remove("boxOpen");
    }

    openCard = [];

    if(document.querySelectorAll(".boxMatch").length == emojis.length){
        alert("Voce venceu")
    }
}