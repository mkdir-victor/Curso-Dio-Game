const pianoKeys = document.querySelectorAll(".piano-keys .key");

// resolver problema de quando apertar teclado que diferenre nao dar erro
let mapedKeys = []

const volumSlider = document.querySelector(".volume-slider input");

let sound = new Audio("src/sound/a.wav");

const playTune = (key) => {
    sound.src = `./src/sound/${key}.wav`;
    sound.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active")
    setTimeout(()=>{
        clickedKey.classList.remove("active")
    },150)
};

pianoKeys.forEach((key)=>{
    console.log(key.dataset.key)
    // esse dataset e do html proprio
    key.addEventListener("click",()=> playTune(key.dataset.key));// esse funcao nao existe
    mapedKeys.push(key.dataset.key)
});

// adicionando acao quando o usuario aperta teclado
document.addEventListener("keydown",(e)=>{
    // apenas quando o key estiver em mapedkey
    if(mapedKeys.includes(e.key)){
    playTune(e.key); 

    }
})

const handleVolume = (e) =>{
    sound.volume = e.target.value;
}

volumSlider.addEventListener("input",handleVolume);

const keysCheck = document.querySelector(".keys-check input");

const showHideKeys = () =>{
    pianoKeys.forEach(key => key.classList.toggle("hide") );
    // diferenca de add e toggle
    // add adiciona, toggle se ja tiver o class o class remove se não adiciona
}

keysCheck.addEventListener("click",showHideKeys)
