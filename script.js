let guesses = [];
let answer;

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
    }
    else{ // USE THIS SPACE FOR HINTS AS WELL


        if(guesses.length == 5){
            finished.innerHTML  = `Unfortunately, you did not guess the country right in 5 guesses.  The answer was ${answer}`;
            document.querySelector('input').setAttribute('readonly', '')
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

function newGame(day){
    resetGuesses();
    guesses = [];

    let country = getCountry(order[day]);
    answer = country.country;

    document.getElementById('todayName').innerHTML = country.name;
}


const beginningDay = new Date('August 11, 2023');
function dailyGame(){
    let daysElapsed = msToDays(new Date() - beginningDay)-1;
    newGame(daysElapsed)
}

function msToDays(ms){
	let secs = ms/1000;
	let mins = secs/60;
	let hrs = mins/60;
	let days = Math.round(hrs/24)
	return days;
}


window.addEventListener('load', () => {
    dailyGame();
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