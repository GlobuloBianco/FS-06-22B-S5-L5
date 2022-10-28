let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];

let arrayComparison = [];

document.body.onload = startGame();

var interval;
var trova = document.querySelector('.find');
var modale = document.getElementById('modal');
var tempo = document.querySelector('.timer');

//nascondi le carte dopo 5 secondi
setTimeout(() => {vedi()}, 5000);

vedi = () => {
    let icone = document.querySelectorAll('.icon');
    for(i = 0; i < icone.length; i++) {  
        icone[i].classList.add('nascondi');
        icone[i].classList.remove('disabled');
    }
}


function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}

function startGame() {
    document.getElementById('modal').classList.remove("active");

    let array = [];
    var arrayShuffle = shuffle(arrayAnimali);
    let griglia = document.getElementById('griglia');
    //pulizia
    griglia.innerHTML = "";
    document.querySelector('.timer').innerHTML = `Tempo: 0 min 0 sec`;
    //display carte
    for(i = 0; i < arrayShuffle.length; i++) {  
        var listaCarte = document.createElement("div");
        var cartaSingola = document.createElement("div");
        cartaSingola.classList = 'icon';
        griglia.appendChild(listaCarte).appendChild(cartaSingola);
        cartaSingola.innerHTML = arrayShuffle[i];
    }

    let icone = document.querySelectorAll('.icon');
    for(i = 0; i < icone.length; i++) {  
        icone[i].addEventListener('click', displayIcon);
        icone[i].addEventListener('click', win);
        //disabilita per i primi 5 sec
        icone[i].classList.add('disabled');
    }
    //cheat
    cheat = () => {
        let icone = document.querySelectorAll('.icon');
        for(i = 0; i < icone.length; i++) {  
            icone[i].classList.toggle('nascondi');
        }
    }
}

function displayIcon() {
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];

    //mette/toglie la classe show
    this.classList.toggle("show");
    //aggiunge l'oggetto su cui ha cliccato all'array del confronto
    arrayComparison.push(this);

    var len = arrayComparison.length;
    //se nel confronto ci sono due elementi
    if (len === 2) {
        //se sono uguali aggiunge la classe find
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
        } else {
            let gameover = document.getElementById('gameover');
            gameover.classList.add("active");
            //altrimenti (ha sbagliato) aggiunge solo la classe disabled
            icons.forEach(function(item) {
                item.classList.add('disabled');
            }); 
            // con il timeout rimuove  la classe show per nasconderli
            setTimeout(function() {
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function(item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < icons.length; i++) {
                        icons[i].classList.add("disabled");
                    }
                });
                arrayComparison = [];
            }, 700);
        }
    }
}
//-----//
function win() {
    let trovati = document.querySelectorAll('.find').length;
    if(trovati == 24) {
        let risultato = document.querySelector('h2');

        modale.classList.add("active");
        risultato.innerHTML += `${min} min e ${sec} sec!`;
    }
}

playAgain = () => {
    location.reload();
} 
//----//
var sec = 0;
var min = 0;
function displayTime(){
    if (sec == 59) {
        sec = -1;
        min = min + 1;
    }
    sec = sec + 1;
    document.querySelector(".timer").innerHTML = `Tempo: ${min} min ${sec} sec`;
    //reset tempo al click del btn
    let resetBtn = document.getElementById('button');
    resetBtn.addEventListener('click', () => {
        min = 0;
        sec = 0;
    })
}
setInterval(displayTime, 1000);