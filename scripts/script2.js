let guesses = [];
let answer;
const swup = new Swup()
let game = 0;

let gameDifficulty = 2;
let difficulties = [1000000, 200000, 50000, 10000, 2000, 0]

let countryOrder = [];

// for(let i = 0; i < 10; i ++){
//     let rand = Math.floor(Math.random()*10000)

//     console.log(data.country[rand], data.country_name[rand], data.rank_in_country[rand], data.surname[rand], data.incidence[rand], data.frequency_denom[rand])
// }

let possibleCountries = [...new Set(data.country_name)];

// console.log(possibleCountries);



// This code is used to create the autocomplete
$(".autocomplete").autocomplete({source: function(request, response) {
    let results = $.ui.autocomplete.filter(possibleCountries, request.term);

    response(results.slice(0, 7));
}});

let finished = document.getElementById('finished')
// This function runs whenever a guess is made:
function guessMade(){
    let guess = capFirst(document.getElementById('guessBox').value);
    if(!(possibleCountries.indexOf(guess) >= 0)) return;
    
    guesses.push(guess);
    updateGuesses();

    if(guess == answer){
        finished.innerHTML = "You have successfully guessed the answer!"
        fillHint(guess, answer, guesses.length)
        document.querySelector('input').setAttribute('readonly', '')
        document.getElementById("giveUp").disabled = true;
        document.getElementById("guessButton").disabled = true;
        game++;
    }
    else{ // USE THIS SPACE FOR HINTS AS WELL


        if(guesses.length == 5){
            finished.innerHTML  = `Unfortunately, you did not guess the country right in 5 guesses.  The answer was ${answer}`;
            document.querySelector('input').setAttribute('readonly', '')
            document.getElementById("giveUp").disabled = true;
            document.getElementById("guessButton").disabled = true;
            fillHint(guess, answer, guesses.length)
            game++;
        }
        else{
            fillHint(guess, answer, guesses.length)
            finished.innerHTML  = 'Nope, that\'s not it';
        }
    }
}

function updateGuesses(){
    for(let i = 0; i < guesses.length; i++){
        document.getElementById(`guess${i+1}`).innerHTML = guesses[i];
    }
}

function resetGuesses(){
    for(let i = 0; i < 5; i++){
        document.getElementById(`guess${i+1}`).innerHTML = "";
    }
}


function newGameGlobal(){
    console.log(difficulties, gameDifficulty)
    resetText()
    resetGuesses();
    guesses = [];
    let minIncidence = difficulties[gameDifficulty];
    countryOrder = [];

    for(let i = 0; i < data.country.length; i++){
        if(data.incidence[i] >= minIncidence){
            countryOrder.push(i);
        }
    }
    shuffle(countryOrder)

    let country = getCountry(countryOrder[game%countryOrder.length]);
    answer = country.country;

    document.getElementById('todayName').innerHTML = country.name;
    document.querySelector('input').removeAttribute('readonly')
    document.getElementById('guessBox').value = ""
}

function newGame(difficulty){ // 0, 1, 2, 3, 4, 5
    resetText()
    resetGuesses();
    guesses = [];
    let minIncidence = difficulties[difficulty];
    countryOrder = [];

    for(let i = 0; i < data.country.length; i++){
        if(data.incidence[i] >= minIncidence){
            countryOrder.push(i);
        }
    }
    shuffle(countryOrder)

    let country = getCountry(countryOrder[game%countryOrder.length]);
    answer = country.country;

    document.getElementById('todayName').innerHTML = country.name;
    document.querySelector('input').removeAttribute('readonly')
    document.getElementById('guessBox').value = ""
}

function setDifficulty(diff){
    gameDifficulty = parseInt(diff);
}


window.addEventListener('load', () => {
    newGame(gameDifficulty)
    game = 0;
})

function resetText(){
    document.querySelectorAll('span').innerHTML = ""
    document.getElementById("giveUp").disabled = false;
    document.getElementById("guessButton").disabled = false;
    for(let attempt = 1; attempt <= 5; attempt++){
        document.getElementById(`hintCountry${attempt}`).innerHTML = ''
        document.getElementById(`hintRegion${attempt}`).innerHTML = ''
        document.getElementById(`hintLetters${attempt}`).innerHTML = ''
        document.getElementById(`hintFirstLetter${attempt}`).innerHTML = ''

        document.getElementById(`hintCountry${attempt}`).style.color = ''
        document.getElementById(`hintRegion${attempt}`).style.color = ''
        document.getElementById(`hintLetters${attempt}`).style.color =''
        document.getElementById(`hintFirstLetter${attempt}`).style.color = ''
        document.getElementById('finished').innerHTML=''
    }
}

function giveUp(){
    finished.innerHTML  = `Unfortunately, you did not guess the country right in 5 guesses.  The answer was ${answer}`;
    document.querySelector('input').setAttribute('readonly', '')
    document.getElementById("giveUp").disabled = true;
    document.getElementById("guessButton").disabled = true;
    game++;
}

