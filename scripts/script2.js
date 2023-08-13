let guesses = [];
let answer;
const swup = new Swup()
let game = 0;

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
    let guess = document.getElementById('guessBox').value;
    if(!(possibleCountries.indexOf(guess) >= 0)) return;
    
    guesses.push(guess);
    updateGuesses();

    if(guess == answer){
        finished.innerHTML = "You have successfully guessed the answer!"
        document.querySelector('input').setAttribute('readonly', '')
        game++;
    }
    else{ // USE THIS SPACE FOR HINTS AS WELL


        if(guesses.length == 5){
            finished.innerHTML  = `Unfortunately, you did not guess the country right in 5 guesses.  The answer was ${answer}`;
            document.querySelector('input').setAttribute('readonly', '')
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

function getCountry(id){
    return({
        country: data.country_name[id],
        rank: data.rank_in_country[id],
        name: data.surname[id],
        incidence: data.incidence[id],
        frequency: data.frequency_denom[id]
    })
}

function resetGuesses(){
    for(let i = 0; i < 5; i++){
        document.getElementById(`guess${i+1}`).innerHTML = "";
    }
}


function newGame(){
    resetGuesses();
    guesses = [];

    random = Math.floor((Math.random() * data.country.length))

    let country = getCountry(random);
    answer = country.country;

    document.getElementById('todayName').innerHTML = country.name;
}

function newGame(difficulty){ // 0, 1, 2, 3, 4, 5
    resetText()
    resetGuesses();
    guesses = [];
    let difficulties = [1000000, 200000, 50000, 10000, 2000]
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


window.addEventListener('load', () => {
    newGame(1)
    game = 0;
})

function fillHint(guess, answer, attempt){
    let guessHints = possibleDailyCountries[guess];
    let answerHints = possibleDailyCountries[answer];
    // [Africa, North Africa]

    let guessedCountry = guessHints[0]
    let guessedRegion = guessHints[1]
    let guessedLetters = guess.length
    let guessedFirstLetter = guess.substring(0, 1)

    let answerCountry = answerHints[0]
    let answerRegion = answerHints[1]
    let answerLetters = answer.length
    let answerFirstLetter = answer.substring(0, 1)

    document.getElementById(`hintCountry${attempt}`).innerHTML = guessedCountry
    document.getElementById(`hintRegion${attempt}`).innerHTML = guessedRegion
    document.getElementById(`hintLetters${attempt}`).innerHTML = guessedLetters
    document.getElementById(`hintFirstLetter${attempt}`).innerHTML = guessedFirstLetter

    document.getElementById(`hintCountry${attempt}`).style.color = guessedCountry == answerCountry ? 'green' : 'red'
    document.getElementById(`hintRegion${attempt}`).style.color = guessedRegion == answerRegion ? 'green' : 'red'
    document.getElementById(`hintLetters${attempt}`).style.color = guessedLetters == answerLetters ? 'green' : 'red'
    document.getElementById(`hintFirstLetter${attempt}`).style.color = guessedFirstLetter == answerFirstLetter ? 'green' : 'red'
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function resetText(){
    document.querySelectorAll('span').innerHTML = ""
    for(let attempt = 1; attempt <= 4; attempt++){
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
    game++;
}