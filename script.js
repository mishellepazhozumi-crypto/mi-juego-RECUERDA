const gameBoard = document.getElementById("gameBoard");
const icons = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍓', '🍍', '🥝'];
let cardArray = [...icons, ...icons];
let flippedCards = [];
let matchedPairs = 0;

let tiempo = 60;
let intervalo;

const iniciarBtn = document.getElementById("iniciarTiempo");
const reiniciarBtn = document.getElementById("reiniciarJuego");
const contador = document.getElementById("contador");
const mensaje = document.getElementById("mensaje");

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    shuffle(cardArray);
    cardArray.forEach((icon) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.icon = icon;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.textContent = this.dataset.icon;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 800);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.icon === card2.dataset.icon) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;

        if (matchedPairs === icons.length) {
            clearInterval(intervalo);
            mensaje.textContent = "🎉 ¡Ganaste!";
            mensaje.className = "ganaste";
            setTimeout(() => alert("¡Ganaste!"), 300);
        }
    } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.textContent = "";
        card2.textContent = "";
    }
    flippedCards = [];
}

function iniciarTemporizador() {
    clearInterval(intervalo);
    tiempo = 60;
    contador.textContent = tiempo;
    mensaje.textContent = "";

    intervalo = setInterval(() => {
        tiempo--;
        contador.textContent = tiempo;

        if (tiempo <= 0) {
            clearInterval(intervalo);
            mensaje.textContent = "😢 Perdiste, se acabó el tiempo.";
            mensaje.className = "perdiste";
            alert("⏰ ¡Se acabó el tiempo! Perdiste.");
        
            document.querySelectorAll(".card").forEach(card => card.removeEventListener("click", flipCard));
        }

        if (matchedPairs === icons.length) {
            clearInterval(intervalo);
            mensaje.textContent = "🎉 ¡Ganaste!";
            mensaje.className = "ganaste";
        }
    }, 1000);
}

function reiniciarJuego() {
    clearInterval(intervalo);
    tiempo = 60;
    contador.textContent = tiempo;
    mensaje.textContent = "";
    mensaje.className = "";

    matchedPairs = 0;
    flippedCards = [];
    cardArray = [...icons, ...icons];
    gameBoard.innerHTML = "";
    createBoard();
}

iniciarBtn.addEventListener("click", iniciarTemporizador);
reiniciarBtn.addEventListener("click", reiniciarJuego);

createBoard();