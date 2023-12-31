let guesses = [];
let answer;
const swup = new Swup()

const confetti = document.getElementById('confetti');
const jsConfetti = new JSConfetti({ confetti })

// for(let i = 0; i < 10; i ++){
//     let rand = Math.floor(Math.random()*10000)

//     console.log(data.country[rand], data.country_name[rand], data.rank_in_country[rand], data.surname[rand], data.incidence[rand], data.frequency_denom[rand])
// }

let possibleCountries = [...new Set(data.country_name)];

// console.log(possibleCountries);



// This code is used to create the autocomplete
$(".autocomplete").autocomplete({
  source: function(request, response) {
    let results = $.ui.autocomplete.filter(possibleCountries, request.term);

    response(results.slice(0, 7));
  }
});



let finished = document.getElementById('finished')
// This function runs whenever a guess is made:
function guessMade() {
  let guess = capFirst(document.getElementById('guessBox').value);
  if (!(possibleCountries.indexOf(guess) >= 0)) return;

  guesses.push(guess);
  updateGuesses();

  document.getElementById(`guess${guesses.length}`).scrollIntoView({
    behavior: 'smooth'
  });

  if (guess == answer) {
    finished.innerHTML = "You have successfully guessed the answer!"
    document.querySelector('input').setAttribute('readonly', '')
    document.getElementById("guessButton").disabled = true;
    document.getElementById("giveUp").disabled = true;
    fillHint(guess, answer, guesses.length)
    jsConfetti.addConfetti();
  }
  else { // USE THIS SPACE FOR HINTS AS WELL


    if (guesses.length == 5) {
      finished.innerHTML = `Unfortunately, you did not guess the country right in 5 guesses.  The answer was ${answer}`;
      document.querySelector('input').setAttribute('readonly', '')
      document.getElementById("giveUp").disabled = true;
      document.getElementById("guessButton").disabled = true;
      fillHint(guess, answer, guesses.length)
    }
    else {
      fillHint(guess, answer, guesses.length)
      finished.innerHTML = 'Nope, that\'s not it';
    }
  }

  document.getElementById('guessBox').value = ''
  saveData();
}

function updateGuesses() {
  for (let i = 0; i < guesses.length; i++) {
    document.getElementById(`guess${i + 1}`).innerHTML = guesses[i];
  }
}

function resetGuesses() {
  for (let i = 0; i < 5; i++) {
    document.getElementById(`guess${i + 1}`).innerHTML = "";
  }
}

function newGame(day) {
  resetGuesses();
  guesses = [];

  let country = getCountry(order[day]);
  answer = country.country;

  document.getElementById('todayName').innerHTML = country.name;
}


const beginningDay = new Date('2023-08-11T12:00:00-04:00'); // August 11th at 12 am
function dailyGame() {
  let daysElapsed = msToDays(new Date() - beginningDay) - 1;
  newGame(daysElapsed)
}

function getDay(){
  return msToDays(new Date() - beginningDay) - 1;
}

function msToDays(ms) {
  let secs = ms / 1000;
  let mins = secs / 60;
  let hrs = mins / 60;
  let days = Math.round(hrs / 24)
  return days;
}


window.addEventListener('load', () => {
  let savedGuesses = localStorage[`${getDay()}`];
  if(!savedGuesses){
    dailyGame();
  }
  else{
    let country = getCountry(order[getDay()]);
    answer = country.country;

    document.getElementById('todayName').innerHTML = country.name;
    loadData();

    if(localStorage[`giveUp${getDay()}`].length > 0 ){
      document.querySelector('input').setAttribute('readonly', '');
      document.getElementById("guessButton").disabled = true;
      document.getElementById("giveUp").disabled = true;
      finished.innerHTML = `Unfortunately, you gave up.  The answer was ${answer}`;
    }
    else if(guesses.length == 5 && !guesses.includes(answer)){ // Person failed at guessing in 5 tries
      document.querySelector('input').setAttribute('readonly', '');
      document.getElementById("guessButton").disabled = true;
      document.getElementById("giveUp").disabled = true;
      finished.innerHTML = `Unfortunately, you did not guess the country right in 5 guesses.  The answer was ${answer}`;
    }
    else if(guesses.includes(answer)){
      finished.innerHTML = "You have successfully guessed the answer!"
      document.querySelector('input').setAttribute('readonly', '');
      document.getElementById("giveUp").disabled = true;
      document.getElementById("guessButton").disabled = true;
      jsConfetti.addConfetti();
    }
  }
})



function giveUp() {
  finished.innerHTML = `Unfortunately, you did not guess the country right in 5 guesses.  The answer was ${answer}`;
  document.querySelector('input').setAttribute('readonly', '')
  document.getElementById("giveUp").disabled = true;
  document.getElementById("guessButton").disabled = true;

  localStorage[`giveUp${getDay()}`] = 'they gave up lmaooooooooo';
}

// Use the day as the key
function saveData(){
  let storeString = guesses.join(' ');
  localStorage[`${getDay()}`] = storeString;
}

function loadData(){
  let savedGuesses = localStorage[`${getDay()}`];
  if(!savedGuesses) return;
  guesses = savedGuesses.split(' ');
  updateGuesses();
  fillHints();
}

function fillHints(){
  for(let i = 0; i < guesses.length; i++){
    fillHint(guesses[i], answer, i+1);
  }
}

