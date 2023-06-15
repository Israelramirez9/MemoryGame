// variables initialization
let cardsShown = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let hits = 0;
let inicialTimer = false;
let timer = 30;
let regressiveTimeId = null;
//downloads audio 
let winAudio = new Audio('./sounds/win.wav');
let loseAudio = new Audio('./sounds/lose.wav');
let rightAudio = new Audio('./sounds/right.wav');
let wrongAudio = new Audio('./sounds/wrong.wav');
let clickAudio = new Audio('./sounds/click.wav');

//pointing Document HTML
let showMovements = document.getElementById("movements");
let showHits = document.getElementById("hits");
let showTimer = document.getElementById("time-over");

//generatore of aleatory numbers
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => { return Math.random() - 0.5 });
console.log(numbers);

//functions
function downloadImages() {
    for (let i = 0; i < numbers.length; i++) {
        let imageElement = document.getElementById(i);
        imageElement.innerHTML = `<img src="./images/${numbers[i]}.png">`
        imageElement.style.opacity = 0;

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
        }
    }, 1000);
}
function blockCards() {
    for (let i = 0; i < numbers.length; i++) {
        let blockCard = document.getElementById(i);
        blockCard.style.opacity = 1;
       blockCard.disabled=true;     
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
            }
        } else {
            wrongAudio.play();
            //show for one second values and come back hiden them
            setTimeout(() => {
                card1.style.opacity = 0;
                card2.style.opacity = 0;
                card1.disabled = false;
                card2.disabled = false;
                cardsShown = 0;
            }, 250)
        }
    }
}
downloadImages();