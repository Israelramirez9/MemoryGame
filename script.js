// variables initialization
let cardsShown;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let movements;
let hits;
let inicialTimer;
let timer;
let regressiveTimeId = null;
let numbers;
//downloads audio 
let winAudio = new Audio('./sounds/win.wav');
let loseAudio = new Audio('./sounds/lose.wav');
let rightAudio = new Audio('./sounds/right.wav');
let wrongAudio = new Audio('./sounds/wrong.wav');
let clickAudio = new Audio('./sounds/click.wav');

//pointing Document HTML
let elementPlayAgain = document.getElementById("button-play-again");
let showMovements = document.getElementById("movements");
let showHits = document.getElementById("hits");
let showTimer = document.getElementById("time-over");

//generatore of aleatory numbers

function printBoard() {
    numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    numbers = numbers.sort(() => { return Math.random() - 0.5 });
    console.log(numbers);
    timer =30;
    cardsShown = 0;
    movements = 0;
    hits = 0;
    inicialTimer = false;
    for (let i = 0; i < numbers.length; i++) {
        let imageElement = document.getElementById(i);
        imageElement.innerHTML = `<img src="./images/${numbers[i]}.png">`
        imageElement.style.opacity = 0;
        imageElement.disabled = false;
    }

}


function chronometer() {
    regressiveTimeId = setInterval(() => {
        timer--;
        showTimer.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer == 0) {
            clearInterval(regressiveTimeId);
            blockCards();
            showMovements.innerHTML = `Movimientos: ${movements} Perdiste 😓`;
            loseAudio.play();
            let elementPlayAgain = document.getElementById("button-play-again");
            elementPlayAgain.style.display = "flex";
        }
    }, 1000);
}
function blockCards() {
    for (let i = 0; i < numbers.length; i++) {
        let blockCard = document.getElementById(i);
        blockCard.style.opacity = 1;
        blockCard.disabled = true;
    }
}

//main function
function showcard(id) {
    if (inicialTimer == false) {
        chronometer();
        inicialTimer = true;
    }
    cardsShown++;
    console.log(cardsShown);
    if (cardsShown == 1) {
        //show first number
        card1 = document.getElementById(id);
        firstResult = numbers[id];
        card1.style.opacity = 1

        //disabled first button
        card1.disabled = true;

        clickAudio.play();

    } else if (cardsShown == 2) {
        //show second number
        card2 = document.getElementById(id);
        secondResult = numbers[id];
        card2.style.opacity = 1;

        //disabled second button
        card2.disabled = true;

        //increase movements and show at Document
        movements++;
        showMovements.innerHTML = `Movimientos: ${movements}`;
        if (firstResult == secondResult) {
            //reset counter
            cardsShown = 0;
            rightAudio.play();
            //increase hits and show at Document
            hits++;
            showHits.innerHTML = `Aciertos: ${hits}`;

            if (hits == 8) {
                winAudio.play();
                clearInterval(regressiveTimeId);
                showMovements.innerHTML = `Movimientos: ${movements} Has Ganado 🎊`;
                showHits.innerHTML = `Aciertos: ${hits} 😱`;
                showTimer.innerHTML = `Lo lograste, demoraste: ${30 - timer} segundos`;
                elementPlayAgain.style.display = "flex";

            }
        } else {
            wrongAudio.play();
            card1.disabled = false;
            card2.disabled = false;
            cardsShown = 0;
            //show for one second values and come back hiden them
            setTimeout(() => {
                card1.style.opacity = 0;
                card2.style.opacity = 0;


            }, 250)
        }
    }
}
elementPlayAgain.addEventListener("click", () => {
    printBoard();
    elementPlayAgain.style.display = "none";
})
printBoard();